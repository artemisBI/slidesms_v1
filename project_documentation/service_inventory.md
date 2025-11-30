# Service Inventory & Infrastructure Checklist

This document serves as a central registry for all service providers, infrastructure components, and external APIs used in the SlideSMS project. It is designed to be readable by both the development team and AI assistants to understand the project's operational context.

## 🏗️ SlideSMS Application Architecture Overview

```
SlideSMS (the application)
├── Frontend Layer
│   ├── Marketing Site
│   │   ├── Vite (build tool)
│   │   ├── React (library)
│   │   └── Vercel (hosting - planned)
│   └── Web Application (planned)
│       ├── Next.js (framework)
│       └── Authentication UI
│
├── Backend Layer (planned)
│   ├── API Server
│   │   ├── Node.js (runtime)
│   │   ├── Express (library)
│   │   └── Azure App Service (hosting)
│   ├── Serverless Functions
│   │   └── Azure Functions
│   └── Database
│       ├── Azure SQL (relational data)
│       └── Vector DB (AI embeddings - TBD)
│
├── AI & LLM Services
│   ├── OpenAI API / Azure OpenAI (LLM provider)
│   ├── Google Gemini API (alternative)
│   └── LangSmith / Helicone (observability - TBD)
│
├── Infrastructure & DevOps
│   ├── Domain & DNS
│   │   └── Cloudflare (registrar + DNS + CDN)
│   ├── Source Control
│   │   └── GitHub (version control + CI/CD)
│   ├── Containerization
│   │   └── Docker (local development)
│   └── Cloud Platform
│       └── Microsoft Azure (compute + storage + AI)
│
├── Application Services (planned)
│   ├── Authentication
│   │   └── Auth0 / Clerk / Supabase Auth (TBD)
│   ├── Payments
│   │   └── Stripe / Lemon Squeezy (TBD)
│   ├── Email
│   │   └── SendGrid / Resend (TBD)
│   └── SMS
│       └── Twilio / Azure Communication Services (TBD)
│
└── Development Tools
    ├── Local Environment
    │   ├── PowerShell (shell)
    │   ├── npm (package manager)
    │   ├── node (JavaScript runtime)
    │   └── git (version control)
    └── Testing & Demo
        └── ngrok (local tunneling)
```

> [!IMPORTANT]
> **SECURITY WARNING**: Do NOT store actual passwords, secret API keys, or sensitive credentials in this file if it is committed to version control. Use references to a secure vault (like Azure Key Vault, 1Password, or environment variables) or use placeholders like `[SECURE_STORAGE]`.

## Service Provider Template

Copy and paste the block below for each new service you add.

```markdown
### [Service Name]
**Category**: [e.g., Domain Registrar, Database, Auth Provider]
**Website/Dashboard**: [URL to login/manage]
**Account/Login**: [Email or Username used]
**Active Resources**:
- [Resource 1, e.g., domain.com]
- [Resource 2, e.g., database-instance-1]
**Configuration Notes**:
- [Key setting 1]
- [Environment variables to set]
**Best Practices/Dependencies**:
- [e.g., Requires DNS propagation, dependent on Service X]
```

---

## Active Services Inventory

### Cloudflare
**Category**: Domain Registrar / DNS / Security / CDN
**Website/Dashboard**: https://dash.cloudflare.com
**Account/Login**: jpascua@gmail.com
**Active Resources**:
- slidesms.app
- artemis-bi.com
**Configuration Notes**:
- SSL/TLS mode should be set to "Full (Strict)" for best security.
- Page Rules may be needed for specific redirects.
**Best Practices/Dependencies**:
- Nameservers must point to Cloudflare for DNS management.

### Microsoft Azure
**Category**: Cloud Computing Platform (Hosting, AI, Compute)
**Website/Dashboard**: https://portal.azure.com
**Account/Login**: [Your Azure Email]
**Active Resources**:
- [List Resource Groups or specific services]
**Configuration Notes**:
- Use Managed Identities where possible instead of connection strings.
**Best Practices/Dependencies**:
- Monitor cost analysis regularly.

### Supabase
**Category**: Database / Auth / Realtime
**Website/Dashboard**: https://supabase.com/dashboard
**Account/Login**: [User Email]
**Active Resources**:
- Project: SlideSMS
**Configuration Notes**:
- Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
**Best Practices/Dependencies**:
- Use Row Level Security (RLS) for data protection.

### Docker
**Category**: Containerization / Local Development
**Website/Dashboard**: https://www.docker.com/
**Account/Login**: [Your Docker ID]
**Active Resources**:
- Docker Desktop (Local)
- [Optional: Docker Hub for image registry]
**Configuration Notes**:
- Ensure WSL 2 backend is enabled on Windows.

---

## Service Categories Checklist for Full Stack & LLM Apps

Use this checklist to ensure you have all necessary components covered.

### Core Infrastructure
- [ ] **Domain Registrar**: Where you buy the domain (e.g., Cloudflare, Namecheap).
- [ ] **DNS Provider**: Maps domain to IP (often same as Registrar, e.g., Cloudflare).
- [ ] **Web Hosting / PaaS**: Where the frontend/backend code runs (e.g., Vercel, Azure App Service, Heroku, Render).
- [x] **Database Provider**:
    - *Relational (SQL)*: Supabase (PostgreSQL).
    - *NoSQL/Vector*: For chat logs or AI embeddings (e.g., MongoDB, Pinecone, Weaviate).
- [ ] **Object Storage**: For storing user uploads, images, documents (e.g., AWS S3, Azure Blob Storage, Cloudflare R2).

### Application Services
- [ ] **Authentication / Identity Provider (IdP)**: Manages user login/signup (e.g., Auth0, Clerk, Supabase Auth, Azure AD B2C).
- [ ] **Backend Logic / API**:
    - *Serverless Functions*: (e.g., Azure Functions, Vercel Serverless).
    - *Container Orchestration*: (e.g., Azure Container Apps, Kubernetes).
- [ ] **Frontend Framework**: (e.g., Next.js, React, Vue).

### AI & LLM Integration
- [ ] **LLM API Provider**: The "Brain" (e.g., OpenAI API, Anthropic API, Google Gemini API, Azure OpenAI).
- [ ] **Observability / Tracing**: To track AI responses and costs (e.g., LangSmith, Helicone).

### Operations & Tools
- [ ] **Source Control**: (e.g., GitHub, GitLab).
- [ ] **CI/CD**: Automates testing and deployment (e.g., GitHub Actions, Azure DevOps).
- [ ] **Monitoring & Logging**: (e.g., Sentry, Datadog, Azure Monitor).
- [ ] **Payment Gateway**: (e.g., Stripe, Lemon Squeezy).
- [ ] **Transactional Email**: For password resets, welcome emails (e.g., SendGrid, Resend, Postmark).

### Hybrid / Low-Code (Optional)
- [ ] **Internal Tools**: (e.g., Retool) - Useful for building admin dashboards quickly. Connects to your DB and APIs.
