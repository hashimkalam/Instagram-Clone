import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import { db } from "./firebase";
import firebase from "firebase";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Post({ postId, user, username, imageUrl, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    if (user && user.displayName) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
          text: comment,
          username: user.displayName, // Use user's display name as the username
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setComment(""); // Clear the comment input after successful comment
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    } else {
      console.error("Missing user or username");
    }
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerLeft">
          <Avatar
            className="post__avatar"
            src="/static/images/avatar/1.jpg"
            alt="Hashim"
          />
          <h3>{username}</h3>
        </div>
        <MoreHorizIcon />
      </div>

      <img className="post__image" src={imageUrl} alt="" />

      <div className="post__options">
        <div className="post__optionsLeft">
          <FavoriteBorderIcon className="post__optionLeft" />
          <AddCommentIcon className="post__optionLeft" />
          <ShareIcon className="post__optionLeft" />
        </div>
        <BookmarkBorderIcon className="post__optionRight" />
      </div>

      <h4 className="post__text">
        <b>{username}</b> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment, index) => (
          <p key={index}>
            <b>{comment.username}</b> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
          >
            Comment
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
