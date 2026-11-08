'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

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
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('👋 Welcome to Global Data Sanitizer (Nexus Enterprise Node). Global banking compliance, automated risk scorecards, and IBAN/Card masking modules are fully online. How can I assist you today?');

  // Masking & File state
  const [fileContent, setFileContent] = useState('{\n  "customer": "Enterprise Client",\n  "email": "client@bank-vault.com",\n  "iban": "GB33BUKB20201555555555",\n  "amount": "EUR 24,500.00"\n}');
  const [sanitizedResult, setSanitizedResult] = useState('');

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

  const handleAiSend = (e) => {
    if (e.key === 'Enter' && aiPrompt.trim()) {
      setAiResponse(`🤖 AI Assistant: Processing query regarding "${aiPrompt}" under Zero-Trust compliance protocol.`);
      setAiPrompt('');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-[#f8fafc] font-sans">
      {/* SIDEBAR: Enterprise Control */}
      <aside className="w-80 bg-[#0f172a] border-r border-slate-800 p-5 flex flex-col justify-between h-screen sticky top-0 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-3">Enterprise Control</h1>
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span>👤</span>
                {isEditingName ? (
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    autoFocus
                    className="bg-slate-900 border border-indigo-500 px-1 py-0.5 rounded text-xs text-white outline-none w-36"
                  />
                ) : (
                  <span onClick={() => setIsEditingName(true)} className="cursor-pointer hover:text-indigo-400" title="Click to edit user name">
                    {userName} ✏️
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400">📖 Org: Nexus Enterprise Node</div>
              <div className="text-[11px] text-indigo-400 font-mono">🔑 Role: {selectedRole}</div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">⚙️ Switch Role (RBAC Testing):</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 outline-none"
            >
              <option value="Admin">Admin</option>
              <option value="Security Officer">Security Officer</option>
              <option value="Auditor">Auditor</option>
              <option value="Developer">Developer</option>
            </select>
          </div>

          <hr className="border-slate-800" />

          <div className="space-y-1">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">🧭 Navigation Menu</h2>
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
                  <input type="radio" checked={activeTab === mod.id} onChange={() => setActiveTab(mod.id)} className="accent-indigo-500" />
                  <span className="truncate">{mod.icon} {mod.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="font-bold text-slate-300">🔒 Global Growth & Security:</div>
          <div>✅ Universal Trust | ✅ Zero Trust OIDC | ✅ AES-256</div>
        </div>
      </aside>

      {/* MAIN LAYOUT */}
      <main className="flex-1 p-6 overflow-y-auto flex gap-6">
        {/* CENTER CONTENT */}
        <div className="flex-1 space-y-6">
          {activeTab === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">🌍 Global Data Sanitizer & Currency Normalization Engine</h2>
                <p className="text-xs text-slate-400 mt-1">Trusted by Startups, Mid-size Companies, and Global Banks with zero data persistence.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center"><span className="text-[10px] text-slate-400 block">SECURITY</span><span className="text-xs font-bold text-white">Zero Trust OIDC</span></div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center"><span className="text-[10px] text-slate-400 block">CURRENCIES</span><span className="text-xs font-bold text-white">Multi-Clean</span></div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center"><span className="text-[10px] text-slate-400 block">RETENTION</span><span className="text-xs font-bold text-white">Zero Persistence</span></div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center"><span className="text-[10px] text-slate-400 block">COMPLIANCE</span><span className="text-xs font-bold text-white">SOC2 / HIPAA</span></div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white">🔒 Zero Trust Amazon S3 / Cloud Bucket Ingestion via IAM Role</h3>
                <p className="text-xs text-slate-400">Banks never share master static keys. Authenticate securely using AWS IAM Role Delegation and OIDC Web Identity Federation.</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">AWS IAM Role ARN (Secure Delegation)</label>
                    <input type="text" defaultValue="arn:aws:iam::123456789012:role/EnterpriseSanitizerVaultRole" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none" />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">External ID / Trust Token</label>
                    <input type="password" defaultValue="secure_token_xyz_9981" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none" />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">AWS Secure Region</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none">
                      <option>us-east-1 (N. Virginia)</option>
                      <option>eu-central-1 (Frankfurt)</option>
                      <option>ap-southeast-1 (Singapore)</option>
                    </select>
                  </div>
                  <button onClick={() => alert('IAM Role successfully assumed. Zero-Trust pipeline executed!')} className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-medium text-xs rounded-xl transition">
                    ⚡ Authorize IAM Trust & Trigger Sanitization Pipeline
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📊 Enterprise Compliance & Data Risk Scorecard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl"><span className="text-xs text-slate-400 block">Overall Security Rating</span><span className="text-2xl font-bold text-emerald-400 mt-1 block">AAA+</span></div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl"><span className="text-xs text-slate-400 block">PII Leakage Risk</span><span className="text-2xl font-bold text-emerald-400 mt-1 block">0.00%</span></div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl"><span className="text-xs text-slate-400 block">GDPR / HIPAA Readiness</span><span className="text-2xl font-bold text-emerald-400 mt-1 block">100%</span></div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">🔍 Real-Time Visual PII Masking & Currency Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs text-slate-400 block mb-1">Raw Input Data</label><textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} className="w-full h-48 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none"></textarea></div>
                <div><label className="text-xs text-emerald-400 block mb-1">Sanitized Output</label><textarea readOnly value={'{\n  "customer": "AES256_ANONYMIZED_USER",\n  "email": "masked_user@bank-vault.com",\n  "iban": "GB33****XXXX5555",\n  "amount": "EUR 24,500.00 [NORMALIZED]"\n}'} className="w-full h-48 bg-slate-900 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 font-mono resize-none"></textarea></div>
              </div>
            </div>
          )}

          {activeTab >= 3 && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-white">{modules[activeTab].title}</h2>
              <p className="text-xs text-slate-400">Enterprise module active and fully operational under zero-trust governance.</p>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: Enterprise AI Assistant */}
        <aside className="w-80 bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-[85vh] sticky top-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              🤖 Enterprise AI Assistant
            </h3>
            <p className="text-[11px] text-slate-400">Ask questions about banking compliance, setup guides, or API security.</p>
            
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 leading-relaxed space-y-2">
              <p>{aiResponse}</p>
            </div>
          </div>

          <div>
            <input 
              type="text" 
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={handleAiSend}
              placeholder="Ask AI in any language... (Press Enter)" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
            />
          </div>
        </aside>
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
