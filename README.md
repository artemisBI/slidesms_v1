# Project Plan: slideSMS.app

slideSMS is the simplest way to reach your friends and contacts instantly without getting lost in a junk folder.

1. **Simple Messages:** Text-only messages with personalization tokens.
2. **Message + Link:** Text plus a link for a call-to-action or form fill.
3. **Operational Messages:** Reusable templates with contact-level customizations (e.g., appointment reminders that include the recipient's name).

## Navigate Folders
- **project_documentation:** see key docs and project_logs 
- **slidesms:** sub-directory w actual app
- **test_artifacts:** test docs

### High-level features
- **Quick start upload:** Login and go directly to upload and messaging.
- **Robust contact parser:** Supports CSV and XLSX uploads and copy/paste CSV. Auto-detects columns, sanitizes phone numbers/emails, removes duplicates and junk.
- **List confirmation:** Optional confirmation or double opt-in flows.
- **Personalization & templates:** Template variables for names, dates, and other contact fields.
- **Scheduling & timezones:** Schedule messages, select send datetime, and optionally infer recipient timezone.
- **Link shortener & tracking:** Shorten links and collect click metrics.
- **AI assistance:** Suggestions to shorten and optimize messages and send times.
- **Guest/trial limits:** Default guest accounts have limited contacts and message counts; upgrade for full features.

### Plans

#### Guest
- Up to 3 messages per month
- Up to 20 contacts
- Cannot change or cancel scheduled messages while in flight. have to contact us;

#### Trial — Basic (Free for 30 days, $10/month)
- Up to 5 messages per month
- Up to 40 contacts
- AI scheduling suggestions
- Can change or cancel scheduled messages during the trial
- Supports advanced CSVs (recipient-level schedules)

#### Small Business ($30/month)
- Feature set and customizations available; work with the dev team to tailor SMS alerts and workflows.

#### Enterprise
- Custom integrations (PMS/CRM bridges), dedicated support, and higher-volume features.

## Developer team
- **Project Manager & Lead Developer:** Jonas Pascua — SQL BI Developer. Experience with Power BI, SQL Server / SSMS, VS Code, Git, Docker, and PowerShell.

## Number scoring
- **Purpose:** Assign a quality score (1–5) to each phone number based on historical engagement and deliverability.
- **Scoring model:**
  - **1 (Poor):** Frequently opts out or has poor deliverability.
  - **2 (At-Risk):** Opts in but appears on multiple lists and has recent low engagement.
  - **3 (Neutral):** Insufficient historical data.
  - **4 (Good):** Opts in and shows consistent engagement.
  - **5 (Excellent):** High engagement and low opt-out risk.

## Data & IP
- Interaction data improves our normalized repository of companies, domains, messages, and engagement signals.
- Track opt-outs and engagement to improve scoring and deliverability.
- Capture and verify interested leads (email/phone) and notify the appropriate account owner.


# Run App
```bash
npm run dev
```