import { Box, Theme } from "@mui/material";
import AsideLogoSection from "../AsideLogoSection/AsideLogoSection";
import { AsideCard } from "@agronod/mui-components";

const BaseLayout = (props: any) => {
  return (
    <Box
      sx={(theme: Theme) => ({
        display: "grid",
        minHeight: "100dvh",
        gridTemplateColumns: "auto minmax(30px, 592px)",
        justifyContent: "stretch",
        [theme.breakpoints.between("sm", "md")]: {
          gridTemplateColumns: "1fr 1fr",
        },
        [theme.breakpoints.down("sm")]: {
          display: "block",
          height: "auto",
          overflow: "auto",
        },
      })}
    >
      <AsideLogoSection />

      <AsideCard
        position="right"
        sx={(theme: Theme) => ({
          paddingX: 8,
          paddingY: 6,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",

          [theme.breakpoints.down("md")]: {
            paddingTop: 8,
            paddingX: 5,
          },
          [theme.breakpoints.down("sm")]: {
            marginTop: "200px",
            minHeight: "calc(100dvh - 200px)",
            display: "flex",
            paddingX: 4,
            paddingY: 3,
            gap: 5,
          },
        })}
      >
        <Box
          sx={(theme: Theme) => ({
            display: "grid",
            gap: 3,
            maxWidth: "464px",
            width: "100%",
            height: "100%",
            alignItems: "center",
            position: "relative",
            [theme.breakpoints.down("sm")]: {
              maxWidth: "100%",
              width: "100%",
              textAlign: "left",
              marginBottom: 5,
              alignItems: "start",
            },
          })}
        >
          {props.children}
        </Box>
      </AsideCard>
    </Box>
  );
};

export default BaseLayout;
