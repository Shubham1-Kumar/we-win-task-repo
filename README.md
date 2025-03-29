<<<<<<< HEAD
# we-win-task-repo
=======
# User Management System

A MERN stack application for managing users with a form that validates inputs using JavaScript.

## Features

- User form with validation
- User listing with delete functionality
- MongoDB for data storage
- Express.js backend API
- React frontend with Vite
- **Local storage support** - Data persists even if the backend is unavailable
- **Search functionality** - Filter users by name, designation, gender, or favorites

## Requirements

- Node.js (v14+)
- MongoDB (running locally or remote connection)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/user-form
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the frontend development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (usually http://localhost:5173)

## Form Specifications

The user form includes the following fields:

1. User ID (Auto-increment, Primary Key - Display only)
2. Name (Required - Validated using JavaScript)
3. Gender (Radio buttons: Male/Female - Required with JavaScript alert if not selected)
4. Designation (Dropdown - Required)
5. Favorite (Checkbox - At least one required)

## CRUD Operations

- **Create** - Add new users with validation
- **Read** - View all users in a table format
- **Update** - Edit existing user information
- **Delete** - Remove users with confirmation

## Offline Support

The application uses local storage to:

- Store user data locally when the backend is unavailable
- Retrieve data from local storage on page reload
- Continue functioning even without a backend connection

## Search Feature

The application includes a search bar that:

- Filters users in real-time as you type
- Searches across all user fields (name, designation, gender, favorites)
- Shows clear feedback when no results match the search criteria

## Technologies Used

- MongoDB - Database
- Express.js - Backend framework
- React - Frontend library
- Node.js - JavaScript runtime
- Vite - Frontend build tool
- Local Storage - For offline data persistence
>>>>>>> c258496 (Final commit)
