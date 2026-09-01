#!/usr/bin/env bash
set -euo pipefail

version="0.39.10"
project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"

if [[ -e pocketbase ]]; then
  echo "A pocketbase file already exists; leaving it unchanged." >&2
  exit 1
fi

case "$(uname -s)-$(uname -m)" in
  Linux-x86_64)
    archive="pocketbase_${version}_linux_amd64.zip"
    checksum="67f68c8041dbb6a35fd7af5997ffc5063a7a7b96bf9df810360788f9e9975408"
    ;;
  Linux-aarch64|Linux-arm64)
    archive="pocketbase_${version}_linux_arm64.zip"
    checksum="5bad497eaf2522418673eacfcc90e75106036f19b4aeeac6e59bc48503c01ddf"
    ;;
  *)
    echo "This installer supports 64-bit Linux on Intel/AMD or ARM." >&2
    echo "Download PocketBase ${version} manually for this machine." >&2
    exit 1
    ;;
esac

temporary_dir="$(mktemp -d)"
cleanup() { rm -rf "$temporary_dir"; }
trap cleanup EXIT

url="https://github.com/pocketbase/pocketbase/releases/download/v${version}/${archive}"
curl --fail --location --silent --show-error "$url" --output "$temporary_dir/$archive"
printf '%s  %s\n' "$checksum" "$temporary_dir/$archive" | sha256sum --check --status
unzip -q "$temporary_dir/$archive" pocketbase -d "$temporary_dir"
install -m 0755 "$temporary_dir/pocketbase" ./pocketbase

echo "PocketBase ${version} installed and its official checksum verified."
