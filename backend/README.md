# Phishing Email Detector - Backend

Python Flask API for analyzing emails for phishing indicators.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python app.py
```

Server will run on http://localhost:5000

## API Endpoints

### POST /api/analyze
Analyze email content for phishing indicators.

**Request Body:**
```json
{
  "content": "Email body text",
  "sender": "sender@example.com",
  "subject": "Email subject"
}
```

**Response:**
```json
{
  "risk_score": 75,
  "risk_level": "high",
  "analysis": {
    "total_urls": 3,
    "suspicious_urls": [...],
    "sender_issues": [...],
    "suspicious_keywords": [...],
    "urgency_indicators": 2,
    "sensitive_info_requests": 1
  },
  "recommendations": [...]
}
```
