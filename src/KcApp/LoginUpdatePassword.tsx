import { useState, memo } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import { KcContextBase, KcProps } from "keycloakify";
import Template from "keycloakify/lib/components/Template";
import type { I18n } from "./i18n";
import { clsx } from "keycloakify/lib/tools/clsx";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import React from "react";

export const LoginUpdatePassword = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: {
    kcContext: KcContextBase.LoginUpdatePassword;
    i18n: I18n;
  } & KcProps) => {
    const { url, username } = kcContext;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(
      (e) => {
        e.preventDefault();
        setIsLoginButtonDisabled(true);
        const formElement = e.target as HTMLFormElement;
        formElement.submit();
      }
    );
    return (
      <BaseLayout>
        <Template
          {...{ kcContext, i18n, ...props }}
          doFetchDefaultThemeResources={true}
          displayInfo={false}
          displayWide={true}
          headerNode={null}
          formNode={
            <div id="kc-form">
              <div id="kc-form-wrapper">
                <Box
                  component="form"
                  id="kc-passwd-update-form"
                  onSubmit={onSubmit}
                  action={url.loginAction}
                  method="post"
                  sx={{
                    display: "grid",
                    gap: 3,
                    width: "100%",
                  }}
                >
                  <Typography
                    textAlign="center"
                    variant={isMobile ? "h4" : "h3"}
                  >
                    {msgStr("choosePassword")}
                  </Typography>
                  <Typography
                    textAlign="center"
                    variant={isMobile ? "body2" : "body1"}
                  >
                    {msgStr("choosePasswordInfo")}
                  </Typography>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    readOnly={true}
                    autoComplete="username"
                    style={{ display: "none" }}
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    style={{ display: "none" }}
                  />

                  <div className={clsx(props.kcFormGroupClass)}>
                    <TextField
                      fullWidth={true}
                      placeholder={msgStr("newPassword")}
                      type="password"
                      id="password-new"
                      name="password-new"
                      autoFocus
                      autoComplete="new-password"
                      className={clsx(props.kcInputClass)}
                    />
                  </div>
                  <div className={clsx(props.kcFormGroupClass)}>
                    <TextField
                      fullWidth={true}
                      placeholder={msgStr("confirmPassword")}
                      type="password"
                      id="password-confirm"
                      name="password-confirm"
                      autoComplete="new-password"
                      className={clsx(props.kcInputClass)}
                    />
                  </div>
                  <div
                    id="kc-form-buttons"
                    className={clsx(props.kcFormGroupClass)}
                  >
                    <Button
                      variant="contained"
                      fullWidth={true}
                      name="login"
                      id="kc-login"
                      type="submit"
                      disabled={isLoginButtonDisabled}
                      onClick={() => onSubmit}
                    >
                      {msgStr("continue")}
                    </Button>
                  </div>
                </Box>
              </div>
            </div>
          }
        />
      </BaseLayout>
    );
  }
);
