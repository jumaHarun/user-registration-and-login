# **User Registration and Login System**

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## **Project Overview**

The **User Registration and Login System** is a full-stack web application that allows users to register, log in, and manage their sessions securely. The backend is built with Node.js and Express, with MongoDB as the database. The frontend will be developed using React. This project focuses on user authentication, secure password hashing, and session management using JSON Web Tokens (JWT) or sessions.

## **Features**

- User registration with secure password hashing using bcrypt.
- User login with email and password.
- Session management using JWT or session-based authentication.
- Protected routes that require user authentication.
- RESTful API endpoints for user operations.
- Modular and scalable project structure.
- Comprehensive testing with Jest and Supertest.

## **Tech Stack**

- **Frontend:**
  - React (to be implemented in later milestones)
- **Backend:**
  - Node.js
  - Express
  - TypeScript
  - MongoDB
- **Authentication:**
  - bcrypt for password hashing
  - JWT for session management (or alternative session-based management)
- **Testing:**
  - Jest
  - Supertest

## **Project Structure**

```
src/
├── config/             # Configuration files (e.g., database, environment)
├── controllers/        # Route controllers for handling requests
├── middleware/         # Express middlewares (e.g., authentication)
├── models/             # Mongoose models (e.g., User)
├── routes/             # API routes (e.g., /api/users)
├── tests/              # Unit and integration tests
├── views/              # Pug templates (if any, for server-side rendering)
├── index.ts            # Entry point of the application
└── app.ts              # Express application setup
```

## **Installation and Setup**

To set up and run this project locally, follow these steps:

### **1. Clone the Repository:**

```bash
git clone https://github.com/your-username/user-registration-login-system.git
cd user-registration-login-system
```

### **2. Install Dependencies:**

```bash
npm install
```

### **3. Setup Environment Variables:**

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_db_name
JWT_SECRET=your_jwt_secret
```

### **4. Start the Application:**

```bash
npm run start
```

The application should now be running at `http://localhost:3000`.

## **Environment Variables**

The following environment variables are used in this project:

- `PORT`: The port number on which the server will run.
- `MONGODB_URI`: The URI for connecting to the MongoDB database.
- `JWT_SECRET`: The secret key for signing JWT tokens.

## **Scripts**

- **`npm run start`**: Starts the application in development mode using `ts-node`.
- **`npm run build`**: Compiles the TypeScript files into JavaScript.
- **`npm run test`**: Runs the test suite using Jest.
- **`npm run lint`**: Runs ESLint to check for code quality issues.
- **`npm run format`**: Formats the code using Prettier.

## **API Endpoints**

### **Authentication**

- **POST /api/auth/register**

  - Registers a new user.
  - **Request Body:** `{ "email": "example@example.com", "password": "yourpassword" }`
  - **Response:** `{ "message": "User registered successfully", "user": { ... } }`

- **POST /api/auth/login**
  - Logs in an existing user.
  - **Request Body:** `{ "email": "example@example.com", "password": "yourpassword" }`
  - **Response:** `{ "token": "your_jwt_token" }`

### **User Management**

- **GET /api/users/me**
  - Gets the details of the authenticated user.
  - **Header:** `{ "Authorization": "Bearer your_jwt_token" }`
  - **Response:** `{ "user": { ... } }`

## **Testing**

This project uses Jest and Supertest for testing. To run the tests:

```bash
npm run test
```

### **Writing Tests**

Tests are located in the `src/tests/` directory. Each module or feature should have its own test file. The tests are designed to check the correctness of the functionality, including unit tests for individual modules and integration tests for API endpoints.

## **Contributing**

Contributions are welcome! Please fork this repository and submit a pull request with your proposed changes. Make sure to update tests as appropriate.

### **Steps to Contribute:**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## **Contact**

If you have any questions or need further assistance, please reach out to:

- **Name:** Your Name
- **Email:** your.email@example.com
- **GitHub:** [your-username](https://github.com/your-username)
