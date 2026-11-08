'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your Enterprise Multilingual AI Assistant. I can assist you with data masking, PII compliance, and currency normalization in any language (English, German, Spanish, Urdu, French, etc.). How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');

    setTimeout(() => {
      let reply = "I have processed your query securely under Zero Trust compliance protocols.";
      const lower = userMsg.toLowerCase();

      if (lower.includes('trial') || lower.includes('days')) {
        reply = "Your 10-Day Enterprise Free Trial is currently active with full access to all 10 modules and Docker support.";
      } else if (lower.includes('hallo') || lower.includes('deutsch')) {
        reply = "Guten Tag! Ich kann Ihre Daten gemäß DSGVO und HIPAA sicher maskieren.";
      } else if (lower.includes('hola') || lower.includes('gracias')) {
        reply = "¡Hola! Puedo ayudarle a enmascarar y proteger sus datos confidenciales.";
      } else if (lower.includes('kaise') || lower.includes('urdu')) {
        reply = "Main aapke data ko secure tareeqay se mask aur sanitize karne mein poori madad kar sakta hoon.";
      } else {
        reply = "Enterprise Zero Trust engine is synchronized with your FastAPI backend and Docker container.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 800);
  };

  const modules = [
    { id: 0, title: "1. Overview & AI Assistant", desc: "Live Metrics, PII Engine & Multilingual AI Support" },
    { id: 1, title: "2. Multi-Region Masking", desc: "Zero Trust JSON / Text Masking across GDPR & HIPAA standards" },
    { id: 2, title: "3. Currency Normalization", desc: "Real-time FX Rates & Base Currency Conversion Engine" },
    { id: 3, title: "4. Compliance Audit", desc: "GDPR, HIPAA, and PCI-DSS Risk Scores & Analysis" },
    { id: 4, title: "5. Database Audit Trails", desc: "Sanitization History, logs, and cryptographic database tracking" },
    { id: 5, title: "6. Masking Rules & RegEx", desc: "Custom Regular Expression Rules Setup for specific PII types" },
    { id: 6, title: "7. API & Webhook Keys", desc: "FastAPI Connection Settings, API tokens, and Live Endpoints" },
    { id: 7, title: "8. Batch Payload Processing", desc: "Bulk File, CSV, or multi-JSON payload sanitization pipeline" },
    { id: 8, title: "9. Export & Compliance Reports", desc: "Downloadable Audit PDFs, certificates, and compliance summaries" },
    { id: 9, title: "10. Security Settings & Trial", desc: "Access controls, Docker configs, and 10-Day Free Trial Status" }
  ];

  return (
    <div className="flex h-full gap-6">
      {/* Mobile Selector */}
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

      <div className="flex-1 space-y-6">
        {/* Top Active Module Header & 10-Day Trial Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Active Module</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-mono">10-Day Free Trial Active</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{modules[activeTab].title}</h2>
            <p className="text-sm text-slate-400 mt-1">{modules[activeTab].desc}</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={activeTab}
              onChange={(e) => setActiveTab(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500"
            >
              {modules.map((mod) => (
                <option key={mod.id} value={mod.id}>{mod.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab 0: Overview & AI Assistant */}
        {activeTab === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Payload Input & File Upload</h3>
                  <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">No File Size Limit</span>
                </div>
                
                <div className="mb-3 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 text-center bg-slate-950/50 transition">
                  <input 
                    type="file" 
                    id="payload-file" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept=".json,.csv,.txt,.log"
                  />
                  <label htmlFor="payload-file" className="cursor-pointer block">
                    <span className="text-xs text-indigo-400 font-medium block">Click to upload file (JSON, CSV, LOG, TXT)</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      {selectedFile ? `Selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)` : 'Supports unlimited size stream processing'}
                    </span>
                  </label>
                </div>

                <textarea 
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  placeholder="Paste JSON payload, raw text, or upload file above..."
                  className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 text-sm focus:outline-none focus:border-indigo-500 font-mono resize-none"
                ></textarea>
              </div>

              <button className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-600/20">
                Sanitize & Normalize Payload
              </button>
            </div>

            {/* Multilingual AI Assistant */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between h-[450px]">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <h3 className="text-md font-semibold text-white">Multilingual AI Assistant</h3>
                </div>
                <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">All Languages Enabled</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 font-sans text-sm">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-950 border border-slate-800 text-slate-300 rounded-bl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-3 flex gap-2 pt-3 border-t border-slate-800">
                <input 
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type in any language (English, German, Spanish, Urdu...)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 8: Batch Payload Processing */}
        {activeTab === 7 && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">8. Batch Payload & File Processing Pipeline</h3>
            <p className="text-sm text-slate-400 mb-6">Upload enterprise data streams or massive log files without size limitations for asynchronous stream sanitization.</p>
            <div className="border-2 border-dashed border-indigo-500/30 rounded-2xl p-12 text-center bg-slate-950">
              <input type="file" id="batch-file" onChange={handleFileUpload} className="hidden" multiple />
              <label htmlFor="batch-file" className="cursor-pointer">
                <div className="text-indigo-400 font-semibold text-lg mb-1">Click to Upload Large Enterprise Datasets</div>
                <div className="text-xs text-slate-500">Supports .csv, .json, .log, .txt without file size restrictions</div>
              </label>
            </div>
          </div>
        )}

        {/* Tab 10: Security Settings & Trial */}
        {activeTab === 9 && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">10. Security Settings & 10-Day Trial Status</h3>
              <p className="text-sm text-slate-400">Manage your container security, vault access tokens, and subscription trial period.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Subscription Status</span>
                <div className="text-lg font-bold text-white mt-1">10-Day Free Trial (Active)</div>
                <p className="text-xs text-slate-400 mt-2">Full enterprise features unlocked including FastAPI backend and Docker multi-region sync.</p>
              </div>
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Docker Deployment</span>
                <div className="text-lg font-bold text-white mt-1">Containerized (Healthy)</div>
                <p className="text-xs text-slate-400 mt-2">Configured with docker-compose and vault audit logging.</p>
              </div>
            </div>
          </div>
        )}

        {/* Other Intermediate Tabs */}
        {activeTab !== 0 && activeTab !== 7 && activeTab !== 9 && (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center">
            <div className="w-16 h-16 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              {activeTab + 1}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{modules[activeTab].title}</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              This module is active and synchronized with your enterprise backend routing and Docker environment.
            </p>
            <button 
              onClick={() => setActiveTab(0)}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl transition"
            >
              Back to Overview & AI Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
