import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Stack from "@mui/material/Stack";

function Login() {
  let navigate = useNavigate();
  // Instead of location, we can use navigate directly to get the from pathname
  let from = navigate.state?.from?.pathname || "/";

  return (
    <Stack sx={{ p: 4, alignItems: "center" }}>
      <LoginForm
        callback={() => {
          navigate(from, { replace: true });
        }}
      />
    </Stack>
  );
}

export default Login;
