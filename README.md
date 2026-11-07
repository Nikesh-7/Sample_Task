# Task Manager — React + Spring Boot + PostgreSQL

A small full-stack CRUD project. You can create tasks, view them, mark them complete, and delete them.

## Stack
- Frontend: React, HTML, CSS, JavaScript (Vite)
- Backend: Java 17+, Spring Boot, Spring Data JPA
- Database: PostgreSQL

## 1. Create the database

Open pgAdmin or psql and run:

```sql
CREATE DATABASE task_manager_db;
```

The default database settings are:
- Database: `task_manager_db`
- Username: `postgres`
- Password: `postgres`

If your PostgreSQL username/password differs, edit `backend/src/main/resources/application.properties`.

## 2. Start the backend

Requirements: JDK 17+ and Maven (or use IntelliJ IDEA's Maven support).

From the `backend` folder:

```bash
mvn spring-boot:run
```

Backend URL: `https://taskmanagement37.onrender.com/api/tasks

Test endpoint: `GET https://taskmanagement37.onrender.com/api/tasks

## 3. Start the frontend

Requirements: Node.js LTS.

Open a second terminal in the `frontend` folder:

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `https://taskmanagement37.onrender.com/api/tasks.

## API endpoints

| Method | URL | Purpose |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

Example POST body:

```json
{
  "title": "Learn Spring Boot",
  "description": "Build my first REST API",
  "completed": false
}
```

## Project structure

```text
task-manager-fullstack/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/taskmanager/
│       │   ├── TaskManagerApplication.java
│       │   ├── controller/TaskController.java
│       │   ├── model/Task.java
│       │   └── repository/TaskRepository.java
│       └── resources/application.properties
└── frontend/
    ├── package.json
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── styles.css
```

## How the app works

1. React sends HTTP requests to the Spring Boot REST API.
2. Spring Boot receives the request in `TaskController`.
3. `TaskRepository` uses Spring Data JPA to read/write PostgreSQL.
4. The API returns JSON to React.
5. React updates the page.

This starter uses `ddl-auto=update` for learning. For a production application, use database migrations and move credentials to environment variables.
