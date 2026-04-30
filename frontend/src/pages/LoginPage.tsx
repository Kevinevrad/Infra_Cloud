import { Stack, Divider, Box } from "@mui/material";
import { theme } from "../styles/theme";
import MyIcon from "../assets/icon-cloud.svg?react";

const LoginPage = () => {
  return (
    <>
      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: "70%",
              margin: "auto 0",
            }}
          />
        }
        sx={{
          height: "100vh",
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fffffff0",
            // theme.palette.primary.third,
            height: "100%",
            width: "35%",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "60px",
            padding: "10px",
          }}
        >
          <img src={MyIcon} alt="" srcset="" width="70%" />
          <Box
            sx={{
              width: "90%",
              padding: "0 10px ",

              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "30px",
                margin: "0",
                color: theme.palette.primary.main,
              }}
            >
              InfraTp &mdash; Cloud
            </h2>
            {/* <CompCarousel></CompCarousel> */}
            <p
              style={{
                textAlign: "justify",
                border: "1px solid grey",
                padding: "15px 8px",
                borderRadius: "5px",
              }}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
              natus ducimus ipsa recusandae nostrum
            </p>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            height: "100%",
            width: "65%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <div
            style={{
              margin: " auto 5%",
              width: "90%",
              height: "90%",
              border: "1px solid red",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <h1>Welcome Back</h1>
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default LoginPage;
