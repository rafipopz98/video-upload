import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./src/config/config";
import { connectDB } from "./src/config/connectDb";
import { uploadRouter } from "./src/routes/uploadRoutes";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Credentials");
  next();
});

app.use("/api", uploadRouter);
connectDB();

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
