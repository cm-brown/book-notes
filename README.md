# book-notes

A full stack web app for keeping notes on books I've read. You can add, edit, and delete entries with a cover (pulled from Open Library by its OLID), attribution, review, and notes, and they're listed newest first.

## Tech

Node.js · Express · EJS templates · PostgreSQL (`pg`)

## Run it

1. Create a Postgres database and a `books` table, for example:

   ```sql
   CREATE TABLE books (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     image TEXT,        -- Open Library edition ID, e.g. OL7353617M
     attribution TEXT,
     review TEXT,
     notes TEXT,
     date DATE
   );
   ```

2. Add a `.env` file:

   ```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=book_notes
   DB_PASSWORD=your-password
   DB_PORT=5432
   ```

3. Install and start:

   ```sh
   npm install
   node index.js
   ```

   Then open http://localhost:3000.

## Routes

| Method | Path | Purpose |
|---|---|---|
| GET | `/` | List all books |
| GET | `/new` | Form for a new entry |
| POST | `/reviews` | Create an entry |
| GET/POST | `/edit/:id` | Edit an entry |
| POST | `/delete/:id` | Delete an entry |
