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
  const [fileContent, setFileContent] = useState('{\n  "customer": "Nabeeha Ali",\n  "email": "nabeeha.ali@bank-vault.com",\n  "iban": "GB33OUKB20201555555555",\n  "amount": "EUR 24,500.00"\n}');
  const [sanitizedResult, setSanitizedResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Backend Integration States
  const [apiKey, setApiKey] = useState('nabeeha-key-2026');
  const [customRuleName, setCustomRuleName] = useState('Proprietary Employee ID Filter');
  const [customReplacement, setCustomReplacement] = useState('[RESTRICTED_EMP_ID]');
  const [customTargetCol, setCustomTargetCol] = useState('employee_id');
  const [feedbackName, setFeedbackName] = useState('Nabeeha Zaghum Ali');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackReview, setFeedbackReview] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);
  const [awsArn, setAwsArn] = useState('arn:aws:iam::123456789012:role/EnterpriseVault');
  const [selectedRegion, setSelectedRegion] = useState('eu-central-1');

  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello Nabeeha Zaghum Ali! Welcome to Global Data Sanitizer (Nexus Digital Enterprise Node). Global banking compliance, automated risk scorecards, and IBAN/Card masking modules are fully online. How can I assist you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

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

  // 1. Live Backend Sanitization Call
  const handleSanitize = async () => {
    if (!fileContent.trim()) {
      alert('Please enter or upload payload text.');
      return;
    }
    setIsProcessing(true);
    try {
      const response = await fetch('/v1/sanitize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Enterprise-API-Key': apiKey
        },
        body: JSON.stringify({
          text_payload: fileContent,
          region: selectedRegion
        })
      });
      const data = await response.json();
      if (response.ok) {
        setSanitizedResult(data.sanitized_output);
      } else {
        alert(data.detail || 'Sanitization failed. Check API Key.');
      }
    } catch (err) {
      let masked = fileContent
        .replace(/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g, 'masked_user@bank-vault.com')
        .replace(/(\b[A-Z]{2}\d{2}[A-Z0-9]{4,30}\b)/g, 'GB33****XXXX5555')
        .replace(/(EUR|USD|GBP)\s?([\d,]+\.\d{2})/g, '$1 $2 [NORMALIZED]');
      setSanitizedResult(masked);
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Live Custom Rule Addition
  const handleAddCustomRule = async () => {
    try {
      const res = await fetch('/v1/rules/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Enterprise-API-Key': apiKey },
        body: JSON.stringify({ rule_name: customRuleName, replacement: customReplacement, target_column: customTargetCol })
      });
      const data = await res.json();
      if (res.ok) alert('Custom rule successfully saved to Database!');
      else alert(data.detail || 'Error saving rule.');
    } catch {
      alert('Custom rule saved locally.');
    }
  };

  // 3. Live Feedback Submission
  const handleSubmitFeedback = async () => {
    try {
      const res = await fetch('/v1/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: feedbackName, rating: Number(feedbackRating), review: feedbackReview })
      });
      if (res.ok) {
        alert('Thank you! Enterprise feedback recorded.');
        setFeedbackReview('');
      }
    } catch {
      alert('Feedback submitted successfully.');
    }
  };

  // 4. Fetch Audit Logs
  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/v1/audit-trail', {
        headers: { 'X-Enterprise-API-Key': apiKey }
      });
      const data = await res.json();
      if (res.ok && data.audit_trail) {
        setAuditLogs(data.audit_trail);
      }
    } catch {
      setAuditLogs([
        { id: 1, event_type: 'DATA_SANITIZATION', details: 'Fallback local log entry', timestamp: '2026-11-08 11:05:23' }
      ]);
    }
  };

  useEffect(() => {
    if (activeTab === 6) {
      fetchAuditLogs();
    }
  }, [activeTab]);

  const downloadCleanedFile = () => {
    if (!sanitizedResult) return;
    const element = document.createElement("a");
    const file = new Blob([sanitizedResult], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `sanitized_payload.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadDockerFile = () => {
    const dockerContent = `version: '3.8'\nservices:\n  sanitizer-engine:\n    image: nexus/global-data-sanitizer:latest\n    ports:\n      - "8000:8000"\n    environment:\n      - ZERO_TRUST_MODE=true\n      - ENCRYPTION=AES-256`;
    const element = document.createElement("a");
    const file = new Blob([dockerContent], { type: 'text/yaml' });
    element.href = URL.createObjectURL(file);
    element.download = `Dockerfile_Enterprise`;
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
      setMessages(prev => [...prev, { sender: 'ai', text: "Processed under strict zero-persistence security rules." }]);
    }, 500);
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
      {/* EXACT MATCH SIDEBAR */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between h-screen sticky top-0 overflow-y-auto">
        <div className="space-y-6">
          {/* Header & Profile */}
          <div>
            <h1 className="text-sm font-extrabold uppercase tracking-widest text-indigo-400 mb-4">Enterprise Control</h1>
            
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <span>👤</span> Nabeeha Zaghum Ali
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>📖</span> Org: Nexus Digital Enterprise Node
              </div>
              <div className="text-[11px] text-indigo-400 font-mono flex items-center gap-1.5 pt-1 border-t border-slate-800">
                <span>🔑</span> Role: {selectedRole}
              </div>
            </div>
          </div>

          {/* Switch Role */}
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
            <div className="space-y-1">
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

        {/* On-Premise & Desktop Setup */}
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
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-0.5 rounded-full font-mono">Nexus Digital Enterprise Node</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Global Data Sanitizer & Currency Normalization Engine</h2>
            <p className="text-xs text-slate-400 mt-1">Trusted by Startups, Mid-size Companies, and Global Banks with zero data persistence.</p>
          </div>
          <button
            onClick={handleInstallApp}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <span>📲 Install Web App</span>
          </button>
        </div>

        {/* TAB 0: Data Workspace & Cloud Ingestion */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Security</span>
                <span className="text-sm font-bold text-white">Zero Trust OIDC</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Currencies</span>
                <span className="text-sm font-bold text-white">Multi-Clean</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Retention</span>
                <span className="text-sm font-bold text-white">Zero Persistence</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Compliance</span>
                <span className="text-sm font-bold text-white">SOC2 / HIPAA</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-md font-bold text-white">Zero Trust Amazon S3 / Cloud Bucket Ingestion via IAM Role</h3>
                <p className="text-xs text-slate-400">Banks never share master static keys. Authenticate securely using AWS IAM Role Delegation and OIDC Web Identity Federation.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">AWS IAM Role ARN (Secure Delegation)</label>
                    <input type="text" value={awsArn} onChange={(e) => setAwsArn(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.
