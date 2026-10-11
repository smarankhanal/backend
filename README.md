# Backend Core

A reusable Node.js + Express + MongoDB backend starter. It ships with authentication, validation, file uploads, error handling, and common utilities, so you can drop it into any project instead of rebuilding it each time.

## Tech Stack

- **Express 5**: web framework
- **Mongoose**: MongoDB ODM
- **JWT + bcrypt**: authentication and password hashing
- **express-validator**: request validation
- **Multer + Cloudinary**: file uploads and cloud storage
- **Nodemailer**: sending emails
- **cookie-parser, cors, dotenv**: cookies, CORS, environment config

## Folder Structure

```
backend/
├── src/
│   ├── controllers/              # Route handler logic
│   ├── db/
│   │   └── index.js              # MongoDB connection
│   ├── middlewares/
│   │   ├── auth.middleware.js         # JWT verification
│   │   ├── errorHandler.middleware.js # Central error handler
│   │   ├── multer.middleware.js       # File upload handling
│   │   └── validate.middleware.js     # Runs express-validator checks
│   ├── models/
│   │   └── user.model.js         # User schema
│   ├── routes/
│   │   └── user.routes.js        # User routes
│   ├── utils/
│   │   ├── ApiError.js           # Custom error class
│   │   ├── ApiResponse.js        # Consistent success response
│   │   ├── asyncHandler.js       # Wraps async handlers, forwards errors
│   │   ├── capitalize.js         # String helper
│   │   └── cloudinary.js         # Cloudinary upload helper
│   └── validators/
│       └── auth.validators.js    # Validation rules for auth routes
├── app.js                        # Express app setup (middlewares, routes)
├── constants.js                  # App-wide constants
├── index.js                      # Entry point (DB connect + server start)
├── .env.sample                   # Example environment variables
├── .gitignore
└── package.json
```

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/yourusername/backend-core.git
cd backend-core
npm install
```

### 2. Set up environment variables

```bash
cp .env.sample .env
```

Then fill in your values in `.env`. Typical variables for this stack:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

> Keep `.env.sample` in sync with the variables your code actually reads.

### 3. Run the server

```bash
npm run dev     # development with nodemon
npm start       # production
```

Make sure your `package.json` has these scripts:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

## Use This as Your Own Project

### 1. Clone into a folder with your own name

```bash
git clone https://github.com/smarankhanal/backend.git my-project-name
cd my-project-name
```

### 2. Change the name and author

Edit `package.json`:

```json
{
  "name": "my-project-name",
  "author": "Your Name <your@email.com>",
  "description": "Your own description"
}
```

Or from the terminal:

```bash
npm pkg set name="my-project-name"
npm pkg set author="Your Name"
npm pkg set description="Your own description"
npm install
```

### 3. Start your own git history

```bash
rm -rf .git            # Windows PowerShell: Remove-Item -Recurse -Force .git
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/theirusername/my-project-name.git
git push -u origin main
```

To keep the original history and only change where it pushes:

```bash
git remote set-url origin https://github.com/theirusername/my-project-name.git
```

### 4. Update the README and license

Replace the project name and repo URLs in `README.md`, and check the `license` field in `package.json`.

## Usage Examples

### Protecting a route

```js
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/profile", verifyJWT, getProfile);
```

### Validating a request

```js
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidator } from "../validators/auth.validators.js";

router.post("/register", registerValidator, validate, registerUser);
```

### Writing a controller

```js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getProfile = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Profile fetched"));
});
```

### Uploading a file

```js
import { upload } from "../middlewares/multer.middleware.js";

router.post("/avatar", verifyJWT, upload.single("avatar"), updateAvatar);
```

> Adjust the import names above to match what your files actually export.

## Versioning

Tag releases so other projects can pin a version:

```bash
npm version patch          # or minor / major
git push --follow-tags
```

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push the branch: `git push origin feature/my-feature`
5. Open a pull request

## License

ISC
