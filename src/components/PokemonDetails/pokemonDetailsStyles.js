import { styled } from "@mui/material/styles";
import { Card, Typography, Container, CardContent } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(4),
  background:
    "linear-gradient(to right, rgba(230, 230, 250, 0.8), rgba(255, 240, 245, 0.8))",
  height: "100vh",
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  borderRadius: "16px",
  boxShadow: theme.shadows[5],
  textAlign: "left",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[10],
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  fontWeight: "bold",
}));
