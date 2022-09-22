import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            navigate(`/user/${uid}`);
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Login failed:", errorCode, errorMessage);
      });

    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
  };

  return (
    <div>
      <Box
        component="form"
        className="add-post"
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          margin: "auto",
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="h4"
          sx={{ color: "gray", textAlign: "center", margin: "auto" }}
        >
          Login to your account.
        </Typography>

        <TextField
          id="email"
          label="Enter your email."
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          style={{ width: "80%" }}
        />
        <TextField
          id="password"
          label="Enter a password."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          variant="standard"
          style={{ width: "80%" }}
        />
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "darkorange" }}
          onClick={login}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
