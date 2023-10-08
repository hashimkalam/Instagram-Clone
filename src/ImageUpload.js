import React, { useState } from "react";
import "./ImageUpload.css";
import { Button } from "@mui/material";
import { db, storage } from "./firebase";
import firebase from "firebase";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log("Upload button clicked");
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        // Get the download URL first
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <div className="imageUpload__contents">
        <progress
          className="imageUpload__progress"
          value={progress}
          max="100"
        />
        <input
          type="text"
          placeholder="Enter a caption..."
          onChange={(event) => setCaption(event.target.value)}
          value={caption}
        />
        <input type="file" onChange={handleChange} />

        <Button onClick={handleUpload}> Upload </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
