import "./KcApp.css";
import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import KcAppBase, { defaultKcProps } from "keycloakify";
import { useI18n } from "./i18n";
import { Login } from "./Login";

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
    // NOTE: The classes are defined in ./KcApp.css
    kcFormCardClass: "my-form-card",
    kcLoginClass: "my-login",
    kcFormHeaderClass: "",
    kcFormSocialAccountClass: "my-form-social-account",
    kcFormSocialAccountContentClass: "my-form-social-account-content",
    kcFormSocialAccountListClass: "",
    kcFormSocialAccountListLinkClass: "my-form-social-account-list-link",
    kcFormOptionsWrapperClass: "my-form-options-wrapper",
    // kcHeaderWrapperClass: "my-header-wrapper",
    // kcFormSocialAccountContentClass: "my-form-social-account-content",
  };

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return <Login {...{ kcContext, ...props }} />;
          case "register.ftl":
            return <Register {...{ kcContext, ...props }} />;
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
