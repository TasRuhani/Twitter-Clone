import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data(urlencoded)

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
   console.log(`Server is running on port ${PORT}`);
   connectMongoDB();
})