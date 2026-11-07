# DigiCitizen — Digital Citizenship Awareness Platform

DigiCitizen is a modern, responsive, and accredited web application designed to empower individuals with essential digital citizenship competencies, cybersecurity hygiene, ethical technology practices, and critical information literacy.

---

## 🚀 Key Highlights & Tech Stack

* **Frontend:** React.js (JavaScript JSX)
* **Build Tool:** Vite
* **Routing:** React Router DOM (v6)
* **Design & Styling:** Custom CSS3 Design System (Navy cybersecurity theme, light blue accents, smooth micro-interactions)
* **Icons:** Lucide React
* **Backend & Database:** Supabase (PostgreSQL 15+)
* **Authentication:** Supabase Auth (with database-level student role enforcement and session persistence)
* **PDF Certificate Generation:** jsPDF (vector landscape certificate with official credentials and gold seals)
* **Interactive Celebrations:** Canvas-Confetti

---

## 🏛️ Architecture & Folder Structure

```
DigiCitizen/
│
├── public/
│   └── shield.svg                 # Shield-based platform favicon
├── src/
│   ├── assets/                    # Static brand assets
│   ├── components/
│   │   ├── common/                # ShieldLogo, ProtectedRoute, AdminRoute
│   │   ├── navigation/            # Navbar, Footer
│   │   └── ui/                    # Stat cards, badges, modal helpers
│   ├── context/
│   │   └── AuthContext.jsx        # Supabase Auth provider & session listener
│   ├── hooks/
│   │   └── useAuth.js             # Authentication hook
│   ├── layouts/
│   │   ├── MainLayout.jsx         # Public layout (Navbar + Outlet + Footer)
│   │   ├── DashboardLayout.jsx    # Student Portal with dedicated sidebar & points topbar
│   │   └── AdminLayout.jsx        # Admin Console layout with elevated controls
│   ├── lib/
│   │   └── supabase.js            # Supabase client initializer with offline resilience fallback
│   ├── pages/
│   │   ├── public/                # Home, About, Learn, ModuleDetails, Login, Register, Forgot/Reset Password
│   │   ├── student/               # Dashboard, Quiz, Simulator, Scenarios, Achievements, Leaderboard, Certificate, Profile
│   │   └── admin/                 # AdminOverview, Modules, Quizzes, Scenarios, Students, Analytics
│   ├── services/
│   │   ├── authService.js         # Student sign-up, login, password recovery, profile mutations
│   │   ├── moduleService.js       # Curriculum loader, module progress & completion tracker
│   │   ├── quizService.js         # 54 MCQ question queries, attempt grading & logging
│   │   ├── scenarioService.js     # Branching scenario attempts & decision tracking
│   │   ├── achievementService.js  # Badges evaluation, leaderboard & certificate issuing
│   │   ├── adminService.js        # Aggregate metrics, student directory, activity logs
│   │   └── seedData.js            # Initial academic content (6 modules, 54 MCQs, scenarios, badges)
│   ├── styles/
│   │   ├── index.css              # Global variables, typography, buttons, cards, forms, grid
│   │   └── components.css         # Navigation, hero sections, dashboard layout, quiz styles
│   ├── utils/
│   │   ├── phishingDetector.js    # Heuristic analyzer (urgency, domains, sensitive data, shorteners)
│   │   ├── passwordChecker.js     # Client-side entropy & brute-force time estimator
│   │   └── certificateGenerator.js# High-resolution landscape PDF certificate generator (jsPDF)
│   ├── App.jsx                    # Application routing & protected route trees
│   └── main.jsx                   # Entry point
│
├── supabase/
│   └── schema.sql                 # Complete PostgreSQL DDL, triggers, RLS policies & initial seed data
├── .env.example                   # Environment variable template
├── .gitignore
├── index.html
├── package.json
└── README.md
```

---

## 📚 1. Six Academic Learning Modules

Each module provides comprehensive educational materials, key objectives, real-world case studies, and safety recommendations:

1. **Digital Citizenship Fundamentals:** Core 9 elements, active vs. passive digital footprints, and golden Netiquette guidelines.
2. **Cybersecurity Awareness:** Social engineering anatomy, phishing/spear-phishing vectors, malware classes (trojans, ransomware, keyloggers), and multi-layered defense (MFA & patch hygiene).
3. **Online Privacy and Data Protection:** First-party vs. third-party trackers, browser fingerprinting, data broker surveillance, and GDPR/CCPA consumer rights.
4. **Cyberbullying and Online Harassment:** Forms of digital harassment (doxxing, impersonation/fraping, flaming), evidence preservation, and transforming from a bystander into an active upstander.
5. **Digital Ethics and Intellectual Property:** Copyright fundamentals, the 4 factors of Fair Use, Creative Commons licensing (CC BY, SA, NC, ND, CC0), plagiarism avoidance, and generative AI disclosure.
6. **Fake News and Misinformation:** The information disorder spectrum (misinformation, disinformation, malinformation), algorithmic filter bubbles, deepfake detection heuristics, and the CRAAP test.

