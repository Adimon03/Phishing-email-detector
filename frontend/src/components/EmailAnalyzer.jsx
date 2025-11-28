import React, { useState, useEffect, useRef } from 'react';
import { sampleEmails, getSampleById } from '../data/sampleEmails';

const EmailAnalyzer = ({ onAnalyze, loading }) => {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [showSampleMenu, setShowSampleMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSampleMenu(false);
      }
    };

    if (showSampleMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSampleMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sender || !subject || !content) {
      alert('Please fill in all fields');
      return;
    }
    onAnalyze({ sender, subject, content });
  };

  const loadSample = (sampleId) => {
    const sample = getSampleById(sampleId);
    if (sample) {
      setSender(sample.sender);
      setSubject(sample.subject);
      setContent(sample.content);
      setShowSampleMenu(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-cyber-blue">Analyze Email</h2>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowSampleMenu(!showSampleMenu)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              📧 Load Sample Email
              <span className="text-xs">{showSampleMenu ? '▲' : '▼'}</span>
            </button>
            
            {showSampleMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-600 rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs text-gray-400 px-3 py-2 font-semibold uppercase tracking-wide">
                    Select a Sample Email:
                  </div>
                  {sampleEmails.map((sample) => {
                    const getRiskColor = () => {
                      switch (sample.expectedRisk) {
                        case 'high':
                          return 'border-l-4 border-red-500 bg-red-900/10';
                        case 'medium':
                          return 'border-l-4 border-yellow-500 bg-yellow-900/10';
                        case 'low':
                          return 'border-l-4 border-green-500 bg-green-900/10';
                        default:
                          return 'border-l-4 border-gray-500';
                      }
                    };

                    const getRiskBadge = () => {
                      switch (sample.expectedRisk) {
                        case 'high':
                          return <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full">HIGH RISK</span>;
                        case 'medium':
                          return <span className="text-xs px-2 py-0.5 bg-yellow-500 text-black rounded-full">MEDIUM</span>;
                        case 'low':
                          return <span className="text-xs px-2 py-0.5 bg-green-500 text-white rounded-full">SAFE</span>;
                        default:
                          return null;
                      }
                    };

                    return (
                      <button
                        key={sample.id}
                        onClick={() => loadSample(sample.id)}
                        className={`w-full text-left px-3 py-3 hover:bg-gray-700 rounded transition-colors border-b border-gray-800 last:border-b-0 ${getRiskColor()}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-sm text-cyber-blue">
                            {sample.name}
                          </div>
                          {getRiskBadge()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {sample.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sender Email Address
            </label>
            <input
              type="email"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent outline-none transition-all"
              placeholder="sender@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent outline-none transition-all"
              placeholder="Enter email subject"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent outline-none transition-all resize-none"
              placeholder="Paste the email content here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue text-white font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              '🔍 Analyze Email'
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">
            <span className="text-cyber-blue font-semibold">💡 Tip:</span> This tool analyzes emails for common phishing indicators including suspicious URLs, sender authenticity, urgency tactics, and requests for sensitive information.
          </p>
          <p className="text-xs text-gray-500 mb-2">
            Try our {sampleEmails.length} sample emails: 8 phishing examples (PayPal scams, prize scams, tech support fraud, banking phishing, IRS scams, etc.) and 2 safe emails to see the difference!
          </p>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded">🔴 High Risk</span>
            <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded">🟡 Medium Risk</span>
            <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded">🟢 Safe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAnalyzer;
