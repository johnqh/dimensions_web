#!/bin/bash

# push_all.sh - Combined push script for ALL Sudobility product families
#
# This script defines the list of projects across all product families
# and sources the reusable push_projects.sh script from the workflows repo.
#
# Usage:
#   ./push_all.sh                              # Update deps and process only projects with changes
#   ./push_all.sh --force                      # Force version bump on all projects
#   ./push_all.sh --subpackages                # Also process sub-packages in /packages directories
#   ./push_all.sh --starting-project <name>    # Skip projects until reaching <name>
#   ./push_all.sh --help                       # Show help message

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Define projects in dependency order with wait times
# Format: "relative_path:wait_after_in_seconds"
#
# Wait times are used for packages that need CI/CD to complete publishing
# before dependent packages can fetch the new version from npm.
#
# Projects are grouped by product family. Each family's internal dependency
# order is preserved. Families are independent of each other.
PROJECTS=(
    # ── Types ──
    "../wildduck:0"

    "../tapayoka_pi:0"
    "../tapayoka_pi_pico:0"

    "../entitystarter_types:0"
    
    "../genuivo_types:0"
    "../heavymath_types:0"

    "../mail_box_types:0"

    "../mixr_types:0"

    "../shapeshyft_types:0"

    "../starter_types:0"

    "../sudojo_types:0"

    "../svgr_types:0"

    "../tapayoka_types:0"

    "../bunnyfinder_types:0"

    "../testomniac_types:0"

    "../whisperly_types:60"

    # ── Configs and Utils ──

    "../mail_box_configs:0"
    "../sudojo_ocr:60"

    # ── API and Indexers ──

    "../haraka-plugin-wildduck:0"

    "../entitystarter_api:0"
    "../entitystarter_client:0"

    "../genuivo_api:0"
    "../genuivo_client:0"

    "../heavymath_indexer:0"
    "../heavymath_indexer_client:0"

    "../wildduck_client:0"
    "../signic_sdk:0"
    "../mail_box_indexer:0"
    "../mail_box_indexer_client:0"

    "../mixr_api:0"
    "../mixr_client:0"

    "../shapeshyft_api:0"
    "../shapeshyft_client:0"

    "../starter_api:0"
    "../starter_client:0"

    "../sudojo_api:0"
    "../sudojo_client:0"

    "../svgr_api:0"
    "../svgr_client:0"

    "../tapayoka_api:0"
    "../tapayoka_client:0"
    "../tapayoka_bluetooth:0"

    "../bunnyfinder_api:0"
    "../bunnyfinder_client:0"

    "../testomniac_api:0"
    "../testomniac_client:0"

    "../whisperly_api:0"
    "../whisperly_client:60"

    # Contracts

    "../auctions_contracts:0"
    "../heavymath_contracts:0"

    "../mail_box_contracts:60"

    # ── Libs ──

    "../entitystarter_lib:0"

    "../genuivo_lib:0"

    "../heavymath_lib:0"

    "../mail_box_lib:0"

    "../mixr_lib:0"

    "../shapeshyft_lib:0"

    "../starter_lib:0"

    "../sudojo_lib:0"

    "../svgr_lib:0"

    "../tapayoka_lib:0"

    "../bunnyfinder_lib:0"

    "../testomniac_lib:0"

    "../whisperly_lib:60"

    # ── Apps ──

    "../entitystarter_app:0"
    "../entitystarter_app_rn:0"

    "../genui_demo:0"
    "../genuivo_app:0"
    "../genuivo_app_rn:0"

    "../heavymath_app:0"

    "../signic_sdk_demo:0"
    "../mail_box:0"
    "../mail_box_wallet:0"
    "../mail_box_wallet_landing:0"
    "../mail_box_rn:0"
    "../mail_box_oauth:0"

    "../mixr:0"
    "../mixr_app_rn:0"

    "../shapeshyft_app:0"

    "../starter_app:0"
    "../starter_app_rn:0"

    "../sudojo_app:0"
    "../sudojo_app_rn:0"
    "../sudojo_bot:0"

    "../svgr_app:0"
    "../svgr_app_rn:0"

    "../tapayoka_vendor_app:0"
    "../tapayoka_vendor_app_rn:0"
    "../tapayoka_buyer_app:0"
    "../tapayoka_buyer_app_rn:0"

    "../bunnyfinder_app:0"
    "../bunnyfinder_app_rn:0"

    "../testomniac_app:0"
    "../testomniac_app_rn:0"

    "../whisperly_app:0"

    "../sudobility:0"

    "../sudobility_dockerized:0"
    "../wildduck-dockerized:0"
    "../remoteled:0"
)

# Source reusable script: prefer local workflows repo, fall back to GitHub
LOCAL_SCRIPT="$(cd "$BASE_DIR" && pwd)/../workflows/scripts/push_projects.sh"
if [ -f "$LOCAL_SCRIPT" ]; then
    source "$LOCAL_SCRIPT"
else
    PUSH_SCRIPT=$(mktemp)
    trap "rm -f $PUSH_SCRIPT" EXIT
    if ! curl -fsSL "https://raw.githubusercontent.com/johnqh/workflows/main/scripts/push_projects.sh" -o "$PUSH_SCRIPT"; then
        echo "Error: Failed to download push_projects.sh from GitHub"
        exit 1
    fi
    source "$PUSH_SCRIPT"
fi

# Parse command-line arguments
parse_args "$@"

# Run the push process
run_push_projects "$BASE_DIR" "${PROJECTS[@]}"
