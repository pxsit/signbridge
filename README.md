# Signbridge 🌉

Signbridge is an interactive, gamified web application designed to help users learn American Sign Language (ASL) through a progressive, engaging experience. Aimed at both learners and supported by a Caregiver Mode, it integrates learning paths, interactive games, and progress tracking with a streak and badge system.

## 🚀 Features

### 📚 Learning Paths

- **Daily Sign**: A featured "Sign of the Day" on the homepage.
- **Categorized Learning**: Words are grouped into logical categories (e.g., Greetings, Family, Animals).
- **Interactive Cards**: High-quality visual representations (via GIFs) of each sign with difficulty levels, tags, and example sentences.

### 🎮 Gamification & Mini-Games

- **Sign Match**: Test visual recognition by matching signs to words.
- **Word Hunt**: Discover hidden words in engaging mini-games.
- **Story Time**: Contextualize signs within interactive stories and answer comprehension questions.

### 📈 Progress & Motivation

- **Streaks**: Daily login tracking encouraging consistent learning.
- **Badges**: Unlockable achievements for hitting milestones (e.g., specific number of signs learned, perfect game scores).
- **Session Logs**: Historical track of what categories you studied and for how long.

### 👨‍👩‍👧 Caregiver Mode

- **Dual Perspective**: Toggle caregiver mode for specialized settings, progress monitoring, and curated pathways, making it perfect for parent-child guided learning.

## 🛠️ Tech Stack

Signbridge is built on a modern, robust, and type-safe frontend web stack:

- **Framework**: [React 19](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Language**: TypeScript (`ES2022`)
- **Routing**: `react-router-dom` v7
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: `framer-motion`
- **PWA Capabilities**: `vite-plugin-pwa` for offline capability and installation as a native-like app.
- **Testing**: [Vitest](https://vitest.dev/) combined with [React Testing Library](https://testing-library.com/) & `jsdom` for unit and component integration tests.
- **Linting & Formatting**: ESLint (Flat Config) & Prettier

## 📂 Architecture & Folder Structure

The project was recently restructured for higher scale and maintainability using absolute base alias resolution (`@/*`).

```text
signbridge/
├── .eslintrc.js       # ESLint Flat Config
├── vite.config.js     # Vite & PWA configuration
├── tsconfig.json      # TypeScript compiler configuration (includes aliases)
├── vitest.setup.ts    # Setup file for global test environment (e.g. jest-dom)
├── src/
│   ├── components/    # Reusable UI components (Navbar, Badges, Cards, etc.)
│   ├── constants/     # Centralized constant strings and configurations
│   ├── context/       # React Context Providers (e.g., UserContext for state)
│   ├── data/          # Hardcoded JSON/TS datasets for signs, stories, badges
│   ├── layouts/       # Core layout wrappers (MainLayout)
│   ├── pages/         # Page-level components corresponding to Router routes
│   ├── types/         # Domain-separated TypeScript interfaces (signs, games, etc)
│   ├── utils/         # Pure functions for generic logic (streaks, storage, etc)
│   ├── App.tsx        # High-level Router definitions
│   └── index.tsx      # Application entrypoint
├── tests/             # Separated test suite directory (components & utils)
└── public/            # Static assets and PWA icons
```

## 💻 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/pxsit/signbridge.git
   cd signbridge
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```
   Open your browser to the local URL provided by Vite (typically `http://localhost:5173`).

## 📜 Available Scripts

- `pnpm dev`: Starts the Vite development server.
- `pnpm build`: Runs the Vitest suite first. If all tests pass, compiles the TypeScript and builds the app for production (into the `/dist` directory).
- `pnpm preview`: Boot up a local static web server to serve the `/dist` folder.
- `pnpm lint`: Runs ESLint over the `src` directory to catch errors and enforce styling rules.
- `pnpm test`: Boots the Vitest test runner (in watch mode during development).
- `pnpm deploy`: Builds the project and deploys the `/dist` folder to GitHub Pages using the `gh-pages` module.

## 💾 State Management

The application leverages React Context (`UserContext.tsx`) combined with `localStorage` persistence. The `UserState` captures:

- User metadata (name, role, onboarding completion)
- Array of learned sign IDs
- Calculated properties like `dailyStreak` and `lastPracticeDate`
- Unlockable arrays (`earnedBadges`, `gameStars`)

By keeping pure functions (like `checkStreak` in `utils/streakUtils.ts`) decoupled from Context, they are highly testable.

## 🤝 Contributing

When contributing to Signbridge:

1. Try to maintain the usage of **React Hooks** and functional components.
2. Keep UI components pure when possible, obtaining data via props or limited Context consumption.
3. Reference `types/` for relevant TypeScript definitions.
4. Run `pnpm lint` and `pnpm test` before committing to ensure regressions aren't introduced.
