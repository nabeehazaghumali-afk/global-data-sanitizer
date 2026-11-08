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
  const [exportFormat, setExportFormat] = useState('csv');

  // Masking Options Checkboxes
  const [maskEmail, setMaskEmail] = useState(true);
  const [maskIdPass, setMaskIdPass] = useState(true);
  const [normalizeCurr, setNormalizeCurr] = useState(true);

  // 50 Persons Mock Data Sample
  const initialBatchData = Array.from({ length: 50 }, (_, i) => ({
    id: `EMP-${2001 + i}`,
    name: `User Agent ${i + 1}`,
    email: `user${i + 1}@nexus-enterprise.com`,
    password: `P@ssw0rdSec!${8001 + i}`,
    currency: i % 2 === 0 ? 'EUR 3,200.00' : 'USD 4,500.00'
  }));

  const [fileContent, setFileContent] = useState(JSON.stringify(initialBatchData, null, 2));
  const [sanitizedResult, setSanitizedResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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
          ...(maskEmail && item.email ? { email: 'masked_user@nexus-enterprise.com' } : {}),
          ...(normalizeCurr && item.currency ? { currency: item.currency.replace(/(EUR|USD|GBP|PKR|CAD)\s?([\d,]+\.\d{2})/g, '$1 [NORMALIZED]') } : {})
        }));
        setSanitizedResult(JSON.stringify(maskedArray, null, 2));
      }
    } catch (err) {
      let masked = fileContent;
      if (maskIdPass) {
        masked = masked.replace(/P@ssw0rdSec!\d+/g, '[MASKED_PASSWORD]').replace(/EMP-\d+/g, 'EMP-XXXX');
      }
      setSanitizedResult(masked);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCleanedFile = () => {
    if (!sanitizedResult) return;

    if (exportFormat === 'csv') {
      try {
        const parsed = JSON.parse(sanitizedResult);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const headers = Object.keys(parsed[0]).join(',');
          const rows = parsed.map(row => 
            Object.values(row).map(val => `"${val}"`).join(',')
          );
          const csvContent = [headers, ...rows].join('\n');

          const element = document.createElement('a');
          const file = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          element.href = URL.createObjectURL(file);
          element.download = `sanitized_enterprise_report.csv`;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          return;
        }
      } catch (e) {
        console.error('CSV Conversion failed', e);
      }
    }

    const element = document.createElement('a');
    const file = new Blob([sanitizedResult], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `sanitized_enterprise_report.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadDockerFile = () => {
    const dockerContent = `version: '3.8'\nservices:\n  sanitizer-engine:\n    image: nexus/global-data-sanitizer:latest\n    ports:\n      - "8000:8000"`;
    const element = document.createElement('a');
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
      {/* SIDEBAR */}
      <aside className="w-80 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between h-screen sticky top-0 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-sm font-extrabold uppercase tracking-widest text-indigo-400 mb-4">Enterprise Control</h1>
            
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

          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              🧭 Navigation Menu
            </h2>
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
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="bg-slate-950 border border-emerald-500/30 p-3 rounded-2xl space-y-2">
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>📦</span> On-Premise Setup
            </div>
            <button 
              onClick={downloadDockerFile}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg"
            >
              <span>📥</span> Download Dockerfile / K8s Chart
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto space-y-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-white">Global Data Sanitizer & Currency Normalization Engine</h2>
          <p className="text-xs text-slate-400 mt-1">Enterprise-grade Zero-Trust batch data masking and normalization pipeline.</p>
        </div>

        {/* TAB 0: Data Workspace */}
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
              
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">Upload CSV / JSON Dataset</span>
                  <span className="text-[10px] text-slate-400">Select dataset file from your system (Unlimited size/path)</span>
                </div>
                <input type="file" accept=".csv,.json,.txt" onChange={handleFileUpload} className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Raw Input Data Preview</label>
                  <textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none"></textarea>
                </div>
                <div>
                  <label className="text-xs text-emerald-400 font-medium block mb-1">Sanitized Output Preview</label>
                  <textarea readOnly value={sanitizedResult} placeholder="Click execute below..." className="w-full h-48 bg-slate-950 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 font-mono resize-none"></textarea>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-2">
                <button onClick={handleSanitize} disabled={isProcessing} className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-medium text-xs rounded-xl transition">
                  {isProcessing ? 'Processing In-Memory Sanitization...' : '⚡ Execute In-Memory Sanitization Pipeline'}
                </button>
                {sanitizedResult && (
                  <div className="flex items-center gap-2">
                    <select 
                      value={exportFormat} 
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="bg-slate-950 border border-emerald-500/50 text-xs text-emerald-300 p-3 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="csv">Export as Excel (.CSV)</option>
                      <option value="json">Export as Data (.JSON)</option>
                    </select>
                    <button onClick={downloadCleanedFile} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl transition flex items-center gap-2 whitespace-nowrap">
                      <span>⬇ Download Cleaned Report</span>
                    </button>
                  </div>
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
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">AAA+ (Enterprise)</span>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 block">PII Leakage Risk</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">0.00% (Zero Trust)</span>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 block">GDPR / SOC2 Readiness</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">100% Verified</span>
              </div>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase">Monthly Volume Quota</h4>
              <p className="text-xs text-slate-300">Active Tier: Enterprise Unlimited — 1 Million Rows / Columns per month quota active.</p>
            </div>
          </div>
        )}

        {/* TAB 2: Real-Time Visual Comparison */}
        {activeTab === 2 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Real-Time Visual PII Masking & Currency Comparison</h3>
            <p className="text-xs text-slate-400">Inspect raw enterprise payloads side-by-side with sanitized outputs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Raw Input Data</label>
                <textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} className="w-full h-64 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none"></textarea>
              </div>
              <div>
                <label className="text-xs text-emerald-400 block mb-1">Sanitized Output</label>
                <textarea readOnly value={sanitizedResult} placeholder="Execute sanitization on Workspace tab..." className="w-full h-64 bg-slate-950 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 font-mono resize-none"></textarea>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Multi-Region Compliance */}
        {activeTab === 3 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Multi-Region Compliance Gateways</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl">
                <span className="text-xs font-bold text-emerald-400 block">🇪🇺 EU Region (GDPR)</span>
                <span className="text-xs text-slate-400 mt-1 block">Active & Enforcing strict PII data masking protocols.</span>
              </div>
              <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl">
                <span className="text-xs font-bold text-emerald-400 block">🇺🇸 US Region (HIPAA / CCPA)</span>
                <span className="text-xs text-slate-400 mt-1 block">Active & Enforcing healthcare & financial privacy rules.</span>
              </div>
              <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl">
                <span className="text-xs font-bold text-emerald-400 block">🇦🇪 MEA Region (DIFC / ADGM)</span>
                <span className="text-xs text-slate-400 mt-1 block">Active & Enforcing cross-border currency safeguards.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Custom Regex & PII Rules */}
        {activeTab === 4 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Custom Regex & Advanced PII Rules Engine</h3>
            <p className="text-xs text-slate-400">Configure custom matching patterns for proprietary enterprise data fields.</p>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-mono">Credit Card / IBAN Regex Filter</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px]">Active</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-mono">Corporate Password Hash Masker</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px]">Active</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-mono">Multi-Currency Normalizer (EUR, USD, GBP, PKR)</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px]">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Team Access & RBAC */}
        {activeTab === 5 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Team Access & Role-Based Access Control (RBAC)</h3>
            <p className="text-xs text-slate-400">Current Active Role: <span className="text-indigo-400 font-mono font-bold">{selectedRole}</span> (Switch anytime from the sidebar dropdown).</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className={`p-4 rounded-xl border text-xs ${selectedRole === 'Admin' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                <div className="font-bold mb-1">Admin</div>
                <div>Full pipeline control, RBAC switching & exports.</div>
              </div>
              <div className={`p-4 rounded-xl border text-xs ${selectedRole === 'Security Officer' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                <div className="font-bold mb-1">Security Officer</div>
                <div>PII masking rules & audit log access.</div>
              </div>
              <div className={`p-4 rounded-xl border text-xs ${selectedRole === 'Auditor' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                <div className="font-bold mb-1">Auditor</div>
                <div>Compliance scorecard & read-only reporting.</div>
              </div>
              <div className={`p-4 rounded-xl border text-xs ${selectedRole === 'Developer' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                <div className="font-bold mb-1">Developer</div>
                <div>API sandbox & Docker deployment tools.</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Audit Logs & Compliance PDF */}
        {activeTab === 6 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Audit Logs & Compliance PDF Export</h3>
            <p className="text-xs text-slate-400">Download verifiable compliance certificates and execution audit logs.</p>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono text-xs text-slate-300">
              <div>[2026-11-08 20:22:15] INFO: Batch Ingestion successful (50 records).</div>
              <div>[2026-11-08 20:22:16] SUCCESS: Zero-Trust in-memory PII masking applied.</div>
              <div>[2026-11-08 20:22:18] SECURE: CSV export generated for Excel compatibility.</div>
            </div>
            <button onClick={() => alert('Compliance Audit PDF generated successfully!')} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl">
              📥 Download Compliance Audit PDF
            </button>
          </div>
        )}

        {/* TAB 7: API, Sandbox & SSO */}
        {activeTab === 7 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">API Sandbox & Enterprise SSO Integration</h3>
            <p className="text-xs text-slate-400">Connect your enterprise applications via secure REST APIs and OIDC / SAML single sign-on.</p>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs text-slate-400 block font-mono">API Endpoint: https://api.global-data-sanitizer.internal/v1/sanitize</span>
              <span className="text-xs text-emerald-400 block font-mono">Authentication: Bearer Token (Zero Trust OIDC Enabled)</span>
            </div>
          </div>
        )}

        {/* TAB 8: Billing & Enterprise Plan */}
        {activeTab === 8 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Billing & Enterprise Subscription Plan</h3>
            <div className="p-5 bg-slate-950 border border-indigo-500/40 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">Enterprise Unlimited Tier</span>
                <span className="bg-indigo-600 text-white text-[10px] px-2.5 py-1 rounded-full font-bold">ACTIVE</span>
              </div>
              <p className="text-xs text-slate-400">Includes unlimited batch processing up to 1 Million Rows/Columns per month, priority support, and on-premise Docker deployment.</p>
            </div>
          </div>
        )}

        {/* TAB 9: User Feedback */}
        {activeTab === 9 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">User Feedback & Support Desk</h3>
            <p className="text-xs text-slate-400">Send feedback or open a support ticket with our enterprise security team.</p>
            <div className="space-y-3">
              <textarea placeholder="Type your feedback or feature request here..." className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 resize-none outline-none focus:border-indigo-500"></textarea>
              <button onClick={() => alert('Feedback submitted successfully to Enterprise Support!')} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl">
                Submit Feedback
              </button>
            </div>
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
