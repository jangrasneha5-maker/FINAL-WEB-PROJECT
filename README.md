# Modern Musician — Assessment 3

A full-stack extension of the original Modern Musician HTML, CSS and JavaScript project. The original seven frontend pages and DOM interactions are retained and served by Express.

## Features

- Node.js and Express server with static frontend hosting.
- MongoDB Atlas connection using Mongoose and environment variables.
- MongoDB models for Releases, Tour Events and Contact Messages.
- REST CRUD APIs for releases and tour events; contact messages can be created, listed and deleted.
- Local JSON file APIs (GET, POST, PUT, DELETE) for homepage announcements.
- External iTunes Search API accessed through the Express backend.
- EJS admin dashboard at `/admin` for adding releases and tour events, editing/deleting releases, deleting events and reviewing/deleting contact messages.
- Contact form saves submissions to MongoDB.

## Requirements

- Node.js 18 or newer (Node.js 20+ recommended; this project uses the built-in `fetch`).
- MongoDB Atlas database or a local MongoDB server.

## Setup

1. Extract the ZIP and open the project folder in VS Code.
2. Install packages:

   ```bash
   npm install
   ```

3. Create a file named `.env` in the project root. Copy `.env.example` and add your own MongoDB connection string:

   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://USERNAME:PASSWORD@YOUR-CLUSTER.mongodb.net/modern_musician?retryWrites=true&w=majority
   ```

   URL-encode special characters in the database password. Never commit `.env` to GitHub.

4. Start the server:

   ```bash
   npm start
   ```

   For development with automatic restarts:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

## Useful URLs

- Website: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin`
- Test endpoint: `http://localhost:3000/api/test`

## API endpoints

### MongoDB — Releases

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/releases` | List releases |
| GET | `/api/releases/:id` | Get one release |
| POST | `/api/releases` | Create release |
| PUT | `/api/releases/:id` | Update release |
| DELETE | `/api/releases/:id` | Delete release |

Example POST body:

```json
{
  "title": "Midnight Memories",
  "artist": "Modern Musician",
  "genre": "Alternative",
  "releaseYear": 2026,
  "artwork": "https://example.com/artwork.jpg",
  "description": "A sample release."
}
```

### MongoDB — Tour Events

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/tour` | List events |
| GET | `/api/tour/:id` | Get one event |
| POST | `/api/tour` | Create event |
| PUT | `/api/tour/:id` | Update event |
| DELETE | `/api/tour/:id` | Delete event |

### MongoDB — Contact Messages

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/messages` | List messages |
| POST | `/api/messages` | Save a contact message |
| DELETE | `/api/messages/:id` | Delete a message |

### Local JSON announcements

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/updates` | Read `src/data/updates.json` |
| POST | `/api/updates` | Add announcement |
| PUT | `/api/updates/:id` | Edit announcement |
| DELETE | `/api/updates/:id` | Delete announcement |

Example POST body:

```json
{
  "title": "New single announced",
  "category": "Music update",
  "description": "A new release is coming soon.",
  "date": "2026-11-16"
}
```

### External API

- GET `/api/external/music?term=taylor%20swift` — searches the public iTunes Search API and returns selected track information.

## Important notes

- The admin dashboard is a classroom demonstration and is not protected by authentication. Do not deploy it publicly without adding authentication and authorization.
- Sample tour dates and announcement text are demonstration content. Replace them with accurate information before public use.
- The iTunes Search API depends on internet connectivity and the external service being available.
- Contact messages are stored in the database. Use test data during classroom demonstrations.
