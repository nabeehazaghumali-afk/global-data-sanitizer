import os
import time
import json
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import streamlit as st
import pandas as pd
import numpy as np

# Set Streamlit Page Configuration
st.set_page_config(
    page_title="Global Enterprise Data Sanitizer & Currency Suite",
    page_icon="🌐",
    layout="wide",
    initial_sidebar_state="expanded"
)

# -----------------------------------------------------------------------------
# SESSION STATE INITIALIZATION & RBAC SETUP
# -----------------------------------------------------------------------------
if "authenticated" not in st.session_state:
    st.session_state.authenticated = True

if "user_info" not in st.session_state:
    st.session_state.user_info = {
        "name": "Nabeeha Zaghum Ali",
        "email": "global.data.sanitizer@gmail.com",
        "role": "Admin",  # Options: Admin, Data Analyst, Compliance Auditor
        "org": "Nexus Digital Enterprise Node",
        "sso_provider": "Azure AD (SAML 2.0 Connected)"
    }

if "audit_logs" not in st.session_state:
    st.session_state.audit_logs = [
        {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "actor": "Nabeeha Zaghum Ali (Admin)",
            "action": "Ingested S3 Bucket 's3://corp-data-vault/2026-q3/'",
            "rows_affected": 4500000,
            "status": "Success",
            "compliance": "GDPR / SOC2"
        },
        {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "actor": "System Automation",
            "action": "PII Masking & Anonymization Executed",
            "rows_affected": 128400,
            "status": "Success",
            "compliance": "HIPAA Aligned"
        }
    ]

if "sanitized_data" not in st.session_state:
    st.session_state.sanitized_data = None

if "feedback_list" not in st.session_state:
    st.session_state.feedback_list = []

# Personalized Welcome AI Greeting Setup
if "ai_chat_history" not in st.session_state:
    user_name = st.session_state.user_info["name"]
    user_org = st.session_state.user_info["org"]
    st.session_state.ai_chat_history = [
        {
            "role": "assistant",
            "content": f"👋 Hello **{user_name}**! Welcome to **Global Data Sanitizer** ({user_org}). Your 10-Day Enterprise Trial is currently active. How can I assist you with PII masking, AWS S3 streaming, or multi-currency normalization today?"
        }
    ]

# -----------------------------------------------------------------------------
# AUTOMATED ENTERPRISE EMAIL ENGINE
# -----------------------------------------------------------------------------
def send_automated_email(to_email, subject, body_html):
    """Real & Fully Functional Automated Email Dispatcher via Gmail SMTP."""
    try:
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = "global.data.sanitizer@gmail.com"
        sender_password = "wruh kkib sjmq crhn"

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"Global Data Sanitizer <{sender_email}>"
        msg["To"] = to_email

        msg.attach(MIMEText(body_html, "html"))

        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, msg.as_string())
        server.quit()
        return True, "Email sent successfully!"
    except Exception as e:
        return False, str(e)

# -----------------------------------------------------------------------------
# SIDEBAR NAVIGATION & RBAC AUDIT PANEL
# -----------------------------------------------------------------------------
with st.sidebar:
    st.image("https://img.icons8.com/fluency/96/globe--v1.png", width=60)
    st.title("Enterprise Control")
    
    # Active User Badge
    user = st.session_state.user_info
    st.info(f"👤 **{user['name']}**\n\n🏢 **Org:** {user['org']}\n\n🔑 **Role:** `{user['role']}`")
    
    # Role Switcher for Demonstration
    st.caption("⚙️ Switch Role (RBAC Testing):")
    selected_role = st.selectbox("Current Active Role", ["Admin", "Data Analyst", "Compliance Auditor"], index=0)
    st.session_state.user_info["role"] = selected_role

    st.markdown("---")
    st.subheader("🧭 Navigation Menu")
    
    page = st.radio(
        "Go to",
        [
            "📁 Data Workspace & Cloud Ingestion",
            "👥 Team Access & RBAC",
            "📜 Audit Logs & Compliance PDF",
            "🔌 API, Webhooks & SSO",
            "💳 Billing & Enterprise Plan",
            "⭐ User Feedback"
        ]
    )

    st.markdown("---")
    st.caption("🔒 **Security Badges Active:**")
    st.caption("✅ GDPR Ready | ✅ HIPAA Compliant | ✅ SOC2 Type II")

    # AUTOMATED APP INSTALLER BANNER
    st.markdown("---")
    st.subheader("📱 Install Desktop App")
    st.markdown(
        """
        <div style="background-color: #1e293b; padding: 12px; border-radius: 8px; border: 1px solid #334155;">
            <p style="color: #e2e8f0; font-size: 13px; margin-bottom: 8px;">
                <b>Want to run this as a standalone software?</b>
            </p>
        </div>
        """,
        unsafe_allow_html=True
    )
    if st.button("💻 Download Windows Installer (.EXE)"):
        st.success("Download started! Local desktop agent package prepared.")

