import React from "react";
import { IconButton, Menu, MenuItem, Badge } from "@mui/material";
import { Mail, Notifications, AccountCircle } from "@mui/icons-material";

export const menuId = "primary-search-account-menu";
export const RenderMenu = (props) => {
  const isMenuOpen = Boolean(props.anchorEl);
  return (
    <Menu
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={props.handleMenuClose}
    >
      <MenuItem onClick={props.handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={props.handleMenuClose}>My account</MenuItem>
    </Menu>
  );
};

export const mobileMenuId = "primary-search-account-menu-mobile";
export const RenderMobileMenu = (props) => {
  const isMobileMenuOpen = Boolean(props.mobileMoreAnchorEl);
  return (
    <Menu
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={props.handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={props.handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
};
