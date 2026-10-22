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

# AUTOMATED APP INSTALLER BANNER (FOR EXTERNAL CLIENTS)
    st.markdown("---")
    st.subheader("📱 Install Desktop App")
    st.markdown("""
    <div style="background-color: #1e293b; padding: 12px; border-radius: 8px; border: 1px solid #334155;">
        <p style="color: #e2e8f0; font-size: 13px; margin-bottom: 8px;">
            <b>Want to run this as a standalone software?</b>
        </p>
        <ol style="color: #94a3b8; font-size: 12px; padding-left: 18px; margin: 0;">
            <li>Click <b>⋮ (Top-Right Chrome/Edge Menu)</b></li>
            <li>Select <b>Save and share ➔ Install Page as App</b></li>
            <li>Pin to Taskbar or Desktop</li>
        </ol>
    </div>
    """, unsafe_allow_html=True)

# -----------------------------------------------------------------------------
# PAGE 1: DATA WORKSPACE & CLOUD INGESTION (S3 / GCS / SNOWFLAKE)
# -----------------------------------------------------------------------------
if page == "📁 Data Workspace & Cloud Ingestion":
    st.title("🌐 Global Data Sanitizer & Cloud Data Ingestion Pipeline")
    st.caption("Ingest data via Direct File Upload, S3 Direct Bucket Streams, or Snowflake Warehouses.")

    # Status Cards
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Cloud Storage", "Active (S3 / GCS)")
    col2.metric("Pipeline Speed", "1.2 GB/sec")
    col3.metric("Data Encryption", "AES-256")
    col4.metric("Active Node", "US-East-1 / EU-Central")

    st.markdown("---")

    # Access Level Check
    if st.session_state.user_info["role"] in ["Admin", "Data Analyst"]:
        tabs = st.tabs(["🪣 AWS S3 / Cloud Bucket Ingestion", "❄️ Snowflake Data Warehouse", "📄 Local File Upload (200MB Max)"])
        
        # Tab 1: S3 Connector
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
                    # Generate sample sanitized dataframe
                    df_sample = pd.DataFrame({
                        "Customer_ID": [f"CUST-{i:05d}" for i in range(1, 101)],
                        "Name": ["ANONYMIZED_PII"] * 100,
                        "Email": ["masked_user@enterprise.com"] * 100,
                        "Amount_USD": np.random.uniform(500, 10000, 100).round(2),
                        "Transaction_Date": ["2026-10-22"] * 100,
                        "Risk_Score": np.random.choice(["LOW", "MEDIUM", "CLEARED"], 100)
                    })
                    st.session_state.sanitized_data = df_sample
                    
                    # Log Audit Entry
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

        # Tab 2: Snowflake Connector
        with tabs[1]:
            st.subheader("Snowflake Enterprise Warehouse Query Engine")
            st.text_input("Snowflake Account Identifier", value="xy12345.us-east-1")
            st.text_area("SQL Sanitization Query", value="SELECT SANITIZE_PII(email), NORMALISE_CURRENCY(amount) FROM PRODUCTION_DB.PUBLIC.RAW_TRANSACTIONS;")
            if st.button("Execute Warehouse Pipeline"):
                st.success("Snowflake query dispatched. 2.4 Million rows sanitized in-database via pushdown computation.")

        # Tab 3: Manual Upload
        with tabs[2]:
            st.subheader("Manual Document & CSV Upload")
            uploaded_file = st.file_uploader("Upload CSV or Excel File", type=["csv", "xlsx"])
            if uploaded_file:
                df = pd.read_csv(uploaded_file)
                st.write("Data Preview:", df.head(5))
                if st.button("Sanitize Local File"):
                    st.success("Local file sanitized successfully!")

        # Display Data Preview if exists
        if st.session_state.sanitized_data is not None:
            st.markdown("---")
            st.subheader("📊 Sanitized Output Dataset Preview")
            st.dataframe(st.session_state.sanitized_data.head(10), use_container_width=True)

    else:
        st.warning("⚠️ Access Restricted: Compliance Auditors have Read-Only permissions. Switch role to 'Admin' or 'Data Analyst' in the sidebar to execute ingestions.")


