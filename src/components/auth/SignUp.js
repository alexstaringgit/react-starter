import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";
import { Card, SignContainer } from "../style/auth";
import { addUser } from "../../api/auth";
import { ValidationSignHook } from "../hook/ValidationSignHook";
import { useSnackbar } from "notistack";

const SignUp = (props) => {
  const [data, SetData] = ValidationSignHook("", "");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const message = (type, variant) => {
    return enqueueSnackbar(`${type}`, { variant });
  };
  const handleSubmit = (event) => {
    if (data.name === "" && data.email === "" && data.password === "")
      return SetData("all");
    else {
      if (data.name === "") return SetData("name");
      if (data.email === "") return SetData("email");
      if (data.password === "") return SetData("password");
      if (!data.nameError && !data.emailError && !data.passwordError) {
        addUser({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        message("Success", "info");
        SetData();
        navigate("/auth/signin");
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
            Sign up
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                required
                fullWidth
                placeholder="Jon Snow"
                onChange={(event) => SetData("name", event.target.value)}
                value={data.name}
                error={data.nameError}
                helperText={data.nameMessage}
                color={data.nameError ? "error" : "primary"}
              />
            </FormControl>
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
              <FormLabel htmlFor="password">Password</FormLabel>
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
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button
              fullWidth
              variant="contained"
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Sign up
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span>
                <Link
                  to="/auth/signin"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                  className="router-link"
                >
                  Sign in
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
          </Box>
        </Card>
      </SignContainer>
    </>
  );
};

export default SignUp;
