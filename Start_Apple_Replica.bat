@echo off
title Apple Replica Server
cd /d "d:\apple replica"

echo =======================================================
echo          Starting Apple Store Replica Server...
echo =======================================================
echo.
echo Your website is opening in your default browser...
echo.
echo [!] MINIMIZE this window to keep the server running in the background.
echo [!] CLOSE this window anytime you want to turn the server off.
echo.

npm run dev -- --open
