# SukStay Hotel Booking Project

A full-stack hotel booking application built with **React** (frontend) and **Node.js/Express + MongoDB** (backend). This project allows users to browse hotels, view details, and book rooms. It is currently provided as a **local project** (not deployed online).

## Features

- Browse hotels and view detailed hotel information
- Check room availability for specific dates and make bookings
- Filter hotels based on criteria
- User authentication with role-based access (owner and user)
- Owners can add hotels and rooms
- **Owner dashboards**:
  - Manage rooms and hotel listings
  - Track total bookings, room status, and total revenue
  - Set room availability (Available / Not Available)
- **User dashboard**:
  - Manage all bookings
  - Track payment status and booking history
- Email confirmation for bookings


## Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Project Structure
```
SukStay/
│
├── server/       # backend (Node.js/Express)
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── client/       # frontend (React)
│   ├── src/
│   └── public/
│
└── README.md
```

## Setup Instructions (Local)

### Frontend (client)

1. Navigate to the frontend folder:
   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Install Vite (development server):

   ```bash
   npm install --save-dev vite
   ```
4. Start the frontend server:

   ```bash
   npm run dev
   ```

   The frontend will run at `http://localhost:5173` (or the port shown in terminal).

### Backend (server)

1. Navigate to the backend folder:

   ```bash
   cd server
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Install Nodemon (for auto-restart during development):

   ```bash
   npm install --save-dev nodemon
   ```
4. Start the backend server:

   ```bash
   npm run server
   ```

   The backend will run at `http://localhost:3000`.
