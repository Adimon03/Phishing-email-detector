import React, { useState } from 'react';
import EmailAnalyzer from './components/EmailAnalyzer';
import Results from './components/Results';
import Header from './components/Header';

export interface AnalysisResult {
  risk_score: number;
  risk_level: 'low' | 'medium' | 'high';
  analysis: {
    total_urls: number;
    suspicious_urls: Array<{
      url: string;
      issues: string[];
    }>;
    sender_issues: string[];
    suspicious_keywords: string[];
    urgency_indicators: number;
    sensitive_info_requests: number;
  };
  recommendations: string[];
  summary?: string;
}

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmail = async (emailData: {
    content: string;
    sender: string;
    subject: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error analyzing email:', error);
      alert('Failed to analyze email. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
        <div className="text-black text-9xl font-bold transform -rotate-45 select-none">
          Built By Adithya S
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {!result ? (
            <EmailAnalyzer onAnalyze={analyzeEmail} loading={loading} />
          ) : (
            <Results result={result} onReset={resetAnalysis} />
          )}
        </main>
        
        <footer className="bg-gray-800 text-center py-4 mt-12">
          <p className="text-gray-400">
            Built with React + Python Flask | Educational Purpose Only
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Created by Adithya S
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
