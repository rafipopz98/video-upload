import { Request, Response } from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import File from "../models/File";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../config/config";

// my mac ffprobe location
ffmpeg.setFfprobePath("/opt/homebrew/bin/ffprobe");
export const uploadController = async (req: Request, res: Response) => {
  console.log("Starting upload");

  // Configure Cloudinary
  cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  // Multer storage configuration
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Multer upload middleware
  const upload = multer({ storage: storage }).single("file");
  console.log("After multer upload");

  // Handle file upload
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send(err);
    }

    try {
      // Check if file exists
      const file = req.file;
      if (!file) {
        return res.status(400).send("No file uploaded.");
      }

      console.log("File path:", file.path);

      // Check video duration using ffmpeg
      ffmpeg.ffprobe(file.path, async (err, metadata) => {
        if (err) {
          console.error("Error probing video:", err);
          return res.status(500).send(err);
        }

        const duration = metadata.format.duration;
        console.log("Video duration:", duration);

        // Check if duration exceeds 30 minutes (1800 seconds)
        if (duration && duration > 1800) {
          console.log("Video duration exceeds 30 minutes.");
          return res.status(400).json({
            message: "File is too long. Maximum duration is 30 minutes.",
          });
        }

        // Upload file to Cloudinary
        const uploadedFile = await cloudinary.v2.uploader.upload(file.path, {
          resource_type: "video",
          folder: "video-app",
        });

        // compress the video

        ffmpeg(file.path)
          .output("video_1280x720.mp4")
          .videoCodec("libx264")
          .size("1280x720")
          .on("error", (err) => {
            console.log("error while compressing", err.message);
          })
          .on("progress", (progress) => {
            console.log("Progress:", progress.frames);
          })
          .on("end", () => {
            console.log("Video compression complete!");
          })
          .run();

        // Save file details to MongoDB
        const newFile = new File({
          title: req.body.title,
          description: req.body.description,
          url: uploadedFile.secure_url,
          duration: duration,
        });

        await newFile.save();

        console.log("File uploaded and saved:", newFile);

        // cloudinary Way of comporessing
        const compressedFile = await cloudinary.v2.uploader.upload(file.path, {
          resource_type: "video",
          folder: "compress_video-app", // folder name
          transformation: [
            { width: 1280, height: 720, crop: "scale", quality: "auto" },
          ],
        });

        console.log("compressedFile", compressedFile.secure_url);

        return res
          .status(200)
          .json({ message: "File uploaded successfully", file: newFile });
      });
    } catch (error: any) {
      console.error("Error uploading file:", error);
      res
        .status(500)
        .json({ message: "Error uploading file", error: error.message });
    }
  });
};

export const fetchFiles = async (req: Request, res: Response) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    return res.status(200).json(files);
  } catch (error: any) {
    console.log("Error while fetching all filess");
    return res
      .status(500)
      .json({ message: "Error fetching files", error: error.message });
  }
};
