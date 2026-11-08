'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const modules = [
    { id: 0, title: "1. Overview Engine", desc: "Live Metrics & PII Masking Engine Overview" },
    { id: 1, title: "2. Multi-Region Masking", desc: "Zero Trust JSON / Text Masking across GDPR & HIPAA standards" },
    { id: 2, title: "3. Currency Normalization", desc: "Real-time FX Rates & Base Currency Conversion Engine" },
    { id: 3, title: "4. Compliance Audit", desc: "GDPR, HIPAA, and PCI-DSS Risk Scores & Analysis" },
    { id: 4, title: "5. Database Audit Trails", desc: "Sanitization History, logs, and cryptographic database tracking" },
    { id: 5, title: "6. Masking Rules & RegEx", desc: "Custom Regular Expression Rules Setup for specific PII types" },
    { id: 6, title: "7. API & Webhook Keys", desc: "FastAPI Connection Settings, API tokens, and Live Endpoints" },
    { id: 7, title: "8. Batch Payload Processing", desc: "Bulk File, CSV, or multi-JSON payload sanitization pipeline" },
    { id: 8, title: "9. Export & Compliance Reports", desc: "Downloadable Audit PDFs, certificates, and compliance summaries" },
    { id: 9, title: "10. Security Settings", desc: "Access controls, vault configurations, and encryption logs" }
  ];

  return (
    <div className="flex h-full gap-6">
      {/* Mobile/Responsive Sidebar Links (Agar screen choti ho) */}
      <div className="w-full md:hidden mb-4">
        <select 
          value={activeTab} 
          onChange={(e) => setActiveTab(Number(e.target.value))}
          className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-slate-200"
        >
          {modules.map((m) => (
            <option key={m.id} value={m.id}>{m.title}</option>
          ))}
        </select>
      </div>

      {/* Main Module Content Area */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Active Module</span>
            <h2 className="text-2xl font-bold text-white mt-1">{modules[activeTab].title}</h2>
            <p className="text-sm text-slate-400 mt-1">{modules[activeTab].desc}</p>
          </div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-mono">
            Module {activeTab + 1} of 10
          </span>
        </div>

        {/* Dynamic Interactive Panel based on Active Tab */}
        {activeTab === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Payload Input</h3>
              <textarea 
                placeholder="Paste JSON payload or raw text containing PII..."
                className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 text-sm focus:outline-none focus:border-indigo-500 font-mono resize-none"
              ></textarea>
              <button className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-600/20">
                Sanitize & Normalize Payload
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Compliance & Audit Output</h3>
                <div className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-500 text-sm font-mono flex items-center justify-center">
                  Awaiting secure payload transmission...
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800/80 font-mono">
                <span>Encryption: AES-256</span>
                <span>Compliance: GDPR / HIPAA</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Multi-Region Masking Configuration</h3>
            <p className="text-sm text-slate-400 mb-6">Configure region-specific rules for PII redaction (EU-GDPR, US-HIPAA, APAC-PDPA).</p>
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-slate-200">EU GDPR Compliance Profile</h4>
                  <p className="text-xs text-slate-400">Strict masking for names, emails, and IP addresses.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-slate-200">US HIPAA Healthcare Profile</h4>
                  <p className="text-xs text-slate-400">Advanced medical record and SSN tokenization.</p>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-indigo-600" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Global Currency Normalization Engine</h3>
            <p className="text-sm text-slate-400 mb-6">Convert multi-currency financial transactions into standard base currencies.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400">Base Currency</span>
                <div className="text-lg font-bold text-indigo-400 mt-1">USD ($)</div>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400">FX Feed Provider</span>
                <div className="text-lg font-bold text-emerald-400 mt-1">Live Exchange API</div>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400">Conversion Status</span>
                <div className="text-lg font-bold text-white mt-1">Synchronized</div>
              </div>
            </div>
          </div>
        )}

        {activeTab > 2 && (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center">
            <div className="w-16 h-16 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              {activeTab + 1}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{modules[activeTab].title} Dashboard</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              This module is configured and ready to connect with your FastAPI backend engine endpoints.
            </p>
            <button 
              onClick={() => setActiveTab(0)}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl transition"
            >
              Back to Overview Engine
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
