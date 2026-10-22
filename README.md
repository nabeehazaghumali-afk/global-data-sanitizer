# 🌍 Global Data Sanitizer & Enterprise Ingestion Engine

An enterprise-grade cloud data sanitization and PII masking pipeline built with Streamlit, designed for secure data handling, compliance tracking, and zero-trust ingestion[cite: 1, 3, 4, 5].

## 🚀 Key Features
- **Zero Trust IAM & OIDC Integration:** Secure temporary session tokens via web identity federation without exposing master static keys[cite: 3].
- **Compliance & Risk Scorecard:** Built-in tracking for GDPR, HIPAA, and SOC2 standards[cite: 4, 5].
- **Multi-Region Compliance & Currency Normalization:** Automated risk scorecards and data formatting suites[cite: 4, 5].
- **On-Premise Docker Support:** Easily containerized for secure internal bank and corporate deployments[cite: 3].
- **Multilingual AI Assistant:** Built-in assistant to help with data cleaning and pipeline setup[cite: 1, 2, 3].

## 🛠️ Tech Stack
- **Frontend / UI:** Streamlit[cite: 1, 5]
- **Data Processing:** Python, Pandas, NumPy[cite: 6]
- **Deployment:** Streamlit Cloud & Docker[cite: 3, 5]

## 🐳 Run via Docker (On-Premise)
To run this application securely on your local or private server:
```bash
git clone [https://github.com/nabeehazaghumali-afk/global-data-sanitizer.git](https://github.com/nabeehazaghumali-afk/global-data-sanitizer.git)
cd global-data-sanitizer
docker build -t global-data-sanitizer .
docker run -p 8501:8501 global-data-sanitizer
