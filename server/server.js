import express from "express"
import { config } from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.js"

const app = express();

config();

connectDB();

app.use(express.json());

app.use(
  cors({
    allowed: process.env.ALLOWED.split(" "),
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use("/api/assignment/v1",userRoutes);

app.get("/",(req,res) => {
  res.send("Hello assignment server")
})

const PORT = process.env.PORT || 5000

const NODE_ENV = process.env.NODE_ENV || "development"

app.listen(PORT, () => console.log(`Server running on ${PORT} in ${NODE_ENV} environment...`))