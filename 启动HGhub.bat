@echo off
setlocal
cd /d "%~dp0"
title HGhub Local Server

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Please install Node.js 20 or newer.
  pause
  exit /b 1
)

where pnpm.cmd >nul 2>nul
if errorlevel 1 (
  where corepack.cmd >nul 2>nul
  if errorlevel 1 (
    echo pnpm and Corepack were not found. Install Node.js 20 or newer, then enable pnpm.
    pause
    exit /b 1
  )
  if not exist node_modules (
    echo Installing project dependencies...
    call corepack pnpm install
    if errorlevel 1 goto failed
  )
  echo Starting HGhub...
  call corepack pnpm dev -- --host 127.0.0.1 --port 1420 --open
) else (
  if not exist node_modules (
    echo Installing project dependencies...
    call pnpm.cmd install
    if errorlevel 1 goto failed
  )
  echo Starting HGhub...
  call pnpm.cmd dev -- --host 127.0.0.1 --port 1420 --open
)
goto end

:failed
echo Dependency installation failed. Check your network and Node.js/pnpm installation.

:end
pause
