@echo off
echo ========================================
echo   Controle Financeiro - Python + JSON
echo   Persistência Simples e Segura
echo ========================================
echo.

echo [1/3] Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo   ERRO: Python nao encontrado!
    echo   Por favor, instale o Python em: https://python.org/
    echo.
    pause
    exit /b 1
)
echo   ✅ Python encontrado
echo.

echo [2/3] Verificando dependencias...
python -c "import flask" >nul 2>&1
if %errorlevel% neq 0 (
    echo   Instalando Flask...
    pip install flask flask-cors
    if %errorlevel% neq 0 (
        echo   ERRO: Falha ao instalar Flask!
        pause
        exit /b 1
    )
)
echo   ✅ Dependencias OK
echo.

echo [3/3] Iniciando servidor...
echo.
echo   O servidor sera iniciado em: http://localhost:5000
echo   Dados serao salvos na pasta: data/
echo.
echo   Pressione Ctrl+C para parar o servidor
echo.
echo ========================================
echo.

python servidor_json.py

pause
