# Project Plan: slideSMS.app

## 1a. Project Vision

slideSMS is the simplest way to reach a group of people instantly without getting lost in a junk folder.
- **Security:** Implement modern authentication (OAuth2, MFA) using providers like Google or email-based verification codes.
- **Multi-Organization Support:** Admins can belong to multiple organizations and switch between them via a dropdown menu or create a new one.

### 3.2 User Flow: First Campaign

1. **Define Recipient List**
   - **Input Methods:** Upload (.xls, .csv, Google Sheets) or paste text (CSV, tab-delimited).
   - **Required Data:** `firstname`, `phone number`.
   - **Data Scrubbing:** Automatically sanitize phone numbers by removing non-numeric characters (e.g., `(`, `)`, `-`, `.`).
   - **Admin Opt-in:** Prompt the admin to add their own number to the list if it's not already present.

2. **Validate List & Handle Duplicates**
   - **Confirmation Screen:** Display total recipient count and a list of invalid numbers (e.g., fewer than 10 digits).
   - **Duplicate Handling:** Automatically handle duplicate first names by appending a number (e.g., `John001`, `John002`). Allow admin to override by adding a last name or nickname (e.g., `John Q`, `Johnny`).

3. **Recipient Number Scoring**
   - **Function:** Assign a quality score (1–5) to each phone number based on historical data to predict engagement.
   - **Scoring Model:**
     - **1 (Poor):** Number frequently opts out.
     - **2 (At-Risk):** Opts in, but is on >3 lists and received >3 texts from the service in the past week.
     - **3 (Neutral):** No historical data.
     - **4 (Good):** Opts in, but is on >3 lists.
     - **5 (Healthy):** Opts in, not on many lists.

4. **Compose Message**
   - **Message Type:** Choose between `text-only` or `text + link`. The link option can integrate with form builders.
   - **Sender ID:** Define a 3–5 character `orgCode` (e.g., Walgreens -> WLGRN).
   - **AI-Powered Optimization:** The service will generate 2 message recommendations to minimize character count and maximize value, using a substitution dictionary (e.g., `talk to your` -> `tty`). The AI will prioritize clear, concise communication.
   - **Final Choice:** Admin can select an AI suggestion, edit their prompt and resubmit, or write their own message manually.

5. **Schedule & Confirm**
   - **Scheduling:** Use a date/time picker with time zone support to schedule the campaign.
   - **Final Review:** Display a summary of the campaign (recipient count, message, scheduled time) for final confirmation.
   - **Execution:** Admin clicks "Send" to schedule the job.

### 3.3 Post-Campaign & Management

- **Campaign Editing:** Admins can modify any aspect of a scheduled campaign before the send time. Once sent, the campaign is locked.
- **Admin Reporting:** 24 hours after a campaign is sent, the admin receives a summary SMS: _"Hi {FirstName}! 48 sent, 2 bad numbers, 27 success, 10 optout. {shortlink to webapp}"_
- **Recipient Opt-Out:** If a recipient opts out, their status is permanently recorded with a timestamp to respect their preference in all future campaigns.

## 4. Monetization: Tiers & Packages

- **Tier 1 (Free):** Trial tier to encourage adoption. Limited to one list and a maximum of 5 messages.
- **Tier 2 ($10/month):** Subscription for increased usage.
- **Tier 3 ($30/month):** Aimed at typical small business owners.
- **Tier 4 (Enterprise):** Custom pricing for a full range of current and future services.

## 5. Sample Messages

- **Sample 1:** slideSMS.CVS - These depts are closed on THXGVG 11/24. TTY mgr nxt shift; From Spain. Txt OK to confirm, STOP to optout.
- **Sample 2:** slideSMS.YUP - Social is 11/12 @5PM to 630PM. @Location. From Spain. {Shortlink}. Txt OK to confirm, STOP to optout.


## 6. Developer Team
- ** Project Manager + Lead Developer:** - Jonas Pascua. SQL BI Developer. Fabric Power/BI. SqlServer and SSMS22. Have VS Code, Git, and Antigravity. Have SqlServer developer local and Desktop Docker already set up. Some powershell experience.


## 7. Story Time
The Story: Sarah’s Tuesday Morning Turnaround
Sarah, owner of "The Local Roast" coffee shop, used to feel frustrated by her marketing options. Her emails got buried in spam folders, and social media algorithms seemed to hide her posts about daily specials. She knew her customers wanted to hear from her, but managing hundreds of contacts on her personal phone was messy, unprofessional, and chaotic. She felt like she needed an expensive corporate marketing department just to send a simple alert.

Then, she discovered slideSMS.app.

She was skeptical that something powerful could also be simple, but slideSMS was different. It was turnkey and ready to go. There was no complex integration or steep learning curve. Within ten minutes of signing up, she had uploaded her customer spreadsheet into the intuitive dashboard. It just made sense.

Tuesday morning was notoriously slow. Sarah decided to test the waters. She typed up a quick campaign: “Rainy Day Rescue: Show this text for a free pastry with any large latte until noon today!”

Instead of panicking and hitting send immediately, she used the scheduling tool to time it perfectly for 8:45 AM, right as people were arriving at their desks.

At 8:46 AM, phones buzzed across town.

At 9:00 AM, the shop door swung open. A regular walked in, holding up their phone with a grin. "Got your text, Sarah. Perfect timing." Then another customer came in. And another.

Sarah felt a jolt of genuine excitement. For the first time, she had the same immediate, direct reach as the giant coffee chains down the street. The tool was professional, effective, and shockingly affordable. She realized she didn't need to be a "big business" to have big impact. She could start small today, and as her customer list grew to thousands, slideSMS would effortlessly scale right along with her.

She wasn't just sending texts; she was finally owning her audience connection.