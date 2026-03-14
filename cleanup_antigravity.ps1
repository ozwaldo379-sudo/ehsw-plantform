# Cleanup Antigravity Processes
# This script forcefully terminates all Antigravity and VS Code Inno Updater processes
# to resolve "File handle in use" errors during updates.

Write-Host "Searching for lingering Antigravity processes..." -ForegroundColor Cyan

$processes = Get-Process -Name "Antigravity", "vscode-inno-updater" -ErrorAction SilentlyContinue

if ($processes) {
    Write-Host "Found $($processes.Count) process(es). Terminating..." -ForegroundColor Yellow
    $processes | Stop-Process -Force
    Write-Host "All processes terminated successfully." -ForegroundColor Green
} else {
    Write-Host "No lingering processes found. You are ready to update." -ForegroundColor Green
}

Write-Host "`nTo update Antigravity safely:" -ForegroundColor Cyan
Write-Host "1. Close this terminal."
Write-Host "2. Restart Antigravity."
Write-Host "3. Go to Help > Check for Updates (if not automatic)."
Write-Host "4. If'Restart to Update' appears, click it."
