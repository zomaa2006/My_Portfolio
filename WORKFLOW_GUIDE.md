# Portfolio Update Workflow

## Quick Start - Making Changes Public

You have your portfolio on **GitHub** and deployed on **Vercel**. When you edit code, follow these steps to make changes visible online:

### Option 1: Quick Push Script (Easiest)
1. Make your edits in VS Code
2. Run this command in PowerShell:
```powershell
.\push-changes.ps1 "Your change description"
```
Example:
```powershell
.\push-changes.ps1 "Update project section"
```

### Option 2: Manual Git Commands
1. Make your edits
2. Open Terminal (Ctrl + `)
3. Run these commands:
```bash
git add .
git commit -m "Your change description"
git push origin main
```

### Option 3: VS Code Built-in Git
1. Make your edits
2. Click the **Source Control** icon (Ctrl + Shift + G)
3. Type your commit message
4. Click the **Commit** button (or Ctrl + Enter)
5. Click **Sync Changes** or the arrows icon

---

## How It Works

```
Your PC (VS Code)
        ↓
    Git Commit
        ↓
    GitHub Repository
        ↓
    Vercel Deployment
        ↓
    Live Website
```

---

## Files You Usually Edit

- **index.html** - Content and structure
- **main.js** - Functionality and interactions
- **stayle.css** - Styling and appearance
- **images/** - Profile and project images

---

## What Happens After You Push

1. ✅ You push to GitHub
2. 🔄 Vercel detects the change (automatic)
3. 🏗️ Vercel rebuilds your site
4. 🌐 Live website updates (within 1-2 minutes)

---

## Tips

- **Commit message examples:**
  - "Add new project to portfolio"
  - "Fix contact form styling"
  - "Update about section"
  - "Add new skill"

- **Make commits frequently** - Small, focused changes are better
- **Always pull before editing** to avoid conflicts:
  ```bash
  git pull origin main
  ```

---

## If Something Goes Wrong

### Check status:
```bash
git status
```

### See what changed:
```bash
git diff
```

### Undo uncommitted changes:
```bash
git checkout -- .
```

### Cancel last commit (if not pushed):
```bash
git reset HEAD~1
```
