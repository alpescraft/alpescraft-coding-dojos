# TODO List Application - Quick Start Guide

## Project Overview

✅ **Complete full-stack TODO list application** with:
- React 19.2 + TypeScript frontend
- Express.js + TypeScript backend
- Tailwind CSS for styling
- RESTful API architecture
- In-memory data persistence
- 23 TypeScript files with complete type safety

## Start the Application

### Option 1: Two Terminal Windows (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd todo-app/backend
npm run dev
```
The backend will start on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd todo-app/frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

Then open your browser to: **http://localhost:5173**

### Option 2: One Terminal (Sequential)

```bash
cd todo-app/backend
npm run dev &

cd ../frontend
npm run dev
```

## What You Can Do

1. **Add Tasks** - Type a title and click "Add"
2. **Complete Tasks** - Check the checkbox to mark complete
3. **Edit Tasks** - Double-click a task title to edit inline
4. **Delete Tasks** - Click "Delete" with confirmation
5. **View Stats** - See total, completed, and pending counts
6. **Data Persists** - Data survives page refresh during the session

## Project Structure

```
todo-app/
├── backend/                 # Express API server (port 3001)
│   ├── src/
│   │   ├── index.ts        # Entry point
│   │   ├── app.ts          # Express configuration
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Request handlers
│   │   ├── storage/        # In-memory CRUD
│   │   └── models/         # TypeScript types
│   └── package.json
│
└── frontend/                # React app (port 5173)
    ├── src/
    │   ├── App.tsx         # Main component
    │   ├── components/     # React components
    │   ├── context/        # State management
    │   ├── api/           # API client
    │   ├── hooks/         # Custom hooks
    │   └── types/         # TypeScript types
    └── package.json
```

## Key Features Implemented

### Backend
- ✅ CORS configured for localhost:5173
- ✅ Express middleware for JSON parsing
- ✅ Layered architecture (routes → controllers → storage)
- ✅ UUID-based task IDs
- ✅ Input validation (title required, max 500 chars)
- ✅ Error handling with proper HTTP status codes
- ✅ In-memory Map for data storage

### Frontend
- ✅ React Context API for state management
- ✅ Tailwind CSS for responsive design
- ✅ Axios HTTP client
- ✅ TypeScript type safety throughout
- ✅ Loading states and error messages
- ✅ Inline editing with keyboard shortcuts
- ✅ Task statistics display
- ✅ Delete confirmation dialog

## API Endpoints

All endpoints use `http://localhost:3001/api/tasks`

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Get all tasks |
| POST | `/` | Create task |
| PATCH | `/:id` | Update task |
| DELETE | `/:id` | Delete task |

### Example API Calls

```bash
# Get all tasks
curl http://localhost:3001/api/tasks

# Create a task
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My new task"}'

# Mark task as complete
curl -X PATCH http://localhost:3001/api/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a task
curl -X DELETE http://localhost:3001/api/tasks/{id}
```

## Technology Stack

### Frontend
- React 19.2.0
- TypeScript 5.9.3
- Vite (build tool)
- Tailwind CSS 4.1.18
- Axios 1.13.4

### Backend
- Express.js 5.2.1
- TypeScript 5.9.3
- UUID 13.0.0
- CORS 2.8.6
- Node.js 20+ (runtime)

## Build for Production

**Backend:**
```bash
cd backend
npm run build  # Compiles TypeScript to dist/
```

**Frontend:**
```bash
cd frontend
npm run build  # Builds optimized dist/ directory
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Port 3001 already in use" | `lsof -i :3001` and kill the process |
| "Cannot connect to backend" | Ensure backend is running on 3001 |
| "CORS error" | Backend's CORS is set to `http://localhost:5173` |
| "Data doesn't persist" | In-memory storage only persists during session |

## Development Tips

- **Hot Reload:** Both apps support hot module reloading - changes save automatically
- **Type Safety:** All code is TypeScript - full IDE autocomplete and error checking
- **Validation:** Input validation on both client and server
- **Error Handling:** User-friendly error messages for all failures
- **Responsive Design:** Works on mobile, tablet, and desktop

## Next Steps

1. ✅ Start the backend: `npm run dev` in `/backend`
2. ✅ Start the frontend: `npm run dev` in `/frontend`
3. ✅ Open http://localhost:5173 in your browser
4. ✅ Start using the app!

See `README.md` for complete documentation.
