# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the **backend** of a full-stack Todo application. It is an Express 5 REST API with in-memory storage, written in TypeScript (strict mode, ESM).

The frontend lives in `../frontend/` and runs on port 5173. The backend runs on port 3001 with CORS configured for that origin.

## Commands

```bash
npm run dev          # Start dev server with tsx watch (hot reload)
npm run build        # TypeScript compilation to dist/
npm test             # Run all tests (vitest run)
npx vitest run src/storage/tasks.storage.test.ts   # Run a single test file
```

## Architecture

Layered architecture: **Routes → Controllers → Storage**

- `src/index.ts` — Entry point, starts Express on port 3001
- `src/app.ts` — Express app configuration (CORS, JSON parser, routes, error handler). Exported separately from the server start for testability with supertest.
- `src/models/task.model.ts` — TypeScript interfaces (`Task`, `CreateTaskRequest`, `UpdateTaskRequest`, `TaskResponse`)
- `src/routes/tasks.routes.ts` — Express Router mapping HTTP verbs to controller functions
- `src/controllers/tasks.controller.ts` — Request validation, calls storage, converts Date objects to ISO strings for responses
- `src/storage/tasks.storage.ts` — `TaskStorage` class using a `Map<string, Task>`, exported as singleton `taskStorage`. In-memory only (data lost on restart).

## API

Base path: `/api/tasks`

| Method | Path | Status codes |
|--------|------|-------------|
| GET | `/` | 200 |
| GET | `/:id` | 200, 404 |
| POST | `/` | 201, 400 |
| PATCH | `/:id` | 200, 400, 404 |
| DELETE | `/:id` | 200, 404 |
| DELETE | `/` | 200 |

Validation: title required, non-empty after trim, max 500 chars. Completed must be boolean.

## Testing

- **Vitest** for all tests
- **supertest** for API integration tests (imports `app` from `app.ts`, no server start needed)
- Storage tests: `src/storage/tasks.storage.test.ts` — unit tests on the `taskStorage` singleton (call `deleteAll()` in `beforeEach`)
- Route tests: `src/routes/tasks.routes.test.ts` — integration tests via supertest against the Express app

## Key conventions

- ESM throughout (`"type": "module"` in package.json), imports use `.js` extensions
- UUID v4 for task IDs
- Dates stored as `Date` objects internally, serialized to ISO strings in API responses
- Tasks sorted by `createdAt` descending in `getAll()`
