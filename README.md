# Backend Core

A reusable Node.js, Express 5, and MongoDB backend foundation designed to be integrated into multiple projects. It includes authentication, request validation, file uploads, centralized error handling, and common utilities.

The project follows a modular structure that can be adapted for e-governance portals, administrative dashboards, e-commerce applications, and other full-stack applications.

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express 5** — Web framework
- **MongoDB and Mongoose** — Database and object modeling
- **JWT and bcrypt** — Authentication tokens and password hashing
- **express-validator** — Request validation
- **Multer and Cloudinary** — File uploads and cloud storage
- **Nodemailer** — Email delivery
- **cookie-parser** — Cookie parsing
- **CORS** — Cross-origin request configuration
- **dotenv** — Environment variable management

## Use This Backend in Any Project

This repository can be reused in an existing project or as a standalone backend. Choose the approach that matches your Git repository structure.

### Option 1: Integrate into an Existing Project

Use this option when your project already has a root `.git` directory and you want the frontend and backend to share the same Git repository.

From your existing project root, clone the backend into a `backend` directory:

```powershell
git clone https://github.com/smarankhanal/backend.git backend
```

Remove the cloned repository's Git metadata so Git tracks the backend as part of the parent repository:

```powershell
Remove-Item -Recurse -Force backend/.git
```

Your project structure will look like this:

```text
my-project/
├── .git/
├── frontend/
└── backend/
    ├── src/
    ├── app.js
    ├── index.js
    ├── package.json
    └── README.md
```

Run Git commands from the project root:

```powershell
git add .
git commit -m "Add reusable backend"
git push
```

**Important:** Removing `backend/.git` removes the cloned repository's local Git metadata, including its remote configuration and locally available commit history. The backend files will be tracked by the parent repository.

If `backend/` already exists, inspect its contents before cloning to avoid conflicts.

### Option 2: Use as a Standalone Backend

Use this option when you want the backend to have its own independent Git repository.

Clone the starter repository:

```powershell
git clone https://github.com/smarankhanal/backend.git my-backend
cd my-backend
npm install
```

You have two choices for Git history.

**A. Keep the original history**

Use this when you want to retain the starter repository's commit history and continue working from it. No Git initialization is necessary.

**B. Start with a clean Git history**

Use this when you want the project files without the starter repository's existing commit history.

```powershell
Remove-Item -Recurse -Force .git
git init
git add .
git commit -m "Initial commit"
```

Create an empty repository on GitHub, then connect and push your local repository:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_NEW_REPO` with your GitHub username and repository name.

**Important:** If you start with a clean history, make sure `.env` and other sensitive files are excluded before the first commit.

### Customize the Project

Update the package metadata for your application:

```bash
npm pkg set name="my-backend"
npm pkg set description="Backend for my application"
```

Install dependencies:

```bash
npm install
```

Then:

1. Create your `.env` file from `.env.sample`.
2. Configure the database connection and required credentials.
3. Update the README to describe your application.
4. Add project-specific routes, controllers, models, and validators as needed.

Keep `.env` and all real credentials out of Git.

## Project Structure

```text
backend/
├── src/
│   ├── controllers/
│   ├── db/
│   │   └── index.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   ├── multer.middleware.js
│   │   └── validate.middleware.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── user.routes.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── capitalize.js
│   │   └── cloudinary.js
│   └── validators/
│       └── auth.validators.js
├── app.js
├── constants.js
├── index.js
├── .env.sample
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB running locally or an accessible MongoDB Atlas database
- Cloudinary credentials if cloud uploads are enabled
- SMTP credentials if email delivery is enabled

### 1. Install Dependencies

From the backend directory:

```powershell
cd backend
npm install
```

If you have already cloned the repository as `my-backend` and are inside that directory, you can skip `cd backend`.

### 2. Configure Environment Variables

Create a local environment file:

```powershell
Copy-Item .env.sample .env
```

Configure the values required by your application:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/my_database
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=replace_with_a_strong_random_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=replace_with_another_strong_random_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

These are example values. The variable names must match those read by your application. Optional integrations may not require every variable.

**Security requirements:**

- Never commit `.env` or real credentials.
- Keep `.env.sample` free of secrets.
- Generate strong, independent secrets for access and refresh tokens.
- Configure production environment variables through your deployment platform.
- Validate required environment variables during application startup.

### 3. Run the Backend

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

Ensure your `package.json` contains the appropriate scripts and that `nodemon` is installed as a development dependency if used.

Example:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### 4. Connect the Frontend

Example local development URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

Configure CORS to allow the frontend's actual origin. Use the API route prefixes defined in your backend when configuring frontend requests.

## Usage Examples

### Protecting a Route

```javascript
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/profile", verifyJWT, getProfile);
```

### Validating a Request

```javascript
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidator } from "../validators/auth.validators.js";

router.post("/register", registerValidator, validate, registerUser);
```

### Writing a Controller

```javascript
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Profile fetched"));
});
```

### Uploading a File

```javascript
import { upload } from "../middlewares/multer.middleware.js";

router.post("/avatar", verifyJWT, upload.single("avatar"), updateAvatar);
```

Configure file size limits, allowed MIME types, and storage settings according to your application's requirements. Validate uploaded files before processing them.

## Development Guidelines

- Keep controllers, routes, models, validators, and middleware separate.
- Use centralized error handling and consistent API response formats.
- Validate incoming request data before business logic executes.
- Store sensitive configuration in environment variables.
- Never return password hashes or sensitive authentication data in API responses.
- Apply authentication and role-based authorization where required.
- Configure secure cookie options when using cookie-based authentication.
- Keep dependencies updated and review security advisories.
- Document new environment variables and API endpoints when adding features.

## Git and Repository Structure

When integrated into an existing project, the backend should share the root repository's Git history.

```text
E-governance/
├── .git/
├── frontend/
└── backend/
```

Run Git commands from the project root:

```bash
git add .
git commit -m "Update backend functionality"
git push
```

Do not run `git init` inside `backend/` when it is intended to be part of the parent repository. A nested `.git` directory can cause Git to treat the backend as a separate repository rather than tracking its files normally.

When using the backend as an independent project, retain its original Git history or initialize a fresh repository, depending on your needs.

## License

This project uses the ISC license only if that is the license specified in `package.json` and supported by the repository's `LICENSE` file. Confirm the intended license before distributing or reusing the starter.
