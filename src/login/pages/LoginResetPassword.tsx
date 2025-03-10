import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, FormControl, FormLabel, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const theme = useTheme();

    return (
        <>
            <Template
                kcContext={kcContext}
                i18n={i18n}
                doUseDefaultCss={doUseDefaultCss}
                classes={classes}
                displayInfo
                displayMessage={!messagesPerField.existsError("username")}
                infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
                headerNode={msg("emailForgotTitle")}
            >
                <Button
                    variant="text"
                    startIcon={<ArrowBack />}
                    href={url.loginUrl}
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
                >
                    {msg("backToLogin")}
                </Button>
                <Box
                    component="form"
                    id="kc-reset-password-form"
                    action={url.loginAction}
                    method="post"
                    sx={{
                        display: "grid",
                        gap: 3,
                        width: "100%"
                    }}
                >
                    <FormControl fullWidth={true}>
                        {(() => {
                            const label = !realm.loginWithEmailAllowed ? "username" : realm.registrationEmailAsUsername ? "email" : "usernameOrEmail";

                            return (
                                <>
                                    <FormLabel>
                                        <Typography variant="body3" sx={{ marginBottom: 0.5, display: "block" }}>
                                            {msgStr(label)}
                                        </Typography>
                                    </FormLabel>
                                    <TextField
                                        fullWidth={true}
                                        placeholder={msgStr(label)}
                                        type="text"
                                        id="username"
                                        name="username"
                                        autoFocus
                                        defaultValue={auth !== undefined && auth.showUsername ? auth.attemptedUsername : undefined}
                                    />
                                </>
                            );
                        })()}
                    </FormControl>
                    <Box id="kc-form-options"></Box>
                    <Stack
                        id="kc-form-buttons"
                        sx={() => ({
                            alignItems: "center",
                            gap: 0.5,
                            position: "absolute",
                            bottom: "20px",
                            left: 0,
                            right: 0,
                            [theme.breakpoints.down("md")]: {
                                position: "relative"
                            }
                        })}
                    >
                        <Button variant="contained" fullWidth={true} name="login" id="kc-login" type="submit">
                            {msgStr("doSubmit")}
                        </Button>
                    </Stack>
                </Box>
            </Template>
        </>
    );
}
