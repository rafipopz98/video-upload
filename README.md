For the forntend
> cd frontend > npm i > npm run dev

Backend
 > add .env file in root and add these credential's of urs

PORT=8080
DBURL= < your_mongo_db_url>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

To get the cloudinary credentials
sign up or login here
https://cloudinary.com/users/register_free

and you can view your credentials

If ran into : Error: Cannot find ffprobe
 then install ffmeg : which used for format transcoding, basic editing, triming many more
 
On macOS using Homebrew:   brew install ffmpeg


On Ubuntu or Debian-based systems:

sudo apt update
sudo apt install ffmpeg

On Windows:
Download the FFmpeg executable from the official website.
Extract the contents and add the bin directory to your system's PATH.

Verify Install using this :   ffmpeg -version

Set the path to ffprobe 
You can find the path by running "which ffprobe" on Unix-like systems or "where ffprobe" on Windows.
next go- to 
Go to >backend > src >controller > upload.ts > line number 13 and add the path


To Run the backend 
>cd backend > npm i > npm run dev
