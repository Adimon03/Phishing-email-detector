#!/bin/bash

echo "========================================"
echo "Phishing Detector Frontend Setup"
echo "========================================"
echo ""

cd frontend

echo "Step 1: Creating React App..."
npx create-react-app . --template typescript
if [ $? -ne 0 ]; then
    echo "Error creating React app"
    exit 1
fi

echo ""
echo "Step 2: Installing Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer
if [ $? -ne 0 ]; then
    echo "Error installing Tailwind"
    exit 1
fi

echo ""
echo "Step 3: Initializing Tailwind..."
npx tailwindcss init -p
if [ $? -ne 0 ]; then
    echo "Error initializing Tailwind"
    exit 1
fi

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "The component files are already in src/"
echo ""
echo "To start the frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "To start the backend:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python app.py"
echo ""
