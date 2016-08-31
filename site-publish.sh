#!/bin/bash

npm run build

pushd website-build

git init
git remote add webpages git@github.com:jenkinsci/jenkins-design-language.git
git fetch --depth=1 webpages gh-pages

git add --all
git commit -m "webpages"
git merge --no-edit -s ours remotes/webpages/gh-pages

git push webpages master:gh-pages

rm -rf .git

popd