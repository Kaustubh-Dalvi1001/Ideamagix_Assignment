# Ideamagix Assignment

An online lecture scheduling platform with separate admin and instructor panels. Admins create courses and schedule lectures against instructors and dates; instructors log in to see their assigned lectures. Scheduling clashes (double-booked instructors, double-booked course slots) are prevented at the database level using compound unique indexes.

## Tech stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT auth (httpOnly cookies), bcrypt, Multer + Cloudinary for image uploads

**Frontend:** React (Vite), React Router, Redux Toolkit, TanStack Query, React Hook Form, Tailwind CSS + DaisyUI, Axios

## Project structure

```
ideaMagixBackend/
  src/
    config/        - DB, Cloudinary, Multer setup
    models/        - User, Course, Lecture schemas
    controllers/    - route logic (auth, admin, instructor, profile)
    middlewares/    - JWT auth + role guards
    routes/         - route definitions
    app.js

ideaMagixFrontend/
  src/
    components/     - Signup, Login, Admin, Instructor, Body (layout)
    store/          - Redux slice for auth state
```

## Core scheduling logic

A lecture is a single scheduled session of a course, tied to one instructor and one date. Two compound unique indexes on the Lecture collection enforce every clash rule required:

```js
lectureSchema.index({ course: 1, date: 1 }, { unique: true });
lectureSchema.index({ instructor: 1, date: 1 }, { unique: true });
```

- `{course, date}` unique → a course can't have two lectures scheduled on the same date.
- `{instructor, date}` unique → an instructor can't be double-booked on the same date, regardless of course.

Violating either rule throws a MongoDB duplicate-key error, which the `addLecture` controller catches and returns as a `409 Conflict` with a readable message — no manual conflict-checking logic required.

## Getting started

### Backend

```bash
cd ideaMagixBackend
npm install
```

Create a `.env` file in `ideaMagixBackend/`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
npm run dev
```

Server runs on `http://localhost:3000`.

### Frontend

```bash
cd ideaMagixFrontend
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## API reference

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/signup` | Public | Create an admin or instructor account |
| POST | `/login` | Public | Log in, issues JWT via httpOnly cookie |
| POST | `/logout` | Public | Clears the auth cookie |
| GET | `/profile` | Authenticated | Returns the logged-in user's details |
| POST | `/addCourse` | Admin | Create a course (name, level, description, photo) |
| GET | `/courses` | Admin | List all courses |
| POST | `/addLecture` | Admin | Schedule a lecture (course, instructor, date) |
| GET | `/instructors` | Admin | List all instructor accounts |
| GET | `/assignedLectures` | Instructor | List lectures assigned to the logged-in instructor |

## Auth flow

Signup and login issue a JWT stored in an httpOnly cookie, so it isn't accessible to client-side JavaScript. Every protected route runs through two middlewares in sequence:

1. `userAuth` — verifies the JWT, loads the user, attaches it to `req.user`
2. `isAdmin` / `isInstructor` — checks `req.user.role`, rejects with `403` if it doesn't match

Role checks always read from `req.user` (set only after JWT verification), never from the request body — the client can't influence which role it's treated as.

## Data models

**User** — `userName`, `password` (bcrypt-hashed), `role` (`admin` | `instructor`)

**Course** — `name`, `level` (`beginner` | `intermediate` | `advanced`), `description`, `image` (Cloudinary URL), `lectures` (array of Lecture references)

**Lecture** — `course` (ref), `instructor` (ref, validated to be a user with `role: instructor`), `date`