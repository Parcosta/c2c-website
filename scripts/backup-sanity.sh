#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd -- "${script_dir}/.." && pwd)"
cd "$repo_root"

usage() {
  cat <<'EOF'
Usage:
  ./scripts/backup-sanity.sh [options] [-- <extra sanity export args>]

Options:
  --project-id <id>   Override NEXT_PUBLIC_SANITY_PROJECT_ID
  --dataset <name>    Override NEXT_PUBLIC_SANITY_DATASET
  --out-dir <dir>     Output directory (default: backups/sanity)
  --no-assets         Exclude assets from export (faster/smaller)
  -h, --help          Show help

Environment:
  NEXT_PUBLIC_SANITY_PROJECT_ID  Required (unless --project-id provided)
  NEXT_PUBLIC_SANITY_DATASET     Required (unless --dataset provided)
  SANITY_API_TOKEN               Required (used as SANITY_AUTH_TOKEN for Sanity CLI)
EOF
}

project_id="${NEXT_PUBLIC_SANITY_PROJECT_ID:-}"
dataset="${NEXT_PUBLIC_SANITY_DATASET:-}"
out_dir="backups/sanity"
no_assets="false"

extra_args=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --project-id)
      project_id="${2:-}"
      shift 2
      ;;
    --dataset)
      dataset="${2:-}"
      shift 2
      ;;
    --out-dir)
      out_dir="${2:-}"
      shift 2
      ;;
    --no-assets)
      no_assets="true"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      extra_args+=("$@")
      break
      ;;
    *)
      extra_args+=("$1")
      shift
      ;;
  esac
done

if [[ -z "$project_id" ]]; then
  echo "Error: missing NEXT_PUBLIC_SANITY_PROJECT_ID (or --project-id)" >&2
  exit 1
fi
if [[ -z "$dataset" ]]; then
  echo "Error: missing NEXT_PUBLIC_SANITY_DATASET (or --dataset)" >&2
  exit 1
fi
if [[ -z "${SANITY_API_TOKEN:-}" && -z "${SANITY_AUTH_TOKEN:-}" ]]; then
  echo "Error: missing SANITY_API_TOKEN (or SANITY_AUTH_TOKEN)" >&2
  exit 1
fi

timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$out_dir"

filename="sanity-${project_id}-${dataset}-${timestamp}.tar.gz"
destination="${out_dir%/}/${filename}"

sanity_args=("dataset" "export" "$dataset" "$destination" "--overwrite")
if [[ "$no_assets" == "true" ]]; then
  sanity_args+=("--no-assets")
fi
sanity_args+=("${extra_args[@]}")

export NEXT_PUBLIC_SANITY_PROJECT_ID="$project_id"
export NEXT_PUBLIC_SANITY_DATASET="$dataset"
export SANITY_AUTH_TOKEN="${SANITY_AUTH_TOKEN:-${SANITY_API_TOKEN:-}}"

npx --no-install sanity "${sanity_args[@]}"

echo "Sanity export created: $destination"

