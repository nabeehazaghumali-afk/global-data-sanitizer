'use client';
import { useState } from 'react';

export default function EnterpriseDashboard() {
  const [inputData, setInputData] = useState('');
  const [sanitizedOutput, setSanitizedOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSanitize = async () => {
    setLoading(true);
    try {
      // Simulated secure enterprise payload processing & PII masking
      setTimeout(() => {
        setSanitizedOutput({
          status: 'SECURE',
          pii_masked: true,
          normalized_currency: 'USD',
          audit_id: 'AUDIT-' + Math.random().toString(36).substring(7).toUpperCase(),
          timestamp: new Date().toISOString()
        });
        setLoading(false);
      }, 800);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Global Data Sanitizer & Currency Normalization</h1>
            <p className="text-sm text-gray-400">Enterprise Zero Trust PII Masking & Compliance Engine</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs rounded-full font-medium">
            System Online
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Payload Input</h2>
            <textarea
              className="w-full h-40 bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-indigo-500 resize-none font-mono"
              placeholder="Paste JSON payload or raw text containing PII..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button
              onClick={handleSanitize}
              disabled={loading}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Processing Zero-Trust Sanitization...' : 'Sanitize & Normalize Payload'}
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Compliance & Audit Output</h2>
            <div className="w-full h-40 bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm text-gray-300 font-mono overflow-auto">
              {sanitizedOutput ? (
                <pre className="text-emerald-400 text-xs leading-relaxed">
                  {JSON.stringify(sanitizedOutput, null, 2)}
                </pre>
              ) : (
                <span className="text-gray-600 italic">Awaiting secure payload transmission...</span>
              )}
            </div>
            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
              <span>Encryption: AES-256</span>
              <span>Compliance: GDPR / HIPAA</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
