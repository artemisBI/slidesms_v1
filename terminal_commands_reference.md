# Terminal Commands Reference - SlideSMS Project Analysis

This document contains all PowerShell commands used to analyze and clean up the development environment for the SlideSMS project.

---

## 1. PowerShell Version & Environment Check

```powershell
# Check for all installed PowerShell versions (both Core and Windows PowerShell)
Get-Command pwsh, powershell -ErrorAction SilentlyContinue | Select-Object Name, Version, Source

# Display current PowerShell version table with detailed information
$PSVersionTable

# Check if Windows PowerShell 5.1 is installed and display its version
if (Test-Path "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe") { 
    & "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -Command '$PSVersionTable.PSVersion'
} else { 
    "Windows PowerShell 5.1 not found" 
}
```

---

## 2. PowerShell Modules Management

```powershell
# List all user-installed PowerShell modules with metadata
Get-InstalledModule | Select-Object Name, Version, Repository | Sort-Object Name

# List all available PowerShell modules (system and user)
Get-Module -ListAvailable | Select-Object Name, Version, Path | Sort-Object Name -Unique | Format-Table -AutoSize

# Check for user-installed modules with installation dates (safer error handling)
Get-InstalledModule -ErrorAction SilentlyContinue | Select-Object Name, Version, InstalledDate, Repository | Format-Table -AutoSize
```

---

## 3. Python Package Management

```powershell
# List all globally installed Python packages in freeze format
pip list --format=freeze

# List all globally installed Python packages (human-readable table)
pip list

# Upgrade pip to the latest version
python.exe -m pip install --upgrade pip

# Uninstall multiple Python packages from global environment at once
# Use -y flag to skip confirmation prompts
pip uninstall -y aiohappyeyeballs aiohttp aiohttp-retry aiosignal annotated-types anyio attrs blinker certifi charset-normalizer click colorama distro Flask frozenlist h11 httpcore httpx idna itsdangerous Jinja2 jiter MarkupSafe multidict numpy openai pandas propcache pydantic pydantic_core PyJWT python-dateutil python-dotenv pytz requests six sniffio tqdm twilio typing_extensions typing-inspection tzdata urllib3 Werkzeug yarl
```

---

## 4. Node.js & NPM Management

```powershell
# List all globally installed npm packages (top-level only)
npm list -g --depth=0

# Note: This command may fail if the npm global directory doesn't exist yet
# Error: ENOENT means the directory hasn't been created (no global packages installed)
```

---

## 5. Python Tools Installation (pipx & Poetry)

```powershell
# Install pipx globally using Python's pip module
python -m pip install pipx

# Ensure pipx is added to system PATH environment variable
pipx ensurepath

# Install Poetry globally using Python's pip module
python -m pip install poetry

# Verify pipx installation and version
pipx --version

# Verify Poetry installation and version
poetry --version
```

---

## Key Concepts & Tips

### Understanding `-ErrorAction SilentlyContinue`
Suppresses error messages if a command fails (useful for checking if something exists without red error text).

### Understanding `Get-Command`
Searches for available commands/executables in your PATH. Useful to verify what's installed.

### Understanding `pip list --format=freeze`
Shows package versions in `package==version` format, which can be saved to a requirements.txt file.

### Understanding `pip uninstall -y`
The `-y` flag automatically answers "yes" to confirmation prompts, allowing batch uninstallation.

### Understanding `python -m pip` vs `pip`
Using `python -m pip` ensures you're using the pip associated with your specific Python installation. This is more reliable than just `pip`.

### Understanding `Select-Object` and `Format-Table`
PowerShell cmdlets for filtering and formatting output:
- `Select-Object`: Chooses which properties to display
- `Format-Table -AutoSize`: Formats output as a table with auto-sized columns
- `Sort-Object`: Sorts results by specified property

### Understanding Global vs Local Installation
- **Global**: Installed system-wide, accessible from anywhere
- **Local**: Installed in project directory (node_modules, .venv)
- Best practice: Keep tools global, keep project dependencies local

---

## Common Workflow Commands

```powershell
# Check versions of core development tools
node --version
npm --version
python --version
git --version

# Navigate directories
cd C:\path\to\project
cd ..                    # Go up one directory
pwd                      # Print working directory (Get-Location)

# List directory contents
ls                       # List files and folders
ls -Recurse              # List recursively (all subdirectories)
Get-ChildItem            # Full PowerShell cmdlet name for ls

# Create directories
mkdir folder_name
New-Item -ItemType Directory -Path "C:\path\to\folder"

# Check if path exists
Test-Path "C:\path\to\file"

# Get help on any PowerShell command
Get-Help Get-Command
Get-Help pip
```

---

## Project-Specific Commands (for future Python projects)

```powershell
# Create a virtual environment
python -m venv .venv

# Activate virtual environment (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# Install packages in virtual environment
pip install package-name

# Save installed packages to requirements.txt
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt

# Deactivate virtual environment
deactivate
```

---

## Project-Specific Commands (for Node.js projects like SlideSMS)

```powershell
# Install all dependencies from package.json
npm install

# Install a specific package and save to package.json
npm install package-name

# Install a dev dependency
npm install --save-dev package-name

# Run development server (defined in package.json scripts)
npm run dev

# Run build command
npm run build

# List locally installed packages in current project
npm list --depth=0

# Check for outdated packages
npm outdated

# Update packages
npm update
```

---

## Git Commands (Essential Workflows)

```powershell
# Check git status
git status

# View current branch
git branch

# Create and switch to new branch
git checkout -b branch-name

# Stage all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to remote
git push origin branch-name

# Pull latest changes
git pull

# View commit history
git log --oneline

# View differences
git diff
```

---

## Best Practices Summary

1. **Always use virtual environments** for Python projects (.venv folders)
2. **Keep node_modules local** to each Node.js project
3. **Use `python -m pip`** instead of just `pip` for reliability
4. **Keep global environment minimal** - only core tools (Node, Python, Git, etc.)
5. **Use `Get-Help`** in PowerShell to learn about commands
6. **Use `-ErrorAction SilentlyContinue`** when checking for optional things
7. **Save your environment state** with requirements.txt or package.json
8. **Test commands with safe flags first** (like checking versions before installing)

---

*Generated during SlideSMS project environment analysis and cleanup - December 10, 2025*
