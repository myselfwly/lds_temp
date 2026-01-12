@Rem 打包
setlocal enabledelayedexpansion
set root_dir=%~1
set build_dir=%root_dir%\bundler
set output_dir=%root_dir%\output
@REM 判断output_dir是否存在，不存在则创建
if not exist %output_dir% (
    mkdir %output_dir%
) else (
    @REM 删除output_dir下的所有文件
    del /Q %output_dir%\*.*
)
@REM example: lds-lx-wv 默认值为lds
set modes=%~2
if "%modes%"=="" (
    set modes=lds
)
set build_tools=%~3
@REM example: pc_optimizer
set base_output_name=%~4
echo base_output_name=%base_output_name%
@REM 循环遍历modes按-分割
set modes=%modes:-= %

cd %root_dir%


call yarn --frozen-lockfile

for %%m in (%modes%) do (
    del /Q %build_dir%\*.*
    set mode=%%m
    echo mode=!mode!
    set output_name=%base_output_name%_%mode%.dat
    if not "!mode!"=="lds" (
        set output_name=%base_output_name%_!mode!.dat
    ) else (
        set output_name=%base_output_name%.dat
    )
    echo output_name=!output_name!
    call yarn build_offline:!mode!
    echo 'rename'
    set filename=!output_name!
    for %%A in ("!filename!") do (
        set "fullname=%%~nA"
        set "extension=%%~xA"
    )
    set unsign_file_name=!fullname!_unsign!extension!
    echo unsign_file_name=!unsign_file_name!
    rename %build_dir%\!output_name! !unsign_file_name!
    copy %build_dir%\bundle.log %output_dir%\bundle.!mode!.log
    echo 'set path'
    %build_tools%\ccnet_config\dat_encrypt.exe  --dat_path=%build_dir%\!unsign_file_name! --pripem_path=C:\key\private.pem --out_path=%output_dir%\!output_name!
    echo 'finished'
)

exit /b 0