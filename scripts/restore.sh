#!/bin/bash
set -euo pipefail

# restore.sh - Restore ~/projects from a snapshot
#
# Reads ~/snapshot/ and:
#   - Clones missing repos, pulls existing ones
#   - Restores .env and .env.local files
#   - Restores ~/.npmrc
#
# Usage:
#   ./restore.sh

SNAPSHOT_DIR="${HOME}/snapshot"
MANIFEST="${SNAPSHOT_DIR}/manifest.json"
PROJECTS_DIR="${HOME}/projects"

# ── Validate ──
if [ ! -f "$MANIFEST" ]; then
    echo "ERROR: Manifest not found at ${MANIFEST}"
    exit 1
fi

if ! command -v jq &>/dev/null; then
    echo "ERROR: jq is required. Install with: brew install jq"
    exit 1
fi

# ── Restore ~/.npmrc ──
if [ -f "${SNAPSHOT_DIR}/npmrc" ]; then
    if [ -f "${HOME}/.npmrc" ]; then
        echo "~/.npmrc exists, backing up to ~/.npmrc.bak"
        cp "${HOME}/.npmrc" "${HOME}/.npmrc.bak"
    fi
    cp "${SNAPSHOT_DIR}/npmrc" "${HOME}/.npmrc"
    echo "Restored ~/.npmrc"
fi

# ── Restore repos ──
mkdir -p "$PROJECTS_DIR"

repo_count=$(jq '.repos | length' "$MANIFEST")
cloned=0
pulled=0
skipped=0
failed=0

for i in $(seq 0 $((repo_count - 1))); do
    name=$(jq -r ".repos[$i].name" "$MANIFEST")
    remote=$(jq -r ".repos[$i].remote" "$MANIFEST")
    branch=$(jq -r ".repos[$i].branch" "$MANIFEST")

    repo_path="${PROJECTS_DIR}/${name}"

    echo ""
    echo "--- ${name} (${branch}) ---"

    # Directory exists but is not a git repo
    if [ -d "$repo_path" ] && [ ! -d "${repo_path}/.git" ]; then
        echo "  ERROR: ${repo_path} exists but is not a git repo, skipping"
        failed=$((failed + 1))
        # Still restore env files
        for env_name in .env .env.local; do
            if [ -f "${repo_path}/${env_name}" ]; then
                rm "${repo_path}/${env_name}"
                echo "  Deleted existing ${env_name}"
            fi
        done
        env_dir="${SNAPSHOT_DIR}/env/${name}"
        if [ -d "$env_dir" ]; then
            for env_file in "${env_dir}"/.env*; do
                [ -f "$env_file" ] || continue
                cp "$env_file" "${repo_path}/$(basename "$env_file")"
                echo "  Restored $(basename "$env_file")"
            done
        fi
        continue
    fi

    if [ -d "${repo_path}/.git" ]; then
        # Repo exists: pull latest
        echo "  Repo exists, pulling..."

        if [ -n "$(git -C "$repo_path" status --porcelain 2>/dev/null)" ]; then
            echo "  WARNING: ${name} has uncommitted changes, skipping pull"
            skipped=$((skipped + 1))
        else
            current_branch=$(git -C "$repo_path" branch --show-current 2>/dev/null)
            if [ -n "$branch" ] && [ "$current_branch" != "$branch" ]; then
                echo "  Switching from ${current_branch} to ${branch}"
                if ! git -C "$repo_path" checkout "$branch" 2>&1; then
                    echo "  ERROR: Failed to checkout ${branch}, skipping pull"
                    failed=$((failed + 1))
                    # Still restore env files below
                fi
            fi

            if git -C "$repo_path" pull --ff-only 2>&1; then
                pulled=$((pulled + 1))
            else
                echo "  WARNING: pull --ff-only failed (diverged?), skipping pull"
                skipped=$((skipped + 1))
            fi
        fi
    else
        # Repo missing: clone it
        if [ -z "$remote" ]; then
            echo "  ERROR: No remote URL for ${name}, skipping"
            failed=$((failed + 1))
            continue
        fi

        echo "  Cloning from ${remote}..."
        if git clone "$remote" "$repo_path" 2>&1; then
            default_branch=$(git -C "$repo_path" branch --show-current 2>/dev/null)
            if [ -n "$branch" ] && [ "$default_branch" != "$branch" ]; then
                git -C "$repo_path" checkout "$branch" 2>&1 || \
                    echo "  WARNING: Could not checkout ${branch}, staying on ${default_branch}"
            fi
            cloned=$((cloned + 1))
        else
            echo "  ERROR: Clone failed for ${name}"
            failed=$((failed + 1))
            continue
        fi
    fi

    # Delete existing .env and .env.local, then restore from snapshot
    for env_name in .env .env.local; do
        if [ -f "${repo_path}/${env_name}" ]; then
            rm "${repo_path}/${env_name}"
            echo "  Deleted existing ${env_name}"
        fi
    done
    env_dir="${SNAPSHOT_DIR}/env/${name}"
    if [ -d "$env_dir" ]; then
        for env_file in "${env_dir}"/.env*; do
            [ -f "$env_file" ] || continue
            env_basename=$(basename "$env_file")
            cp "$env_file" "${repo_path}/${env_basename}"
            echo "  Restored ${env_basename}"
        done
    fi
done

echo ""
echo "=== Restore complete ==="
echo "  Cloned:  ${cloned}"
echo "  Pulled:  ${pulled}"
echo "  Skipped: ${skipped} (dirty or diverged)"
echo "  Failed:  ${failed}"
