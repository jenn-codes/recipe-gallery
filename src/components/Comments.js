import React, { useState } from "react";
import uniqid from "uniqid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";

const Comments = ({ comments, postId }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [postComments, setPostComments] = useState(comments);
  const [replyStatus, setReplyStatus] = useState(false);
  const [replyComment, setReplyComment] = useState(null);

  const saveName = (e) => {
    setName(e.target.value);
  };

  const saveComment = (e) => {
    setComment(e.target.value);
  };

  const submitForm = () => {
    setShowForm(false);
    let newComments = postComments.slice();
    newComments.push({
      user: name,
      comment: comment,
      likes: 0,
    });
    setPostComments(newComments);
    updateDB(newComments);
  };

  const updateDB = async (newComments) => {
    const ref = await db.collection("posts").where("id", "==", postId).get();
    const docRefId = ref.docs[0].id;
    const post = doc(db, "posts", docRefId);
    await updateDoc(post, {
      comments: newComments,
    });
  };

  // // calculate parent & child indices of nested comments
  // const findCommentIndexes = (item) => {
  //     let parentIndex, childIndex
  //     let parentComments = postComments.filter(el => 'children' in el)
  //     console.log(parentComments)
  //     parentComments.forEach(element => {
  //         (element.children.forEach(i => {
  //             if (i.comment.includes(item.comment)) {
  //                 const parentComment = element
  //                 parentIndex = postComments.indexOf(parentComment);
  //                 childIndex = parentComment.children.indexOf(i);
  // }}))})
  // return [parentIndex, childIndex]
  // }

  const likeComment = async (item) => {
    const commentIndex = postComments.indexOf(item);
    let newComments = postComments.slice();
    newComments[commentIndex].likes += 1;
    setPostComments(newComments);
    updateDB(newComments);
  };

  const dislikeComment = async (item) => {
    const commentIndex = postComments.indexOf(item);
    let newComments = postComments.slice();
    newComments[commentIndex].likes -= 1;
    setPostComments(newComments);
    updateDB(newComments);
  };

  const reply = (item) => {
    setReplyComment(item);
    setShowForm(true);
    setReplyStatus(true);
    console.log(item);
  };

  const submitReply = () => {
    let newComments = postComments.slice();
    newComments.push({
      user: name,
      comment: comment,
      likes: 0,
      replyingTo: replyComment.user,
      replyingComment: replyComment.comment,
    });
    console.log(newComments);
    setPostComments(newComments);

    updateDB(newComments);
    setShowForm(false);
  };

  const share = (item) => {
    console.log(item);
  };

  const displayComment = (item) => {
    return (
      <Box>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "darkorange" }}>{item.user[0]}</Avatar>
          </ListItemAvatar>

          <Box>
            {item.replyingTo ? (
              <Box>
                <Typography
                  style={{ fontSize: "0.8em", verticalAlign: "middle" }}
                  color="text.secondary"
                >
                  replying to {item.replyingTo}: {item.replyingComment}
                </Typography>
                <Typography variant="h6">{item.comment}</Typography>
              </Box>
            ) : (
              <Typography variant="h6">{item.comment}</Typography>
            )}
            <Typography variant="p" display="block" color="text.secondary">
              {item.user}
            </Typography>
          </Box>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Button size="small" onClick={() => likeComment(item)}>
            <ArrowCircleUpOutlinedIcon />
          </Button>
          {item.likes ? item.likes : 0}
          <Button size="small" onClick={() => dislikeComment(item)}>
            <ArrowCircleDownOutlinedIcon />
          </Button>
          <Button size="small" onClick={() => reply(item)}>
            REPLY
          </Button>
          <Button size="small" onClick={() => share(item)}>
            SHARE
          </Button>
        </ListItem>
        <Divider />
      </Box>
    );
  };

  const displayForm = () => {
    return (
      <div>
        {showForm ? (
          <div>
            <Box
              className="form"
              component="form"
              sx={{
                backgroundColor: "white",
                width: 600,
                margin: "auto",
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography variant="h6" align="center">
                Add a comment
              </Typography>

              <TextField
                id="outlined-name"
                label="Name"
                size="small"
                onChange={saveName}
              />

              <TextField
                id="outlined-name"
                label="Comment"
                size="small"
                onChange={saveComment}
              />

              <Button
                variant="outlined"
                onClick={() => {
                  replyStatus ? submitReply() : submitForm();
                }}
              >
                Submit
              </Button>
            </Box>
          </div>
        ) : (
          " "
        )}
      </div>
    );
  };

  return (
    <div className="comments">
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {postComments.map((item) => {
          return <div key={uniqid()}>{displayComment(item)}</div>;
        })}
      </List>
      {displayForm()}
    </div>
  );
};

export default Comments;
