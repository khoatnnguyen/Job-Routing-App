import React, { useContext, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AuthContext from "../auth/AuthContext";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.common.white, 0.7),
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.common.white,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Navigation() {
  const auth = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const handleClickLogin = (event) => {
    navigate("/login");
  };

  const handleClickLogout = (event) => {
    auth.signout(() => {
      navigate("/");
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let q = formData.get("q");
    setSearchParams({ q: q });
  };

  const handleSearch = () => {
    const searchValue = searchInputRef.current.value;
    if (searchValue) {
      setSearchParams({ q: searchValue });
    }
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
      >
        <Toolbar>
          <Typography
            component="h4"
            variant="h4"
            sx={{
              display: { xs: "none", md: "block" },
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Job Routing
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Search>
              <SearchIconWrapper onClick={handleSearch} aria-label="search">
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                name="q"
                placeholder="Search"
                defaultValue={q ?? undefined}
                inputProps={{ "arial-label": "search" }}
                inputRef={searchInputRef}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {auth?.user ? (
            <>
              <Button
                onClick={handleClickLogout}
                variant="contained"
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
              <Avatar
                src="/images/avatar/1.jpg"
                sx={{ width: 40, height: 40, ml: 1 }}
              />
            </>
          ) : (
            <Button
              onClick={handleClickLogin}
              variant="contained"
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;
