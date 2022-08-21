#!/usr/bin/env sh

set -e

npm run build

cp CNAME ./dist/CNAME
cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:klapro/klapro.github.io.git master:gh-pages

cd -