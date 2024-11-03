import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Divider,
  FormLabel,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import { Card, SignContainer } from "../style/auth";
import { getUsers } from "../../api/auth";
import { ValidationSignHook } from "../hook/ValidationSignHook";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducer/auth";

export default function SignIn(props) {
  const [data, SetData] = ValidationSignHook("", "");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const verify = async (email, password) => {
    const response = await getUsers();
    let data = response.data.filter((e) => e.email === email);
    console.log(data);
    if (data.length < 1) return console.log("email");
    else if (data[0].password !== password) return console.log("password");
    else {
      dispatch(login());
      return navigate("/");
    }
  };

  const handleSubmit = (event) => {
    if (data.email === "" && data.password === "") return SetData("all");
    // message("Input your information!", "warning");
    else {
      if (data.email === "") return SetData("email");
      if (data.password === "") return SetData("password");
      if (!data.emailError && !data.passwordError) {
        console.log(verify(data.email, data.password));
        // SetData();
      }
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                placeholder="your@email.com"
                autoComplete="email"
                variant="outlined"
                onChange={(event) => SetData("email", event.target.value)}
                value={data.email}
                error={data.emailError}
                helperText={data.emailMessage}
                color={data.emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  className="router-link"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                required
                fullWidth
                placeholder="••••••"
                type="password"
                autoComplete="new-password"
                variant="outlined"
                onChange={(event) => SetData("password", event.target.value)}
                value={data.password}
                error={data.passwordError}
                helperText={data.passwordMessage}
                color={data.passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              fullWidth
              variant="contained"
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  to="/auth/signup"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                  className="router-link"
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
          </Box>
        </Card>
      </SignContainer>
    </>
  );
}
