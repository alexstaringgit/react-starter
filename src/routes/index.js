import React, { useState, useMemo } from "react";
import { Toolbar } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LayoutHeader from "../components/layout/Header";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import { Main } from "../components/style/routes";
import { useSelector } from "react-redux";
import DashIndex from "../components/page/dash/Index";
import ForumIndex from "../components/page/forum/Index";
import ProfileIndex from "../components/page/profile/Index";
import MessageIndex from "../components/page/message/Index";

const RouteIndex = () => {
  const [open, setOpen] = useState(0);
  const handleOpen = (num) => {
    setOpen(() => num);
  };
  const isLogined = useSelector((state) => state.auth.isLogined);

  const ProtectedRoute = ({ path, element }) => {
    return isLogined ? (
      <Route path={path} element={element} exact />
    ) : (
      <Navigate to="/auth/signin" />
    );
  };
  const routesData = [{ path: "/Page/dash" }];
  return (
    <Router>
      <LayoutHeader handleOpen={handleOpen} open={open} />
      <Main open={open > 0 ? true : false}>
        <Toolbar id="back-to-top-anchor" />
        <Routes>
          <Route
            element={
              <ProtectedRoute path="/page/dash" element={<DashIndex />} />
            }
          />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </Main>
    </Router>
  );
};

export default RouteIndex;
