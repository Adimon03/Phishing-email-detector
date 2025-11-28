# 🛡️ Phishing Email Detector - Project Overview

## 📋 Project Summary

A full-stack web application that uses AI-powered analysis to detect phishing attempts in emails. Built with React (TypeScript) frontend and Python Flask backend.

## 🎯 Purpose

Educational tool to demonstrate:
- Phishing detection techniques
- Full-stack web development
- REST API design
- Modern UI/UX with Tailwind CSS
- Cybersecurity awareness

## 🏗️ Technical Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS (cybersecurity theme)
- **Components**: 
  - Header (branding)
  - EmailAnalyzer (input form)
  - Results (analysis display)
- **Features**: 
  - Sample email loader
  - Real-time analysis
  - Responsive design

### Backend
- **Framework**: Flask (Python)
- **Libraries**: 
  - flask-cors (CORS handling)
  - tldextract (domain analysis)
- **Analysis Engine**:
  - URL pattern matching
  - Sender validation
  - Content analysis
  - Risk scoring algorithm

## 🔍 Detection Capabilities

### 1. URL Analysis
- Suspicious TLDs (.tk, .ml, .ga, etc.)
- IP addresses instead of domains
- Excessive subdomains
- Unusually long URLs
- URL shorteners

### 2. Sender Analysis
- Display name vs email mismatch
- Suspicious character patterns
- Domain validation

### 3. Content Analysis
- 14+ suspicious keywords
- Urgency indicators
- Sensitive information requests
- Threat language

### 4. Risk Scoring
- **Algorithm**: Weighted scoring system
  - Suspicious URLs: 15 points each
  - Sender issues: 20 points each
  - Keywords: 5 points each
  - Urgency: 10 points each
  - Sensitive requests: 15 points each
- **Levels**:
  - Low: 0-39 (Green)
  - Medium: 40-69 (Yellow)
  - High: 70-100 (Red)

## 📁 File Structure

```
phishing-detector/
├── backend/
│   ├── app.py                 # Flask API (150 lines)
│   ├── requirements.txt       # Python dependencies
│   └── README.md             # Backend docs
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx           # App header (40 lines)
│   │   │   ├── EmailAnalyzer.tsx    # Input form (120 lines)
│   │   │   └── Results.tsx          # Results display (200 lines)
│   │   ├── App.tsx                  # Main component (80 lines)
│   │   └── index.css                # Tailwind config (30 lines)
│   ├── tailwind.config.js           # Theme config
│   └── package.json                 # Dependencies
│
├── README.md                  # Main documentation
├── QUICKSTART.md             # 5-minute setup
├── SETUP_INSTRUCTIONS.md     # Detailed setup
├── PROJECT_OVERVIEW.md       # This file
├── setup-frontend.bat        # Windows setup script
└── setup-frontend.sh         # Unix setup script
```

## 🎨 UI Design

### Color Scheme (Cybersecurity Theme)
- **Primary**: Cyber Blue (#00d4ff)
- **Secondary**: Cyber Purple (#8b5cf6)
- **Accent**: Cyber Green (#00ff88)
- **Alert**: Cyber Red (#ff0066)
- **Background**: Dark Gray (#111827)

### Components
1. **Header**: Gradient logo, status indicator
2. **Analyzer**: Clean form with sample loader
3. **Results**: Risk score circle, detailed breakdown
4. **Footer**: Credits and disclaimer

## 🔄 Data Flow

```
User Input → Frontend Form → POST /api/analyze → Backend Analysis
                                                        ↓
                                                  Risk Calculation
                                                        ↓
User Display ← Frontend Results ← JSON Response ← Recommendations
```

## 📊 API Specification

### POST /api/analyze

**Request:**
```json
{
  "sender": "string",
  "subject": "string",
  "content": "string"
}
```

**Response:**
```json
{
  "risk_score": 85,
  "risk_level": "high",
  "analysis": {
    "total_urls": 1,
    "suspicious_urls": [{
      "url": "http://example.com",
      "issues": ["Suspicious TLD"]
    }],
    "sender_issues": ["Display name mismatch"],
    "suspicious_keywords": ["urgent", "verify"],
    "urgency_indicators": 3,
    "sensitive_info_requests": 2
  },
  "recommendations": ["Do NOT click links", "..."]
}
```

## 🚀 Deployment Options

### Local Development
- Backend: `python app.py` (port 5000)
- Frontend: `npm start` (port 3000)

### Production Considerations
- Use production WSGI server (Gunicorn)
- Enable HTTPS
- Add rate limiting
- Implement authentication
- Use environment variables
- Add logging and monitoring

## 🧪 Testing Scenarios

### High Risk Email (Sample Included)
- Fake PayPal sender
- Suspicious domain
- Multiple urgency indicators
- Requests sensitive info
- Expected Score: 70-100

### Medium Risk Email
- Legitimate-looking sender
- One suspicious link
- Some urgency language
- Expected Score: 40-69

### Low Risk Email
- Known sender
- No suspicious URLs
- Normal content
- Expected Score: 0-39

## 📈 Future Enhancements

### Phase 2
- [ ] Machine learning model (scikit-learn)
- [ ] Email header analysis
- [ ] Attachment scanning
- [ ] Database for threat intelligence

### Phase 3
- [ ] User authentication
- [ ] Analysis history
- [ ] Export reports (PDF)
- [ ] Browser extension

### Phase 4
- [ ] Real-time email monitoring
- [ ] Team collaboration features
- [ ] Custom rule builder
- [ ] API for integration

## 🎓 Learning Outcomes

This project demonstrates:
1. **Full-Stack Development**: React + Flask integration
2. **REST API Design**: Clean endpoint structure
3. **TypeScript**: Type-safe frontend code
4. **Python**: Backend logic and analysis
5. **Security Concepts**: Phishing detection techniques
6. **UI/UX**: Modern, responsive design
7. **DevOps**: Setup scripts and documentation

## ⚠️ Limitations

- Pattern-based detection (not ML)
- No email header analysis
- No attachment scanning
- No real-time updates
- Single-user only
- No persistent storage

## 📚 Resources

- [OWASP Phishing Guide](https://owasp.org/)
- [Anti-Phishing Working Group](https://apwg.org/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app/)

## 🤝 Contributing

To extend this project:
1. Fork the repository
2. Add features in feature branches
3. Write tests for new functionality
4. Update documentation
5. Submit pull request

## 📄 License

Educational use only. Not for commercial deployment without proper security hardening.

---

**Status**: ✅ Complete and Ready to Run
**Setup Time**: ~5 minutes
**Skill Level**: Intermediate
**Best For**: Learning full-stack development and cybersecurity concepts
