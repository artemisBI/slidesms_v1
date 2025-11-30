# Connecting DataGrip to Supabase

Follow these steps to connect your local DataGrip instance to your Supabase PostgreSQL database.

## ✅ Working Configuration

**Use these settings (verified working):**
- **Host**: `aws-0-us-east-1.pooler.supabase.com`
- **Port**: `5432`
- **Database**: `postgres`
- **User**: `postgres.iwcxpfkqjxolykcuyprz`
- **Password**: [Your database password]
- **SSL Mode**: `require` (in SSH/SSL tab)

> **Note**: The direct database host (`db.iwcxpfkqjxolykcuyprz.supabase.co`) may not work due to DNS/firewall restrictions. Use the pooler endpoint above instead.

## Getting Your Database Password

**IMPORTANT**: You need the database password you created when setting up your Supabase project. This is **NOT** the same as your Supabase account password.

### If you don't remember your database password:
1. Go to https://supabase.com/dashboard
2. Select your project: `SlideSMS`
3. Go to **Settings** > **Database**
4. Scroll to **Database Password**
5. Click **Reset Database Password** and create a new one
6. **Save this password** - you'll need it for DataGrip

## Connection Details

- **Host**: `db.iwcxpfkqjxolykcuyprz.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`
- **User**: `postgres`
- **Password**: [Your database password from above]

## Steps to Connect

1. Open **DataGrip**
2. Click the **+** icon (or File > New > Data Source)
3. Select **PostgreSQL**
4. Fill in the connection details:
   - **Host**: `db.iwcxpfkqjxolykcuyprz.supabase.co`
   - **Port**: `5432`
   - **Database**: `postgres`
   - **User**: `postgres`
   - **Password**: [Your database password]
5. **IMPORTANT**: Click on the **SSH/SSL** tab
   - Set **SSL Mode** to `require` or `verify-ca`
   - Supabase requires SSL connections
6. If prompted to download drivers, click **Download**
7. Click **Test Connection**
   - You should see a green checkmark
8. Click **OK** to save

## Troubleshooting

### "PostgreSQL (no ver.)" - Driver Issue

If you see `PostgreSQL (no ver.)` in the error, this means DataGrip cannot detect the PostgreSQL version, which is usually a **driver problem**.

**Solution 1: Update/Download the Correct Driver**
1. In DataGrip connection settings, go to the **General** tab
2. Look for **Driver** dropdown at the top
3. Click the **Download** link next to the driver version
4. Wait for the driver to download completely
5. Try **Test Connection** again

**Solution 2: Try a Different Driver Version**
1. In the connection settings, click on **Driver** dropdown
2. If you see multiple PostgreSQL driver versions, try selecting a different one
3. Common working versions: `PostgreSQL 42.x` or latest
4. Click **Test Connection** after each change

**Solution 3: Manual Driver Update**
1. Go to **File** > **Data Sources**
2. Click on the **Drivers** tab (left side)
3. Find **PostgreSQL** in the list
4. Click the **+** icon to add a driver file
5. Download the latest PostgreSQL JDBC driver from: https://jdbc.postgresql.org/download/
6. Add the downloaded `.jar` file
7. Click **Apply** and retry connection

### "Connection attempt failed"

**1. Check SSL Settings**
- Go to the **SSH/SSL** tab in DataGrip
- Set **Use SSL** to `Yes`
- Set **SSL Mode** to `require`

**2. Verify Password**
- Make sure you're using the **database password**, not your Supabase account password
- If unsure, reset it in Supabase Dashboard > Settings > Database

**3. Check Firewall**
- Ensure your network allows outbound connections on port 5432
- Try disabling VPN if you're using one

**4. Alternative: Use Connection String**
- In Supabase Dashboard > Settings > Database
- Copy the **Connection String** (URI format)
- In DataGrip, instead of filling individual fields, use the URL field:
  ```
  postgresql://postgres:[YOUR-PASSWORD]@db.iwcxpfkqjxolykcuyprz.supabase.co:5432/postgres?sslmode=require
  ```
- Replace `[YOUR-PASSWORD]` with your actual database password

### Still not working?

Try using the **Supabase Connection Pooler** instead:
- **Host**: `aws-0-us-east-1.pooler.supabase.com`
- **Port**: `6543` (note: different port!)
- **Database**: `postgres`
- **User**: `postgres.iwcxpfkqjxolykcuyprz`
- **Password**: [Your database password]
- **SSL Mode**: `require`
