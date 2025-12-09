# Script to quickly commit and push changes to GitHub
# Usage: .\push-changes.ps1

param(
    [string]$message = "Update portfolio"
)

Write-Host "📁 Adding all changes..." -ForegroundColor Green
git add .

Write-Host "📝 Committing changes..." -ForegroundColor Green
git commit -m "$message"

Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Green
git push origin main

Write-Host "✅ Changes pushed successfully!" -ForegroundColor Green
Write-Host "🚀 Your Vercel deployment will update automatically..." -ForegroundColor Cyan
