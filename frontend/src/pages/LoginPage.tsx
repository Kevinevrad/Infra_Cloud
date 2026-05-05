import { Container, Grid, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import Comp_Input from "../components/Comp_Input";

const LoginPage = () => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ height: "100vh" }}>
          <Grid size={{ md: 4 }} sx={{ display: match ? "none" : "visible" }}>
            <div style={{ border: "1px solid red" }}>
              <p>{`!-- Content 1 -- ${match}`}</p>
            </div>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            size={{ xs: 12, md: "grow" }}
          >
            <Container
              maxWidth="md"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginBottom: "4rem",
              }}
            >
              <Typography variant="h1" color="primary">
                Infra-Cloud
              </Typography>
              <CloudUploadIcon
                sx={{ alignSelf: "flex-start" }}
                fontSize="large"
              />
            </Container>

            <Container
              maxWidth="sm"
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "2rem",
                gap: "1.5rem",
              }}
            >
              <Typography variant="body2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                in rem, porro mollitia veniam quaerat repellendus fugit modi,
                sequi dolores quisquam
              </Typography>
              <Typography variant="body2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                in rem, porro mollitia veniam
              </Typography>
            </Container>

            <Container maxWidth="sm" sx={{ marginBottom: "2rem" }}>
              {/* prettier-ignore */}
              <Comp_Input label="email" id="email" value={email} variant="filled" onchanged={() => setEmail}/>
              {/* prettier-ignore */}
              <Comp_Input label="password" id="password" value={pass} variant="filled" onchanged={() => setPass}/>
            </Container>

            {/* prettier-ignore */}
            <Container maxWidth="sm" sx={{display: "flex", flexDirection: "column",marginTop: "2rem",}}>
              <Button
                variant="text"
                color="secondary"
                sx={{ alignSelf: "end", marginBottom: "1.5rem" }}
              >
                Password oublier?
              </Button>

              <Button variant="contained" color="primary" fullWidth>
                Connexion
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LoginPage;