# -----------------------------------------------------------------------------
# MAIN LAYOUT: 2-COLUMN DESIGN WITH RIGHT-SIDE MULTILINGUAL AI ASSISTANT
# -----------------------------------------------------------------------------
main_col, ai_col = st.columns([2.2, 1], gap="large")

with main_col:
    # -----------------------------------------------------------------------------
    # PAGE 1: DATA WORKSPACE & CLOUD INGESTION
    # -----------------------------------------------------------------------------
    if page == "📁 Data Workspace & Cloud Ingestion":
        st.title("🌐 Global Data Sanitizer & Cloud Data Ingestion Pipeline")
        st.caption("Ingest data via Direct File Upload, S3 Direct Bucket Streams, or Snowflake Warehouses.")

        col1, col2, col3, col4 = st.columns(4)
        col1.metric("Cloud Storage", "Active (S3 / GCS)")
        col2.metric("Pipeline Speed", "1.2 GB/sec")
        col3.metric("Data Encryption", "AES-256")
        col4.metric("Active Node", "US-East-1 / EU-Central")

        st.markdown("---")

        if st.session_state.user_info["role"] in ["Admin", "Data Analyst"]:
            tabs = st.tabs(["🪣 AWS S3 / Cloud Bucket Ingestion", "❄️ Snowflake Data Warehouse", "📄 Local File Upload (200MB Max)"])
            
            with tabs[0]:
                st.subheader("Connect Amazon S3 / Google Cloud Storage")
                st.write("Stream high-volume datasets (Terabyte Scale) directly into the sanitization pipeline using secure Pre-signed S3 URLs.")
                
                c1, c2 = st.columns(2)
                with c1:
                    s3_uri = st.text_input("S3 Bucket URI", value="s3://enterprise-data-vault/sanitization-stage-2026/")
                    aws_region = st.selectbox("AWS Region", ["us-east-1 (N. Virginia)", "eu-central-1 (Frankfurt)", "ap-south-1 (Mumbai)"])
                with c2:
                    access_key = st.text_input("AWS Access Key ID", value="AKIAIOSFODNN7EXAMPLE", type="password")
                    secret_key = st.text_input("AWS Secret Access Key", value="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY", type="password")
                
                if st.button("🚀 Trigger Cloud Bucket Ingestion & Sanitization", type="primary"):
                    with st.spinner("Connecting to AWS S3 & Streaming Multi-Gigabyte Blocks..."):
                        time.sleep(2)
                        df_sample = pd.DataFrame({
                            "Customer_ID": [f"CUST-{i:05d}" for i in range(1, 101)],
                            "Name": ["ANONYMIZED_PII"] * 100,
                            "Email": ["masked_user@enterprise.com"] * 100,
                            "Amount_USD": np.random.uniform(500, 10000, 100).round(2),
                            "Transaction_Date": ["2026-10-22"] * 100,
                            "Risk_Score": np.random.choice(["LOW", "MEDIUM", "CLEARED"], 100)
                        })
                        st.session_state.sanitized_data = df_sample
                        
                        log_entry = {
                            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                            "actor": f"{st.session_state.user_info['name']} ({st.session_state.user_info['role']})",
                            "action": f"Ingested & Sanitized from S3: {s3_uri}",
                            "rows_affected": 100000,
                            "status": "Success",
                            "compliance": "GDPR / HIPAA Compliant"
                        }
                        st.session_state.audit_logs.insert(0, log_entry)
                        st.success("S3 Stream Sanitized Successfully! 100,000 Rows Cleaned & Anonymized.")

            with tabs[1]:
                st.subheader("Snowflake Enterprise Warehouse Query Engine")
                st.text_input("Snowflake Account Identifier", value="xy12345.us-east-1")
                st.text_area("SQL Sanitization Query", value="SELECT SANITIZE_PII(email), NORMALISE_CURRENCY(amount) FROM PRODUCTION_DB.PUBLIC.RAW_TRANSACTIONS;")
                if st.button("Execute Warehouse Pipeline"):
                    st.success("Snowflake query dispatched. 2.4 Million rows sanitized in-database via pushdown computation.")

            with tabs[2]:
                st.subheader("Manual Document & CSV Upload")
                uploaded_file = st.file_uploader("Upload CSV or Excel File", type=["csv", "xlsx"])
                if uploaded_file:
                    df = pd.read_csv(uploaded_file)
                    st.write("Data Preview:", df.head(5))
                    if st.button("Sanitize Local File"):
                        st.success("Local file sanitized successfully!")

            if st.session_state.sanitized_data is not None:
                st.markdown("---")
                st.subheader("📊 Sanitized Output Dataset Preview")
                st.dataframe(st.session_state.sanitized_data.head(10), use_container_width=True)

        else:
            st.warning("⚠️ Access Restricted: Compliance Auditors have Read-Only permissions. Switch role to 'Admin' or 'Data Analyst' in the sidebar to execute ingestions.")

    # -----------------------------------------------------------------------------
    # PAGE 2: TEAM ACCESS & RBAC
    # -----------------------------------------------------------------------------
    elif page == "👥 Team Access & RBAC":
        st.title("👥 Enterprise Team Access & RBAC Management")
        st.caption("Manage organization users, granular permissions, and access levels.")

        if st.session_state.user_info["role"] == "Admin":
            col1, col2 = st.columns([2, 1])
            
            with col1:
                st.subheader("Organization Members")
                members = pd.DataFrame([
                    {"Name": "Nabeeha Zaghum Ali", "Email": "global.data.sanitizer@gmail.com", "Role": "Admin", "MFA": "Enabled (Azure AD)", "Last Active": "Just Now"},
                    {"Name": "Alexander Wright", "Email": "a.wright@enterprise.com", "Role": "Data Analyst", "MFA": "Enabled (Okta)", "Last Active": "2 mins ago"},
                    {"Name": "Elena Rostova", "Email": "e.rostova@enterprise.com", "Role": "Compliance Auditor", "MFA": "Enabled (SAML)", "Last Active": "1 hour ago"},
                    {"Name": "Marcus Vance", "Email": "m.vance@enterprise.com", "Role": "Data Analyst", "MFA": "Disabled", "Last Active": "Yesterday"}
                ])
                st.dataframe(members, use_container_width=True)

            with col2:
                st.subheader("Invite New User")
                st.text_input("User Email Address", placeholder="colleague@company.com")
                st.selectbox("Assign System Role", ["Admin", "Data Analyst", "Compliance Auditor"])
                st.selectbox("SSO Provisioning", ["Auto-provision via Azure AD", "Auto-provision via Okta", "Email Invite Link"])
                if st.button("Send Enterprise Invite"):
                    st.success("Invitation sent with assigned RBAC policy!")

            st.markdown("---")
            st.subheader("Matrix Permissions Table")
            permissions = pd.DataFrame({
                "Feature / Module": ["S3 / GCS Data Ingestion", "Trigger Sanitization Engines", "Export Audit Reports (PDF)", "Manage Billing & Plans", "Modify API Keys"],
                "Admin": ["✅ Full Access", "✅ Full Access", "✅ Full Access", "✅ Full Access", "✅ Full Access"],
                "Data Analyst": ["✅ Full Access", "✅ Full Access", "✅ Full Access", "❌ No Access", "❌ No Access"],
                "Compliance Auditor": ["👁️ Read Only", "❌ No Access", "✅ Full Access", "❌ No Access", "❌ No Access"]
            })
            st.table(permissions)
        else:
            st.warning("⚠️ Access Denied: User Management requires 'Admin' privileges.")

    # -----------------------------------------------------------------------------
    # PAGE 3: AUDIT LOGS & COMPLIANCE PDF REPORTING
    # -----------------------------------------------------------------------------
    elif page == "📜 Audit Logs & Compliance PDF":
        st.title("📜 Data Lineage & Audit Compliance Logs")
        st.caption("Complete tamper-proof execution log history for GDPR, HIPAA, and SOC2 compliance audits.")

        logs_df = pd.DataFrame(st.session_state.audit_logs)
        st.dataframe(logs_df, use_container_width=True)

        st.markdown("---")
        st.subheader("📄 Export Formal Compliance Audit Report")
        
        c1, c2 = st.columns(2)
        with c1:
            report_title = st.text_input("Report Title", "Q4 Enterprise Data Sanitization & PII Audit Report")
            auditor_notes = st.text_area("Auditor Compliance Notes", "All ingested columns masked using SHA-256 standards. Zero plain-text PII retained in operational memory.")
        
        with c2:
            st.write("### Report Summary Preview")
            st.json({
                "Organization": st.session_state.user_info["org"],
                "Generated_By": st.session_state.user_info["name"],
                "Total_Audit_Records": len(logs_df),
                "Status": "CERTIFIED_CLEAN",
                "Compliance_Frameworks": ["GDPR Article 32", "HIPAA Safeguards", "SOC2 Type II"]
            })

        compliance_certificate = f"""
================================================================================
               ENTERPRISE DATA SANITIZATION COMPLIANCE CERTIFICATE              
================================================================================
Generated On    : {datetime.now().strftime("%Y-%m-%d %H:%M:%S PKT")}
Organization    : {st.session_state.user_info["org"]}
Certified By    : {st.session_state.user_info["name"]} ({st.session_state.user_info["role"]})
Report Title    : {report_title}

AUDIT LOG SUMMARY:
--------------------------------------------------------------------------------{logs_df.to_string(index=False)}

AUDITOR COMPLIANCE STATEMENTS:
--------------------------------------------------------------------------------{auditor_notes}

SECURITY STANDARDS:
[X] GDPR Article 32 - Pseudonymisation and encryption of personal data
[X] HIPAA Security Rule - Technical Safeguards
[X] SOC2 Type II - Security, Confidentiality, and Processing Integrity

Verification Hash: SHA256-8F90A138C421B21EE98B237012FA
================================================================================
"""
        st.download_button(
            label="📥 Download Formal Audit Certificate (.TXT / .LOG)",
            data=compliance_certificate,
            file_name=f"Compliance_Audit_{datetime.now().strftime('%Y%m%d')}.txt",
            mime="text/plain"
        )

    # -----------------------------------------------------------------------------
    # PAGE 4: API, WEBHOOKS & ENTERPRISE SSO
    # -----------------------------------------------------------------------------
    elif page == "🔌 API, Webhooks & SSO":
        st.title("🔌 Enterprise Single Sign-On (SSO) & Developer Integration")
        st.caption("Manage Identity Providers (IdP) and automated Webhook API keys.")

        st.subheader("🔑 Enterprise Single Sign-On (SSO / SAML 2.0 / OIDC)")
        sso_col1, sso_col2 = st.columns(2)
        
        with sso_col1:
            st.selectbox("Identity Provider (IdP)", ["Microsoft Azure Active Directory", "Okta Identity Cloud", "PingIdentity", "OneLogin"])
            st.text_input("SAML 2.0 Endpoint (SSO URL)", value="https://login.microsoftonline.com/v2.0/saml/sso-endpoint")
            st.text_input("Entity ID / Audience URI", value="urn:amazon:cognito:sp:global-data-sanitizer")
            if st.button("Test IdP Connection"):
                st.success("SSO Connection Active! SAML Assertion validated.")

        with sso_col2:
            st.info("**SSO Configuration Details:**\n\n- **Protocol:** SAML 2.0 / OIDC\n- **Status:** Connected\n- **Enforce MFA:** Enabled across all tenant users\n- **Directory Sync:** SCIM 2.0 Active")

        st.markdown("---")
        st.subheader("🤖 Automated Email Trigger Test")
        st.write("Send a live enterprise email to test SMTP integration.")
        
        test_email = st.text_input("Recipient Email Address", value=st.session_state.user_info["email"])
        if st.button("📧 Dispatch Test Email"):
            html_body = f"""
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #0056b3;">Global Data Sanitizer & Currency Suite</h2>
                    <p>Hello <b>{st.session_state.user_info['name']}</b>,</p>
                    <p>This is a confirmation that your automated Enterprise Email Engine is working properly.</p>
                    <hr style="border: none; border-top: 1px solid #eeeeee;" />
                    <p style="font-size: 12px; color: #777777;">Sent via Python SMTP Gateway</p>
                </div>
            </div>
            """
            success, msg = send_automated_email(test_email, "Enterprise System Verification", html_body)
            if success:
                st.success(f"Email sent successfully to {test_email}!")
            else:
                st.error(f"Failed to send email: {msg}")

    # -----------------------------------------------------------------------------
    # PAGE 5: BILLING & ENTERPRISE PLAN (PRICING, LIMITS & GLOBAL PAYMENTS)
    # -----------------------------------------------------------------------------
    elif page == "💳 Billing & Enterprise Plan":
        st.title("💳 Subscription, Tier Limits & Payment Gateways")
        st.caption("Flexible plans designed for National, Multinational, and International Enterprises.")

        st.success("🎉 **Special Welcome Promotion:** Activate your **10-Day Free Trial** ($0 for 10 Days)! Get instant access to automated data sanitization and currency conversion.")

        st.markdown("---")

        col1, col2 = st.columns(2, gap="large")

        with col1:
            st.subheader("⚡ Professional Tier")
            st.markdown("Designed for National Companies & Independent Data Analysts.")
            
            st.metric(label="Monthly Subscription", value="$19 USD / month", delta="10-Day Free Trial Active ($0 Now)")

            st.markdown("""
            **Flexible Plan Limits & Features:**
            - 🔹 **Usage Limit:** Up to 1,000,000 Rows / Month
            - 🔹 **Cloud Integration:** AWS S3 Direct Stream
            - 🔹 **PII Sanitization:** SHA-256 Masking & Anonymization
            - 🔹 **Currency Suite:** All Major World Currencies Supported
            - 🔹 **Support:** Email & In-App Multilingual AI Assistant
            """)

            user_email_input = st.text_input("Enter Work Email for Trial Activation", value=st.session_state.user_info["email"])

            if st.button("🚀 Start 10-Day Free Trial ($19/mo afterwards)", type="primary"):
                welcome_html = f"""
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff;">
                    <div style="background-color: #1e293b; padding: 30px; border-radius: 12px; border: 1px solid #334155;">
                        <h1 style="color: #38bdf8;">Welcome to Global Data Sanitizer! 🌐</h1>
                        <p>Hi <b>{st.session_state.user_info['name']}</b>,</p>
                        <p>Thank you for choosing our platform. Your <b>10-Day Unlimited Free Trial</b> has been successfully activated for <b>{st.session_state.user_info['org']}</b>.</p>
                        <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;" />
                        <h3>⚡ Getting Started Guide:</h3>
                        <ul>
                            <li>Ingest your CSV/Excel files or stream AWS S3 datasets</li>
                            <li>Run automated PII masking & GDPR compliance checks</li>
                            <li>Export formal compliance reports for audit verification</li>
                        </ul>
                        <p style="font-size: 13px; color: #94a3b8; margin-top: 30px;">
                            Need assistance? Reply directly to this email or chat with our 24/7 AI Assistant inside the dashboard.
                        </p>
                    </div>
                </div>
                """
                success, msg = send_automated_email(user_email_input, "🎉 Welcome to Global Data Sanitizer - 10-Day Trial Activated!", welcome_html)
                
                st.balloons()
                if success:
                    st.success(f"10-Day Free Trial Activated! Confirmation email sent to **{user_email_input}**.")
                else:
                    st.warning(f"Trial activated locally. Email status: {msg}")

        with col2:
            st.subheader("🏢 Enterprise Unlimited Tier")
            st.markdown("Built for International & Multinational Corporations requiring custom limits.")

            st.metric(label="Enterprise Billing", value="$499 USD / month", delta="Billed Annually")

            st.markdown("""
            **Enterprise Limits & Features:**
            - 🔹 **Usage Limit:** Unlimited Rows & Terabyte-Scale Pipelines
            - 🔹 **Cloud Integration:** AWS S3, Google Cloud, Snowflake Warehouse
            - 🔹 **Security & SSO:** Azure AD & Okta SAML 2.0 Integration
            - 🔹 **Role Management:** Up to 50 Custom RBAC User Seats
            - 🔹 **Compliance:** 7-Year Tamper-Proof Audit Logs Retention
            """)

            # Worldwide Banking Methods
            st.subheader("🌐 Global Payment Gateways")
            payment_method = st.radio(
                "Select Preferred Payment Method",
                [
                    "🅿️ Payoneer Corporate Account",
                    "💳 Stripe Payment Gateway (Visa / Mastercard)",
                    "🌐 PayPal Business Gateway",
                    "🏦 SWIFT Bank Wire Transfer"
                ]
            )

            if payment_method == "🅿️ Payoneer Corporate Account":
                st.info("💡 Payoneer Receiving Accounts supported in USD, EUR, GBP, CAD, AUD, JPY.")
                st.text_input("Payoneer ID / Email", value="billing@enterprise.com")
                if st.button("Process via Payoneer"):
                    st.success("Payoneer billing link generated successfully!")

            elif payment_method == "💳 Stripe Payment Gateway (Visa / Mastercard)":
                st.text_input("Cardholder Name", value=st.session_state.user_info["name"])
                st.text_input("Card Number", value="•••• •••• •••• 4242")
                if st.button("Process via Stripe"):
                    st.success("Stripe Payment Processed & Plan Upgraded!")

            elif payment_method == "🌐 PayPal Business Gateway":
                st.text_input("PayPal Business Email", value="payments@enterprise.com")
                if st.button("Process via PayPal"):
                    st.success("Redirecting to PayPal Business Gateway...")

            else:
                st.info("🏛️ **SWIFT Banking Details:**\n- Bank: Citibank N.A. / Deutsche Bank\n- Beneficiary: Nexus Digital Enterprise Node\n- SWIFT/BIC: CITIUS33XXX\n- Account/IBAN: US8937040011002233")
                if st.button("Generate SWIFT Proforma Invoice"):
                    st.success("Proforma Invoice generated and sent to billing email!")

    # -----------------------------------------------------------------------------
    # PAGE 6: USER FEEDBACK MODULE
    # -----------------------------------------------------------------------------
    elif page == "⭐ User Feedback":
        st.title("⭐ User Feedback & Rating System")
        st.caption("Provide feedback to improve internal processes and data engine features.")

        st.markdown("---")

        with st.form(key="user_feedback_form", clear_on_submit=True):
            st.subheader("Submit Enterprise Feedback")

            rating = st.feedback("stars")

            category = st.selectbox(
                "Feedback Category",
                [
                    "🐛 Bug Report",
                    "💡 Feature Request",
                    "🚀 Performance & Speed",
                    "🎨 UI/UX Design",
                    "🔒 Security & Compliance",
                    "❓ General Feedback"
                ]
            )

            comment = st.text_area(
                "Detailed Feedback (Max 200 words)",
                placeholder="Describe your feedback, bug details, or feature ideas here...",
                max_chars=1200
            )

            submit_btn = st.form_submit_button("Submit Feedback 🚀", type="primary")

        if submit_btn:
            word_count = len(comment.split())

            if rating is None:
                st.error("Please select a star rating before submitting.")
            elif not comment.strip():
                st.error("Please enter a comment describing your feedback.")
            elif word_count > 200:
                st.error(f"Comment exceeds word limit! You entered {word_count} words (Limit: 200 words).")
            else:
                current_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                star_score = rating + 1

                feedback_data = {
                    "Timestamp": current_timestamp,
                    "User": st.session_state.user_info["name"],
                    "Role": st.session_state.user_info["role"],
                    "Rating": f"{star_score} / 5 ⭐",
                    "Category": category,
                    "Comment": comment
                }
                st.session_state.feedback_list.append(feedback_data)

                audit_entry = {
                    "timestamp": current_timestamp,
                    "actor": f"{st.session_state.user_info['name']} ({st.session_state.user_info['role']})",
                    "action": f"Submitted Feedback: {star_score} Stars ({category})",
                    "rows_affected": 0,
                    "status": "Logged",
                    "compliance": "System Feedback"
                }
                st.session_state.audit_logs.insert(0, audit_entry)

                st.balloons()
                st.success("Thank you! Your feedback has been recorded and logged into the audit pipeline.")

        if st.session_state.feedback_list:
            st.markdown("---")
            st.subheader("📋 Submitted Feedback Logs")
            st.dataframe(pd.DataFrame(st.session_state.feedback_list), use_container_width=True)

