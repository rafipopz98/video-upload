# Project Setup Guide

## Frontend Setup

1. Navigate to the frontend directory:

cd frontend

2. Install dependencies:

npm install

3. Start the development server:

npm run dev

## Backend Setup

1. Create a `.env` file in the root directory.
2. Add the following credentials to your `.env` file:

PORT=8080
DBURL=<your_mongo_db_url>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

- **Note:** Obtain your Cloudinary credentials from [Cloudinary](https://cloudinary.com/users/register_free).

3. If encountering `Error: Cannot find ffprobe`, install FFmpeg:

- **macOS (using Homebrew):**
  ```
  brew install ffmpeg
  ```
- **Ubuntu or Debian:**
  ```
  sudo apt update
  sudo apt install ffmpeg
  ```
- **Windows:** Download and add FFmpeg's bin directory to your system's PATH.

4. Set the path to `ffprobe` in your backend:

- Locate the path using `which ffprobe` (Unix-like systems) or `where ffprobe` (Windows).
- Update the path in `backend/src/controller/upload.ts`, line 13.

## Running the Backend

1. Navigate to the backend directory:

cd backend

2. Install dependencies:

npm install

3. Start the development server:

npm run dev

This setup ensures your project runs smoothly with the necessary configurations and dependencies.
