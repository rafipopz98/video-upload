import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UploadForm.css";

const UploadForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.includes("video")) {
      setFile(selectedFile);
    } else {
      toast.error("Please select a valid video file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Title and description cannot be empty.");
      return;
    }

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    setUploading(true); 

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / total);
            setLoading(progress);
            console.log("Upload progress:", progress);
          },
        }
      );

      toast.success("File uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      setUploading(false);
      onUploadSuccess();
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.response);
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Video/Audio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>File:</label>
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploading && (
        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UploadForm;
