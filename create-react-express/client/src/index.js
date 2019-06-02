import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import axios from "axios";

// Cloudinary api url for Sohail's acoount.
const url = "https://api.cloudinary.com/v1_1/dycolznuv/image/upload";

// This function renders the app.
// It allows the user to upload png or jpeg images to the Cloudinary cloud storeage.

function App() {

  return (
    <div className="App">
      <h1>Hello Artwork</h1>
      <h2>Load your Artwork to the web!</h2>
      {/* This input, allows the user to selected an image file from computer. */}
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        //  This on change event sends image selected in the input to Cloudinary
        onChange={e => {
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          formData.append("upload_preset", "hv5mciev");

        // This axios.post sends image directly to Cloudinary with upload presets
        // Clouldinary returns an URL of image stored on the web.
          return axios.post(url, formData).then(r => {
            
            // This axios.post send the returned image URL to the server.js to be stored in database.
            axios.post("/api/user", {url:r.data.url}).then( res => 
              {console.log(res)});
            console.log(r.data.url)
          });
        
        }}
      />
    </div>
  );

      }
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);