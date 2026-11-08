import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Global Data Sanitizer & Currency Normalization',
  description: 'Zero Trust Enterprise PII Masking Engine',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  const modules = [
    { id: 0, title: "1. Overview & Sanitizer" },
    { id: 1, title: "2. Multi-Region Masking" },
    { id: 2, title: "3. Currency Normalization" },
    { id: 3, title: "4. Compliance Audit" },
    { id: 4, title: "5. Database Audit Trails" },
    { id: 5, title: "6. Masking Rules & RegEx" },
    { id: 6, title: "7. API & Webhook Keys" },
    { id: 7, title: "8. Batch Payload Processing" },
    { id: 8, title: "9. Export Reports" },
    { id: 9, title: "10. Security Settings" }
  ];

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 flex h-screen overflow-hidden font-sans">
        {/* Sidebar */}
        <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-6 hidden md:flex">
          <div>
            <div className="mb-6">
              <h1 className="text-base font-bold text-white tracking-wide">Data Sanitizer Engine</h1>
              <p className="text-[11px] text-indigo-400 font-medium mt-0.5">Zero-Storage Local Processing</p>
            </div>
            
            <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
              {modules.map((m) => (
                <Link
                  key={m.id}
                  href={`/?tab=${m.id}`}
                  className="flex items-center px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  <span>{m.title}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="bg-emerald-950/30 border border-emerald-500/20 p-2.5 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">Zero-Cloud Storage</span>
              <p className="text-[11px] text-slate-400">100% Client-Side Private Sanitization.</p>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 px-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>System Status: Online</span>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto p-4 lg:p-6 bg-slate-950">
          {children}
        </main>
      </body>
    </html>
  );
}
