import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import AgronodBackgroundDesktop from "../../assets/agronodBackgroundDesktop.png";
import Logo from "components/Logo";

const AsideLogoSection = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={(theme) => ({
        backgroundImage: `url(${AgronodBackgroundDesktop})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        padding: 6,
        gap: 3,
        [theme.breakpoints.down("sm")]: {
          maxWidth: "100%",
          width: "100%",
          textAlign: "left",
          marginBottom: 5,
          position: "fixed",
          top: 0,
          height: "219px",
          backgroundPosition: "center",
          padding: 3,
        },
      })}
    >
      <Logo size="small" />
      <Box
        sx={(theme) => ({
          maxWidth: "400px",
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        })}
      >
        <Typography variant={isTablet ? "h4" : "h2"}>
          Vi frigör kraften i lantbrukets data
        </Typography>
      </Box>
    </Box>
  );
};

export default AsideLogoSection;
