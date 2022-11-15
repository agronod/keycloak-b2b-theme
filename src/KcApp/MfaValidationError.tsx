import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";
import Template from "./Template";

type KcContext_MfaValidationError = Extract<
  KcContext,
  { pageId: "mfa-validation-error.ftl" }
>;

const MfaValidationError = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_MfaValidationError; i18n: I18n } & KcProps) => {
    const { url } = kcContext;

    const { msg } = i18n;

    return (
      <Template props={props} url={url}>
        <form
          id="kc-mfa-validation-error-form"
          className={clsx(props.kcFormClass)}
          action={url.loginAction}
          method="post"
        >
          <div className={clsx(props.kcLabelWrapperClass)}>
            <label
              htmlFor="mfaValidationError"
              className={clsx(props.kcLabelClass)}
            >
              {msg("mfaValidationError")}
            </label>
          </div>

          <div className={clsx(props.kcFormGroupClass)}>
            <div
              id="kc-form-options"
              className={clsx(props.kcFormOptionsClass)}
            >
              <div className={clsx(props.kcFormOptionsWrapperClass)}>
                <span>
                  <a href={url.loginUrl}>{msg("backToLogin")}</a>
                </span>
              </div>
            </div>
          </div>
        </form>
      </Template>
    );
  }
);

export default MfaValidationError;
