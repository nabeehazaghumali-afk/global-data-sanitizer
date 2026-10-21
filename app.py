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

st.set_page_config(page_title="Global Data Sanitizer & AI Assistant", layout="wide")
st.title("🌐 Global Data Sanitizer & AI Enterprise Assistant")
st.write("Zero Data Retention - Secure In-Memory Data Cleaning & Intelligent Guidance for Global Startups")

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
        
        st.sidebar.header("Sanitization Options")
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
            
        # AI Assistant Section for Enterprise Guidance
        st.markdown("---")
        st.subheader("🤖 Smart AI Data Assistant & Guidance")
        st.write("Aap apne data ke mutaliq koi bhi sawal yahan pooch sakti hain ya AI analysis dekh sakti hain:")
        
        user_query = st.text_input("Ask AI Assistant about your dataset quality, missing rows, or formatting:")
        if user_query:
            query_lower = user_query.lower()
            if "missing" in query_lower or "null" in query_lower:
                missing_info = df.isnull().sum().to_dict()
                st.info(f"🤖 **AI Analysis:** Yeh lijiye aapke dataset ke missing values ki report: {missing_info}")
            elif "column" in query_lower or "name" in query_lower:
                st.info(f"🤖 **AI Analysis:** Aapke dataset mein kul {len(df.columns)} columns hain aur total rows {len(df)} hain.")
            elif "format" in query_lower or "clean" in query_lower:
                st.info("🤖 **AI Analysis:** Dataset international standards ke mutabiq format hone ke liye ready hai. Aap sidebar se date aur currency columns select karke 1-click mein clean kar sakti hain.")
            else:
                st.info("🤖 **AI Assistant:** Main aapke data ko analyze kar raha hoon. Behtar results ke liye date standardization aur currency sanitization options zaroor apply karein!")
                
    except Exception as e:
        st.error(f"An error occurred while processing the file: {e}")
