# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Full-stack Todo application with separate backend and frontend directories. No monorepo/workspace setup — each has its own `package.json` and `node_modules`.

| Directory | Stack | Port |
|-----------|-------|------|
| `backend/` | Express 5 + TypeScript (ESM) | 3001 |
| `frontend/` | React 19 + Vite + Tailwind CSS v4 + TypeScript (ESM) | 5173 |

Data is stored in-memory on the backend (lost on restart).

## Commands

```bash
# Backend
cd backend && npm run dev      # Dev server with hot reload (tsx watch)
cd backend && npm test         # Run backend tests

# Frontend
cd frontend && npm run dev     # Vite dev server with HMR
cd frontend && npm test        # Run frontend tests
cd frontend && npm run lint    # ESLint

# Run a single test file
cd backend && npx vitest run src/storage/tasks.storage.test.ts
cd frontend && npx vitest run src/components/TaskForm.test.tsx
```

## Architecture

**Backend** — Layered: Routes → Controllers → Storage. The Express app is exported from `app.ts` (separate from server start in `index.ts`) for testability with supertest.

**Frontend** — React Context for state management. Data flow: Components → `useTasks` hook → `TaskContext` → `tasksApi` (axios) → Backend REST API.

**API**: REST at `/api/tasks` with standard CRUD. Task titles validated (non-empty, max 500 chars) on both client and server.

See `backend/CLAUDE.md` and `frontend/CLAUDE.md` for detailed architecture of each side.
