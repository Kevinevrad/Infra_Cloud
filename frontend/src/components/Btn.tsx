import React from "react";
// import { theme } from "../styles/theme";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const CustomBtn = styled(Button)(({ theme, variant }) => ({
  padding: theme.spacing(2, 3),

  ...(variant === "contained" && {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    transform: "translateY(-2px)",
  }),
}));

// prettier-ignore
const Btn = ({children , variant="contained", color="primary", ...props}) => {
  return <CustomBtn variant={variant}  color={color} {...props}>
    {children}
  </CustomBtn>;
};

export default Btn;
