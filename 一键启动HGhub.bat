@echo off
chcp 65001 >nul
cd /d "%~dp0"
title HGhub 一键启动
where pnpm >nul 2>nul
if errorlevel 1 (
  echo 未检测到 pnpm，请先安装 Node.js 和 pnpm。
  echo Node.js: https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules (
  echo 首次启动，正在安装项目依赖，请稍候...
  call pnpm install
  if errorlevel 1 (
    echo 依赖安装失败，请检查网络后重试。
    pause
    exit /b 1
  )
)
echo 正在启动 HGhub...
echo 浏览器打开地址: http://localhost:1420/
echo 请保持此窗口开启，关闭窗口会停止网站。
call pnpm dev
pause
