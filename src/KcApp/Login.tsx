import { useState, memo, useEffect } from "react";
import { useConstCallback } from "keycloakify/lib/tools/useConstCallback";
import type { FormEventHandler } from "react";
import { KcContextBase, KcProps } from "keycloakify";
import Template from "keycloakify/lib/Template";
import type { I18n } from "./i18n";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import React from "react";

export const Login = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContextBase.Login; i18n: I18n } & KcProps) => {
    const { realm, url, usernameEditDisabled, login, auth } = kcContext;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [username, setUsername] = useState("");

    const realmPassword = realm.password; // always disable as unable to set from keycloak config

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(
      (e) => {
        e.preventDefault();
        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement
          .querySelector("input[name='email']")
          ?.setAttribute("name", "username");

        formElement.submit();
      }
    );

    const handleOnChange = (e: any) => setUsername(e.target.value);

    useEffect(() => {
      if (login.username) {
        setUsername(login.username);
      }
    }, [login.username]);

    return (
      <BaseLayout>
        <Template
          {...{ kcContext, i18n, ...props }}
          // Set to false so we don't use keycloak styles but our MUI ones
          doFetchDefaultThemeResources={false}
          displayInfo={false}
          displayWide={true}
          headerNode={null}
          formNode={
            <Box id="kc-form">
              <Box id="kc-form-wrapper">
                {realmPassword && (
                  <Box
                    component="form"
                    id="kc-form-login"
                    onSubmit={onSubmit}
                    action={url.loginAction}
                    method="post"
                    sx={{
                      display: "grid",
                      gap: 3,
                      width: "100%",
                    }}
                  >
                    <Typography variant={isMobile ? "h4" : "h3"}>
                      {msgStr("loginTitle")}
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
                              autoFocus
                              //NOTE: This is used by Google Chrome auto fill so we use it to tell
                              //the browser how to pre fill the form but before submit we put it back
                              //to username because it is what keycloak expects.
                              name={autoCompleteHelper}
                              id={autoCompleteHelper}
                              type="text"
                              value={username}
                              onChange={(e) => handleOnChange(e)}
                              disabled={usernameEditDisabled}
                            />
                          </>
                        );
                      })()}
                    </FormControl>
                    <FormControl fullWidth={true}>
                      <FormLabel>
                        <Typography
                          variant="body3"
                          sx={{ marginBottom: 0.5, display: "block" }}
                        >
                          Lösenord
                        </Typography>
                      </FormLabel>

                      <TextField
                        fullWidth={true}
                        placeholder={msgStr("password")}
                        name="password"
                        id="password"
                        type="password"
                      />
                    </FormControl>
                    <Box>
                      {realm.resetPasswordAllowed && (
                        <Stack flexDirection="row" gap={1}>
                          <Typography
                            variant="body1"
                            sx={{
                              color: `${theme.palette.text.primary} !important`,
                            }}
                          >
                            Glömt lösenordet?
                          </Typography>
                          <Link
                            tabIndex={5}
                            href={url.loginResetCredentialsUrl}
                            sx={{
                              // TODO: remove when you update storybook to a new version
                              "&:hover": {
                                color: theme.palette.text.secondary,
                                textDecoration: "underline solid #66646199",
                              },
                            }}
                          >
                            {msg("doForgotPassword")}
                          </Link>
                        </Stack>
                      )}
                    </Box>
                    <Stack
                      id="kc-form-buttons"
                      sx={() => ({
                        alignItems: "center",
                        gap: 0.5,
                        position: "absolute",
                        bottom: "20px",
                        left: 0,
                        right: 0,
                        [theme.breakpoints.down("sm")]: {
                          position: "relative",
                          marginTop: `16px !important`,
                        },
                      })}
                    >
                      <input
                        type="hidden"
                        id="id-hidden-input"
                        name="credentialId"
                        {...(auth?.selectedCredential !== undefined
                          ? {
                              value: auth.selectedCredential,
                            }
                          : {})}
                      />
                      <Button
                        variant="contained"
                        fullWidth={true}
                        name="login"
                        id="kc-login"
                        type="submit"
                        disabled={isLoginButtonDisabled}
                        onClick={() => onSubmit}
                      >
                        {msgStr("doLogIn")}
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Box>
            </Box>
          }
        />
      </BaseLayout>
    );
  }
);
