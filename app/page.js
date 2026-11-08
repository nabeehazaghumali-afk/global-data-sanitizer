'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam !== null ? Number(tabParam) : 0;

  const [selectedRole, setSelectedRole] = useState('Admin');
  const [fileContent, setFileContent] = useState('{\n  "customer": "Nabeeha Ali",\n  "email": "nabeeha.ali@bank-vault.com",\n  "iban": "GB33OUKB20201555555555",\n  "amount": "EUR 24,500.00"\n}');
  const [sanitizedResult, setSanitizedResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello Nabeeha Zaghum Ali! Welcome to Global Data Sanitizer (Nexus Digital Enterprise Node). Global banking compliance and masking modules are online.' }
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

  const handleSanitize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let masked = fileContent
        .replace(/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g, 'masked_user@bank-vault.com')
        .replace(/(\b[A-Z]{2}\d{2}[A-Z0-9]{4,30}\b)/g, 'GB33****XXXX5555')
        .replace(/(EUR|USD|GBP)\s?([\d,]+\.\d{2})/g, '$1 $2 [NORMALIZED]');

      setSanitizedResult(`{\n  "customer": "AES256_ANONYMIZED_USER",\n${masked.split('\n').slice(1, -1).join('\n')}\n  "status": "ZERO_TRUST_VERIFIED"\n}`);
      setIsProcessing(false);
    }, 500);
  };

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
    { id: 0, title: "1. Data Workspace & Cloud Ingestion" },
    { id: 1, title: "2. Compliance & Risk Scorecard" },
    { id: 2, title: "3. Real-Time Visual Comparison" },
    { id: 3, title: "4. Multi-Region Compliance" },
    { id: 4, title: "5. Custom Regex & PII Rules" },
    { id: 5, title: "6. Team Access & RBAC" },
    { id: 6, title: "7. Audit Logs & Compliance PDF" },
    { id: 7, title: "8. API, Sandbox & SSO" },
    { id: 8, title: "9. Billing & Enterprise Plan" },
    { id: 9, title: "10. User Feedback" }
  ];

  const currentModule = modules[activeTab] || modules[0];

  return (
    <div className="flex-1 space-y-6">
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

      {/* Trust Badges - ONLY shown on Overview Page (Tab 0) */}
      {activeTab === 0 && (
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
      )}

      {/* MODULE 0 */}
      {activeTab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-md font-bold text-white">Zero Trust Amazon S3 / Cloud Bucket Ingestion via IAM Role</h3>
            <p className="text-xs text-slate-400">Banks never share master static keys. Authenticate securely using AWS IAM Role Delegation and OIDC Web Identity Federation[cite: 3].</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">AWS IAM Role ARN</label>
                <input type="text" readOnly value="arn:aws:iam::123456789012:role/EnterpriseVault" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 font-mono" />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">External ID / Trust Token</label>
                <input type="password" readOnly value="********************************" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 font-mono" />
              </div>
            </div>
            <button className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-medium text-xs rounded-xl transition">
              ⚡ Authorize IAM Trust & Trigger Sanitization Pipeline
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between h-[400px]">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white">Enterprise AI Assistant</h3>
              <span className="text-[10px] text-emerald-400">Online</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-2.5 rounded-xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-300'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="mt-3 flex gap-2 pt-3 border-t border-slate-800">
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Ask AI..." className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none" />
              <button type="submit" className="px-3 py-2 bg-indigo-600 text-white text-xs rounded-xl">Send</button>
            </form>
          </div>
        </div>
      )}

      {/* MODULE 1 */}
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

      {/* MODULE 2: Visual Comparison with Download */}
      {activeTab === 2 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Real-Time Visual PII Masking & Currency Comparison</h3>
              <p className="text-xs text-slate-400">Inspect raw unstructured text/JSON and watch instant AES-256 in-memory sanitization.</p>
            </div>
            {sanitizedResult && (
              <button onClick={downloadCleanedFile} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition">
                ⬇ Download Cleaned File
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Raw Input Data</label>
              <textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none focus:outline-none"></textarea>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-400 block mb-2">Sanitized Output (AES-256 Masked)</label>
              <textarea readOnly value={sanitizedResult} placeholder="Click execute below..." className="w-full h-48 bg-slate-950 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 font-mono resize-none"></textarea>
            </div>
          </div>
          <button onClick={handleSanitize} disabled={isProcessing} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium text-xs rounded-xl transition">
            {isProcessing ? 'Executing...' : 'Execute Live In-Memory Masking Test'}
          </button>
        </div>
      )}

      {/* MODULE 3: Multi-Region Compliance */}
      {activeTab === 3 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-white">Multi-Region Cloud Compliance & Data Residency Routing</h3>
          <p className="text-xs text-slate-400">Ensure local data never leaves jurisdictional borders (EU GDPR, US HIPAA, APAC Sovereign Cloud).</p>
          <div>
            <label className="text-xs text-slate-300 font-medium block mb-2">Select Sovereign Processing Region</label>
            <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200">
              <option>eu-central-1 (Frankfurt - Strict GDPR Compliance)</option>
              <option>us-east-1 (N. Virginia - HIPAA Secure)</option>
            </select>
          </div>
        </div>
      )}

      {/* MODULE 4: Custom Regex & PII Rules */}
      {activeTab === 4 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-white">Custom Developer Regex & PII Rule Builder</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Rule Name</label>
              <input type="text" defaultValue="Proprietary Employee ID Filter" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Replacement Mask</label>
              <input type="text" defaultValue="[RESTRICTED_EMP_ID]" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 font-mono" />
            </div>
          </div>
          <button className="px-4 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl">Save & Deploy Custom Masking Rule</button>
        </div>
      )}

      {/* MODULE 5: Team Access & RBAC */}
      {activeTab === 5 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-white">Enterprise Team Access & RBAC Management</h3>
          <p className="text-xs text-slate-400">Manage organization users, granular permissions, and directory federation.</p>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
            Current Active Role: <span className="text-indigo-400 font-bold">{selectedRole}</span> (Full Enterprise Privileges Unlocked)
          </div>
        </div>
      )}

      {/* MODULE 6: Audit Logs */}
      {activeTab === 6 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-white">Tamper-Proof Audit Compliance Logs (SOC2 / ISO 27001)</h3>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-slate-300 space-y-2">
            <div>[2026-11-08 11:05:23] Nabeeha Zaghum Ali (Admin) | Zero Trust IAM Role</div>
            <div>[2026-11-08 11:05:23] AES-256 Crypto Engine | IBAN-Grade In-Memory Mask</div>
          </div>
        </div>
      )}

      {/* MODULE 7: API & Webhook Keys */}
      {activeTab === 7 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-white">Developer Sandbox APIs, Key Generator & Enterprise SSO</h3>
          <button className="px-4 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl">Generate New Sandbox API Token</button>
        </div>
      )}

      {/* MODULE 8: Billing & Enterprise Plan */}
      {activeTab === 8 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Subscription, Tier Limits & Payment Gateways</h3>
            <p className="text-xs text-slate-400">Flexible plans designed for Startups, Mid-size Companies, and Banking Enterprises.</p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
            🎁 Special Product Hunt Promotion: Activate your 10-Day Free Trial ($0 for 10 Days)! Get instant access to automated data sanitization and currency normalization.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-950 border border-indigo-500/30 p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold block mb-1">Professional Tier</span>
                <div className="text-3xl font-extrabold text-white">$19 <span className="text-xs text-slate-400 font-normal">USD / month</span></div>
                <p className="text-xs text-slate-400 mt-2">Designed for Small SaaS Startups & Developers.</p>
                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  <div>✓ 10-Day Free Trial Active ($0 Now)</div>
                  <div>✓ Usage Limit: Up to 1,000,000 Rows / Month</div>
                  <div>✓ Cloud Integration: AWS S3 / IAM Role Secure Stream</div>
                  <div>✓ PII Sanitization: AES-256 Masking & Anonymization</div>
                  <div>✓ Currency Suite: All Major World Currencies Supported</div>
                  <div>✓ Support: Email & In-App Multilingual AI Assistant</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <input type="email" defaultValue="global.data.sanitizer@gmail.com" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300" />
                <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition">
                  Start 10-Day Free Trial ($0)
                </button>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block mb-1">Enterprise & Bank On-Premise</span>
                <div className="text-3xl font-extrabold text-white">Custom <span className="text-xs text-slate-400 font-normal">/ SLA</span></div>
                <p className="text-xs text-slate-400 mt-2">For Banks, Fintech Agencies, and Multinationals.</p>
                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  <div>✓ Zero Persistence Certified</div>
                  <div>✓ Unlimited Processing: Unlimited Rows & Parallel Streams</div>
                  <div>✓ On-Premise Deployment: Dedicated Docker & Kubernetes Helm Charts</div>
                  <div>✓ SLA Guarantee: 99.99% Uptime Guarantee with Custom DPA</div>
                  <div>✓ Dedicated Support: 24/7 Security Operations Team</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition">
                  Request Enterprise On-Premise...
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 9: User Feedback */}
      {activeTab === 9 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-white">User Feedback & Enterprise Reviews</h3>
          <textarea placeholder="Share your experience with our PII sanitization and speed..." className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none"></textarea>
          <button className="px-4 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl">Submit Enterprise Feedback</button>
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
