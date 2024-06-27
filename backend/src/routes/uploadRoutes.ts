import express from "express";
import { fetchFiles, uploadController } from "../controller/upload";

export const uploadRouter = express.Router();

uploadRouter.post("/upload", uploadController);
uploadRouter.get("/files", fetchFiles);
