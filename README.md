# Store Rating Application

A Full Stack Store Rating Management System built using React.js, Node.js, Express.js and MySQL.

This application allows users to register, log in, submit ratings for stores, and manage stores based on their assigned roles.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Authorization
* Change Password
* Logout Functionality

---

## User Roles

### System Administrator

* View Dashboard Statistics
* Add New Users
* Add New Stores
* View All Users
* View All Stores
* Search and Filter Users
* Search and Filter Stores

Dashboard Statistics:

* Total Users
* Total Stores
* Total Ratings

---

### Normal User

* Register Account
* Login
* Search Stores
* Submit Ratings
* Update Existing Ratings
* Change Password
* Logout

Store Information:

* Store Name
* Address
* Average Rating
* Submit Rating

---

### Store Owner

* Login
* View Store Dashboard
* View Average Rating
* View Users Who Rated Store
* Change Password
* Logout

---

## Form Validations

### Name

* Minimum 20 Characters
* Maximum 60 Characters

### Address

* Maximum 400 Characters

### Password

* Minimum 8 Characters
* Maximum 16 Characters
* At Least One Uppercase Letter
* At Least One Special Character

### Email

* Standard Email Validation

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MySQL

---

## Project Structure

store-rating-app/

├── frontend/

│ ├── src/

│ ├── public/

│ └── package.json

│

├── backend/

│ ├── controllers/

│ ├── routes/

│ ├── middleware/

│ ├── config/

│ ├── app.js

│ └── package.json

│

└── README.md

---

## Installation

### Clone Repository

git clone https://github.com/YOUR_USERNAME/store-rating-app.git

cd store-rating-app

---

### Backend Setup

cd backend

npm install

Create .env file:

PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=store_rating_db

JWT_SECRET=your_secret_key

Run Backend:

npm start

---

### Frontend Setup

cd frontend

npm install

npm run dev

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

---

### Admin

GET /api/admin/dashboard

POST /api/admin/users

GET /api/admin/users

POST /api/admin/stores

GET /api/admin/stores

---

### User

PUT /api/users/change-password

GET /api/stores

POST /api/ratings/submitrating

---

### Store Owner

GET /api/owner/dashboard

GET /api/owner/ratings

---

## Future Improvements

* Table Sorting
* Pagination
* React Toast Notifications
* Dashboard Charts
* Profile Management
* Dark Mode

---

## Author

Mahesh Shendkar

Computer Engineering Student

Java Full Stack Developer | MERN Stack Developer

---

## License

This project is developed for educational and assessment purposes.
