import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import PostCard from "./Card";
import uniqid from "uniqid";

const User = ({ posts, likePost, dislikePost }) => {
  const navigate = useNavigate();
  const params = useParams();
  const paramId = params.id;
  console.log(paramId);
  const auth = getAuth();
  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [newDisplayName, setNewDisplayName] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setUid(user.uid);
        setDisplayName(
          user.displayName ? user.displayName.toLowerCase() : user.email
        );
        setNewUrl(`/user/${uid}`);
        setUserLoggedIn(true);
        const newArr = posts.filter(
          (post) => post.user.toLowerCase() === displayName
        );
        setFilteredPosts(newArr);
        navigate(newUrl);
      }
    });
  }, [navigate, auth, newUrl, uid, posts, displayName]);

  const userPosts =
    filteredPosts.length !== 0 ? (
      filteredPosts.map((item) => {
        return (
          <PostCard
            key={uniqid()}
            board={item.board}
            likes={item.likes}
            comments={item.comments.length}
            time={item.time}
            body={item.body}
            image={item.image}
            title={item.title}
            id={item.id}
            user={item.user}
            likePost={likePost}
            dislikePost={dislikePost}
          />
        );
      })
    ) : (
      <span>There are no posts found.</span>
    );

  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    });
    console.log(newDisplayName);
    document.querySelector("#displayName").value = "";
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Email verification sent.");
    });
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      {userLoggedIn ? (
        <Box
          component="form"
          className="add-post"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            margin: "auto",
            "& > :not(style)": { m: 1, width: "40" },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h4"
            sx={{ color: "gray", textAlign: "center", margin: "auto" }}
          >
            User Data
          </Typography>

          <Typography variant="p" align="center" style={{ width: "80%" }}>
            User Email: {email}
          </Typography>

          <Grid container spacing={2} style={{ width: "80%", margin: "auto" }}>
            <Grid
              item
              xs={6}
              style={{ padding: 0, display: "flex", alignItems: "center" }}
            >
              <Typography variant="p" align="center" style={{ width: "80%" }}>
                Display Name: {displayName}
              </Typography>
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                id="displayName"
                align="center"
                label="New display name"
                onChange={(e) => setNewDisplayName(e.target.value)}
                variant="standard"
                style={{ width: "90%", padding: 0 }}
              />
              <Button
                size="small"
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  padding: 0,
                  alignSelf: "center",
                }}
                onClick={updateName}
                style={{ padding: 0, verticalAlign: "middle" }}
              >
                Update
              </Button>
            </Grid>
          </Grid>

          <Grid
            style={{
              width: "80%",
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <Button
              size="small"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                padding: 0,
                alignSelf: "center",
                justifySelf: "center",
              }}
              onClick={verifyEmail}
              style={{ padding: 2, verticalAlign: "middle" }}
            >
              Verify Email
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                padding: 0,
                alignSelf: "center",
                justifySelf: "center",
              }}
              onClick={resetPassword}
              style={{ padding: 2, verticalAlign: "middle" }}
            >
              Reset Password
            </Button>
          </Grid>

          <Typography
            variant="p"
            align="center"
            style={{
              width: "100%",
              borderTop: "1px solid black",
              marginTop: "2rem",
            }}
          >
            Posts You Submitted:
          </Typography>

          {userPosts}
        </Box>
      ) : (
        <span>You are not logged in. Log in to continue.</span>
      )}
    </div>
  );
};

export default User;
