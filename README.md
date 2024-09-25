Here's the corrected version of your README:

# Postgres Full-Text Search (FTS) with Prisma

This project demonstrates how to implement Full-Text Search (FTS) in PostgreSQL using Prisma ORM. It leverages PostgreSQL's `to_tsvector()`, `to_tsquery()`, and `ts_rank_cd()` functions for efficient text-based search capabilities. The application uses Node.js and Express for the server-side logic, Prisma as the database ORM, and Docker for easy environment setup.

## Features

- Full-text search on the `title` field of the `post` table.
- Search results ordered by relevance using `ts_rank_cd()`.
- Pagination and limit support for flexible data retrieval.

## Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/en/) (v14.x or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yves1da2vinci3/FTS-with-PostgresQL
cd FTS-with-PostgresQL
```

### 2. Rename `.env.example` to `.env`

In the root directory, rename `.env.example` to `.env` and configure the environment variables as needed.

```bash
mv .env.example .env
```

### 3. Launch Docker Containers

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

This will spin up a PostgreSQL database container.

### 4. Install Dependencies

Install the necessary npm packages:

```bash
npm install
```

### 5. Run Prisma Migrations

Apply the Prisma migrations to create the `post` table in the PostgreSQL database:

```bash
npx prisma migrate dev
```

### 6. Seed the Database

Seed the database with sample data (e.g., using MDN’s `index.json`):

```bash
npm run seed
```

This will populate the `post` table with initial data.

### 7. Start the Server

Start the Node.js server:

```bash
npm run start
```

The server will run on `localhost:3000`.

### 8. Test the Application

Once the server is running, test the full-text search by making a GET request.

#### Example Search Request:

Search for posts where the title contains the keyword `background`, limit the results to 10, and view the first page:

```bash
GET http://localhost:3000/search?keyword=background&limit=10&page=1
```

You should receive a JSON response with search results ordered by relevance.

## API Endpoints

### 1. `GET /`

- Description: Health check for the server.
- Response: Returns "Hello World!"

### 2. `GET /search`

- Description: Search for posts based on a keyword in the `title` field.
- Query Parameters:
  - `keyword`: The search term to look for in the title.
  - `limit`: The maximum number of results to return per page (default is 10).
  - `page`: The page number for pagination (default is 1).
- Example: `/search?keyword=background&limit=10&page=1`

## Project Structure

```bash
├── prisma/
│   ├── migrations/   # Prisma migrations
│   └── schema.prisma # Prisma schema
├── src/
    ├── index.js      # Main entry point
│   ├── api/          # API routes
│   └── seed/         # Seed data for database
├── docker-compose.yml # Docker Compose configuration
├── .env.example       # Example environment variables
├── package.json       # Node.js dependencies and scripts
└── README.md          # Project documentation
```

## License

This project is licensed under the MIT License.

---

### Notes:
- Ensure your PostgreSQL container is running before making requests.
- Make sure your `post` table is populated with enough data to test full-text search functionality.
