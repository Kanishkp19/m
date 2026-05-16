# Mansi Pandey — Portfolio

A production-ready, highly interactive React portfolio. The application is entirely independent of any external backend. It uses **IndexedDB** for local data persistence during editing, allowing you to visually construct your portfolio and export the configuration as a JSON file.

---

## Project Structure

```
mansi-portfolio/
├── src/
│   ├── constants/
│   │   └── defaultData.js        # The public data source for the portfolio
│   ├── lib/
│   │   └── db.js                 # IndexedDB read/write helpers for the Admin Panel
│   ├── hooks/
│   │   └── usePortfolioData.js   # Custom hook — loads data, exposes save()
│   ├── components/
│   │   ├── ui.jsx                # Shared inputs, buttons, file uploaders
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Projects.jsx
│   │   ├── Process.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── admin/
│   │   ├── AdminLogin.jsx        # Simple password protection
│   │   ├── AdminPanel.jsx        # Slide-out editor drawer
│   │   └── tabs/
│   │       ├── AboutTab.jsx
│   │       └── OtherTabs.jsx     # Hero, Resume, Services, Projects, etc.
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx                   # Lean orchestrator — composes all sections
│   └── main.jsx
├── vercel.json                   # Vercel SPA rewrite rules
├── vite.config.js
├── package.json
├── .env.example                  # Copy → .env.local and set admin password
└── .gitignore
```

---

## Step-by-step setup

### 1 — Install dependencies

```bash
npm install
```

### 2 — Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and set a password to access the Admin Panel:

```
VITE_ADMIN_PASSWORD=your_secret_password
```

### 3 — Run locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).  
Click the **✏️ Edit** button, sign in with your admin password, and make changes. 
Click **Save ✓** to persist changes locally in your browser, or **Export JSON ↓** to download your portfolio data.

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

When prompted, set the following **Environment Variables** in Vercel:

| Variable | Value |
|---|---|
| `VITE_ADMIN_PASSWORD` | your_secret_password |

### Option B — Vercel dashboard (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import your GitHub repo
3. Framework: **Vite** (auto-detected)
4. Add the `VITE_ADMIN_PASSWORD` variable in the **Environment Variables** section
5. Click **Deploy**

Every `git push` to `main` triggers an automatic redeploy.

---

## How data persistence works

The portfolio requires no backend. To make updates:

1. **Local Editing**: Open the Admin Panel and make changes. Clicking **Save ✓** writes your changes to your browser's local `IndexedDB`.
2. **Export**: Once you are happy with the layout and content, click **Export JSON ↓**.
3. **Deploy**: Replace the contents of `src/constants/defaultData.js` (or import the JSON) in your codebase and push to GitHub to deploy your changes to the live site.

Data flow on load:
```
App mounts
  → fetchPortfolioData() from local IndexedDB
  → merges with defaultData (so new fields never break)
  → uses local data if available, otherwise falls back to defaultData.js
```

---

## Adding a custom domain on Vercel

1. Vercel dashboard → your project → **Settings → Domains**
2. Add your domain → follow the DNS instructions
3. Update `VITE_FIREBASE_AUTH_DOMAIN` in Vercel env vars if needed, and add your domain to Firebase Auth's **Authorized domains** list (Firebase Console → Authentication → Settings → Authorized domains)
