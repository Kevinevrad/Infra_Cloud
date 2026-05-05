import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  marginBottom: "20px",
}));

export default function Comp_Input({ ...props }) {
  const { variant, label, id, value, onChange } = props;
  return (
    <TextFieldStyled
      variant={variant}
      label={label}
      id={id}
      value={value}
      onChange={onChange}
    />
  );
}
