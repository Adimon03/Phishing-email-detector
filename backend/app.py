from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from urllib.parse import urlparse
import tldextract

app = Flask(__name__)
CORS(app)

# Suspicious keywords commonly found in phishing emails
SUSPICIOUS_KEYWORDS = [
    'urgent', 'verify', 'suspended', 'unusual activity', 'confirm your account',
    'click here', 'act now', 'limited time', 'winner', 'congratulations',
    'reset password', 'update payment', 'suspended account', 'verify identity'
]

# Suspicious TLDs
SUSPICIOUS_TLDS = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top']

def analyze_urls(text):
    """Extract and analyze URLs from email content"""
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    urls = re.findall(url_pattern, text)
    
    suspicious_urls = []
    for url in urls:
        parsed = urlparse(url)
        extracted = tldextract.extract(url)
        
        issues = []
        if any(tld in url.lower() for tld in SUSPICIOUS_TLDS):
            issues.append('Suspicious TLD')
        if parsed.netloc and parsed.netloc.replace('.', '').isdigit():
            issues.append('IP address instead of domain')
        if url.count('.') > 4:
            issues.append('Too many subdomains')
        if len(url) > 100:
            issues.append('Unusually long URL')
            
        if issues:
            suspicious_urls.append({'url': url, 'issues': issues})
    
    return urls, suspicious_urls

def analyze_sender(sender):
    """Analyze sender email address"""
    issues = []
    if not sender:
        return issues
    
    # Check for mismatched display name and email
    if '<' in sender and '>' in sender:
        display_name = sender.split('<')[0].strip()
        email = sender.split('<')[1].split('>')[0].strip()
        
        if display_name and email:
            domain = email.split('@')[-1] if '@' in email else ''
            if domain and domain.lower() not in display_name.lower():
                issues.append('Display name doesn\'t match email domain')
    
    # Check for suspicious patterns
    email_part = sender.split('<')[1].split('>')[0] if '<' in sender else sender
    if any(char in email_part for char in ['..', '--']):
        issues.append('Suspicious characters in email')
    
    return issues

def analyze_content(content):
    """Analyze email content for phishing indicators"""
    content_lower = content.lower()
    found_keywords = [kw for kw in SUSPICIOUS_KEYWORDS if kw in content_lower]
    
    # Check for urgency and threats
    urgency_score = sum(1 for word in ['urgent', 'immediately', 'act now', 'expires'] if word in content_lower)
    
    # Check for requests for sensitive info
    sensitive_requests = sum(1 for word in ['password', 'ssn', 'credit card', 'bank account'] if word in content_lower)
    
    return found_keywords, urgency_score, sensitive_requests

@app.route('/api/analyze', methods=['POST'])
def analyze_email():
    data = request.json
    email_content = data.get('content', '')
    sender = data.get('sender', '')
    subject = data.get('subject', '')
    
    # Perform analysis
    urls, suspicious_urls = analyze_urls(email_content)
    sender_issues = analyze_sender(sender)
    keywords, urgency_score, sensitive_requests = analyze_content(email_content + ' ' + subject)
    
    # Calculate risk score (0-100)
    risk_score = 0
    risk_score += len(suspicious_urls) * 15
    risk_score += len(sender_issues) * 20
    risk_score += len(keywords) * 5
    risk_score += urgency_score * 10
    risk_score += sensitive_requests * 15
    risk_score = min(risk_score, 100)
    
    # Determine risk level
    if risk_score >= 70:
        risk_level = 'high'
    elif risk_score >= 40:
        risk_level = 'medium'
    else:
        risk_level = 'low'
    
    # Generate detailed summary
    summary = generate_summary(
        risk_level, 
        len(suspicious_urls), 
        len(sender_issues), 
        urgency_score, 
        sensitive_requests, 
        len(keywords)
    )
    
    return jsonify({
        'risk_score': risk_score,
        'risk_level': risk_level,
        'analysis': {
            'total_urls': len(urls),
            'suspicious_urls': suspicious_urls,
            'sender_issues': sender_issues,
            'suspicious_keywords': keywords,
            'urgency_indicators': urgency_score,
            'sensitive_info_requests': sensitive_requests
        },
        'recommendations': get_recommendations(risk_level),
        'summary': summary
    })

def get_recommendations(risk_level):
    if risk_level == 'high':
        return [
            'Do NOT click any links in this email',
            'Do NOT provide any personal information',
            'Delete this email immediately',
            'Report to your IT security team'
        ]
    elif risk_level == 'medium':
        return [
            'Verify sender identity through official channels',
            'Hover over links before clicking',
            'Check for spelling and grammar errors',
            'Contact the company directly if unsure'
        ]
    else:
        return [
            'Email appears relatively safe',
            'Still verify sender if requesting sensitive info',
            'Be cautious with attachments'
        ]

def generate_summary(risk_level, suspicious_url_count, sender_issue_count, urgency_count, sensitive_count, keyword_count):
    """Generate a human-readable summary of why the email is suspicious"""
    
    if risk_level == 'high':
        summary = "This email is highly suspicious and shows multiple red flags typical of phishing attacks. "
        
        reasons = []
        if suspicious_url_count > 0:
            reasons.append(f"it contains {suspicious_url_count} suspicious URL(s)")
        if sender_issue_count > 0:
            reasons.append("the sender's email address appears fake or spoofed")
        if urgency_count > 0:
            reasons.append("it uses pressure tactics to make you act quickly")
        if sensitive_count > 0:
            reasons.append("it requests sensitive information")
        if keyword_count > 0:
            reasons.append(f"it uses {keyword_count} suspicious keyword(s)")
        
        if reasons:
            summary += "Specifically, " + ", ".join(reasons) + ". "
        
        summary += "Do not interact with this email in any way."
        
    elif risk_level == 'medium':
        summary = "This email has some concerning characteristics. "
        
        reasons = []
        if suspicious_url_count > 0:
            reasons.append("suspicious links")
        if sender_issue_count > 0:
            reasons.append("sender verification issues")
        if urgency_count > 0:
            reasons.append("urgency tactics")
        if sensitive_count > 0:
            reasons.append("requests for personal information")
        
        if reasons:
            summary += "It contains " + " and ".join(reasons) + ". "
        
        summary += "Verify the sender's identity before taking any action."
        
    else:
        summary = "This email appears relatively safe based on our analysis. "
        summary += "However, always remain cautious with unexpected emails and verify any requests through official channels."
    
    return summary

if __name__ == '__main__':
    app.run(debug=True, port=5000)
