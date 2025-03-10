import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function OtpForm(props: PageProps<Extract<KcContext, { pageId: "mfa-validation.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr } = i18n;
    const theme = useTheme();

    const { url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msgStr("mfaValidationTitle")}
            infoNode={msgStr("mfaValidationSubtitle")}
            displayInfo={true}
        >
            <Button
                href={url.loginRestartFlowUrl}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    // TODO: remove when you update storybook to a new version
                    "&:hover": {
                        color: theme.palette.text.secondary,
                        textDecoration: "underline solid #66646199"
                    },
                    [theme.breakpoints.down("sm")]: {
                        position: "relative",
                        justifySelf: "start"
                    }
                }}
                startIcon={<ArrowBack />}
            >
                Tillbaka
            </Button>
            <Box id="kc-form-wrapper">
                <Box
                    component="form"
                    id="kc-mfa-validation-form"
                    action={url.loginAction}
                    method="post"
                    sx={{
                        display: "grid",
                        gap: 3,
                        width: "100%"
                    }}
                >
                    <div>
                        <TextField
                            fullWidth={true}
                            autoFocus
                            placeholder={msgStr("mfaCode")}
                            name="user.attributes.code"
                            id="user.attributes.code"
                            inputProps={{ inputMode: "numeric" }}
                            type="text"
                            error={kcContext.message?.type === "error"}
                            helperText={kcContext.message?.type === "error" ? kcContext.message?.summary : undefined}
                        />
                    </div>
                    <Stack
                        sx={() => ({
                            alignItems: "center",
                            gap: 0.5,
                            position: "absolute",
                            bottom: "20px",
                            left: 0,
                            right: 0,
                            [theme.breakpoints.down("sm")]: {
                                position: "relative",
                                marginTop: `16px !important`
                            }
                        })}
                    >
                        <Box id="kc-form-buttons" sx={{ width: "100%" }}>
                            <Button variant="contained" fullWidth={true} name="ValidateCode" type="submit">
                                {msgStr("doMfaValidation")}
                            </Button>
                        </Box>

                        <Box id="kc-form-options">
                            <Typography textAlign="center" variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                                {msgStr("mfaVerificationInfoText")}
                            </Typography>

                            <Button variant="text" name="SendNewCode" type="submit" fullWidth={true} sx={{ marginTop: 2 }}>
                                {msgStr("mfaVerficationCodeLink")}
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Template>
    );
}
