import React from 'react';

const DemoGuide = () => {
  return (
    <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-inner max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-700 px-6 py-3 border-b border-slate-600 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          🚀 Demo Credentials (For Evaluators)
        </h3>
      </div>

      {/* Credentials Grid */}
      <div className="p-6 grid gap-6 md:grid-cols-2">
        
        {/* 1. Company User */}
        <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏢</span>
            <h4 className="font-bold text-gray-800">Company Login</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span className="text-xs text-gray-500 uppercase font-semibold">Email/ID</span>
              <code className="text-sm font-bold text-gray-800 select-all">loyalbooks@123</code>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span className="text-xs text-gray-500 uppercase font-semibold">Password</span>
              <code className="text-sm font-bold text-gray-800 select-all">loyalbooks@123</code>
            </div>
          </div>
        </div>

        {/* 2. Admin User */}
        <div className="bg-white p-4 rounded-lg border-l-4 border-emerald-500 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🛡️</span>
            <h4 className="font-bold text-gray-800">Admin Login</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span className="text-xs text-gray-500 uppercase font-semibold">Username</span>
              <code className="text-sm font-bold text-gray-800 select-all">Akash@123</code>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span className="text-xs text-gray-500 uppercase font-semibold">Password</span>
              <code className="text-sm font-bold text-gray-800 select-all">Akash@123</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DemoGuide;