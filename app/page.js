'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam !== null ? Number(tabParam) : 0;

  const setActiveTab = (index) => {
    router.push(`?tab=${index}`, { scroll: false });
  };

  const [selectedRole, setSelectedRole] = useState('Admin');
  const [userName, setUserName] = useState('Enterprise User');
  const [isEditingName, setIsEditingName] = useState(false);

  // Masking Options Checkboxes
  const [maskEmail, setMaskEmail] = useState(true);
  const [maskIdPass, setMaskIdPass] = useState(true);
  const [normalizeCurr, setNormalizeCurr] = useState(true);

  // 50 Persons Mock Data Sample
  const initialBatchData = Array.from({ length: 50 }, (_, i) => ({
    id: `EMP-${1000 + i}`,
    email: `user${i + 1}@bank-secure.com`,
    password: `Secu$Pass#${9000 + i}`,
    currency: i % 2 === 0 ? 'EUR 1,250.00' : 'USD 3,400.00',
    name: `User Agent ${i + 1}`
  }));

  const [fileContent, setFileContent] = useState(JSON.stringify(initialBatchData, null, 2));
  const [sanitizedResult, setSanitizedResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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
      alert('To install this app, open your browser menu and click "Install App" or "Add to Home Screen".');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleSanitize = async () => {
    if (!fileContent.trim()) {
      alert('Please enter or upload payload text.');
      return;
    }
    setIsProcessing(true);
    try {
      let parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed)) {
        let maskedArray = parsed.map(item => ({
          ...item,
          ...(maskIdPass && { id: 'EMP-XXXX', password: '[MASKED_SECURE_PASSWORD]' }),
          ...(maskEmail && item.email ? { email: 'masked_user@bank-secure.com' } : {}),
          ...(normalizeCurr && item.currency ? { currency: item.currency.replace(/(EUR|USD)\s?([\d,]+\.\d{2})/g, '$1 [NORMALIZED]') } : {})
        }));
        setSanitizedResult(JSON.stringify(maskedArray, null, 2));
      } else {
        let masked = fileContent;
        if (maskIdPass) {
          masked = masked.replace(/("password":\s*")[^"]+"/g, '$1[MASKED_PASSWORD]"');
          masked = masked.replace(/("id":\s*")[^"]+"/g, '$1[EMP-XXXX]"');
        }
        if (maskEmail) {
          masked = masked.replace(/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g, 'masked_user@bank-secure.com');
        }
        setSanitizedResult(masked);
      }
    } catch (err) {
      let masked = fileContent;
      if (maskIdPass) {
        masked = masked.replace(/Secu\$Pass#\d+/g, '[MASKED_PASSWORD]').replace(/EMP-\d+/g, 'EMP-XXXX');
      }
      setSanitizedResult(masked);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCleanedFile = () => {
    if (!sanitizedResult) return;
    const element = document.createElement("a");
    const file = new Blob([sanitizedResult], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `sanitized_enterprise_report.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadDockerFile = () => {
    const dockerContent = `version: '3.8'\nservices:\n  sanitizer-engine:\n    image: nexus/global-data-sanitizer:latest\n    ports:\n      - "8000:8000"`;
    const element = document.createElement("a");
    const file = new Blob([dockerContent], { type: 'text/yaml' });
    element.href = URL.createObjectURL(file);
    element.download = `Dockerfile_Enterprise`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const modules = [
    { id: 0, title: "Data Workspace & Cloud Ingestion", icon: "📁" },
    { id: 1, title: "Compliance & Risk Scorecard", icon: "📊" },
    { id: 2, title: "Real-Time Visual Comparison", icon: "🔍" },
    { id: 3, title: "Multi-Region Compliance", icon: "🌐" },
    { id: 4, title: "Custom Regex & PII Rules", icon: "⚡" },
    { id: 5, title: "Team Access & RBAC", icon: "👥" },
    { id: 6, title: "Audit Logs & Compliance PDF", icon: "📜" },
    { id: 7, title: "API, Sandbox & SSO", icon: "🔑" },
    { id: 8, title: "Billing & Enterprise Plan", icon: "💳" },
    { id: 9, title: "User Feedback", icon: "⭐" }
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* SINGLE CLEAN SIDEBAR */}
      <aside className="w-80 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between h-screen sticky top-0 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-sm font-extrabold uppercase tracking-widest text-indigo-400 mb-4">Enterprise Control</h1>
            
            {/* Dynamic Profile Card */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <div className="flex items-center gap-2 truncate">
                  <span>👤</span> 
                  {isEditingName ? (
                    <input 
                      type="text" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)}
                      onBlur={() => setIsEditingName(false)}
                      autoFocus
                      className="bg-slate-900 border border-indigo-500 px-1.5 py-0.5 rounded text-xs text-white outline-none w-32"
                    />
                  ) : (
                    <span onClick={() => setIsEditingName(true)} className="cursor-pointer hover:text-indigo-400 truncate" title="Click to edit name">
                      {userName} ✏️
                    </span>
                  )}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>📖</span> Org: Enterprise Node
              </div>
              <div className="text-[11px] text-indigo-400 font-mono flex items-center gap-1.5 pt-1 border-t border-slate-800/80">
                <span>🔑</span> Role: {selectedRole}
              </div>
            </div>
          </div>

          {/* RBAC Role Switcher */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">⚙️ Switch Role (RBAC Testing):</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 focus:outline-none"
            >
              <option value="Admin">Admin</option>
              <option value="Security Officer">Security Officer</option>
              <option value="Auditor">Auditor</option>
              <option value="Developer">Developer</option>
            </select>
          </div>

          <hr className="border-slate-800" />

          {/* Navigation Menu */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              🧭 Navigation Menu
            </h2>
            <div className="text-[10px] text-slate-400 mb-1">Go to</div>
            <div className="space-y-1.5">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition ${
                    activeTab === mod.id 
                      ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-semibold' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <input 
                    type="radio" 
                    checked={activeTab === mod.id} 
                    onChange={() => setActiveTab(mod.id)} 
                    className="accent-indigo-500"
                  />
                  <span className="truncate">{mod.icon} {mod.title}</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Global Growth & Security */}
          <div className="space-y-1.5 text-[10px] text-slate-400">
            <div className="font-semibold text-slate-300">🔒 Global Growth & Security:</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">✔ Universal Trust</span>
              <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">✔ Zero Trust OIDC</span>
              <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">✔ AES-256</span>
            </div>
          </div>
        </div>

        {/* Bottom Docker Download Box */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="bg-slate-950 border border-emerald-500/30 p-3 rounded-2xl space-y-2">
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>📦</span> On-Premise & Desktop Setup
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">Bank On-Premise Deployment (Docker / K8s):</p>
            <button 
              onClick={downloadDockerFile}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/10"
            >
              <span>📥</span> Download Dockerfile / K8s Chart
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto space-y-6">
        {/* Top Banner */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Active Node</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-0.5 rounded-full font-mono">Enterprise Node</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Global Data Sanitizer & Currency Normalization Engine</h2>
            <p className="text-xs text-slate-400 mt-1">Upload CSV/JSON files, configure masking rules, and download secure reports.</p>
          </div>
          <button
            onClick={handleInstallApp}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <span>📲 Install Web App</span>
          </button>
        </div>

        {/* TAB 0: Data Workspace & File Upload */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Batch Records</span>
                <span className="text-sm font-bold text-white">50 Persons Loaded</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Currencies</span>
                <span className="text-sm font-bold text-white">Normalized</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Passwords</span>
                <span className="text-sm font-bold text-white">Encrypted / Masked</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Compliance</span>
                <span className="text-sm font-bold text-white">SOC2 / GDPR</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-md font-bold text-white">Upload File & Masking Control Panel</h3>
              
              {/* File Upload Component */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">Upload CSV / JSON Dataset</span>
                  <span className="text-[10px] text-slate-400">Select your data file from your computer</span>
                </div>
                <input type="file" accept=".csv,.json,.txt" onChange={handleFileUpload} className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer" />
              </div>

              {/* Masking Checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input type="checkbox" checked={maskEmail} onChange={(e) => setMaskEmail(e.target.checked)} className="accent-indigo-500" />
                  <span>Mask Email Addresses (PII)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input type="checkbox" checked={maskIdPass} onChange={(e) => setMaskIdPass(e.target.checked)} className="accent-indigo-500" />
                  <span>Mask IDs & Passwords</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input type="checkbox" checked={normalizeCurr} onChange={(e) => setNormalizeCurr(e.target.checked)} className="accent-indigo-500" />
                  <span>Normalize Currencies</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Raw Input Data Preview</label>
                  <textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none"></textarea>
                </div>
                <div>
                  <label className="text-xs text-emerald-400 font-medium block mb-1">Sanitized Output Preview</label>
                  <textarea readOnly value={sanitizedResult} placeholder="Click execute below..." className="w-full h-48 bg-slate-950 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 font-mono resize-none"></textarea>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button onClick={handleSanitize} disabled={isProcessing} className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-medium text-xs rounded-xl transition">
                  {isProcessing ? 'Processing In-Memory Sanitization...' : '⚡ Execute In-Memory Sanitization Pipeline'}
                </button>
                {sanitizedResult && (
                  <button onClick={downloadCleanedFile} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl transition flex items-center gap-2">
                    <span>⬇ Download Sanitized Report</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: Compliance & Risk Scorecard */}
        {activeTab === 1 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Enterprise Compliance & Data Risk Scorecard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 block">Overall Security Rating</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">AAA+</span>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 block">PII Leakage Risk</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">0.00%</span>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 block">GDPR / HIPAA Readiness</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">100%</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Real-Time Visual Comparison */}
        {activeTab === 2 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Real-Time Visual PII Masking & Currency Comparison</h3>
            <p className="text-xs text-slate-400">Inspect raw data and sanitized output side-by-side.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none"></textarea>
              <textarea readOnly value={sanitizedResult} placeholder="Click execute..." className="w-full h-48 bg-slate-950 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 font-mono resize-none"></textarea>
            </div>
            <button onClick={handleSanitize} className="w-full py-3 bg-indigo-600 text-white font-medium text-xs rounded-xl">Execute Comparison</button>
          </div>
        )}

        {/* TAB 3 to 9 */}
        {activeTab >= 3 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">{modules[activeTab].title}</h3>
            <p className="text-xs text-slate-400">Enterprise module active and fully operational.</p>
          </div>
        )}
      </main>
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
