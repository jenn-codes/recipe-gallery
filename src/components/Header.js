import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const auth = getAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const searchRef = useRef("");
  const navigate = useNavigate();
  const handleSearch = () => {
    console.log(searchRef.current.value);
    navigate(`./search/${searchRef.current.value}`);
  };

  const logout = () => {
    const auth = getAuth();
    auth.signOut();
    console.log("User signed out!");
    navigate("/");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.displayName
          ? setDisplayName(user.displayName.toLowerCase())
          : setDisplayName(user.email);
        document.querySelector("button#register").disabled = true;
        document.querySelector("button#register").style.opacity = 0.4;
        document.querySelector("button#login").disabled = true;
        document.querySelector("button#login").style.opacity = 0.4;
      }
    });
  });

  const allSettings = (
    <div>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
          style={{ align: "right" }}
        >
          <Avatar alt={displayName} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={handleCloseUserMenu}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography textAlign="center" onClick={() => navigate("/user/100")}>
            Profile
          </Typography>
          <Typography textAlign="center" onClick={logout}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );

  return (
    <AppBar
      className="header"
      position="static"
      style={{ backgroundColor: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              textAlign: "left",
              letterSpacing: ".3rem",
              color: "orange",
              textDecoration: "none",
            }}
          >
            RECIPE REDDIT
          </Typography>

          <Box>
            <TextField
              inputRef={searchRef}
              id="outlined-basic"
              label="Search..."
              variant="outlined"
              size="small"
              className="searchBox"
            />
            <IconButton aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              justifySelf: "flex-end",
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              size="small"
              id="login"
              variant="contained"
              sx={{ backgroundColor: "white", color: "darkorange" }}
              onClick={() => navigate("./login")}
            >
              Login
            </Button>
            <Button
              size="small"
              id="register"
              variant="contained"
              sx={{ backgroundColor: "darkorange" }}
              onClick={() => navigate("./register")}
            >
              Register
            </Button>
            {allSettings}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
