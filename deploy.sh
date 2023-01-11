#!/bin/bash

set -e

if [ -d "dist" ]; then
    rm -rf dist
fi

yarn build

cd dist

git init
git checkout -B main
git add -A
git commit -m 'deploy'
git push -f git@github.com:alexxycarlsson/hkrnews.git main:gh-pages


cd -

echo "Deployed at https://alexxycarlsson.github.io/hkrnews/"