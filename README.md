![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

# Todo API - NestJS

A RESTful API for managing todo items built with NestJS, leveraging PostgreSQL for data persistence, TypeORM for database management, and featuring comprehensive Swagger documentation and validation.

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete todo items
- **Status Management**: Track todo progress (Pending → In Progress → Completed)
- **Database Persistence**: PostgreSQL database with TypeORM migrations
- **Input Validation**: Built-in validation using class-validator
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **TypeScript**: Full type safety and modern development experience

## 🛠️ Tech Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Runtime**: Node.js

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nooretk/todo-api-nest.git
   cd todo-api-nest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Database Setup**

   Make sure you have PostgreSQL installed and running on your system.

   ```bash
   # Create database and user (run this once)
   psql -U postgres -f docs/db-setup.sql
   ```

4. **Environment Configuration**

   Create a `.env` file in the root directory:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=todo_user
   DB_PASS=todo_pass
   DB_NAME=todo_db
   ```

5. **Run Database Migrations**
   ```bash
   npm run m:run
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

### Other Useful Commands

```bash
# Format code
npm run format

# Lint code
npm run lint

# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

Swagger UI is available at:

👉 [http://localhost:3000/docs](http://localhost:3000/docs)

It provides a live playground to test the endpoints.

---

## 🌐 API Endpoints

All endpoints are prefixed with `/api`

### Todo Operations

| Method   | Endpoint                    | Description              |
| -------- | --------------------------- | ------------------------ |
| `POST`   | `/api/todo`                 | Create a new todo        |
| `GET`    | `/api/todo`                 | Get all todos            |
| `GET`    | `/api/todo/:id`             | Get a specific todo      |
| `PATCH`  | `/api/todo/:id/title`       | Update todo title        |
| `PATCH`  | `/api/todo/:id/in-progress` | Mark todo as in progress |
| `PATCH`  | `/api/todo/:id/completed`   | Mark todo as completed   |
| `DELETE` | `/api/todo/:id`             | Delete a todo            |

## 📋 Data Models

### Todo Entity

```typescript
{
  "id": number,
  "title": string,
  "createdAt": Date,
  "status": "PENDING" | "IN_PROGRESS" | "COMPLETED",
  "inProgressAt": Date | null,
  "completedAt": Date | null
}
```

### Create Todo DTO

```typescript
{
  "title": string // required, non-empty
}
```

### Update Title DTO

```typescript
{
  "title": string // required, non-empty
}
```

### Update Status DTO

```typescript
{
  "status": "PENDING" | "IN_PROGRESS" | "COMPLETED" // required
}
```

## 🗄️ Database

This project uses PostgreSQL with TypeORM for data persistence.

### Database Schema

- **Table**: `todos`
- **Columns**:
  - `id` (SERIAL PRIMARY KEY)
  - `title` (VARCHAR(120) NOT NULL, indexed)
  - `createdAt` (TIMESTAMPTZ NOT NULL DEFAULT now())
  - `status` (ENUM: 'PENDING', 'IN_PROGRESS', 'COMPLETED', indexed)
  - `inProgressAt` (TIMESTAMPTZ NULL)
  - `completedAt` (TIMESTAMPTZ NULL)

### Migration Commands

```bash
# Generate a new migration
npm run m:g -- src/migrations/MigrationName

# Create a blank migration
npm run m:c -- src/migrations/MigrationName

# Run pending migrations
npm run m:run

# Revert the last migration
npm run m:revert
```

## 📁 Project Structure

```
src/
├── app.controller.ts       # Application controller
├── app.module.ts          # Root module
├── app.service.ts         # Application service
├── main.ts               # Application entry point
├── migrations/           # Database migrations
│   └── 1755787000007-create-todos-table.ts
└── todo/
    ├── dto/
    │   ├── create-todo.dto.ts    # DTO for creating todos
    │   ├── update-title.dto.ts   # DTO for updating title
    │   └── update-status.dto.ts  # DTO for updating status
    ├── entities/
    │   └── todo.entity.ts        # Todo entity definition
    ├── enums/
    │   └── todo-status.enum.ts   # Status enumeration
    ├── todo.controller.ts        # Todo HTTP controller
    ├── todo.module.ts           # Todo module
    └── todo.service.ts          # Todo business logic
```

## 🐛 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Todo item not found
- **500 Internal Server Error**: Server errors

---

## 📌 Notes

- This API uses PostgreSQL for data persistence with TypeORM for database management.
- Database migrations are used to manage schema changes.
- Environment variables are used for database configuration.
- Add authentication for securing endpoints in production.
- Consider implementing soft deletes for better data management.

---

## 👨‍💻 Author

- [Noureddin Etkaidek](https://github.com/nooretk)

Built with ❤️ during ASAL Training

---

## 🪪 License

This project is licensed under the [MIT License](./LICENSE).
