if (Test-Path dist) {
    Remove-Item dist -Recurse -Force
}

yarn build

Set-Location dist

# Git push this folder to the gh-pages branch
git init
git add .
git commit -m "Deployed at $(Get-Date)"
git remote add origin "git@github.com:alexxycarlsson/hkrnews.git"
git push -f origin "main:gh-pages"

Set-Location ..

Write-Output "Deployed at https://alexxycarlsson.github.io/hkrnews/"