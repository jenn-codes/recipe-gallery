import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import "../App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CreateIcon from "@mui/icons-material/Create";
import Fab from "@mui/material/Fab";

const Sidebar = ({ posts }) => {
  let totalComments = 0;
  posts.forEach((post) => {
    totalComments += post.comments.length;
  });

  let boards = [];
  posts.forEach((post) => {
    if (boards.indexOf(post.board) === -1) {
      boards.push(post.board);
    }
  });

  let users = [];
  posts.forEach((post) => {
    if (users.indexOf(post.user) === -1) {
      users.push(post.user);
    }
  });

  return (
    <div className="sidebar">
      <Link to={"/add"} style={{ textDecoration: "none" }}>
        <Fab
          variant="extended"
          sx={{ backgroundColor: "darkorange", marginBottom: 3 }}
        >
          <CreateIcon /> Add Post
        </Fab>
      </Link>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          gap: 3,
          width: 0.9,
          padding: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: "gray", textAlign: "center" }}>
          Top Food Boards
        </Typography>
        <Typography variant="p" sx={{ color: "gray", textAlign: "left" }}>
          {boards.map((board) => {
            return (
              <div key={uniqid()} className="boards-list">
                <Link
                  to={`/board/${board}`}
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "darkorange", marginRight: 1 }}>
                      {board[0]}
                    </Avatar>
                    {boards.indexOf(board) + 1}: r/{board}
                  </div>
                </Link>

                <Link
                  to={`/board/${board}`}
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "darkorange" }}
                  >
                    Join
                  </Button>
                </Link>
              </div>
            );
          })}
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          gap: 3,
          width: 0.9,
          padding: 2,
          marginTop: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: "gray" }}>
          About Community
        </Typography>

        <Typography
          variant="p"
          sx={{ color: "gray", borderRadius: 2, textAlign: "left" }}
        >
          Recipe Reddit is a place to find recipes. Browse the popular boards,
          share with friends and save your favorite recipe ideas!
        </Typography>

        <Typography variant="h6" sx={{ color: "gray" }}>
          {posts.length} posts
        </Typography>

        <Typography variant="h6" sx={{ color: "gray" }}>
          {totalComments} comments
        </Typography>

        <Typography variant="h6" sx={{ color: "gray" }}>
          {users.length} users
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          gap: 3,
          width: 0.9,
          padding: 2,
          marginTop: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: "gray" }}>
          Community Rules
        </Typography>

        <Typography variant="p" sx={{ color: "gray" }}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem>Questions should be clear and direct.</ListItem>
            <ListItem>No personal requests allowed.</ListItem>
            <ListItem>No personal info.</ListItem>
            <ListItem>Be respectful to other users.</ListItem>
          </List>
        </Typography>
      </Box>
    </div>
  );
};

export default Sidebar;
