import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./models/User.js"; // ✅ Import connectDB function
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // ✅ Load environment variables early

// ✅ Ensure MongoDB is connected before starting the server
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/users", userRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
