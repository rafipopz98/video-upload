import React from "react";
import "./FileList.css";

const FileList = ({ files }) => {
  return (
    <div className="file-list">
      <h2>Uploaded Files</h2>
      <div className="file-grid">
        {files.map((file) => (
          <div key={file._id} className="file-card">
            <div className="thumbnail">
              <video controls>
                <source src={file.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="file-info">
              <h3>{file.title}</h3>
              <p>{file.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
