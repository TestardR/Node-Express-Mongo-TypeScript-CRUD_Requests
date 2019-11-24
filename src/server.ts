import express, { json, Response, Handler } from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/user";

/**
|--------------------------------------------------
| Init server & DB
|--------------------------------------------------
*/
const app = express();
connectDB();
/**
|--------------------------------------------------
| Init MiddleWare
|--------------------------------------------------
*/
app.use(json());
/**
|--------------------------------------------------
| Init Routes
|--------------------------------------------------
*/
app.use("/users", userRoutes);

/**
|--------------------------------------------------
| Test Route
|--------------------------------------------------
*/
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to Express/TypeScript CRUD requests" });
});

/**
|--------------------------------------------------
| Server init
|--------------------------------------------------
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
