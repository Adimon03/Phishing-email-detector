# 🚀 Phishing Detector Setup Instructions

## Complete Setup Guide

### Step 1: Backend Setup (Already Complete ✅)

The backend is ready in `phishing-detector/backend/`

### Step 2: Frontend Setup

Since the frontend needs to be created fresh, follow these steps:

#### Option A: Automatic Setup (Recommended)

Run the setup script:

**Windows:**
```bash
cd phishing-detector
setup-frontend.bat
```

**macOS/Linux:**
```bash
cd phishing-detector
chmod +x setup-frontend.sh
./setup-frontend.sh
```

#### Option B: Manual Setup

1. **Create React App:**
```bash
cd phishing-detector/frontend
npx create-react-app . --template typescript
```

2. **Install Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Copy Component Files:**

The following files are already created in `frontend/src/`:
- `App.tsx`
- `index.css`
- `components/Header.tsx`
- `components/EmailAnalyzer.tsx`
- `components/Results.tsx`

4. **Update tailwind.config.js:**

Replace the content with:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00d4ff',
        'cyber-green': '#00ff88',
        'cyber-red': '#ff0066',
        'cyber-purple': '#8b5cf6',
      }
    },
  },
  plugins: [],
}
```

5. **Start the Frontend:**
```bash
npm start
```

### Step 3: Start Both Services

**Terminal 1 - Backend:**
```bash
cd phishing-detector/backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd phishing-detector/frontend
npm start
```

### Step 4: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🧪 Testing

1. Click "Load Sample Email" to test with a pre-filled phishing example
2. Or paste your own email content
3. Click "Analyze Email" to see results

## ⚠️ Troubleshooting

### CORS Errors
If you see CORS errors, make sure:
- Backend is running on port 5000
- Frontend is running on port 3000
- Flask-CORS is installed: `pip install flask-cors`

### Port Already in Use
- Backend: Change port in `backend/app.py`
- Frontend: Set PORT environment variable: `PORT=3001 npm start`

### Module Not Found
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

## 📦 What's Included

### Backend Features
- Flask REST API
- URL analysis (suspicious patterns, IP addresses, shorteners)
- Sender validation
- Content analysis (keywords, urgency, sensitive info)
- Risk scoring algorithm

### Frontend Features
- React + TypeScript
- Tailwind CSS styling
- Real-time analysis
- Detailed results visualization
- Sample email loader

## 🎯 Next Steps

After setup:
1. Test with the sample email
2. Try analyzing real emails (remove sensitive info first!)
3. Customize detection rules in `backend/app.py`
4. Modify UI colors in `frontend/tailwind.config.js`

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Need help? Check the main README.md for more details!
