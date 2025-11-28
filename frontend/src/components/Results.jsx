import React from 'react';

const Results = ({ result, onReset }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'high':
        return '🚨';
      case 'medium':
        return '⚠️';
      case 'low':
        return '✅';
      default:
        return '❓';
    }
  };

  const generateSummary = () => {
    const issues = [];
    
    // Check for suspicious URLs
    if (result.analysis.suspicious_urls.length > 0) {
      issues.push(`Contains ${result.analysis.suspicious_urls.length} suspicious URL${result.analysis.suspicious_urls.length > 1 ? 's' : ''} with red flags like wrong domains, suspicious TLDs, or IP addresses`);
    }
    
    // Check for sender issues
    if (result.analysis.sender_issues.length > 0) {
      issues.push(`Sender email address has ${result.analysis.sender_issues.length} issue${result.analysis.sender_issues.length > 1 ? 's' : ''} indicating potential spoofing or impersonation`);
    }
    
    // Check for urgency tactics
    if (result.analysis.urgency_indicators > 0) {
      issues.push(`Uses ${result.analysis.urgency_indicators} urgency tactic${result.analysis.urgency_indicators > 1 ? 's' : ''} to pressure you into acting quickly without thinking`);
    }
    
    // Check for sensitive info requests
    if (result.analysis.sensitive_info_requests > 0) {
      issues.push(`Requests ${result.analysis.sensitive_info_requests} type${result.analysis.sensitive_info_requests > 1 ? 's' : ''} of sensitive information that legitimate companies never ask for via email`);
    }
    
    // Check for suspicious keywords
    if (result.analysis.suspicious_keywords.length > 0) {
      issues.push(`Contains ${result.analysis.suspicious_keywords.length} suspicious keyword${result.analysis.suspicious_keywords.length > 1 ? 's' : ''} commonly used in phishing attempts`);
    }
    
    return issues;
  };

  const getDetailedExplanation = () => {
    // Use backend summary if available
    if (result.summary) {
      return result.summary;
    }
    
    // Fallback to frontend-generated explanation
    if (result.risk_level === 'high') {
      return "This email is highly suspicious and shows multiple characteristics of a phishing attack. Cybercriminals use these tactics to steal your personal information, passwords, or money. The combination of suspicious URLs, sender issues, urgency tactics, and requests for sensitive information are classic signs of a scam.";
    } else if (result.risk_level === 'medium') {
      return "This email has some concerning elements that warrant caution. While it may not be an obvious phishing attempt, the presence of suspicious characteristics suggests you should verify the sender's identity through official channels before taking any action or providing information.";
    } else {
      return "This email appears relatively safe based on our analysis. However, always remain vigilant and verify unexpected requests, even from seemingly legitimate sources. If something feels off, trust your instincts and verify through official channels.";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-cyber-blue">Analysis Results</h2>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          ← Analyze Another Email
        </button>
      </div>

      {/* Risk Score Card */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700 mb-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-900 border-4 border-gray-700 mb-4">
            <div className="text-center">
              <div className="text-5xl mb-2">{getRiskIcon(result.risk_level)}</div>
              <div className={`text-3xl font-bold ${getRiskColor(result.risk_level)}`}>
                {result.risk_score}%
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">
            <span className={getRiskColor(result.risk_level)}>
              {result.risk_level.toUpperCase()} RISK
            </span>
          </h3>
          <p className="text-gray-400">
            {result.risk_level === 'high' && 'This email shows strong indicators of phishing. Do not interact with it.'}
            {result.risk_level === 'medium' && 'This email has some suspicious characteristics. Proceed with caution.'}
            {result.risk_level === 'low' && 'This email appears relatively safe, but always stay vigilant.'}
          </p>
        </div>
      </div>

      {/* Analysis Summary Section */}
      <div className={`bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-xl p-6 border-2 mb-6 ${
        result.risk_level === 'low' ? 'border-green-500' : 'border-cyber-blue'
      }`}>
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0">{result.risk_level === 'low' ? '✅' : '🔍'}</div>
          <div className="flex-1">
            <h3 className={`text-2xl font-bold mb-3 ${
              result.risk_level === 'low' ? 'text-green-400' : 'text-cyber-blue'
            }`}>
              {result.risk_level === 'low' ? 'Why This Email is Legitimate' : 'Why This Email is Suspicious'}
            </h3>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              {getDetailedExplanation()}
            </p>

            {generateSummary().length > 0 && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-cyber-green mb-2">
                  🚩 Red Flags Detected:
                </h4>
                <ul className="space-y-2">
                  {generateSummary().map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                      <span className="text-red-400 font-bold flex-shrink-0">•</span>
                      <span className="text-gray-200 text-sm leading-relaxed">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {generateSummary().length === 0 && result.risk_level === 'low' && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-green-400 mb-2">
                  ✅ Legitimate Email Indicators:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-sm leading-relaxed">Official sender domain from a legitimate company</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-sm leading-relaxed">No requests for sensitive information like passwords or credit card details</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-sm leading-relaxed">Professional formatting and content with no urgency tactics or threats</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-200 text-sm leading-relaxed">All links point to official company websites with proper HTTPS security</span>
                  </li>
                </ul>
              </div>
            )}

            {generateSummary().length === 0 && result.risk_level !== 'low' && (
              <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  ✓ No major red flags detected in this email. However, always verify unexpected requests through official channels.
                </p>
              </div>
            )}

            <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <span className="font-semibold">💡 Remember:</span> Legitimate companies never ask for passwords, credit card details, or Social Security numbers via email. When in doubt, contact the company directly using official contact information from their website.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* URL Analysis */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-cyber-blue mb-4 flex items-center">
            🔗 URL Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded">
              <span className="text-gray-300">Total URLs Found</span>
              <span className="font-bold text-cyber-green">{result.analysis.total_urls}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded">
              <span className="text-gray-300">Suspicious URLs</span>
              <span className="font-bold text-red-500">{result.analysis.suspicious_urls.length}</span>
            </div>
          </div>

          {result.analysis.suspicious_urls.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Suspicious URLs:</h4>
              {result.analysis.suspicious_urls.map((urlData, idx) => (
                <div key={idx} className="mb-3 p-3 bg-red-900/20 border border-red-500/30 rounded">
                  <p className="text-sm text-red-400 break-all mb-2">{urlData.url}</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {urlData.issues.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sender Analysis */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-cyber-blue mb-4 flex items-center">
            📧 Sender Analysis
          </h3>
          {result.analysis.sender_issues.length > 0 ? (
            <div className="space-y-2">
              {result.analysis.sender_issues.map((issue, idx) => (
                <div key={idx} className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                  <p className="text-sm text-yellow-400">⚠️ {issue}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
              <p className="text-sm text-green-400">✓ No sender issues detected</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Content Analysis */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-cyber-blue mb-4 flex items-center">
            📝 Content Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded">
              <span className="text-gray-300">Urgency Indicators</span>
              <span className={`font-bold ${result.analysis.urgency_indicators > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {result.analysis.urgency_indicators}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded">
              <span className="text-gray-300">Sensitive Info Requests</span>
              <span className={`font-bold ${result.analysis.sensitive_info_requests > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {result.analysis.sensitive_info_requests}
              </span>
            </div>
          </div>

          {result.analysis.suspicious_keywords.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Suspicious Keywords Found:</h4>
              <div className="flex flex-wrap gap-2">
                {result.analysis.suspicious_keywords.map((keyword, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-900/30 text-red-400 text-xs rounded-full border border-red-500/30">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-cyber-blue mb-4 flex items-center">
            💡 Recommendations
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start p-3 bg-gray-900 rounded">
                <span className="text-cyber-green mr-2 flex-shrink-0">•</span>
                <span className="text-sm text-gray-300">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Warning Banner */}
      {result.risk_level === 'high' && (
        <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-6">
          <div className="flex items-start">
            <span className="text-3xl mr-4">🚨</span>
            <div>
              <h4 className="text-xl font-bold text-red-500 mb-2">HIGH RISK DETECTED</h4>
              <p className="text-gray-300">
                This email exhibits multiple characteristics of a phishing attempt. Do not click any links, download attachments, or provide any personal information. Report this email to your IT security team immediately.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
