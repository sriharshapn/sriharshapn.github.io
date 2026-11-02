# Sri Harsha Penugondla Nagaraja — Personal Portfolio

A modern, responsive, developer-focused portfolio website for **Sri Harsha Penugondla Nagaraja**, an Artificial Intelligence and Machine Learning engineering student at BMS College of Engineering (BMSCE), Bengaluru.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Lucide React**.

---

## 🌟 Highlights & Features

- **Interactive Hero Section:** Features an animated neural network / computational canvas graph that responds smoothly to mouse interactions, plus status pills and quick statistics.
- **About Section:** Authentic background information, educational context at BMSCE, core technical philosophies, and multilingual fluency.
- **Skills Matrix:** Categorized into 5 distinct domains (Programming Languages, AI/ML & Computer Vision, Frontend & Backend, Databases & Data, Tools & Technologies) with interactive category filters. No fabricated ratings or proficiency bars.
- **Featured Projects:** Showcases 6 primary engineering projects with verified roles and contributions:
  1. *PaarakhMetric* (AI / Computer Vision — Collaborative Smart India Hackathon 2026 project)
  2. *KisanSathi* (AI / Agriculture Technology — Google Cloud Build with AI 2.0)
  3. *Jan Sathi* (Civic Technology / AI — 3-hour BMSCE Protocol Club hackathon sprint)
  4. *Drone Aero Lab* (Simulation / Engineering — DJI-referenced UAVs, Three.js & Electron)
  5. *Udupu* (Full-Stack Development — Inventory management on Google Apps Script & React)
  6. *College Event Manager* (Full-Stack Development — Node.js, PostgreSQL & QR attendance)
- **Academic & Technical Work:** Dedicated section for computational physics and systems coursework (*Artemis II Orbit Simulation*, *Two-Body Problem*, *C Travel Budget Planner*).
- **Hackathons & Credentials:** Dedicated event entries featuring an interactive **Certificate Viewer Modal** for *The Beginner Hackathon* (BMSCE) with zoom and PDF download, plus verified credential links for *WeMakeDevs First Commit Tour*.
- **Live GitHub Integration:** Dynamically fetches public statistics and verified repositories from GitHub API with graceful static fallbacks.
- **Accessible Contact Section:** Direct email launcher, one-click copy, verified LinkedIn and GitHub profiles.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React + custom SVG brand icons
- **Typography:** Plus Jakarta Sans & JetBrains Mono (via Google Fonts)

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have **Node.js** (v18 or newer) and **npm** installed on your machine.

### 1. Clone or Open the Repository

```bash
cd portfoilo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production

```bash
npm run build
```

This compiles TypeScript and builds the production bundle in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

Starts a local static server serving the production build at `http://localhost:4173`.

---

## 📁 Project Architecture

```
portfoilo/
├── public/
│   ├── certificates/
│   │   ├── the-beginner-hackathon-bmsce.pdf    # Original signed certificate PDF
│   │   └── the-beginner-hackathon-bmsce.png    # 300 DPI rendered preview
│   └── favicon.svg                             # Custom SVG favicon
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── About.tsx                           # Background & education
│   │   ├── AcademicWork.tsx                    # Physics & coursework simulations
│   │   ├── CertificateModal.tsx                # Interactive certificate viewer
│   │   ├── Contact.tsx                         # Contact forms, email & socials
│   │   ├── Events.tsx                          # Hackathons & credentials
│   │   ├── Footer.tsx                          # Footer & metadata
│   │   ├── GitHubStats.tsx                     # Real-time GitHub API integration
│   │   ├── Hero.tsx                            # Hero banner & headline
│   │   ├── HeroVisual.tsx                      # Canvas-based neural graph visualizer
│   │   ├── Navbar.tsx                          # Responsive sticky navbar
│   │   ├── Projects.tsx                        # 6 featured project cards
│   │   ├── Skills.tsx                          # 5 categorized technical skills
│   │   └── SocialIcons.tsx                     # SVG icons for GitHub & LinkedIn
│   ├── data/
│   │   └── portfolioData.ts                    # Centralized portfolio data
│   ├── App.tsx                                 # Main application entry
│   ├── index.css                               # Tailwind CSS v4 styles & theme
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚢 Deployment Guide

### Option 1: Deploy to Vercel (Recommended)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/sriharshapn/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New Project** and select your `portfolio` repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Your portfolio will be live in under a minute with continuous deployment on every `git push`.

---

### Option 2: Deploy to GitHub Pages

1. Install `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. In `vite.config.ts`, set the base path to your repository name (e.g. `base: '/portfolio/'` or `base: '/'` for a user site `<username>.github.io`).
3. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run:
   ```bash
   npm run deploy
   ```

---

## ⚙️ Customization

All personal details, projects, academic entries, skills, and event credentials are maintained in a single, well-typed data file:

👉 `src/data/portfolioData.ts`

To update any project, role, link, or description in the future, simply edit `src/data/portfolioData.ts`.
