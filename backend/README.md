# RoomMate Matcher API

## Setup

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U "username"`

Replace "username" with your database username. Enter password when prompted.

Create a database with the command `CREATE DATABASE roommatedb;`.

Copy the `.env.example` file to `.env` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```sh
DB_HOST=localhost
DB_USER="username from above"
DB_NAME=roommatedb
DB_PASS="password from above"
DB_PORT=5432
```

## Seeding

To create the tables in the database and seed it with some data, run:
```sh
npm run db:reset
```

## Run The Server

Running the server normally
```sh
npm start
```
