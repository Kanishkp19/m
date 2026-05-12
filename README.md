# Mansi Pandey — Portfolio

A production-ready portfolio with a **Firebase backend** (Firestore + Storage + Auth) and **Vercel** frontend deployment. Admin edits are persisted to the database — no data is lost on page refresh.

---

## Project Structure

```
mansi-portfolio/
├── src/
│   ├── constants/
│   │   └── defaultData.js        # Fallback data (used before Firestore loads)
│   ├── lib/
│   │   ├── firebase.js           # Firebase app init (reads env vars)
│   │   └── db.js                 # Firestore + Storage read/write helpers
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
│   │   ├── AdminLogin.jsx        # Firebase email/password auth
│   │   ├── AdminPanel.jsx        # Slide-out editor drawer
│   │   └── tabs/
│   │       ├── AboutTab.jsx
│   │       └── OtherTabs.jsx     # Hero, Resume, Services, Projects, etc.
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx                   # Lean orchestrator — composes all sections
│   └── main.jsx
├── firestore.rules               # Firestore security rules
├── storage.rules                 # Firebase Storage security rules
├── firebase.json                 # Firebase project config
├── firestore.indexes.json
├── vercel.json                   # Vercel SPA rewrite rules
├── vite.config.js
├── package.json
├── .env.example                  # Copy → .env.local and fill in values
└── .gitignore
```

---

## Step-by-step setup

### 1 — Install dependencies

```bash
npm install
```

### 2 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → give it a name → create it

#### Enable Firestore
- Left sidebar → **Build → Firestore Database**
- Click **Create database** → choose **Production mode** → pick a region → Done

#### Enable Firebase Storage
- Left sidebar → **Build → Storage**
- Click **Get started** → Production mode → same region as Firestore → Done

#### Enable Authentication
- Left sidebar → **Build → Authentication**
- Click **Get started** → **Sign-in method** tab → enable **Email/Password**
- Go to the **Users** tab → **Add user** → enter your admin email + password
  - This is the email/password you'll use to log into the admin panel

#### Get your web app config
- Left sidebar → ⚙️ **Project Settings** → **Your apps** section
- If no web app exists, click **</>** to add one (no Firebase Hosting needed if deploying to Vercel)
- Copy the `firebaseConfig` values

### 3 — Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in all values from the Firebase config you copied:

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_ADMIN_EMAIL=your_admin@email.com
```

### 4 — Deploy Firebase security rules

Install the Firebase CLI if you haven't:

```bash
npm install -g firebase-tools
firebase login
firebase init   # select Firestore + Storage; point to existing project
```

Deploy the rules:

```bash
firebase deploy --only firestore:rules,storage
```

### 5 — Run locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).  
Click the **✏️ Edit** button, sign in with your admin email + password, make changes, and click **Save Changes ✓**. Your edits are saved to Firestore and the images/resume go to Firebase Storage.

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

When prompted, set the following **Environment Variables** in Vercel (same as `.env.local`):

| Variable | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | from Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | from Firebase |
| `VITE_FIREBASE_PROJECT_ID` | from Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | from Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | from Firebase |
| `VITE_FIREBASE_APP_ID` | from Firebase |
| `VITE_ADMIN_EMAIL` | your admin email |

### Option B — Vercel dashboard (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import your GitHub repo
3. Framework: **Vite** (auto-detected)
4. Add all env variables above in the **Environment Variables** section
5. Click **Deploy**

Every `git push` to `main` triggers an automatic redeploy.

---

## How data persistence works

```
Admin edits local state in AdminPanel
         ↓
Clicks "Save Changes ✓"
         ↓
usePortfolioData.save() is called
         ↓
db.js: savePortfolioData()
  - Uploads images to Firebase Storage → gets download URLs
  - Uploads resume PDF → gets download URL
  - Writes full portfolio object to Firestore  portfolios/main
         ↓
Real-time onSnapshot subscription in usePortfolioData
  → updates React state automatically on all connected clients
```

Data flow on load:
```
App mounts
  → fetchPortfolioData() from Firestore
  → merges with defaultData (so new fields never break)
  → subscribes to live updates via onSnapshot
```

---

## Firestore document structure

All portfolio content lives in a **single document**: `portfolios/main`

Large binary assets (images, PDFs) are stored in **Firebase Storage** and only their download URLs are saved in Firestore, keeping the document well within Firestore's 1 MB document size limit.

---

## Changing the admin password

Since authentication is handled by Firebase Auth:

1. Go to Firebase Console → **Authentication → Users**
2. Click the three-dot menu next to your user → **Reset password** (sends email)
   — or — delete and re-add the user with a new password

---

## Adding a custom domain on Vercel

1. Vercel dashboard → your project → **Settings → Domains**
2. Add your domain → follow the DNS instructions
3. Update `VITE_FIREBASE_AUTH_DOMAIN` in Vercel env vars if needed, and add your domain to Firebase Auth's **Authorized domains** list (Firebase Console → Authentication → Settings → Authorized domains)
