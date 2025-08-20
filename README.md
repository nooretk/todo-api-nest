![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

# Todo API - NestJS

A RESTful API for managing todo items built with NestJS, featuring comprehensive Swagger documentation and validation.

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete todo items
- **Status Management**: Track todo progress (Pending → In Progress → Completed)
- **Input Validation**: Built-in validation using class-validator
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **TypeScript**: Full type safety and modern development experience

## 🛠️ Tech Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript
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

## 🚀 Running the Application

### Development Mode

```bash
npm run start:dev
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

## 📁 Project Structure

```
src/
├── app.controller.ts       # Application controller
├── app.module.ts          # Root module
├── app.service.ts         # Application service
├── main.ts               # Application entry point
└── todo/
    ├── dto/
    │   ├── create-todo.dto.ts    # DTO for creating todos
    │   └── update-title.dto.ts   # DTO for updating title
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

- This API uses in-memory storage for simplicity.
- For production, you should use a proper database like MongoDB or PostgreSQL.
- Add authentication for securing endpoints in the future.

---

## 👨‍💻 Author

- [Noureddin Etkaidek](https://github.com/nooretk)

Built with ❤️ during ASAL Training

---

## 🪪 License

This project is licensed under the [MIT License](./LICENSE).
