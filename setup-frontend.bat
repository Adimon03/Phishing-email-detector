@echo off
echo ========================================
echo Phishing Detector Frontend Setup
echo ========================================
echo.

cd frontend

echo Step 1: Creating React App...
call npx create-react-app . --template typescript
if errorlevel 1 (
    echo Error creating React app
    pause
    exit /b 1
)

echo.
echo Step 2: Installing Tailwind CSS...
call npm install -D tailwindcss postcss autoprefixer
if errorlevel 1 (
    echo Error installing Tailwind
    pause
    exit /b 1
)

echo.
echo Step 3: Initializing Tailwind...
call npx tailwindcss init -p
if errorlevel 1 (
    echo Error initializing Tailwind
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo The component files are already in src/
echo.
echo To start the frontend:
echo   cd frontend
echo   npm start
echo.
echo To start the backend:
echo   cd backend
echo   venv\Scripts\activate
echo   python app.py
echo.
pause
