import React from "react";
import RouteIndex from "./routes/index";
import PropTypes from "prop-types";
import { Box, Fade, Fab, useScrollTrigger } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

import "./App.css";

const ScrollTop = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

ScrollTop.propTypes = {
  children: PropTypes.element,
  window: PropTypes.func,
};

const App = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <RouteIndex />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default App;
