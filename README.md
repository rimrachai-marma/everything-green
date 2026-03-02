# Everything Green — Local Setup Guide

A full-stack project with **Next.js 16** (client) and **Bun + Express** (backend).

---

## Prerequisites

| Tool | Version |
|------|---------|
| [Node.js](https://nodejs.org/) | v18+ |
| [Bun](https://bun.sh/) | v1.3+ |
| [PostgreSQL](https://www.postgresql.org/) | v14+ |

---

## Project Structure
```
/
├── backend/    # Bun + Express API server
└── client/     # Next.js 16 frontend
```

---

## 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <repo-name>
```

---

## 2. Database Setup

Create a PostgreSQL database:
```sql
CREATE DATABASE everything_green;
```

---

## 3. Backend Setup
```bash
cd backend
bun install
```

Create `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/everything_green"
PORT=8080
NODE_ENV=development
ALLOWED_ORIGINS="http://localhost:3000"
JWT_SECRET="your-secure-random-secret"
JWT_EXPIRES_IN="7d"
APP_URL="http://localhost:3000"
```

Push the schema and start the server:
```bash
bun run db:push
bun run dev
```

API runs at **http://localhost:8080**

---

## 4. Client Setup
```bash
cd client
npm install
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000/
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1

API_BASE_URL=http://localhost:8080/api/v1
TOKEN_COOKIE_NAME=access_token
TOKEN_EXPIRES_IN="7d"
```

Start the dev server:
```bash
npm run dev
```

Frontend runs at **http://localhost:3000**

---

## 5. Running Both Together

Open two terminals:
```bash
# Terminal 1 — Backend
cd backend && bun run dev

# Terminal 2 — Client
cd client && npm run dev
```

---

## Scripts

### Backend (`/backend`)

| Command | Description |
|---------|-------------|
| `bun run dev` | Start with hot reload |
| `bun run start` | Production server |
| `bun run db:push` | Push schema directly to DB |
| `bun run db:generate` | Generate migration files |
| `bun run db:migrate` | Run pending migrations |
| `bun run db:studio` | Open Drizzle Studio GUI |

### Client (`/client`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/health` | No | Health check |
| `POST` | `/api/v1/auth/signup` | No | Register a new user |
| `POST` | `/api/v1/auth/login` | No | Login |
| `POST` | `/api/v1/auth/logout` | Yes | Logout |
| `PATCH` | `/api/v1/auth/change-password` | Yes | Change password |
| `GET` | `/api/v1/user/profile` | Yes | Get profile |
| `PATCH` | `/api/v1/user/profile` | Yes | Update profile |
| `PATCH` | `/api/v1/user/email-update` | Yes | Update email |
| `DELETE` | `/api/v1/user/delete` | Yes | Delete account |

---

## Troubleshooting

**Database connection error** — Verify PostgreSQL is running and the credentials in `backend/.env` are correct.

**`bun: command not found`** — Install Bun: `curl -fsSL https://bun.sh/install | bash`

**Port already in use** — Change `PORT` in `backend/.env` and update `API_BASE_URL` in `client/.env.local` to match.

**Client crashes on startup with env errors** — The app uses `@t3-oss/env-nextjs` which throws if any required variable is missing. Make sure all variables in `.env.local` are present and spelled correctly.
