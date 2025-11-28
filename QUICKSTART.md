# ⚡ Quick Start Guide

Get the Phishing Email Detector running in 5 minutes!

## 🎯 Prerequisites Check

- [ ] Python 3.8+ installed (`python --version`)
- [ ] Node.js 14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)

## 🚀 Fast Setup

### 1️⃣ Backend (2 minutes)

```bash
cd phishing-detector/backend
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors
python app.py
```

✅ Backend running at http://localhost:5000

### 2️⃣ Frontend (3 minutes)

**Open a NEW terminal:**

```bash
cd phishing-detector/frontend
npm install
npm run dev
```

This will:
- Install all dependencies
- Start the Vite development server
- Open your browser automatically

✅ Frontend running at http://localhost:3000

## 🎮 Try It Out

1. Browser opens automatically to http://localhost:3000
2. Click **"Load Sample Email"** button
3. Click **"🔍 Analyze Email"**
4. See the phishing analysis results!

## 🐛 Quick Fixes

**Backend won't start?**
```bash
pip install flask flask-cors
```

**Frontend errors?**
```bash
npm install
```

**Port 3000 busy?**
```bash
set PORT=3001
npm start
```

## 📸 What You'll See

- 🛡️ Cybersecurity-themed interface
- 📊 Risk score (0-100)
- 🔗 URL analysis
- 📧 Sender verification
- 💡 Security recommendations

## 🎓 Sample Email Included

The app includes a realistic phishing email example that demonstrates:
- Suspicious sender domain
- Urgency tactics
- Fake PayPal link
- Requests for sensitive info
- Multiple red flags

## ⏭️ Next Steps

- Read `SETUP_INSTRUCTIONS.md` for detailed info
- Check `README.md` for features and architecture
- Customize detection rules in `backend/app.py`
- Modify UI in `frontend/src/components/`

---

**Need help?** All component files are already created in `frontend/src/` - just run the setup script!
