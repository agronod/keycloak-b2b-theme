import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { kcContext } from "./KcApp/kcContext";
import { defaultKcProps } from "keycloakify";

import "./index.css";

const App = lazy(() => import("./App"));
const KcApp = lazy(() => import("./KcApp"));

if (kcContext !== undefined) {
  console.log(kcContext);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      {kcContext === undefined ? (
        <App />
      ) : (
        <KcApp
          kcContext={kcContext}
          {...{
            ...defaultKcProps,
            kcFormCardClass: "my-form-card",
            kcLoginClass: "my-login",
            kcFormHeaderClass: "",
            kcFormSocialAccountClass: "my-form-social-account",
            kcFormSocialAccountContentClass: "my-form-social-account-content",
            kcFormSocialAccountListClass: "",
            kcFormSocialAccountListLinkClass:
              "my-form-social-account-list-link",
            // kcHeaderWrapperClass: "my-header-wrapper",
            // kcFormSocialAccountContentClass: "my-form-social-account-content",
          }}
        />
      )}
    </Suspense>
  </StrictMode>
);
