import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Logo from "../Logo";
import AgronodBackgroundDesktop from "../../assets/agronodBackgroundDesktop.png";
import AgronodYellowBackground from "../../assets/agronodYellowBackground.png";

const AsideLogo = () => {
    const theme = useTheme();
    const isSmallLaptop = useMediaQuery(theme.breakpoints.down("lg"));
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            {!isMobile ? (
                <Box
                    sx={() => ({
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        backgroundColor: theme.palette.primary.main
                    })}
                >
                    <Box
                        sx={theme => ({
                            backgroundColor: theme.palette.primary.main,
                            padding: 6,
                            height: "40%",

                            [theme.breakpoints.down("lg")]: {
                                height: "70%"
                            }
                        })}
                    >
                        <Logo size="small" />
                        <Box
                            sx={theme => ({
                                maxWidth: "450px",
                                marginTop: 3,
                                [theme.breakpoints.down("lg")]: {
                                    maxWidth: "350px"
                                }
                            })}
                        >
                            <Typography variant={isSmallLaptop ? "h4" : "h2"}>
                                Vi frigör kraften i lantbrukets data
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={theme => ({
                            height: "60%",
                            width: "100%",
                            background: `url(${AgronodBackgroundDesktop}) center center no-repeat`,
                            backgroundSize: "cover",
                            [theme.breakpoints.down("lg")]: {
                                height: "30%"
                            }
                        })}
                    >
                        <Box
                            sx={{
                                background: `url(${AgronodYellowBackground}) center center repeat`,
                                backgroundSize: "contain",
                                height: "100%",
                                width: "100%"
                            }}
                        ></Box>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={theme => ({
                        backgroundColor: theme.palette.primary.main,
                        display: "flex",
                        flexDirection: "column",
                        background: `url(${AgronodYellowBackground}) center center repeat , url(${AgronodBackgroundDesktop}) center center no-repeat`,
                        backgroundSize: "cover, 100% 99%",
                        width: "100%",
                        maxWidth: "100%",
                        textAlign: "left",
                        marginBottom: 5,
                        position: "fixed",
                        top: 0,
                        backgroundPosition: "center",
                        height: "219px",
                        padding: 3
                    })}
                >
                    <Logo size="small" />
                </Box>
            )}
        </>
    );
};

export default AsideLogo;
