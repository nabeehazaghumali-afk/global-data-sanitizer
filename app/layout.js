import './globals.css';

export const metadata = {
  title: 'Global Data Sanitizer & Currency Normalization',
  description: 'Enterprise Zero Trust PII Masking & Compliance Engine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex">
        {/* Left Sidebar Navigation */}
        <aside className="w-72 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between hidden md:flex">
          <div>
            <div className="mb-6 px-2">
              <h1 className="font-bold text-lg text-indigo-400">Data Sanitizer Engine</h1>
              <p className="text-xs text-slate-400">Enterprise PII & Compliance</p>
            </div>
            
            <nav className="space-y-1 text-sm">
              <a href="/" className="block px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-400 font-medium">1. Overview Engine</a>
              <a href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300">2. Multi-Region Masking</a>
              <a href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300">3. Currency Normalization</a>
              <a href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300">4. Compliance Audit</a>
              <a href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300">5. Database Audit Trails</a>
              <a href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300">6. Masking Rules & RegEx</a>
              <a href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300">7. API & Webhook Keys</a>
              <a href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300">8. Batch Payload Processing</a>
              <a href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300">9. Export Reports</a>
              <a href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300">10. Security Settings</a>
              
              {/* Left Sidebar AI Assistant Highlight */}
              <div className="pt-4 mt-4 border-t border-slate-800">
                <div className="p-3 bg-gradient-to-r from-indigo-900/40 to-violet-900/40 border border-indigo-500/30 rounded-xl">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Multilingual AI</span>
                  </div>
                  <p className="text-xs text-slate-300">Ask questions or sanitize data in Urdu, English & more.</p>
                </div>
              </div>
            </nav>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
            <span className="text-xs text-slate-300 font-mono">System Status: Online</span>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
