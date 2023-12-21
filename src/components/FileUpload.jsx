import React, { useState } from "react";

function FileUpload(props) {
  const [file, setFile] = useState();

  function handleFile(e) {
    setFile(e.target.files[0]);
  }
  return (
    <div className="App">
      <h1>Social Lips</h1>
      <div className="card">
        <form>
          <input type="file" onChange={handleFile} />
          <button>Upload video</button>
        </form>
      </div>
    </div>
  );
}

export default FileUpload;
