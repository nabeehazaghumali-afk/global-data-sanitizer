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

st.set_page_config(page_title="Global Data Sanitizer", layout="wide")
st.title("🌐 Global Data Sanitizer")
st.write("Zero Data Retention - Secure In-Memory Data Cleaning")

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
    except Exception as e:
        st.error(f"An error occurred while processing the file: {e}")