---

## 🎯 2. Complete Quiz Assessment System (54 Questions)

* **9 questions** per module across all 6 modules (54 total database-backed questions).
* **4 multiple-choice options** per question with a single verified correct answer.
* **One question at a time** navigation with previous/next controls.
* **Instant feedback** post-submission with pedagogical explanations justifying correct answers.
* **Dynamic scoring** calculating final percentages and recording attempts in the `quiz_attempts` table.
* **Achievement triggers:** Passing module assessments awards bonus points and unlocks badges (e.g. *Quiz Master*, *Privacy Protector*).

---

## 🛠️ 3. Interactive Labs & Simulators

### A. Phishing Awareness Detector
* Users can input suspicious email text, SMS prompts, or URLs.
* Heuristic scanning flags:
  * Artificial urgency ("within 2 hours", "account suspended", "salary withheld")
  * Sensitive data solicitation (passwords, Social Security Numbers, routing numbers, 2FA tokens)
  * Suspicious URL patterns (lookalike TLDs like `.xyz`, `.top`, raw IP hosts, URL shorteners)
* Includes single-click **sample lures** for immediate evaluation.
* Clearly labeled as an educational heuristic simulator (never visits external URLs).

### B. Zero-Knowledge Password Strength Checker
* Evaluates password entropy, length (8, 12, 16+ chars), and character diversity.
* Identifies vulnerable patterns: sequential runs (`1234`), keyboard walks (`qwerty`), repeated characters, and common dictionary passwords.
* Provides estimated brute-force crack times and actionable hardening advice.
* **Privacy Guarantee:** Executed 100% client-side in the browser; passwords are never sent across the network or cached.

### C. Branching Safety Dilemma Scenarios
* Five realistic interactive dilemmas:
  1. *Urgent Direct Deposit Error from Payroll*
  2. *Group Chat Cyberbullying & Meme Targeting*
  3. *Unknown Person Soliciting 2FA Verification Codes for Gift Cards*
  4. *Viral Contaminated Tap Water Emergency Panic in Family Chat*
  5. *Suspicious Online Marketplace Payment & Courier Overpayment Scam*
* Student choices trigger real consequences, safety lessons, and database attempt logs.

---

## 🏆 4. Achievements, Leaderboard & Official Certificates

* **6 Achievement Badges:**
  * *First Login*
  * *First Module Completed*
  * *Cybersecurity Learner*
  * *Privacy Protector*
  * *Quiz Master*
  * *Digital Citizen Champion*
* **Student Honor Roll (Leaderboard):** Dynamically ranks learners by accumulated points while strictly protecting student privacy (emails and sensitive identifiers are never displayed).
* **Verifiable PDF Certificate:**
  * Requires completion of all 6 curriculum modules and verified quiz attempts.
  * Generates an official, high-resolution vector PDF using `jsPDF` with the student's legal name, unique tamper-evident verification ID (`DC-XXXXXX`), conferment date, and official platform seal.

---

## 🛡️ 5. Supabase Database & Security Architecture

The complete database schema is located at:
```
supabase/schema.sql
```

### Required Tables (14 Total):
1. `profiles`
2. `categories`
3. `modules`
4. `module_progress`
5. `quizzes`
6. `questions`
7. `quiz_options`
8. `quiz_attempts`
9. `scenarios`
10. `scenario_attempts`
11. `badges`
12. `student_badges`
13. `certificates`
14. `activity_logs`

### Security & Row Level Security (RLS) Rules:
* **Enforced Student Role:** New signups automatically receive the `'student'` role through a PostgreSQL database trigger (`handle_new_user()`). Users cannot modify their own role via client requests.
* **Admin Verification:** Controlled via `is_admin()` database security definer functions. Admin routes (`/admin/*`) are protected both in the frontend router and at the database table level.
* **Service Role Keys:** Never exposed in the client. The frontend utilizes only the public publishable anon key.

---

## 💻 6. Local Setup and Installation

### Prerequisites:
* Node.js (v18+ recommended)
* npm

### Step 1: Clone or navigate to the directory
```bash
cd DigiCitizen
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update with your Supabase Project settings:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-publishable-key
```

*(Note: The platform features a built-in offline resilience fallback. If Supabase is not yet connected, you can immediately evaluate every page, complete quizzes, take scenarios, and download certificates without errors.)*

### Step 4: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 7. Demonstration Accounts for Fast Evaluation

On the `/login` page, convenient **1-Click Demo Buttons** are provided:

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Student** | `student@digicitizen.edu` | `CyberStudent2026!` | Student Dashboard, Quizzes, Simulator, Scenarios, Certificate |
| **Administrator** | `admin@digicitizen.edu` | `AdminMaster2026!` | Admin Portal (`/admin`), Module Management, Question Bank, Analytics |

---

## 📄 License
Educational Open-Access Framework — Built for digital citizenship, ethical technology literacy, and cyber defense.