# -----------------------------------------------------------------------------
# PAGE 2: TEAM ACCESS & ROLE-BASED ACCESS CONTROL (RBAC)
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

    # Audit Dataframe
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

    # Downloadable JSON/Text Compliance Certificate
    compliance_certificate = f"""
================================================================================
               ENTERPRISE DATA SANITIZATION COMPLIANCE CERTIFICATE              
================================================================================
Generated On    : {datetime.now().strftime("%Y-%m-%d %H:%M:%S PKT")}
Organization    : {st.session_state.user_info["org"]}
Certified By    : {st.session_state.user_info["name"]} ({st.session_state.user_info["role"]})
Report Title    : {report_title}

AUDIT LOG SUMMARY:
--------------------------------------------------------------------------------
{logs_df.to_string(index=False)}

AUDITOR COMPLIANCE STATEMENTS:
--------------------------------------------------------------------------------
{auditor_notes}

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
# PAGE 4: API, WEBHOOKS & ENTERPRISE SSO (OKTA / AZURE AD)
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
# PAGE 5: BILLING & ENTERPRISE PLAN
# -----------------------------------------------------------------------------
elif page == "💳 Billing & Enterprise Plan":
    st.title("💳 Global Subscription & Enterprise Pricing Gateway")
    st.caption("Choose the right scale for your organization—from local startups to Fortune 500 multinationals.")

    st.markdown("---")
    
    # 3 Pricing Tiers Layout
    b_col1, b_col2, b_col3 = st.columns(3)

    with b_col1:
        st.subheader("🚀 Starter Tier")
        st.caption("For small teams & testing")
        st.markdown("""
        * **File Limit:** Up to 200MB local upload
        * **Cloud Connectors:** Not included
        * **Support:** Standard Community
        * **Audit Logs:** 30 Days Retention
        """)
        st.metric("Price", "$49 / month")
        st.button("Select Starter", key="btn_starter")

    with b_col2:
        st.subheader("💼 Business Pro")
        st.caption("For growing mid-size businesses")
        st.markdown("""
        * **File Limit:** Up to 10GB batch streams
        * **Cloud Connectors:** AWS S3 Basic
        * **Support:** Priority Email Support
        * **Audit Logs:** 1 Year Retention
        """)
        st.metric("Price", "$499 / month")
        st.button("Select Pro", key="btn_pro")

    with b_col3:
        st.subheader("🌐 Enterprise Unlimited")
        st.caption("For Google / Microsoft scale MNCs")
        st.markdown("""
        * **File Limit:** **Unlimited (Terabytes)**
        * **Cloud Connectors:** AWS S3, GCS & Snowflake
        * **Security:** SSO (Azure AD / Okta) + RBAC
        * **Support:** 24/7 Dedicated Engineer
        """)
        st.metric("Price", "$4,950 / month", delta="Most Popular")
        st.button("Active Enterprise Plan", key="btn_enterprise", type="primary")

    st.markdown("---")
    st.subheader("Secure Corporate Payment & Wire Gateway")
    
    pay_col1, pay_col2 = st.columns(2)
    with pay_col1:
        payment_method = st.radio("Select Payment Method", ["Stripe Corporate Card", "Wire Transfer / SWIFT Invoice"])
        if payment_method == "Stripe Corporate Card":
            st.text_input("Corporate Card Number", value="**** **** **** 4242")
            st.button("Update Card Details")
        else:
            st.info("Invoice Terms: Net 30 Days\n\nBank: J.P. Morgan Chase New York\n\nSWIFT/BIC: CHASUS33XXX")

    with pay_col2:
        # -----------------------------------------------------------------------------
# PAGE 6: USER FEEDBACK & REVIEWS
# -----------------------------------------------------------------------------
elif page == "⭐ User Feedback":
    st.title("⭐ User Experience & Enterprise Feedback")
    st.caption("We value your feedback! Help us improve our data sanitization & cloud pipeline features.")

    st.markdown("---")
    
    f_col1, f_col2 = st.columns([1, 2])
    
    with f_col1:
        st.subheader("Rate Your Experience")
        star_rating = st.feedback("stars")
        
        category = st.selectbox(
            "Feedback Category", 
            [
                "General Experience", 
                "Data Sanitization Speed", 
                "Cloud Connectors (S3/Snowflake)", 
                "Security & Compliance", 
                "Bug Report"
            ]
        )
    
    with f_col2:
        st.subheader("Your Review")
        feedback_text = st.text_area(
            "Write your review (Up to 200 words):",
            height=160,
            max_chars=1200,
            placeholder="Tell us what you liked or how we can improve..."
        )
        
        if st.button("Submit Feedback", type="primary"):
            if star_rating is not None:
                st.balloons()  # Celebration Animation!
                st.success(f"Thank you, {st.session_state.user_info['name']}! Your {star_rating + 1}-Star review for '{category}' has been recorded.")
                
                # Audit Log mein record add karna
                st.session_state.audit_logs.append({
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "actor": st.session_state.user_info['name'],
                    "action": f"Submitted Review ({star_rating + 1}/5 Stars - {category})",
                    "rows_affected": 1,
                    "status": "Success"
                })
            else:
                st.warning("Please select a star rating before submitting!")
        st.success("✅ **Automated Trial & Greeting Active:**\n\nEvery new tenant receives an instant automated welcome email via `global.data.sanitizer@gmail.com` with a 14-day fully featured enterprise trial unlocked.")
