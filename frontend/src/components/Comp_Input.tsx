import { TextField, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  marginBottom: "25px",
}));

export default function Comp_Input({ ...props }) {
  const { variant, label, id, value, error, onChange } = props;
  return (
    <>
      <TextFieldStyled
        variant={variant}
        label={label}
        id={id}
        value={value}
        onChange={onChange}
      />
      {error && (
        <Alert
          closeText="close"
          severity="error"
          sx={{ marginBottom: "20px", marginTop: "3px" }}
        >
          {error}
        </Alert>
      )}
    </>
  );
}
