import React from "react";
import { styled } from "@mui/material/styles";
import {
  List,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Forum, Message, Dashboard } from "@mui/icons-material";
import { DrawerHeader, openedMixin, closedMixin } from "../style/layout";
import { drawerWidth } from "../constant/data";

const LayoutSider = (props) => {
  const MtagDrawer = styled(Drawer, {
    shouldForwardProp:
      props.open === 0 ? (prop) => prop === "open" : (prop) => prop !== "open",
  })(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        },
      },
    ],
  }));

  const listData = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Forum", icon: <Forum /> },
    { text: "Message", icon: <Message /> },
  ];
  return (
    <MtagDrawer
      variant={props.open === 0 ? "persistent" : "permanent"}
      open={props.open === 2 ? true : false}
    >
      <DrawerHeader />
      <Divider />
      <List>
        {listData.map((list, index) => (
          <ListItem key={list.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={[
                { minHeight: 48, px: 2.5 },
                props.open > 1
                  ? { justifyContent: "initial" }
                  : { justifyContent: "center" },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  props.open > 1 ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                {list.icon}
              </ListItemIcon>
              <ListItemText
                primary={list.text}
                sx={[props.open > 1 ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MtagDrawer>
  );
};
export default LayoutSider;
