import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import KcAppBase, { defaultKcProps } from "keycloakify";
import { useI18n } from "./i18n";
import { Login } from "./Login";
import { LoginUpdatePassword } from "./LoginUpdatePassword";
import React from "react";

const Register = lazy(() => import("./Register"));
const Terms = lazy(() => import("./Terms"));
const MfaValidation = lazy(() => import("./MfaValidation"));
const MfaValidationError = lazy(() => import("./MfaValidationError"));

export type Props = {
  kcContext: KcContext;
};

export default function KcApp({ kcContext }: Props) {
  const i18n = useI18n({
    kcContext,
  });

  if (i18n === null) {
    return null;
  }

  const props = {
    i18n,
    ...defaultKcProps,
  };

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return <Login {...{ kcContext, ...props }} />;
          case "register.ftl":
            return <Register {...{ kcContext, ...props }} />;
          case "login-update-password.ftl":
            return <LoginUpdatePassword {...{ kcContext, ...props }} />;
          case "terms.ftl":
            return <Terms {...{ kcContext, ...props }} />;
          case "mfa-validation.ftl":
            return <MfaValidation {...{ kcContext, ...props }} />;
          case "mfa-validation-error.ftl":
            return <MfaValidationError {...{ kcContext, ...props }} />;
          default:
            return <KcAppBase {...{ kcContext, ...props }} />;
        }
      })()}
    </Suspense>
  );
}
