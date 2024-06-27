import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import FileList from "./components/FileList/FileList";
import UploadForm from "./components/UploadForm/UploadForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadSuccess = () => {
    fetchFiles();
  };

  return (
    <div>
      <Header />
      <div className="App">
        <UploadForm onUploadSuccess={handleUploadSuccess} />
        <FileList files={files} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
