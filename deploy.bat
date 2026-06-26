@echo off
echo.
echo  ╔══════════════════════════════════════╗
echo  ║   SISMO ECHO TAB — Deploy Cloudflare ║
echo  ╚══════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/2] Login Cloudflare (se richiesto si apre il browser)...
wrangler pages deploy . --project-name sismo-echo-tab --branch main

echo.
echo [2/2] Deploy completato!
echo.
echo  URL: https://sismo-echo-tab.pages.dev
echo.
pause
