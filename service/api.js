const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sanitizeData(textPayload, region, apiKey) {
  const response = await fetch(`${API_BASE_URL}/v1/sanitize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Enterprise-API-Key": apiKey,
    },
    body: JSON.stringify({ text_payload: textPayload, region }),
  });

  if (!response.ok) {
    throw new Error("Failed to sanitize data. Check API Key or payload.");
  }

  return response.json();
}

export async function fetchAuditTrail(apiKey) {
  const response = await fetch(`${API_BASE_URL}/v1/audit-trail`, {
    method: "GET",
    headers: {
      "X-Enterprise-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Unauthorized or failed to fetch audit logs.");
  }

  return response.json();
}
