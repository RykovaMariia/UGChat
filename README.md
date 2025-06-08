# UGChat

Real-Time Chat Application

# 🛠 Technology Stack

## Frontend:

- [Vue 3](https://vuejs.org/) — Progressive JavaScript Framework
- [Ionic Vue](https://ionicframework.com/) — UI framework for building hybrid mobile apps
- [TypeScript](https://www.typescriptlang.org/) — Typed superset of JavaScript
- [Vue Router](https://router.vuejs.org/) — Client-side routing

## Backend:

- [AzureSignalRService](https://github.com/NickSuomi/AzureSignalRService) - A lightweight real-time messaging service built with SignalR and ASP.NET Core, providing both WebSocket and REST API capabilities.

## Real-time Communication:

- [@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr) — Real-time WebSocket transport

## Development & Tooling:

- [Vite](https://vitejs.dev/) — Lightning-fast build tool
- [ESLint](https://eslint.org/) — Linter for code quality
- [Husky](https://typicode.github.io/husky/) — Git hooks automation

---

# ⚙️ Setup and Running Locally

What do you need to do to run our project locally?

1. Use node `20.x` or higher.
2. Install `Git` on your computer.
3. Install Code Editor of your choice.
4. Clone this repository to your local machine.
5. Install all dependencies using

```bash
 npm ci
```

6. Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

7. Finally run a development server:

```bash
   npm run dev
```

---

# 📜 Available Scripts

In the project directory, you can run:

```bash
npm run dev
```

Start the development server

```bash
npm run build
```

Build the app for production with type checking

```bash
npm run preview
```

Preview the production build locally

```bash
npm run lint
```

Lint the codebase with ESLint

```bash
npm run type-check
```

Run TypeScript type checking only

```bash
npm run test:unit
```

Run unit tests using Vitest

```bash
npm run test:e2e
```

Run end-to-end tests using Cypress

```bash
npm run prepare
```

Install Husky to enable Git hooks
