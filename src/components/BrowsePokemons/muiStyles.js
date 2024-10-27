import { styled } from "@mui/material/styles";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export const StyledGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  margin: theme.spacing(2),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: "220px",
  height: "300px",
  margin: theme.spacing(2),
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  borderRadius: "8px 8px 0 0",
  height: "60%",
  objectFit: "cover",
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.2rem",
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
