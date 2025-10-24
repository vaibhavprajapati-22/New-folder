# fullstack-todo

Monorepo containing a simple TODO full-stack app.

- **backend/** - .NET 8 minimal API (in-memory storage)
- **frontend/** - Vite + React + TypeScript + Tailwind CSS

## Quick start (local)

### Backend
```bash
cd backend
dotnet run
# default: http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173
```

Make sure backend is running at http://localhost:5000. CORS is enabled for local development.

## Deploy
- Frontend can be deployed to Vercel/Netlify.
- Backend can be deployed to Azure/App Service/Render. Add a real DB for production.
