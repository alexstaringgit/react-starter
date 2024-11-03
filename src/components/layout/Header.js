import React, { useState } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Switch,
} from "@mui/material";
import {
  Mail,
  Notifications,
  AccountCircle,
  More,
  Menu,
} from "@mui/icons-material";

import LayoutSider from "./Sider";
import {
  menuId,
  RenderMenu,
  mobileMenuId,
  RenderMobileMenu,
} from "./HeaderMenu";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MtagAppBar,
} from "../style/layout";
import { useSelector, useDispatch } from "react-redux";
import { handleSearch, handleLog } from "../../redux/reducer/auth";

const LayoutHeader = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawer = (open) => {
    if (open < 2) {
      props.handleOpen(open + 1);
    } else {
      props.handleOpen(0);
    }
  };
  return (
    <>
      <MtagAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawer(props.open)}
            edge="start"
            disabled={isAuthenticated ? false : true}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => {
                dispatch(handleSearch(event.target.value));
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Switch
            onChange={() => {
              dispatch(handleLog());
            }}
            aria-label="login switch"
          />
          {isAuthenticated ? (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <Mail />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <More />
                </IconButton>
              </Box>
            </>
          ) : null}
        </Toolbar>
      </MtagAppBar>
      <LayoutSider open={props.open} />
      <RenderMobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
      />
      <RenderMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
    </>
  );
};
export default LayoutHeader;
