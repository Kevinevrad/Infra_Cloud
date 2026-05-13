import { Container, Grid, Typography, Button, Card, Link } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

import { useState } from "react";
import Comp_Input from "../components/Comp_Input";
import { api } from "../api/axios";

const LoginPage = () => {
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
      <Container maxWidth="xl">
        <Grid
          container
          spacing={1}
          sx={{ height: "100vh", display: "flex", justifyContent: "center" }}
        >
          <Grid sx={rightGridStyle} size={{ xs: 12, md: intSmMd ? 6 : 4 }}>
            <Container
              // maxWidth="md"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginBottom: "2.5rem",
              }}
            >
              <Typography variant={smMedia ? "h2" : "h1"} color="primary">
                Infra-Cloud
              </Typography>
              <CloudUploadIcon
                sx={{ alignSelf: "flex-start" }}
                fontSize="large"
              />
            </Container>

            <Container>
              <Card sx={{ padding: "4.5rem 15px" }}>
                <Container
                  maxWidth="sm"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "2rem",
                    gap: "1.5rem",
                  }}
                >
                  <Typography variant="body2" sx={{ textAlign: "justify" }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsum in rem, porro mollitia veniam quaerat repellendus
                    fugit modi, sequi dolores quisquam
                  </Typography>
                </Container>

                <Container maxWidth="sm">
                  <form onSubmit={onSubmit}>
                    {/* prettier-ignore */}
                    <Comp_Input error={errors.email} label="email" id="email" value={email} variant="filled" onChange={(ev: any)=>handleInput(ev, setEmail)}/>
                    {/* prettier-ignore */}
                    <Comp_Input   error={errors.password}  label="password" id="password" value={pass} variant="filled" onChange={(ev: any) => handleInput(ev, setPass)}/>

                    {/* prettier-ignore */}

                    <div style={{display:"flex", flexDirection:"column",}}>
                      <Link variant="body2" color="secondary"  sx={{ alignSelf: "end", marginBottom: "1.5rem" }}  >Password oublier?</Link>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Connexion
                    </Button>
                    </div>
                  </form>
                </Container>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LoginPage;
