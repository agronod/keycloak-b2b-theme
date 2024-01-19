import { memo } from "react";
import { KcContextBase, KcProps } from "keycloakify";
import type { I18n } from "./i18n";
import { TemplateProps } from "keycloakify/lib/components/Template";
import Template from "keycloakify/lib/components/Template";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import { ArrowBack } from "@mui/icons-material";

export type LoginResetPasswordProps = KcProps & {
  kcContext: KcContextBase.LoginResetPassword;
  i18n: I18n;
  doFetchDefaultThemeResources?: boolean;
  Template?: (props: TemplateProps) => JSX.Element | null;
};

const LoginResetPassword = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContextBase.LoginResetPassword; i18n: I18n } & KcProps) => {
    const { realm, url, auth } = kcContext;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { msg, msgStr } = i18n;

    return (
      <BaseLayout>
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
              textDecoration: "underline solid #66646199",
            },
            [theme.breakpoints.down("sm")]: {
              position: "relative",
              justifySelf: "start",
            },
          }}
        >
          {msg("backToLogin")}
        </Button>
        <Template
          {...{ kcContext, i18n, ...props }}
          // Set to false so we don't use keycloak styles but our MUI ones
          doFetchDefaultThemeResources={false}
          displayInfo={false}
          displayWide={true}
          headerNode={null}
          infoNode={msg("emailInstruction")}
          formNode={
            <Box
              component="form"
              id="kc-reset-password-form"
              action={url.loginAction}
              method="post"
              sx={{
                display: "grid",
                gap: 3,
                width: "100%",
              }}
            >
              <Typography variant={isMobile ? "h4" : "h3"}>
                {msg("emailForgotTitle")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Du får ett e-postmeddelande med instruktioner.
              </Typography>
              <FormControl fullWidth={true}>
                {(() => {
                  const label = !realm.loginWithEmailAllowed
                    ? "username"
                    : realm.registrationEmailAsUsername
                    ? "email"
                    : "usernameOrEmail";

                  const autoCompleteHelper: typeof label =
                    label === "usernameOrEmail" ? "username" : label;

                  return (
                    <>
                      <FormLabel>
                        <Typography
                          variant="body3"
                          sx={{ marginBottom: 0.5, display: "block" }}
                        >
                          E-postadress
                        </Typography>
                      </FormLabel>
                      <TextField
                        fullWidth={true}
                        placeholder={msgStr(label)}
                        type="text"
                        id="username"
                        name="username"
                        autoFocus
                        defaultValue={
                          auth !== undefined && auth.showUsername
                            ? auth.attemptedUsername
                            : undefined
                        }
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
                    position: "relative",
                  },
                })}
              >
                <Button
                  variant="contained"
                  fullWidth={true}
                  name="login"
                  id="kc-login"
                  type="submit"
                >
                  {msgStr("doSubmit")}
                </Button>
              </Stack>
            </Box>
          }
        />
      </BaseLayout>
    );
  }
);

export default LoginResetPassword;
