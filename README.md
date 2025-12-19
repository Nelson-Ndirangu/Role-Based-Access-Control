# Role-Based Access Control (RBAC) Backend

A Node.js backend application implementing Role-Based Access Control (RBAC) system with JWT authentication. This project provides secure user management with different access levels for admin, manager, and user roles.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Role-Based Authorization**: Three-tier access control system
  - **Admin**: Full access to all resources
  - **Manager**: Access to manager and user resources
  - **User**: Access to user resources only
- **Password Security**: Bcrypt hashing for secure password storage
- **Token-Based Security**: JWT implementation for stateless authentication
- **MongoDB Integration**: NoSQL database for user data storage
- **Middleware Protection**: Custom middleware for token verification and role checking

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Environment Management**: dotenv
- **Development**: nodemon

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Role-Based-Access-Control
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/rbac_db
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=8000
   ```

5. **Start MongoDB service**
   Make sure MongoDB is running on your system.

6. **Run the application**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:8000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user and get JWT token | Public |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users/admin` | Admin dashboard access | Admin only |
| GET | `/api/users/manager` | Manager dashboard access | Admin, Manager |
| GET | `/api/users/user` | User dashboard access | Admin, Manager, User |

### Default Route

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Health check endpoint | Public |

## Usage

### User Registration

Send a POST request to `/api/auth/register` with the following JSON body:

```json
{
  "username": "johndoe",
  "password": "securepassword123",
  "role": "user"
}
```

**Valid roles**: `admin`, `manager`, `user`

### User Login

Send a POST request to `/api/auth/login` with:

```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Accessing Protected Routes

Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

**Example using curl**:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:8000/api/users/user
```

## Role Hierarchy

- **Admin**: Can access admin, manager, and user routes
- **Manager**: Can access manager and user routes
- **User**: Can access only user routes

## Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   └── authController.js     # Authentication logic (register/login)
├── middleware/
│   ├── authMiddleware.js     # JWT token verification
│   └── roleMiddleware.js     # Role-based access control
├── models/
│   └── user.js               # User schema definition
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   └── userRoutes.js         # Protected user routes
├── server.js                 # Main application entry point
├── test.js                   # Simple test server
└── package.json              # Dependencies and scripts
```

## Testing

A simple test server is included in `test.js` for basic functionality testing:

```bash
node test.js
```

Visit `http://localhost:8000` to verify the server is responding.

## Security Considerations

- JWT tokens expire after 1 hour
- Passwords are hashed using bcrypt with salt rounds of 10
- Role validation prevents unauthorized access
- Input validation for registration and login
- Secure headers should be implemented in production (helmet, cors, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Future Enhancements

- Password reset functionality
- Email verification for registration
- Rate limiting for API endpoints
- Refresh token implementation
- User profile management
- Audit logging for security events
- API documentation with Swagger/OpenAPI</content>
<parameter name="filePath">c:\Users\hp\Desktop\Role-Based-Access-Control\README.md