import { useState, memo } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import { KcContextBase, KcProps } from "keycloakify";
// import agrosfarLogo from "../agrosfar-pilot-logo.png";
import Template from "keycloakify/lib/components/Template";
import type { I18n } from "./i18n";
import { clsx } from "keycloakify/lib/tools/clsx";

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

    return (
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
              <header className="login__header">
                <h1>Logga in</h1>
              </header>

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
                        className={clsx(props.kcFormSocialAccountListLinkClass)}
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
                <form
                  id="kc-form-login"
                  onSubmit={onSubmit}
                  action={url.loginAction}
                  method="post"
                >
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
                        <>
                          {/* <label
                            htmlFor={autoCompleteHelper}
                            className={clsx(props.kcLabelClass)}
                          >
                            {msg(label)}
                          </label> */}
                          <input
                            placeholder={msgStr(label)}
                            tabIndex={1}
                            id={autoCompleteHelper}
                            className={clsx(props.kcInputClass)}
                            //NOTE: This is used by Google Chrome auto fill so we use it to tell
                            //the browser how to pre fill the form but before submit we put it back
                            //to username because it is what keycloak expects.
                            name={autoCompleteHelper}
                            defaultValue={login.username ?? ""}
                            type="text"
                            {...(usernameEditDisabled
                              ? { disabled: true }
                              : {
                                  autoFocus: true,
                                  autoComplete: "off",
                                })}
                          />
                        </>
                      );
                    })()}
                  </div>
                  <div className={clsx(props.kcFormGroupClass)}>
                    {/* <label
                      htmlFor="password"
                      className={clsx(props.kcLabelClass)}
                    >
                      {msg("password")}
                    </label> */}
                    <input
                      placeholder={msgStr("password")}
                      tabIndex={2}
                      id="password"
                      className={clsx(props.kcInputClass)}
                      name="password"
                      type="password"
                      autoComplete="off"
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
                    <input
                      tabIndex={4}
                      className={clsx(
                        props.kcButtonClass,
                        props.kcButtonPrimaryClass,
                        props.kcButtonBlockClass,
                        props.kcButtonLargeClass
                      )}
                      name="login"
                      id="kc-login"
                      type="submit"
                      value={msgStr("doLogIn")}
                      disabled={isLoginButtonDisabled}
                    />
                  </div>
                  <div
                    className={clsx(
                      props.kcFormGroupClass,
                      props.kcFormSettingClass
                    )}
                  >
                    {/* <div id="kc-form-options">
                      {realm.rememberMe && !usernameEditDisabled && (
                        <div className="checkbox">
                          <label>
                            <input
                              tabIndex={3}
                              id="rememberMe"
                              name="rememberMe"
                              type="checkbox"
                              {...(login.rememberMe
                                ? {
                                    checked: true,
                                  }
                                : {})}
                            />
                            {msg("rememberMe")}
                          </label>
                        </div>
                      )}
                    </div> */}
                    <div className={clsx(props.kcFormOptionsWrapperClass)}>
                      {realm.resetPasswordAllowed && (
                        <span>
                          <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                            {msg("doForgotPassword")}
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                </form>
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
                <a tabIndex={6} href={url.registrationUrl}>
                  {msg("doRegister")}
                </a>
              </span>
            </div>
          )
        }
      />
    );
  }
);
