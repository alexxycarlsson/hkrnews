if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}

yarn build

Set-Location "dist"

git init
git checkout -B main
git add -A
git commit -m 'deploy'
git push -f git@github.com:alexxycarlsson/hkrnews.git main:gh-pages

Set-Location ".."

Write-Output "Deployed at https://alexxycarlsson.github.io/hkrnews/"