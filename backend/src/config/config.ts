import { config } from "dotenv";

config({ path: ".env" });

export const PORT = <string>process.env.PORT;
export const DBURL = <string>process.env.DBURL;
export const CLOUDINARY_CLOUD_NAME = <string>process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = <string>process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = <string>process.env.CLOUDINARY_API_SECRET;
