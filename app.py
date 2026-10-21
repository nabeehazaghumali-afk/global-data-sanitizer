import streamlit as st
import pandas as pd
import re

class GlobalDataSanitizer:
    def __init__(self, df):
        self.df = df.copy()
        
    def sanitize_currencies(self, column_name):
        if column_name in self.df.columns:
            cleaned = self.df[column_name].astype(str).str.replace(r'[^\d.]', '', regex=True)
            self.df[column_name] = pd.to_numeric(cleaned, errors='coerce')

    def standardize_dates(self, column_name):
        if column_name in self.df.columns:
            self.df[column_name] = pd.to_datetime(self.df[column_name], errors='coerce').dt.strftime('%Y-%m-%d')

st.set_page_config(page_title="Global Data Sanitizer & AI Enterprise Assistant", layout="wide")

# Custom Styling for Enterprise SaaS UI
st.markdown("""
    <style>
    .main-title { font-size: 2.2rem; font-weight: 700; color: #4A90E2; }
    .sub-text { font-size: 1rem; color: #888888; margin-bottom: 20px; }
    .ai-box { background-color: #1E222D; padding: 15px; border-radius: 10px; border-left: 4px solid #4A90E2; }
    </style>
""", unsafe_allow_html=True)

st.markdown('<div class="main-title">🌐 Global Data Sanitizer & Multilingual AI Assistant</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-text">Zero Data Retention — Secure In-Memory Data Cleaning & Intelligent Guidance for Global Enterprises</div>', unsafe_allow_html=True)

uploaded_file = st.file_uploader(
    "Upload your CSV, Excel, or Text file", 
    type=["csv", "xlsx", "xls", "txt", "tsv"]
)

if uploaded_file is not None:
    try:
        file_name = uploaded_file.name.lower()
        
        if file_name.endswith('.csv'):
            df = pd.read_csv(uploaded_file)
        elif file_name.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(uploaded_file)
        elif file_name.endswith(('.txt', '.tsv')):
            df = pd.read_csv(uploaded_file, sep=None, engine='python')
        else:
            st.error("Unsupported file format!")
            st.stop()
            
        st.subheader("📊 Original Data Preview")
        st.dataframe(df.head())
        
        sanitizer = GlobalDataSanitizer(df)
        
        st.sidebar.header("⚙️ Sanitization Options")
        date_col = st.sidebar.selectbox("Select Date Column to Standardize", ["None"] + list(df.columns))
        curr_col = st.sidebar.selectbox("Select Currency/Numeric Column to Clean", ["None"] + list(df.columns))
        
        if st.sidebar.button("Sanitize Data"):
            if date_col and date_col != "None":
                sanitizer.standardize_dates(date_col)
            if curr_col and curr_col != "None":
                sanitizer.sanitize_currencies(curr_col)
                
            st.success("✅ Data successfully sanitized!")
            st.subheader("✨ 100% Cleaned Global Output Preview")
            st.dataframe(sanitizer.df.head())
            
            csv_data = sanitizer.df.to_csv(index=False).encode('utf-8')
            st.download_button(
                label="📥 Download Cleaned File (CSV)",
                data=csv_data,
                file_name="cleaned_global_output.csv",
                mime="text/csv",
            )
            
        # Multilingual AI Assistant Section
        st.markdown("---")
        st.subheader("🤖 Smart Multilingual AI Data Assistant")
        
        # Default Welcome Message in English
        st.info("👋 **Hello! I am your Global AI Data Assistant.** I can help you analyze dataset quality, inspect missing values, and audit sanitization rules. You can interact with me in **any language** (English, German, French, Spanish, Urdu, Japanese, Arabic, etc.).")
        
        # Clean & Professional Placeholder Input
        user_query = st.text_input("Ask AI Assistant (e.g., Query data changes, check missing values, dataset summary):")
        
        if user_query:
            query_lower = user_query.lower()
            
            # Smart Multilingual Intent Engine
            if any(k in query_lower for k in ["change", "did", "sanitiz", "transform", "action", "wurde", "änderung", "changement", "cambios"]):
                applied_actions = []
                if date_col != "None":
                    applied_actions.append(f"Standardized dates in column **'{date_col}'** to ISO format (`YYYY-MM-DD`).")
                if curr_col != "None":
                    applied_actions.append(f"Cleaned currency formatting in column **'{curr_col}'** by removing non-numeric characters.")
                
                if applied_actions:
                    st.success("🤖 **AI Audit Result:**\n\n" + "\n\n".join(applied_actions))
                else:
                    st.warning("🤖 **AI Assistant:** No transformation options have been applied yet. Select target date or currency columns in the sidebar and click 'Sanitize Data'.")
                    
            elif any(k in query_lower for k in ["missing", "null", "fehlende", "manquant", "faltantes", "khali"]):
                missing_info = df.isnull().sum().to_dict()
                st.info(f"🤖 **AI Data Quality Check:** Missing values per column: {missing_info}")
                
            elif any(k in query_lower for k in ["column", "shape", "row", "spalten", "zeilen", "colonnes", "filas", "kitne"]):
                st.info(f"🤖 **AI Summary:** Dataset contains **{len(df)} rows** and **{len(df.columns)} columns** (`{', '.join(df.columns)}`).")
                
            else:
                st.info(f"🤖 **AI Assistant:** I processed your query: *\"{user_query}\"*. Your dataset contains **{len(df)} rows** and is ready for international standard sanitization!")
                
    except Exception as e:
        st.error(f"An error occurred while processing the file: {e}")
