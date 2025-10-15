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
