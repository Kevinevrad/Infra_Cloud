import {
  Container,
  OutlinedInput,
  Paper,
  Box,
  FormHelperText,
  Link,
} from "@mui/material";

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

import FormControl, { useFormControl } from "@mui/material/FormControl";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMediaQuery } from "@mui/material";
import { useTheme, FormLabel, Button } from "@mui/material";

import { useState, useMemo } from "react";

import { api } from "../api/axios";

function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = useMemo(() => {
    if (focused) {
      return "Enter your email!";
    }

    return "";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const smMedia = useMediaQuery(theme.breakpoints.down("sm"));
  const intSmMd = useMediaQuery(theme.breakpoints.between("sm", "xl"));

  const rightGridStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const handleInput = (event, setInput) => {
    setInput(event.target.value);
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    if (!email) {
      newErrors.email = "Email Requis";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email non valide";
    }

    if (!pass) {
      newErrors.password = "Password Requis";
    } else if (pass.length < 5) {
      newErrors.password = "Password trop court";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateFields())
      throw new Error("Something went wrong : Email or Password incorrect");

    api
      .post("/users/login", {
        email: email,
        password: pass,
      })
      .then((res) => console.log("User Logged with success :", res.data))
      .catch((err) => console.error("Error posting data :", err));
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper elevation={6}>
          <div style={{ textAlign: "center" }}>
            <h1>Sign to your account</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
              incidunt a omnis? Fugiat non nobis tempore vero voluptatem aperiam
              facilis? Id iure veritatis ducimus, reprehenderit impedit magnam
              facilis voluptas eaque!
            </p>
          </div>

          <form action="#" onSubmit={onSubmit}>
            <Box sx={{ width: "65%", margin: "1.5rem auto" }}>
              <FormControl sx={{ width: "100%" }}>
                <label htmlFor="email" style={{ fontSize: "18px" }}>
                  Email
                </label>
                <OutlinedInput
                  id="email"
                  name="email"
                  fullWidth
                  type="text"
                  value={email}
                  onChange={(e) => handleInput(e, setEmail)}
                />
                <MyFormHelperText />
              </FormControl>
            </Box>
            <Box sx={{ width: "65%", margin: "1rem auto" }}>
              <FormControl sx={{ width: "100%" }}>
                <label htmlFor="password" style={{ fontSize: "18px" }}>
                  Password
                </label>
                <OutlinedInput
                  id="password"
                  name="password"
                  fullWidth
                  type="password"
                  value={pass}
                  onChange={(e) => handleInput(e, setPass)}
                />
                <MyFormHelperText />
              </FormControl>
            </Box>

            <Box
              sx={{
                typography: "body1",
                width: "65%",
                textAlign: "right",
                margin: "0 auto",
              }}
              onClick={preventDefault}
            >
              <Link href="#">Mot de pass oublier!</Link>
            </Box>

            <Box
              sx={{
                width: "65%",
                margin: "2rem auto",
              }}
            >
              <Button variant="contained" color="secondary" fullWidth>
                Sign In
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};
