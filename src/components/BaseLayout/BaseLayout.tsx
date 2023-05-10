import { Box, Theme } from "@mui/material";
import AsideLogoSection from "../AsideLogoSection/AsideLogoSection";
import { AsideCard } from "@agronod/mui-components";

const BaseLayout = (props: any) => {
  return (
    <Box
      sx={(theme: Theme) => ({
        display: "grid",
        minHeight: "100vh",
        gridTemplateColumns: "auto minmax(30px, 592px)",
        justifyContent: "stretch",
        [theme.breakpoints.between("sm", "md")]: {
          gridTemplateColumns: "1fr 1fr",
        },
        [theme.breakpoints.down("sm")]: { display: "block", height: "auto" },
      })}
    >
      <AsideLogoSection />
      <AsideCard
        centeredContent={true}
        position="right"
        sx={(theme: Theme) => ({
          padding: 3,
          paddingTop: "116px",
          position: "relative",
          [theme.breakpoints.down("md")]: {
            paddingTop: 8,
          },
          [theme.breakpoints.down("sm")]: {
            marginTop: "200px",
            minHeight: "calc(100vh - 200px)",
          },
        })}
      >
        <Box
          sx={(theme: Theme) => ({
            display: "grid",
            gap: 3,
            maxWidth: "400px",
            width: "100%",
            [theme.breakpoints.down("sm")]: {
              maxWidth: "100%",
              width: "100%",
              textAlign: "left",
              marginBottom: 5,
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
