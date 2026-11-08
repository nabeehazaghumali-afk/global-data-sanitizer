'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam !== null ? Number(tabParam) : 0;

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [sanitizedResult, setSanitizedResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your Zero-Storage Data Sanitizer AI. Your data is never saved on any cloud server. Upload files, mask PII, and download cleaned outputs locally.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Handle PWA Install Event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    } else {
      alert('To install this app, open your browser menu (3 dots or Share icon) and click "Add to Home Screen" or "Install App".');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        setSanitizedResult('');
      };
      reader.readAsText(file);
    }
  };

  const handleSanitize = () => {
    if (!fileContent.trim()) {
      alert('Please upload a file or paste data in the text box first.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      let masked = fileContent
        .replace(/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g, '[MASKED_EMAIL]')
        .replace(/(\b\d{3}[-.]?\d{2}[-.]?\d{4}\b)/g, '[MASKED_SSN]')
        .replace(/(\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b)/g, '[MASKED_CREDIT_CARD]')
        .replace(/(\b\+?\d{10,12}\b)/g, '[MASKED_PHONE]');

      setSanitizedResult(masked);
      setIsProcessing(false);
    }, 500);
  };

  const downloadCleanedFile = () => {
    if (!sanitizedResult) return;
    const element = document.createElement("a");
    const file = new Blob([sanitizedResult], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `sanitized_${selectedFile ? selectedFile.name : 'output.txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');

    setTimeout(() => {
      let reply = "Your request was processed strictly in local client memory (Zero Cloud Storage).";
      const lower = userMsg.toLowerCase();
      if (lower.includes('download') || lower.includes('file') || lower.includes('save')) {
        reply = "You can download your sanitized file using the green 'Download Cleaned File' button above the output view.";
      } else if (lower.includes('install') || lower.includes('app')) {
        reply = "Click the 'Install App / PWA' button on the top right to save this application directly to your desktop or phone!";
      } else if (lower.includes('kaise') || lower.includes('urdu') || lower.includes('kese')) {
        reply = "Aap file upload karke Sanitize dabayein, phir comparison dekh kar 'Download Cleaned File' button se apni file download kar lein.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 500);
  };

  const modules = [
    { id: 0, title: "1. Overview & Sanitizer", desc: "Local Zero-Storage PII Masking, Before/After View & File Download" },
    { id: 1, title: "2. Multi-Region Masking", desc: "GDPR, HIPAA, and CCPA Compliance Standards" },
    { id: 2, title: "3. Currency Normalization", desc: "Real-Time FX Rates & Base Currency Stream Conversion" },
    { id: 3, title: "4. Compliance Audit", desc: "Security Risk Scoring & Rule Violation Analysis" },
    { id: 4, title: "5. Database Audit Trails", desc: "In-Memory Cryptographic Hash Verification" },
    { id: 5, title: "6. Masking Rules & RegEx", desc: "Custom Regular Expression Definitions" },
    { id: 6, title: "7. API & Webhook Keys", desc: "FastAPI Endpoint Routes & Security Key Mapping" },
    { id: 7, title: "8. Batch Payload Processing", desc: "Bulk CSV & Multi-File Stream Pipeline" },
    { id: 8, title: "9. Export Reports", desc: "Downloadable Compliance Certifications & Audit Logs" },
    { id: 9, title: "10. Security Settings", desc: "Docker Status, App Installation & 10-Day Free Trial" }
  ];

  const currentModule = modules[activeTab] || modules[0];

  return (
    <div className="flex-1 space-y-5">
      {/* Header Bar with Install Button */}
      <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Active Module</span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-mono">Zero Storage Mode</span>
          </div>
          <h2 className="text-xl font-bold text-white">{currentModule.title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{currentModule.desc}</p>
        </div>
        <button
          onClick={handleInstallApp}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-indigo-600/20"
        >
          📲 Install Web App
        </button>
      </div>

      {activeTab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Processing Box */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold text-white">Upload or Paste Data</h3>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Unlimited File Size</span>
              </div>
              
              <div className="mb-3 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-3 text-center bg-slate-950/50 transition">
                <input type="file" id="payload-file" onChange={handleFileUpload} className="hidden" accept=".json,.csv,.txt,.log" />
                <label htmlFor="payload-file" className="cursor-pointer block">
                  <span className="text-xs text-indigo-400 font-medium block">Click to select file (JSON, CSV, TXT, LOG)</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    {selectedFile ? `Selected: ${selectedFile.name}` : 'No server upload - processes locally in browser'}
                  </span>
                </label>
              </div>

              {/* Before vs After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Original (Before):</label>
                  <textarea 
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    placeholder="Paste text or upload file above..."
                    className="w-full h-36 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs font-mono resize-none focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-emerald-400">Sanitized (After):</label>
                    {sanitizedResult && (
                      <button 
                        onClick={downloadCleanedFile}
                        className="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded font-medium transition"
                      >
                        ⬇ Download Cleaned File
                      </button>
                    )}
                  </div>
                  <textarea 
                    readOnly
                    value={sanitizedResult}
                    placeholder="Sanitized secure output will appear here..."
                    className="w-full h-36 bg-slate-950 border border-emerald-500/30 rounded-xl p-3 text-emerald-300 text-xs font-mono resize-none focus:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSanitize}
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-600/20 disabled:opacity-50 text-xs"
            >
              {isProcessing ? 'Processing Local Zero-Storage Masking...' : 'Sanitize & Normalize Payload'}
            </button>
          </div>

          {/* AI Assistant */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between h-[470px]">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <h3 className="text-xs font-semibold text-white">Multilingual AI Assistant</h3>
              </div>
              <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">All Languages</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 font-sans text-xs">
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
                placeholder="Ask about privacy, downloads, or install options..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition">
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab !== 0 && (
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
          <div className="w-14 h-14 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto text-lg font-bold">
            {activeTab + 1}
          </div>
          <h3 className="text-lg font-bold text-white">{currentModule.title}</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {currentModule.desc}. Active in local client-side memory mode.
          </p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="text-slate-400 p-6">Loading module...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
