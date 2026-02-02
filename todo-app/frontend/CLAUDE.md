# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the **frontend** of a full-stack Todo application. It is a React 19 SPA built with Vite, TypeScript (strict mode), and Tailwind CSS v4.

The backend lives in `../backend/` and runs on port 3001. The frontend dev server runs on port 5173.

## Commands

```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # tsc -b && vite build
npm run lint         # ESLint
npm test             # Run all tests (vitest run)
npx vitest run src/components/TaskForm.test.tsx   # Run a single test file
```

## Architecture

**State management**: React Context API (no external state library).

Data flow: **Components → useTasks hook → TaskContext → tasksApi (axios) → Backend**

- `src/main.tsx` — Entry point, renders `<App />` in StrictMode
- `src/App.tsx` — Wraps content in `TaskProvider`, fetches tasks on mount, renders Stats/Form/List
- `src/context/TaskContext.tsx` — `TaskProvider` holds all state (`tasks`, `loading`, `error`) and CRUD methods using `useCallback`. This is the single source of truth.
- `src/hooks/useTasks.ts` — Convenience hook that consumes `TaskContext` with a guard if used outside provider
- `src/api/tasks.api.ts` — Axios client pointing to `http://localhost:3001/api`, typed request/response methods
- `src/types/task.types.ts` — Shared TypeScript interfaces (`Task`, `CreateTaskRequest`, `UpdateTaskRequest`)

### Components

- `TaskStats` — Displays total/completed/pending counters derived from `tasks` array
- `TaskForm` — Controlled input with client-side validation (empty, >500 chars), calls `addTask`
- `TaskList` — Renders loading/error/empty states, maps tasks to `TaskItem`
- `TaskItem` — Checkbox toggle, inline edit on double-click (Enter/Escape), delete with confirm dialog. Dates formatted in French locale.

## Testing

- **Vitest** with jsdom environment (configured in `vite.config.ts`)
- **React Testing Library** + `@testing-library/user-event`
- Setup file: `src/test-setup.ts` (imports `@testing-library/jest-dom/vitest` matchers)
- Tests wrap components in `<TaskContext.Provider>` with mock context values — no API calls in tests
- `globals: true` in vitest config, so `describe`/`it`/`expect` are available without imports (though explicit imports also work)

## Key conventions

- ESM throughout (`"type": "module"`)
- Tailwind CSS v4 — uses `@import "tailwindcss"` in `index.css`, configured via `@tailwindcss/postcss` plugin
- Axios for HTTP (not fetch)
- French locale for date formatting in TaskItem (`fr-FR`)
