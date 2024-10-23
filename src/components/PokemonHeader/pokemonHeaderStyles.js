import { styled } from "@mui/material/styles";
import { Box, Typography, FormControl, TextField } from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#6a1b9a",
  padding: theme.spacing(2),
  borderRadius: "8px",
  marginBottom: theme.spacing(3),
  color: "white",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.5rem",
  marginBottom: theme.spacing(1),
}));

export const ControlContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  backgroundColor: "white",
  borderRadius: "4px",
  "& .MuiSelect-root": {
    padding: theme.spacing(1),
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderRadius: "4px",
  },
}));
