@echo off
setlocal enabledelayedexpansion

REM 检查参数
if "%~1"=="" (
    echo 错误: 缺少源目录参数
    echo 用法: copy_project.bat SOURCE_DIR TARGET_DIR
    exit /b 1
)

if "%~2"=="" (
    echo 错误: 缺少目标目录参数
    echo 用法: copy_project.bat SOURCE_DIR TARGET_DIR
    exit /b 1
)

REM 设置源目录和目标目录
set "SOURCE_DIR=%~1"
set "TARGET_DIR=%~2"

REM 检查源目录是否存在
if not exist "%SOURCE_DIR%" (
    echo 错误: 源目录不存在: %SOURCE_DIR%
    exit /b 1
)

REM 创建目标目录
mkdir "%TARGET_DIR%"

REM 使用 robocopy 复制文件，排除 node_modules 和其他常见目录
echo 正在复制文件...
echo 源目录: %SOURCE_DIR%
echo 目标目录: %TARGET_DIR%
echo.
robocopy "%SOURCE_DIR%" "%TARGET_DIR%" /E /XD node_modules .git dist build out .vite /XF copy_project.bat /NFL /NDL /NP
set ROBOCopyError=%ERRORLEVEL%

REM robocopy 返回代码说明:
REM 0-7: 成功复制了一些文件
REM 8+: 发生错误
if %ROBOCopyError% GEQ 8 (
    echo.
    echo 复制过程中发生错误
    exit /b 1
)

echo.
echo 复制完成!
echo 源目录: %SOURCE_DIR%
echo 目标目录: %TARGET_DIR%
