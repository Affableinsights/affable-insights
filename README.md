# Affable Insights — Interactive Prototype

Unified Health & Social Care Platform — Interactive wireframe prototype.

**9 screens covering both care models:**
- Login (Splash → Password → MFA)
- Rota-Lock screen
- Calendar (Domiciliary + Supported Living shifts)
- Domiciliary: Shift locked / Shift active (2-to-1) / Visit note
- Supported Living: Shift locked / House dashboard / Resident profile & care note

---

## Deploy to GitHub Pages in 5 steps

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up for a free account if you don't have one.

### Step 2 — Create a new repository
1. Click the **+** button (top right) → **New repository**
2. Name it exactly: `affable-insights`
3. Set it to **Public**
4. Do NOT initialise with README (leave all boxes unticked)
5. Click **Create repository**

### Step 3 — Upload these files
GitHub will show you an empty repository page with upload options.

**Option A — Drag and drop (easiest):**
1. Open the folder containing these files on your computer
2. Drag the entire folder contents into the GitHub browser window
3. Scroll down, click **Commit changes**

**Option B — GitHub Desktop app:**
1. Download [GitHub Desktop](https://desktop.github.com)
2. Click **Add** → **Add Existing Repository** → select this folder
3. Publish repository → Push to GitHub

### Step 4 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top tab bar)
3. Click **Pages** (left sidebar, under Code and automation)
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### Step 5 — Wait 2 minutes, then open your live URL
GitHub will automatically build and deploy. Your URL will be:

```
https://YOUR-GITHUB-USERNAME.github.io/affable-insights/
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

You can find the URL in: **Settings → Pages** once deployment is complete.

---

## Share on phone
Send the URL above to anyone. It works on:
- iPhone Safari
- Android Chrome
- Any desktop browser

No app install needed.

---

## Run locally (optional)
If you have Node.js installed:
```bash
npm install
npm run dev
```
Then open http://localhost:5173 in your browser.

---

## Files in this project
```
affable-insights/
├── index.html              # Entry point
├── package.json            # Dependencies
├── vite.config.js          # Build config
├── src/
│   ├── main.jsx            # React entry
│   └── App.jsx             # All 9 prototype screens
└── .github/
    └── workflows/
        └── deploy.yml      # Auto-deploy on every push
```

---

*Affable Insights — Confidential prototype. Not for public distribution.*
