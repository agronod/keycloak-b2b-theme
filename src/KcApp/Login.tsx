import { useState, memo, useEffect } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import { KcContextBase, KcProps } from "keycloakify";
// import agrosfarLogo from "../agrosfar-pilot-logo.png";
import Template from "keycloakify/lib/components/Template";
import type { I18n } from "./i18n";
import { clsx } from "keycloakify/lib/tools/clsx";
import {
  Box,
  Button,
  MobileStepper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BaseLayout from "../components/BaseLayout/BaseLayout";

export const Login = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContextBase.Login; i18n: I18n } & KcProps) => {
    const {
      social,
      realm,
      url,
      usernameEditDisabled,
      login,
      auth,
      registrationDisabled,
    } = kcContext;
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
    }, []);

    return (
      <BaseLayout>
        <Template
          {...{ kcContext, i18n, ...props }}
          doFetchDefaultThemeResources={true}
          displayInfo={social.displayInfo && false} // disable manually
          displayWide={realmPassword && social.providers !== undefined}
          headerNode={null} // msg("doLogIn")
          formNode={
            <div
              id="kc-form"
              className={clsx(
                realmPassword &&
                  social.providers !== undefined &&
                  props.kcContentWrapperClass
              )}
            >
              <div
                id="kc-form-wrapper"
                className={clsx(
                  realmPassword &&
                    social.providers && [
                      props.kcFormSocialAccountContentClass,
                      props.kcFormSocialAccountClass,
                    ]
                )}
              >
                {social.providers !== undefined && (
                  <div
                    id="kc-social-providers"
                    className={clsx(
                      props.kcFormSocialAccountContentClass,
                      props.kcFormSocialAccountClass
                    )}
                  >
                    <ul
                      className={clsx(
                        props.kcFormSocialAccountListClass,
                        social.providers.length > 4 &&
                          props.kcFormSocialAccountDoubleListClass
                      )}
                    >
                      {social.providers.map((p) => (
                        <li
                          key={p.providerId}
                          className={clsx(
                            props.kcFormSocialAccountListLinkClass
                          )}
                        >
                          <a
                            href={p.loginUrl}
                            id={`zocial-${p.alias}`}
                            className={clsx("zocial", p.providerId)}
                          >
                            <span>{p.displayName}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                    <Typography
                      textAlign="center"
                      variant={isMobile ? "h4" : "h3"}
                    >
                      {msgStr("loginTitle")}
                    </Typography>
                    <div className={clsx(props.kcFormGroupClass)}>
                      {(() => {
                        const label = !realm.loginWithEmailAllowed
                          ? "username"
                          : realm.registrationEmailAsUsername
                          ? "email"
                          : "usernameOrEmail";

                        const autoCompleteHelper: typeof label =
                          label === "usernameOrEmail" ? "username" : label;

                        return (
                          <TextField
                            fullWidth={true}
                            placeholder={msgStr(label)}
                            name={msgStr(label)}
                            id={autoCompleteHelper}
                            type="email"
                            value={username}
                            onChange={(e) => handleOnChange(e)}
                            disabled={usernameEditDisabled}
                          />
                        );
                      })()}
                    </div>
                    <div className={clsx(props.kcFormGroupClass)}>
                      <TextField
                        fullWidth={true}
                        placeholder={msgStr("password")}
                        name="password"
                        id="password"
                        type="password"
                      />
                    </div>
                    <div
                      id="kc-form-buttons"
                      className={clsx(props.kcFormGroupClass)}
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
                    </div>
                    <MobileStepper
                      variant="dots"
                      steps={2}
                      position="static"
                      activeStep={0}
                      nextButton={null}
                      backButton={null}
                      sx={{
                        backgroundColor: "transparent",
                        display: "flex",
                        justifyContent: "center",
                        boxShadow: "none",
                        color: "primary",
                      }}
                    />
                    <div
                      className={clsx(
                        props.kcFormGroupClass,
                        props.kcFormSettingClass
                      )}
                    ></div>
                  </Box>
                )}
              </div>
            </div>
          }
          infoNode={
            realmPassword &&
            realm.registrationAllowed &&
            !registrationDisabled && (
              <div id="kc-registration">
                <span>
                  {msg("noAccount")}
                  <a href={url.registrationUrl}>{msg("doRegister")}</a>
                </span>
              </div>
            )
          }
        />
      </BaseLayout>
    );
  }
);
