
# Task Manager

A full-stack task management app built with Next.js 13+ and MongoDB.

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set up `.env.local` with `MONGODB_URI`
4. Run the app: `npm run dev`

## API Endpoints
- **GET /api/tasks**: Fetch all tasks
  - Response: `[{ _id, title, description, completed }, ...]`
- **POST /api/tasks**: Create a task
  - Request: `{ "title": "string", "description": "string" }`
  - Response: `{ _id, title, description, completed }`
- **PUT /api/tasks/[id]**: Update a task
  - Request: `{ "completed": boolean }`
- **DELETE /api/tasks/[id]**: Delete a task

## Testing
Use Postman or curl:
- `curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"Test Task"}'`

## Screenshots
(Add screenshots here)# algo-ass