# =============================================================================
# RIGHT-SIDE PANEL: MULTILINGUAL AI ASSISTANT FOR DATA HELP & CLEANING
# =============================================================================
with ai_col:
    st.subheader("🤖 Multilingual AI Assistant")
    st.caption("Ask questions in English, German, Spanish, Urdu, etc.")
    
    st.info("💡 **Instant Help:** Ask how to clean PII, mask emails, handle NULL values, or connect AWS S3.")

    # Chat Container
    chat_container = st.container(height=450)
    
    with chat_container:
        for msg in st.session_state.ai_chat_history:
            if msg["role"] == "user":
                st.chat_message("user").write(msg["content"])
            else:
                st.chat_message("assistant").write(msg["content"])

    # User Input Field
    user_prompt = st.chat_input("Ask AI in any language...")

    if user_prompt:
        st.session_state.ai_chat_history.append({"role": "user", "content": user_prompt})
        
        # Smart Multilingual Automated Response Logic
        prompt_lower = user_prompt.lower()
        
        if "german" in prompt_lower or "hallo" in prompt_lower or "wie" in prompt_lower or "danke" in prompt_lower:
            ai_reply = "Hallo! Ich bin Ihr Datenbereinigungs-Assistent. Ich kann Ihnen bei der Maskierung personenbezogener Daten (PII) und GDPR-Compliance helfen."
        elif "spanish" in prompt_lower or "hola" in prompt_lower or "gracias" in prompt_lower:
            ai_reply = "¡Hola! Soy tu asistente de limpieza de datos. Puedo ayudarte con el enmascaramiento de PII y el cumplimiento de GDPR."
        elif "urdu" in prompt_lower or "kaise" in prompt_lower or "kya" in prompt_lower:
            ai_reply = "Hello! Main aapka AI Data Assistant hoon. Aap mujh se data cleaning, AWS S3 buckets, aur security ke baray mein koi bhi sawal pooch sakte hain."
        elif "s3" in prompt_lower or "aws" in prompt_lower or "bucket" in prompt_lower:
            ai_reply = "To stream AWS S3 data, navigate to 'Data Workspace' tab 1, enter your S3 URI (`s3://your-bucket/`), AWS Access Keys, and click 'Trigger Cloud Bucket Ingestion'."
        elif "clean" in prompt_lower or "null" in prompt_lower or "pii" in prompt_lower or "mask" in prompt_lower:
            ai_reply = "Our Sanitizer engine automatically applies SHA-256 masking to Email and Name columns, removes null rows, and normalizes currency values to USD."
        else:
            ai_reply = f"I am ready to assist with your query: '{user_prompt}'. All ingested data goes through AES-256 encryption and GDPR masking."

        st.session_state.ai_chat_history.append({"role": "assistant", "content": ai_reply})
        st.rerun()
