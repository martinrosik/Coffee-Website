# Coffee Shop Web Application ☕

## Overview
This project is a modern web application for a Coffee Shop, built using **React**, **Next.js**, and **Shadcn UI components** for a seamless user interface. The backend is powered by **MongoDB** for data management. This website is fully ready to use!

## Features
- Admin panel to manage reservations and contact messages.
- Simple but modern design.
- Managing reservations, contact messages.
- Email reminder for reservations.

## Technologies Used
- **Frontend:** React, Shadcn UI components, Custom Tweakcn theme
- **Backend:**  Next.js
- **Database:** MongoDB

## Setup Instructions

### Frontend Setup
1. **Clone the repository:**
```bash
git clone https://github.com/martinrosik/Coffee-Website
```
2. **Navigate to the project folder:**
```bash
cd coffee-shop
```
3. **Install dependencies:**
```bash
npm install
```
4. **Run the development server:**
```bash
npm run dev
```
5. Open your browser and go to `http://localhost:3000` to see the frontend.

### Backend Setup
1. **Ensure MongoDB is running:**
   - You can use MongoDB Atlas or a local MongoDB instance.
2. **Configure environment variables:**
   - Create a `.env` file in the root folder.
   - Add your MongoDB connection string:
```env
MONGODB_URI=<your-mongodb-connection-string>
```
3. **API Routes:**
   - The backend is integrated via Next.js API routes. These routes handle CRUD operations for reservations, contact messages.
4. **Run the backend:**
   - The backend runs automatically with the Next.js development server.
  
## License
This project is licensed under the MIT License.

