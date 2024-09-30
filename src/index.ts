import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import radarRoutes from "./routes/radarRoutes";
import auditRoutes from "./routes/auditRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB Atlas
const mongoURI = process.env.MONGO_URI || "";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Atlas connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Rutas
app.use("/radar", radarRoutes);
app.use("/audit", auditRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
