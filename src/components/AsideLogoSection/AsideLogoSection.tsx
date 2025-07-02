import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Logo from "../Logo";
import Picture from "../Picture";
import agronodBackgroundDesktopWebP from "../../assets/agronodBackgroundDesktop.webp";
import agronodBackgroundDesktopPNG from "../../assets/agronodBackgroundDesktop.png";
import agronodYellowBackgroundWebP from "../../assets/agronodYellowBackground.webp";
import agronodYellowBackgroundPNG from "../../assets/agronodYellowBackground.png";

const AsideLogo = () => {
    const theme = useTheme();
    const isSmallLaptop = useMediaQuery(theme.breakpoints.down("lg"));
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            {!isMobile ? (
                <Box
                    sx={() => ({
                        position: "relative",
                        backgroundColor: theme.palette.primary.main,
                        height: "100%",
                        width: "100%",
                        overflow: "hidden"
                    })}
                >
                    {/* Background landscape image */}
                    <Box
                        sx={theme => ({
                            position: "absolute",
                            width: "100%",
                            height: "60%",
                            left: "0",
                            bottom: "0",
                            overflow: "hidden",
                            backgroundColor: theme.palette.primary.main,
                            zIndex: 1
                        })}
                    >
                        <Picture
                            webpSrc={agronodBackgroundDesktopWebP}
                            fallbackSrc={agronodBackgroundDesktopPNG}
                            alt="Background"
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </Box>
                    
                    {/* Yellow overlay with circular cutouts */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "60%",
                            left: "0",
                            bottom: "0",
                            overflow: "hidden",
                            zIndex: 2
                        }}
                    >
                        <Picture
                            webpSrc={agronodYellowBackgroundWebP}
                            fallbackSrc={agronodYellowBackgroundPNG}
                            alt=""
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center top",
                            }}
                        />
                    </Box>
                    
                    {/* Logo and text content */}
                    <Box
                        sx={theme => ({
                            position: "relative",
                            zIndex: 3,
                            padding: 6,
                            [theme.breakpoints.down("lg")]: {
                                padding: 4
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
                </Box>
            ) : (
                <Box
                    sx={theme => ({
                        backgroundColor: theme.palette.primary.main,
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        maxWidth: "100%",
                        textAlign: "left",
                        marginBottom: 5,
                        position: "fixed",
                        top: 0,
                        height: "219px",
                        padding: 3,
                        overflow: "hidden"
                    })}
                >
                    <Picture
                        webpSrc={agronodBackgroundDesktopWebP}
                        fallbackSrc={agronodBackgroundDesktopPNG}
                        alt="Background"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "99%",
                            objectFit: "cover",
                            zIndex: 1
                        }}
                    />
                    <Picture
                        webpSrc={agronodYellowBackgroundWebP}
                        fallbackSrc={agronodYellowBackgroundPNG}
                        alt=""
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            zIndex: 2
                        }}
                    />
                    <Box sx={{ position: "relative", zIndex: 3 }}>
                        <Logo size="small" />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default AsideLogo;
