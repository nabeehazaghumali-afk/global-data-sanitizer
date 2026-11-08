'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your Enterprise Multilingual AI Assistant. Aap mujhse kisi bhi language (English, Urdu, etc.) mein data masking ya compliance ke baray mein pooch sakte hain.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');

    // Simulate multilingual AI response
    setTimeout(() => {
      let reply = "I have processed your query securely under Zero Trust protocols.";
      if (userMsg.toLowerCase().includes('urdu') || userMsg.includes('kese') || userMsg.includes('kya')) {
        reply = "Main aapke data ko secure tareeqay se mask aur sanitize karne mein poori madad kar sakta hoon. Koi payload paste karein!";
      } else if (userMsg.toLowerCase().includes('pii')) {
        reply = "PII masking ensures credit cards, emails, and phone numbers are securely replaced with encrypted tokens.";
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
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
    { id: 9, title: "10. Security Settings", desc: "Access controls, vault configurations, and encryption logs" }
  ];

  return (
    <div className="flex h-full gap-6">
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
        {/* Top Header & Tab Switcher Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Active Module</span>
            <h2 className="text-2xl font-bold text-white mt-1">{modules[activeTab].title}</h2>
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

        {/* Tab 0: Overview & AI Assistant Chat */}
        {activeTab === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Box: Payload Input */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Payload Input & Sanitizer</h3>
                <textarea 
                  placeholder="Paste JSON payload or raw text containing PII..."
                  className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 text-sm focus:outline-none focus:border-indigo-500 font-mono resize-none"
                ></textarea>
              </div>
              <button className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-600/20">
                Sanitize & Normalize Payload
              </button>
            </div>

            {/* Right Box: Multilingual AI Assistant Chat Box */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between h-[420px]">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <h3 className="text-md font-semibold text-white">Multilingual AI Assistant</h3>
                </div>
                <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">Urdu / English Enabled</span>
              </div>

              {/* Chat Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 font-sans text-sm">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-950 border border-slate-800 text-slate-300 rounded-bl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="mt-3 flex gap-2 pt-3 border-t border-slate-800">
                <input 
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type in English, Urdu, etc..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Other Tabs placeholders */}
        {activeTab > 0 && (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center">
            <div className="w-16 h-16 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              {activeTab + 1}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{modules[activeTab].title}</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              This module is active and synchronized with your enterprise backend routing.
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
