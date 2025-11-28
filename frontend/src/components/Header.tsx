import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-cyber-blue shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold cyber-gradient bg-clip-text text-transparent">
                Phishing Email Detector
              </h1>
              <p className="text-sm text-gray-400">AI-Powered Email Security Analysis</p>
              <p className="text-xs text-gray-500 mt-0.5">Built by Adithya S</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Status</p>
              <p className="text-sm text-cyber-green font-semibold">● Online</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
