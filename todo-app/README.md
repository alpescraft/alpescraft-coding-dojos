# TODO List Application

A modern full-stack TODO list application with React frontend and Express backend.

## Features

- ✅ Add new tasks with title validation
- ✅ Mark tasks as complete/incomplete
- ✅ Edit task titles with inline editing (double-click)
- ✅ Delete individual tasks with confirmation
- ✅ View task statistics (total, completed, pending)
- ✅ In-memory persistence (data persists during server session)
- ✅ Input validation (client and server)
- ✅ Error handling with user feedback
- ✅ Loading states
- ✅ Responsive design
- ✅ TypeScript type safety
- ✅ RESTful API architecture

## Prerequisites

- Node.js 20+
- npm or yarn

## Installation

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

You'll need to run the backend and frontend in separate terminal windows.

### Terminal 1 - Start the Backend

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3001` and display:
```
Server running on http://localhost:3001
```

### Terminal 2 - Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`. Open your browser and navigate to `http://localhost:5173` to use the application.

## Building

### Build Backend

```bash
cd backend
npm run build
```

This generates compiled JavaScript in the `dist/` directory.

### Build Frontend

```bash
cd frontend
npm run build
```

This generates optimized production files in the `dist/` directory.

## API Documentation

Base URL: `http://localhost:3001/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/tasks` | Get all tasks | - |
| GET | `/tasks/:id` | Get single task | - |
| POST | `/tasks` | Create task | `{ title: string }` |
| PATCH | `/tasks/:id` | Update task | `{ title?: string, completed?: boolean }` |
| DELETE | `/tasks/:id` | Delete task | - |
| DELETE | `/tasks` | Delete all tasks | - |

### Example API Calls

Get all tasks:
```bash
curl http://localhost:3001/api/tasks
```

Create a task:
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries"}'
```

Update a task (toggle completion):
```bash
curl -X PATCH http://localhost:3001/api/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

Update task title:
```bash
curl -X PATCH http://localhost:3001/api/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"title":"New task title"}'
```

Delete a task:
```bash
curl -X DELETE http://localhost:3001/api/tasks/{id}
```

Delete all tasks:
```bash
curl -X DELETE http://localhost:3001/api/tasks
```

## Architecture

### Backend Architecture (Layered)

- **Routes** (`src/routes/`) - Express route definitions
- **Controllers** (`src/controllers/`) - Request handlers with validation
- **Storage** (`src/storage/`) - In-memory CRUD operations using Map
- **Models** (`src/models/`) - TypeScript type definitions

### Frontend Architecture

- **Components** (`src/components/`) - Reusable React components
  - `TaskList` - Renders all tasks
  - `TaskItem` - Individual task with edit/delete actions
  - `TaskForm` - Add new task form
  - `TaskStats` - Display statistics

- **Context** (`src/context/`) - Global state management
  - `TaskContext` - Manages tasks, loading, and error states

- **API** (`src/api/`) - Axios API client for backend communication

- **Hooks** (`src/hooks/`) - Custom React hooks
  - `useTasks` - Type-safe access to TaskContext

- **Types** (`src/types/`) - TypeScript type definitions

## Data Model

```typescript
interface Task {
  id: string;          // UUID v4
  title: string;       // Max 500 characters
  completed: boolean;
  createdAt: string;   // ISO 8601 format
  updatedAt: string;   // ISO 8601 format
}
```

## Technology Stack

### Frontend
- React 18.3+
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js 20+
- Express.js
- TypeScript
- UUID
- CORS

## Features Details

### Input Validation
- Server-side validation ensures data integrity
- Client-side validation for immediate user feedback
- Title must be non-empty and max 500 characters

### Error Handling
- User-friendly error messages
- Network error feedback
- Server error responses

### State Management
- React Context API for lightweight state management
- No external state library needed for this scope
- Centralized API calls through context

### Data Persistence
- In-memory storage using JavaScript `Map`
- Data persists during server runtime
- Data resets when server restarts
- Perfect for development and testing

## Testing the Application

1. **Add a Task:**
   - Type a title in the input field
   - Click "Add" or press Enter
   - Task appears at the top of the list

2. **Complete a Task:**
   - Click the checkbox next to a task
   - Task title becomes strikethrough
   - Statistics update immediately

3. **Edit a Task:**
   - Double-click a task title to edit
   - Make changes and press Enter or click away
   - Press Escape to cancel editing

4. **Delete a Task:**
   - Click the "Delete" button on a task
   - Confirm in the dialog
   - Task is removed from the list

5. **View Statistics:**
   - Cards at the top show total, completed, and pending tasks
   - Updates in real-time as you manage tasks

6. **Persistence:**
   - Refresh the page - data persists during the session
   - Restart the backend server - data resets

## Troubleshooting

### Backend won't start
- Ensure port 3001 is not in use: `lsof -i :3001`
- Check Node.js version: `node --version` (should be 20+)

### Frontend won't connect to backend
- Ensure backend is running on `http://localhost:3001`
- Check browser console for CORS errors
- Verify CORS is configured in `backend/src/app.ts`

### Tasks not persisting after page refresh
- Check that the backend server is still running
- In-memory storage only persists during the server session

## Development Notes

- The backend uses `tsx watch` for hot reload during development
- The frontend uses Vite's HMR (Hot Module Replacement)
- All API errors include descriptive error messages
- TypeScript ensures type safety across both frontend and backend
