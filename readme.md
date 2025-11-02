# API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication Endpoints

All authentication endpoints are handled by Better Auth at `/api/auth/*`

### Register
```http
POST /api/auth/sign-up/email
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}
```

### Login
```http
POST /api/auth/sign-in/email
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Get Session
```http
GET /api/auth/get-session
Cookie: better-auth-session=<session-token>
```

### Logout
```http
POST /api/auth/sign-out
Cookie: better-auth-session=<session-token>
```

## AI Agent Endpoint

### Run AI Agent (Protected - Requires Authentication)
```http
POST /api/agent
Content-Type: application/json
Cookie: better-auth-session=<session-token>

{
  "prompt": "Analyze this website: https://example.com"
}
```

**Response:**
```json
{
  "response": {
    "response": "Analysis text...",
    "toolCalls": [...],
    "toolResults": [...]
  },
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Error Response (Unauthorized):**
```json
{
  "error": "Unauthorized",
  "message": "You must be logged in to access this endpoint"
}
```

## Environment Variables

Required environment variables (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Random secret for auth encryption
- `BETTER_AUTH_URL` - Base URL of the server (http://localhost:8000)
- `FIRECRAWL_API_KEY` - API key for Firecrawl (optional, required for agent tool)
- `GOOGLE_API_KEY` - Google AI API key for Gemini model
- `PORT` - Server port (default: 8000)

## CORS Configuration

Allowed origins:
- http://localhost:3000
- http://localhost:5173
- http://localhost:5174

Credentials are enabled for cookie-based authentication.

## Running the Server

```bash
# Development mode with auto-reload
pnpm dev

# Production mode
pnpm start

# Database commands
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations
pnpm db:studio    # Open Drizzle Studio
```
