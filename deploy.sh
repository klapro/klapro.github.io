#!/usr/bin/env sh

set -e

usage() {
  cat <<EOF
Usage: $(basename "$0") [options]

Build the project and deploy it to GitHub Pages.

Options:
  --no-build    Skip 'npm run build' and deploy the existing ./dist folder
  -h, --help    Show this help message and exit
EOF
}

SKIP_BUILD=false

for arg in "$@"; do
  case "$arg" in
    --no-build)
      SKIP_BUILD=true
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      echo >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [ "$SKIP_BUILD" = false ]; then
  npm run build
else
  echo "Skipping build..."
  if [ ! -d dist ]; then
    echo "Error: ./dist does not exist. Run without --no-build first." >&2
    exit 1
  fi
fi

cp CNAME ./dist/CNAME
cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:klapro/klapro.github.io.git master:gh-pages

cd -