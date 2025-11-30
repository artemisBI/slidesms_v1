# SlideSMS Development Plan

## Overview

Building SlideSMS in **two parallel tracks** to balance learning and marketing needs:

1. **Track A (Quick Win)**: Simple marketing landing page - deployable in 1-2 sessions
2. **Track B (Core Product)**: Full end-to-end SMS campaign flow with PostgreSQL + Twilio

---

## Track A: Marketing Landing Page (Quick Win)

### Goal
Get `slidesms.app` live so you can share a link when people ask what you're building.

### Scope
- **Single-page site** with:
  - Hero section (project vision from README)
  - "Sarah's Story" (social proof)
  - Feature highlights (3-4 key benefits)
  - Email capture form (for early interest)
  - Footer with social links
- **No auth required** - purely informational
- **Reference `branding_package.md`** for styling (once created)

### Tech Stack
- Same Next.js app (new route: `/marketing` or just update `/`)
- Deploy to **Vercel** (free, automatic from GitHub)
- Domain: Point `slidesms.app` to Vercel

### Estimated Time
- 1-2 sessions to build
- 30 minutes to deploy

---

## Track B: Core Product (End-to-End Learning)

### Goal
Build the complete SMS campaign flow from upload → validate → compose → schedule → send via Twilio.

### Architecture Decision

**Database: PostgreSQL (via Supabase)**
- ✅ Free tier with generous limits
- ✅ Built-in auth (can replace NextAuth if needed)
- ✅ Real-time subscriptions (useful for campaign status updates)
- ✅ Easy deployment (no server management)
- ✅ You'll learn PostgreSQL (industry standard for Python/Node.js)
- ✅ Can still write SQL functions (similar to stored procedures)

**Backend: Next.js API Routes (TypeScript)**
- ✅ You'll learn modern TypeScript patterns
- ✅ All logic in one codebase (easier to understand)
- ✅ Type safety (catches errors before runtime)
- ✅ I'll document every function with clear headers

**SMS Provider: Twilio**
- ✅ Industry standard
- ✅ Free trial credits
- ✅ Excellent docs and Node.js SDK

---

## Proposed Implementation Order

### Phase 1: Database Setup (In Progress)
1. [x] Set up Supabase project
2. [ ] Create database schema:
   - `users` (from NextAuth)
   - `organizations` (multi-org support)
   - `contact_lists`
   - `contacts` (with phone number, firstname, opt-out status)
   - `campaigns`
3. [ ] Write SQL functions for phone sanitization
4. [ ] Document the schema with clear comments

### Phase 2: Contact Upload & Validation (Next Up)
1. **Smart Upload UI**
   - File upload component (CSV/Excel)
   - **Intelligent Column Inference**: Automatically detect "Name", "Phone", "Email" columns.
   - Real-time preview of parsed data.
2. **Data Processing Logic**
   - Parse file (using `papaparse`).
   - **Phone Sanitization**:
     - Strip non-integers.
     - Remove leading '+1' or '1' for US numbers.
     - Ensure 10-digit format.
   - Detect duplicates.
3. **Confirmation Screen**
   - Show total count of valid contacts.
   - List invalid numbers.
   - Confirm distinct names and phone numbers.

### Phase 3: Message Composer (Session 4)
1. **Compose UI**
   - Text area with character counter
   - Preview of how message will look
   - Sender ID input (3-5 char orgCode)
2. **AI Optimization** (optional for MVP)
   - Use OpenAI API to suggest shorter versions
   - Show 2 recommendations
   - Let admin choose or edit

### Phase 4: Schedule & Send (Session 5)
1. **Schedule UI**
   - Date/time picker with timezone
   - Final review summary
2. **API Route: `/api/campaigns/schedule`**
   - Save campaign to database
   - Set up cron job or scheduled task
3. **Twilio Integration**
   - Send test SMS to your number
   - Batch sending logic
   - Handle opt-outs

### Phase 5: Reporting (Session 6)
1. Campaign dashboard
2. Success/failure tracking
3. Opt-out management

---

## Immediate Next Steps

### Option 1: Start with Marketing Site
**Pros:**
- Quick win (shareable link in 1-2 sessions)
- Builds momentum
- Practice frontend skills

**Cons:**
- Delays learning the full stack

### Option 2: Start with Core Product
**Pros:**
- Learn end-to-end immediately
- More satisfying (see it work!)
- Can demo to yourself with real SMS

**Cons:**
- Takes longer to have something shareable

### Option 3: Hybrid (My Recommendation)
1. **Session 1**: Build minimal marketing page (2-3 hours)
2. **Session 2**: Deploy it to `slidesms.app` (30 min)
3. **Session 3+**: Dive into core product (database → upload → Twilio)

This way you get the shareable link quickly, then focus on learning.

---

## Questions Before We Start

1. **Branding Package**: Do you have colors/fonts/logo decided? Or should we create `branding_package.md` together first?

2. **Marketing Site Priority**: Do you want to knock out the marketing site first (1-2 sessions), or jump straight into the product?

3. **Twilio Account**: Do you have a Twilio account yet, or should I guide you through setup when we get there?

4. **PostgreSQL Comfort**: You mentioned being open to PostgreSQL - are you comfortable with the idea of using Supabase (managed PostgreSQL), or would you prefer to run PostgreSQL locally first?

---

## Documentation Promise

For every code section I write, I will include:
- **Header comment** explaining what it does
- **Inline comments** for complex logic
- **Type annotations** (TypeScript) for clarity
- **Example usage** in comments
- **Connection to the bigger picture** (how it fits in the flow)

Example:
```typescript
/**
 * PHONE NUMBER SANITIZATION
 * 
 * Purpose: Clean user-provided phone numbers to a standard format
 * Input: Raw string (e.g., "(555) 123-4567")
 * Output: Digits only (e.g., "5551234567")
 * 
 * This function is called BEFORE saving contacts to the database
 * to ensure all numbers are searchable and valid for Twilio.
 */
export function sanitizePhoneNumber(raw: string): string {
  // Remove all non-digit characters
  const digitsOnly = raw.replace(/\D/g, '');
  
  // US numbers should be exactly 10 digits
  if (digitsOnly.length !== 10) {
    throw new Error(`Invalid US phone number: ${raw}`);
  }
  
  return digitsOnly;
}
```

Ready to decide on the next step?
