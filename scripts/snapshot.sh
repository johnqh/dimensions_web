#!/bin/bash
set -euo pipefail

# snapshot.sh - Capture all ~/projects repos and their .env files
#
# Creates ~/snapshot/ with:
#   manifest.json  - repo metadata (remote, branch, commit, dirty status)
#   npmrc          - copy of ~/.npmrc
#   env/<repo>/    - .env and .env.local files per repo
#
# Usage:
#   ./snapshot.sh

PROJECTS_DIR="${HOME}/projects"
SNAPSHOT_DIR="${HOME}/snapshot"
MANIFEST="${SNAPSHOT_DIR}/manifest.json"

# ── Safety check ──
if [ -d "$SNAPSHOT_DIR" ]; then
    echo "ERROR: ${SNAPSHOT_DIR} already exists."
    echo "Remove it first: rm -rf ${SNAPSHOT_DIR}"
    exit 1
fi

# ── Create structure ──
mkdir -p "${SNAPSHOT_DIR}/env"

# ── Copy ~/.npmrc ──
npmrc_included=false
if [ -f "${HOME}/.npmrc" ]; then
    cp "${HOME}/.npmrc" "${SNAPSHOT_DIR}/npmrc"
    npmrc_included=true
    echo "Copied ~/.npmrc"
else
    echo "WARNING: ~/.npmrc not found, skipping"
fi

# ── Iterate repos ──
repos_json="["
first_repo=true
repo_count=0
env_count=0

for repo_dir in "${PROJECTS_DIR}"/*/; do
    [ -d "${repo_dir}.git" ] || continue

    repo_name=$(basename "$repo_dir")

    # Get git metadata
    remote=$(git -C "$repo_dir" remote get-url origin 2>/dev/null || echo "")
    branch=$(git -C "$repo_dir" branch --show-current 2>/dev/null || echo "")
    commit=$(git -C "$repo_dir" rev-parse HEAD 2>/dev/null || echo "")

    # Check dirty status
    if [ -n "$(git -C "$repo_dir" status --porcelain 2>/dev/null)" ]; then
        dirty=true
    else
        dirty=false
    fi

    # Copy .env and .env.local
    env_files_json="["
    first_env=true
    for env_name in .env .env.local; do
        if [ -f "${repo_dir}${env_name}" ]; then
            mkdir -p "${SNAPSHOT_DIR}/env/${repo_name}"
            cp "${repo_dir}${env_name}" "${SNAPSHOT_DIR}/env/${repo_name}/${env_name}"
            if $first_env; then
                first_env=false
            else
                env_files_json+=","
            fi
            env_files_json+="\"${env_name}\""
            env_count=$((env_count + 1))
        fi
    done
    env_files_json+="]"

    # Build repo JSON entry
    if $first_repo; then
        first_repo=false
    else
        repos_json+=","
    fi

    # Escape any double quotes in values
    remote_escaped=$(printf '%s' "$remote" | sed 's/"/\\"/g')
    branch_escaped=$(printf '%s' "$branch" | sed 's/"/\\"/g')

    repos_json+="
    {
      \"name\": \"${repo_name}\",
      \"remote\": \"${remote_escaped}\",
      \"branch\": \"${branch_escaped}\",
      \"commit\": \"${commit}\",
      \"dirty\": ${dirty},
      \"env_files\": ${env_files_json}
    }"

    repo_count=$((repo_count + 1))

    if $dirty; then
        echo "WARNING: ${repo_name} has uncommitted changes"
    fi
done

repos_json+="
  ]"

# ── Write manifest ──
snapshot_date=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

cat > "$MANIFEST" <<EOF
{
  "snapshot_date": "${snapshot_date}",
  "source_dir": "${PROJECTS_DIR}",
  "npmrc_included": ${npmrc_included},
  "repos": ${repos_json}
}
EOF

# Pretty-print with jq if available
if command -v jq &>/dev/null; then
    jq . "$MANIFEST" > "${MANIFEST}.tmp" && mv "${MANIFEST}.tmp" "$MANIFEST"
fi

echo ""
echo "=== Snapshot complete ==="
echo "  Repos:     ${repo_count}"
echo "  Env files: ${env_count}"
echo "  Location:  ${SNAPSHOT_DIR}"
