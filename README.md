# 🛡️ Phishing Email Detector

An AI-powered web application that analyzes emails for phishing indicators using machine learning and pattern recognition.

## 🌟 Features

- **URL Analysis**: Detects suspicious URLs, IP addresses, and shortened links
- **Sender Verification**: Checks for email spoofing and suspicious sender patterns
- **Content Analysis**: Identifies urgency tactics, suspicious keywords, and sensitive information requests
- **Risk Scoring**: Provides a comprehensive risk score (0-100) with actionable recommendations
- **Modern UI**: Cybersecurity-themed interface with real-time analysis

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Python Flask + Machine Learning
- **Analysis Engine**: Pattern matching, URL validation, and heuristic analysis

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd phishing-detector/backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd phishing-detector/frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

1. Open the application in your browser
2. Click "📧 Load Sample Email" to choose from 8 realistic phishing examples:
   - Sample 1: Fake PayPal Account Suspension
   - Sample 2: Amazon Prize Winner Scam
   - Sample 3: Microsoft Tech Support Scam
   - Sample 4: Bank Account Verification Phishing
   - Sample 5: IRS Tax Refund Scam
   - Sample 6: Netflix Account Update Scam
   - Sample 7: LinkedIn Job Offer Scam
   - Sample 8: Package Delivery Scam
3. Or paste your own email content
4. Fill in sender email, subject, and content
5. Click "🔍 Analyze Email"
6. Review the detailed analysis results

See `SAMPLE_EMAILS_GUIDE.md` for detailed information about each sample.

## 📊 Analysis Components

### Risk Levels
- **Low (0-30)**: Email appears relatively safe
- **Medium (31-60)**: Some suspicious characteristics detected
- **High (61-100)**: Strong phishing indicators present

### Detection Features
- Suspicious URL patterns
- IP addresses in URLs
- URL shorteners
- Mismatched domains
- Sender email validation
- Urgency indicators
- Sensitive information requests
- Suspicious keywords

## 🔧 Configuration

### Backend Port
Edit `backend/app.py`:
```python
app.run(debug=True, port=5000)
```

### Frontend API URL
Edit `frontend/src/App.tsx`:
```typescript
const response = await fetch('http://localhost:5000/api/analyze', {
```

## 📁 Project Structure

```
phishing-detector/
├── backend/
│   ├── app.py              # Flask API server
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Tailwind styles
│   ├── package.json
│   └── tailwind.config.js
└── README.md              # This file
```

## 🛠️ Development

### Adding New Detection Rules

Edit `backend/app.py` and add patterns to:
- `SUSPICIOUS_KEYWORDS`
- `URGENCY_INDICATORS`
- `SENSITIVE_INFO_KEYWORDS`

### Customizing UI

Edit Tailwind colors in `frontend/tailwind.config.js`:
```javascript
colors: {
  'cyber-blue': '#00d4ff',
  'cyber-green': '#00ff88',
  'cyber-red': '#ff0066',
}
```

## 🧪 Testing

### Test with Sample Emails

The app includes a sample phishing email. Click "Load Sample Email" to test.

### API Testing

```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "test@example.com",
    "subject": "Test",
    "content": "Click here: http://suspicious-link.com"
  }'
```

## ⚠️ Disclaimer

This tool is for **educational purposes only**. It should not be used as the sole method for detecting phishing emails. Always exercise caution with suspicious emails and report them to your IT security team.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new detection patterns
- Improve the UI/UX
- Enhance the analysis algorithm
- Add unit tests

## 📝 License

This project is open source and available for educational use.

## 🔮 Future Enhancements

- [ ] Machine learning model integration
- [ ] Email header analysis
- [ ] Attachment scanning
- [ ] Historical threat database
- [ ] Browser extension
- [ ] API rate limiting
- [ ] User authentication
- [ ] Analysis history

## 📧 Support

For issues or questions, please open an issue on the project repository.

---

Built with ❤️ for cybersecurity education
