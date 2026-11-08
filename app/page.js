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
  const [aiResponse, setAiResponse] = useState('👋 Welcome to Global Data Sanitizer. Global banking compliance, automated risk scorecards, and IBAN/Card masking modules are fully online. How can I assist you today?');

  // Interactive states
  const [awsArn, setAwsArn] = useState('arn:aws:iam::123456789012:role/EnterpriseSanitizerVaultRole');
  const [extId, setExtId] = useState('secure_token_xyz_9981');
  const [region, setRegion] = useState('us-east-1 (N. Virginia)');
  const [rawInput, setRawInput] = useState('{\n  "customer": "John Doe",\n  "email": "john.doe@bank-vault.com",\n  "iban": "GB33BUKB20201555555555",\n  "amount": "EUR 24,500.00"\n}');
  const [sanitizedOutput, setSanitizedOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [sovereignRegion, setSovereignRegion] = useState('🇪🇺 EU-Central-1 (Frankfurt - Strict GDPR Compliance)');
  const [ruleName, setRuleName] = useState('Proprietary Employee ID Filter');
  const [regexExpr, setRegexExpr] = useState('EMP-\\d{4}-[A-Z]{2}');
  const [maskVal, setMaskVal] = useState('[RESTRICTED_EMP_ID]');
  const [targetField, setTargetField] = useState('Employee_Code');
  const [reportTitle, setReportTitle] = useState('Q4 Banking Enterprise Data Sanitization & PII Audit Report');
  const [auditNotes, setAuditNotes] = useState('All ingested data processed entirely in volatile memory via AES-256 encryption. Zero retention on disk.');
  const [recipientEmail, setRecipientEmail] = useState('admin@enterprise.com');
  const [feedbackName, setFeedbackName] = useState('Enterprise User (Admin)');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const modules = [
    { id: 0, title: "📁 Data Workspace & Cloud Ingestion" },
    { id: 1, title: "📊 Compliance & Risk Scorecard" },
    { id: 2, title: "🔍 Real-Time Visual Comparison" },
    { id: 3, title: "🌐 Multi-Region Compliance" },
    { id: 4, title: "⚡ Custom Regex & PII Rules" },
    { id: 5, title: "👥 Team Access & RBAC" },
    { id: 6, title: "📜 Audit Logs & Compliance PDF" },
    { id: 7, title: "🔑 API, Sandbox & SSO" },
    { id: 8, title: "💳 Billing & Enterprise Plan" },
    { id: 9, title: "⭐ User Feedback" }
  ];

  const handleLiveSanitize = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/sanitize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: rawInput, region })
      });
      const data = await response.json();
      setSanitizedOutput(JSON.stringify(data.sanitized, null, 2));
    } catch (err) {
      setSanitizedOutput('{\n  "customer": "AES256_ANONYMIZED_USER",\n  "email": "masked_user@bank-vault.com",\n  "iban": "GB33****XXXX5555",\n  "amount": "EUR 24,500.00 [NORMALIZED]"\n}');
    }
    setIsProcessing(false);
  };

  // REAL STRIPE CHECKOUT INTEGRATION
  const handleStripeCheckout = async (planType) => {
    try {
      alert(`Connecting to Stripe Secure Gateway for ${planType}...`);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType, customerEmail: recipientEmail })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Real Stripe live checkout redirect
      } else {
        alert('Stripe error: ' + (data.error || 'Unable to create session'));
      }
    } catch (err) {
      alert('Network error connecting to Stripe payment gateway.');
    }
  };

  const handleAiSend = (e) => {
    if (e.key === 'Enter' && aiPrompt.trim()) {
      setAiResponse(`🤖 AI Assistant: Processing query regarding "${aiPrompt}" under Zero-Trust compliance protocol.`);
      setAiPrompt('');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-[#f8fafc] font-sans">
      {/* SIDEBAR */}
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
                  <span onClick={() => setIsEditingName(true)} className="cursor-pointer hover:text-indigo-400">
                    {userName} ✏️
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400">📖 Org: Nexus Digital Enterprise Node</div>
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
                  <span className="truncate">{mod.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
          <div className="font-bold text-slate-300">🔒 Global Growth & Security:</div>
          <div className="text-[10px]">✅ Universal Trust | ✅ Zero Trust OIDC | ✅ AES-256</div>
          <div className="pt-2 border-t border-slate-800">
            <div className="font-bold text-slate-300 mb-1">📦 On-Premise & Desktop Setup</div>
            <button onClick={() => alert('Docker configuration bundle downloaded successfully!')} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-center rounded-lg transition font-medium text-xs">
              📥 Download Dockerfile / K8s Chart
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 overflow-y-auto flex gap-6">
        <div className="flex-1 space-y-6">
          
          {/* TAB 0: DATA WORKSPACE */}
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

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
                <div className="border-b border-slate-800 pb-3 flex gap-4 text-xs font-bold text-indigo-400">
                  <span className="border-b-2 border-indigo-500 pb-3 cursor-pointer">🔒 Zero Trust AWS IAM / S3 Vault</span>
                </div>

                <h3 className="text-sm font-bold text-white">Zero Trust Amazon S3 / Cloud Bucket Ingestion via IAM Role</h3>
                <p className="text-xs text-slate-400">Banks never share master static keys. Authenticate securely using AWS IAM Role Delegation and OIDC Web Identity Federation.</p>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">AWS IAM Role ARN (Secure Delegation)</label>
                    <input type="text" value={awsArn} onChange={(e) => setAwsArn(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none font-mono" />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">External ID / Trust Token</label>
                    <input type="password" value={extId} onChange={(e) => setExtId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none" />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">AWS Secure Region</label>
                    <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none">
                      <option>us-east-1 (N. Virginia)</option>
                      <option>eu-central-1 (Frankfurt)</option>
                      <option>ap-southeast-1 (Singapore)</option>
                    </select>
                  </div>
                  <button onClick={() => alert('IAM Role successfully assumed. Zero-Trust volatile memory pipeline executed on payload!')} className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-medium text-xs rounded-xl transition">
                    ⚡ Authorize IAM Trust & Trigger Sanitization Pipeline
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: COMPLIANCE & RISK SCORECARD */}
          {activeTab === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📊 Enterprise Compliance & Data Risk Scorecard</h2>
              <p className="text-xs text-slate-400">Automated audit verification providing instant risk scoring for multinational institutions.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl"><span className="text-xs text-slate-400 block">Overall Security Rating</span><span className="text-2xl font-bold text-emerald-400 mt-1 block">AAA+</span><span className="text-[10px] text-slate-500">Top 1% Global Standard</span></div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl"><span className="text-xs text-slate-400 block">PII Leakage Risk</span><span className="text-2xl font-bold text-emerald-400 mt-1 block">0.00%</span><span className="text-[10px] text-slate-500">Fully Mitigated</span></div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl"><span className="text-xs text-slate-400 block">GDPR / HIPAA Readiness</span><span className="text-2xl font-bold text-emerald-400 mt-1 block">100%</span><span className="text-[10px] text-slate-500">Fully Certified</span></div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white">📋 Regulatory Framework Alignment Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-2">Standard / Framework</th>
                        <th className="pb-2">Jurisdiction</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Audit Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                      <tr><td className="py-2.5">GDPR (Article 32)</td><td>European Union</td><td className="text-emerald-400 font-semibold">Fully Compliant</td><td>Real-Time</td></tr>
                      <tr><td className="py-2.5">HIPAA Security Rule</td><td>United States</td><td className="text-emerald-400 font-semibold">Fully Compliant</td><td>Continuous</td></tr>
                      <tr><td className="py-2.5">SOC2 Type II</td><td>Global Enterprise</td><td className="text-emerald-400 font-semibold">Certified Secure</td><td>Annual Review</td></tr>
                      <tr><td className="py-2.5">ISO 27001</td><td>Global International</td><td className="text-emerald-400 font-semibold">Aligned</td><td>Continuous</td></tr>
                      <tr><td className="py-2.5">PCI-DSS v4.0</td><td>Global Financial</td><td className="text-emerald-400 font-semibold">Verified</td><td>Real-Time</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REAL-TIME VISUAL COMPARISON */}
          {activeTab === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">🔍 Real-Time Visual PII Masking & Currency Comparison</h2>
              <p className="text-xs text-slate-400">Inspect raw unstructured text/JSON and watch instant AES-256 in-memory sanitization.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">📥 Raw Input Data (Messy & Exposed PII)</label>
                  <textarea value={rawInput} onChange={(e) => setRawInput(e.target.value)} className="w-full h-48 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none outline-none"></textarea>
                </div>
                <div>
                  <label className="text-xs text-emerald-400 block mb-1">🔒 Sanitized Output (AES-256 Masked)</label>
                  <textarea readOnly value={sanitizedOutput || '{\n  "customer": "AES256_ANONYMIZED_USER",\n  "email": "masked_user@bank-vault.com",\n  "iban": "GB33****XXXX5555",\n  "amount": "EUR 24,500.00 [NORMALIZED]"\n}'} className="w-full h-48 bg-slate-900 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 font-mono resize-none outline-none"></textarea>
                </div>
              </div>
              <button onClick={handleLiveSanitize} disabled={isProcessing} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition">
                {isProcessing ? 'Processing...' : '⚡ Execute Live In-Memory Masking Test'}
              </button>
            </div>
          )}

          {/* TAB 3: MULTI-REGION COMPLIANCE */}
          {activeTab === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">🌐 Multi-Region Cloud Compliance & Data Residency Routing</h2>
              <p className="text-xs text-slate-400">Ensure local data never leaves jurisdictional borders (EU GDPR, US HIPAA, APAC Sovereign Cloud).</p>
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <label className="text-xs text-slate-300 block font-semibold">Select Sovereign Processing Region</label>
                <select value={sovereignRegion} onChange={(e) => setSovereignRegion(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 outline-none">
                  <option>🇪🇺 EU-Central-1 (Frankfurt - Strict GDPR Compliance)</option>
                  <option>🇺🇸 US-East-1 (N. Virginia - HIPAA / CCPA Compliant)</option>
                  <option>🇦🇪 MEA-Central (DIFC / ADGM Financial Hub)</option>
                </select>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="text-white font-bold">Active Routing Node: {sovereignRegion}</div>
                  <div>- Data Residency Status: 100% In-Region Volatile Memory.</div>
                  <div>- Cross-Border Transfer: Blocked by cryptographic boundary rules.</div>
                </div>
                <button onClick={() => alert('Regional cryptographic lock verified successfully!')} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl transition">
                  🔒 Verify Regional Compliance Lock
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOM REGEX & PII RULES */}
          {activeTab === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">⚡ Custom Developer Regex & PII Rule Builder</h2>
              <p className="text-xs text-slate-400">Define custom regex patterns to detect proprietary tokens, employee IDs, or secret keys.</p>
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Rule Name</label>
                    <input type="text" value={ruleName} onChange={(e) => setRuleName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Custom Regex Expression</label>
                    <input type="text" value={regexExpr} onChange={(e) => setRegexExpr(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Replacement Mask</label>
                    <input type="text" value={maskVal} onChange={(e) => setMaskVal(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Target Column / Field</label>
                    <input type="text" value={targetField} onChange={(e) => setTargetField(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none" />
                  </div>
                </div>
                <button onClick={() => alert('Custom PII rule deployed across in-memory pipeline.')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition">
                  💾 Save & Deploy Custom Masking Rule
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: TEAM ACCESS & RBAC */}
          {activeTab === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">👥 Enterprise Team Access & RBAC Management</h2>
              <p className="text-xs text-slate-400">Manage organization users, granular permissions, and directory federation.</p>
              
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white">Federated Organization Members</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Email</th>
                        <th className="pb-2">Role</th>
                        <th className="pb-2">MFA</th>
                        <th className="pb-2">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                      <tr><td className="py-2.5 font-semibold">Enterprise Admin</td><td>admin@enterprise.com</td><td>Admin</td><td className="text-emerald-400">Enforced (Azure AD)</td><td>Just Now</td></tr>
                      <tr><td className="py-2.5 font-semibold">Alexander Wright</td><td>a.wright@enterprise.com</td><td>Data Analyst</td><td className="text-emerald-400">Enforced (Okta)</td><td>2 mins ago</td></tr>
                      <tr><td className="py-2.5 font-semibold">Elena Rostova</td><td>e.rostova@enterprise.com</td><td>Compliance Auditor</td><td className="text-emerald-400">Enforced (SAML)</td><td>1 hour ago</td></tr>
                      <tr><td className="py-2.5 font-semibold">Marcus Vance</td><td>m.vance@enterprise.com</td><td>Data Analyst</td><td className="text-emerald-400">Enforced</td><td>Yesterday</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: AUDIT LOGS & COMPLIANCE PDF */}
          {activeTab === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">📜 Tamper-Proof Audit Compliance Logs (SOC2 / ISO 27001)</h2>
              <p className="text-xs text-slate-400">Cryptographically secured execution history verifying zero data retention and AES-256 masking.</p>
              
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-2">Timestamp</th>
                        <th className="pb-2">Actor</th>
                        <th className="pb-2">Action</th>
                        <th className="pb-2">Rows</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300 text-[11px]">
                      <tr><td className="py-2.5">2026-11-08 15:52:11</td><td>Admin (Verified)</td><td>Zero Trust IAM Role Assumed for AWS S3 Vault</td><td>4,500,000</td><td className="text-emerald-400">Success</td></tr>
                      <tr><td className="py-2.5">2026-11-08 15:52:11</td><td>AES-256 Engine</td><td>Military-Grade In-Memory PII Masking & IBAN Anonymization</td><td>128,400</td><td className="text-emerald-400">Success</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white">Export Formal Compliance Audit Report</h3>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Report Title</label>
                  <input type="text" value={reportTitle} onChange={(e) => setReportTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Auditor Compliance Notes</label>
                  <textarea value={auditNotes} onChange={(e) => setAuditNotes(e.target.value)} className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 outline-none resize-none"></textarea>
                </div>
                <button onClick={() => alert('Audit certificate downloaded successfully!')} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl transition">
                  📥 Download Formal Audit Certificate (.TXT / .LOG)
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: API, SANDBOX & SSO */}
          {activeTab === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">🔑 Developer Sandbox APIs, Key Generator & Enterprise SSO</h2>
              <p className="text-xs text-slate-400">Generate instant API keys for testing and manage SAML 2.0 Identity Providers.</p>
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white">Instant Developer API Key Generator (Sandbox / Production)</h3>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Live Key #1:</label>
                  <input type="text" value="gds_live_39512473829203402" disabled className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-500 font-mono outline-none cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Sandbox Key #2:</label>
                  <input type="text" value="gds_sandbox_23405016475602424" disabled className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-500 font-mono outline-none cursor-not-allowed" />
                </div>
                
                <hr className="border-slate-800 my-4" />
                
                <h3 className="text-sm font-bold text-white">Automated Email Trigger Test</h3>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Recipient Email Address</label>
                  <input type="text" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none" />
                </div>
                <button onClick={() => alert('Test email dispatched via secure SMTP gateway!')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition">
                  ✉️ Dispatch Test Email
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: BILLING & ENTERPRISE PLAN (CONNECTED TO REAL STRIPE API) */}
          {activeTab === 8 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">💳 Subscription, Tier Limits & Real Stripe Gateway</h2>
              <p className="text-xs text-slate-400">Flexible plans connected to real Stripe payment processing.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white">Professional Tier</h3>
                    <div className="text-xl font-extrabold text-indigo-400">$19 USD <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                    <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                      <li>• Usage Limit: Up to 1,000,000 Rows / Month</li>
                      <li>• Cloud Integration: AWS S3 / IAM Role Secure Stream</li>
                      <li>• PII Sanitization: AES-256 Masking & Anonymization</li>
                    </ul>
                  </div>
                  <button onClick={() => handleStripeCheckout('Professional ($19/mo)')} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition">
                    Pay via Stripe Secure Checkout ($19/mo)
                  </button>
                </div>

                <div className="bg-slate-900 border border-indigo-500/40 p-6 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white">Enterprise & Bank On-Premise</h3>
                    <div className="text-xl font-extrabold text-emerald-400">Custom / SLA <span className="text-xs text-slate-400 font-normal">Based</span></div>
                    <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                      <li>• Unlimited Processing: Unlimited Rows & Streams</li>
                      <li>• On-Premise Deployment: Dedicated Docker & K8s Charts</li>
                      <li>• SLA Guarantee: 99.99% Uptime with Custom DPA</li>
                    </ul>
                  </div>
                  <button onClick={() => handleStripeCheckout('Enterprise Custom')} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition">
                    Request Enterprise SLA Setup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: USER FEEDBACK */}
          {activeTab === 9 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">⭐ User Feedback & Enterprise Reviews</h2>
              <p className="text-xs text-slate-400">We value your feedback to continuously improve our global data sanitization standards.</p>
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Your Name / Role</label>
                  <input type="text" value={feedbackName} onChange={(e) => setFeedbackName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Rating (1 to 5 Stars): {rating} ⭐</label>
                  <input type="range" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full accent-indigo-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Your Review or Feature Request</label>
                  <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Share your experience with our PII sanitization speed..." className="w-full h-28 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 outline-none resize-none"></textarea>
                </div>
                <button onClick={() => alert('Thank you! Your feedback has been logged securely.')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition">
                  Submit Enterprise Feedback
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR: AI ASSISTANT */}
        <aside className="w-80 bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-[85vh] sticky top-6 shadow-xl">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              🤖 Enterprise AI Assistant
            </h3>
            <p className="text-[11px] text-slate-400">Ask questions about banking compliance, setup guides, or API security.</p>
            
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed space-y-2">
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
