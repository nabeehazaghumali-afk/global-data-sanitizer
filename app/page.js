"use client";
import { useState } from "react";
import { sanitizeData, fetchAuditTrail } from "@/services/api";

export default function EnterpriseDashboard() {
  const [inputData, setInputData] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [result, setResult] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSanitize = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await sanitizeData(inputData, "eu-central-1", apiKey);
      setResult(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAuditLogs = async () => {
    try {
      const data = await fetchAuditTrail(apiKey);
      setAuditLogs(data.audit_trail || []);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#0f172a", color: "#f8fafc", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #334155", paddingBottom: "20px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Global Data Sanitizer & Currency Normalization</h1>
        <p style={{ color: "#94a3b8" }}>Enterprise Zero Trust PII Masking & Compliance Engine</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <section style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
          <h2>Data Sanitization Portal</h2>
          <form onSubmit={handleSanitize} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
            <label>
              Enterprise API Key:
              <input 
                type="password" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                placeholder="nabeeha-key-2026"
                style={{ width: "100%", padding: "8px", marginTop: "5px", background: "#0f172a", border: "1px solid #475569", color: "#fff" }}
                required
              />
            </label>
            <label>
              Raw Payload (Contains PII):
              <textarea 
                rows="5" 
                value={inputData} 
                onChange={(e) => setInputData(e.target.value)} 
                placeholder="Enter text with emails, phone numbers, or cards..."
                style={{ width: "100%", padding: "8px", marginTop: "5px", background: "#0f172a", border: "1px solid #475569", color: "#fff" }}
                required
              />
            </label>
            <button type="submit" disabled={loading} style={{ padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
              {loading ? "Processing Securely..." : "Sanitize Payload"}
            </button>
          </form>

          {result && (
            <div style={{ marginTop: "20px", background: "#0f172a", padding: "15px", borderRadius: "6px", border: "1px solid #22c55e" }}>
              <h3 style={{ color: "#22c55e" }}>Sanitized Output:</h3>
              <p style={{ background: "#1e293b", padding: "10px", borderRadius: "4px" }}>{result.sanitized_output}</p>
            </div>
          )}
        </section>

        <section style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
          <h2>Compliance Audit Logs</h2>
          <button onClick={loadAuditLogs} style={{ marginTop: "15px", padding: "8px 15px", background: "#475569", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Fetch Live Database Logs
          </button>
          
          <div style={{ marginTop: "15px", maxHeight: "400px", overflowY: "auto" }}>
            {auditLogs.map((log) => (
              <div key={log.id} style={{ background: "#0f172a", padding: "10px", marginBottom: "10px", borderRadius: "4px", borderLeft: "4px solid #38bdf8" }}>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>{log.timestamp}</span>
                <p style={{ margin: "5px 0", fontWeight: "bold", color: "#38bdf8" }}>{log.event_type}</p>
                <p style={{ fontSize: "14px", margin: 0 }}>{log.details}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
