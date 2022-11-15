import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";

type KcContext_MfaValidation = Extract<
  KcContext,
  { pageId: "mfa-validation.ftl" }
>;

const MfaValidation = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_MfaValidation; i18n: I18n } & KcProps) => {
    const { url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
      <form
        id="kc-mfa-validation-form"
        className={clsx(props.kcFormClass)}
        action={url.loginAction}
        method="post"
      >
        <div
          className={clsx(
            props.kcFormGroupClass,
            messagesPerField.printIfExists(
              "mfaCode",
              props.kcFormGroupErrorClass
            )
          )}
        >
          <div className={clsx(props.kcLabelWrapperClass)}>
            <label htmlFor="mfaCode" className={clsx(props.kcLabelClass)}>
              {msg("mfaCode")}
            </label>
          </div>
          <div className={clsx(props.kcInputWrapperClass)}>
            <input
              type="text"
              id="mfaCode"
              className={clsx(props.kcInputClass)}
              name="mfaCode"
            />
          </div>
        </div>

        <div className={clsx(props.kcFormGroupClass)}>
          <div id="kc-form-options" className={clsx(props.kcFormOptionsClass)}>
            <div className={clsx(props.kcFormOptionsWrapperClass)}>
              <span>
                <a href={url.loginUrl}>{msg("backToLogin")}</a>
              </span>
            </div>
          </div>

          <div id="kc-form-buttons" className={clsx(props.kcFormButtonsClass)}>
            <input
              className={clsx(
                props.kcButtonClass,
                props.kcButtonPrimaryClass,
                props.kcButtonBlockClass,
                props.kcButtonLargeClass
              )}
              type="submit"
              value={msgStr("doMfaValidation")}
            />
          </div>
        </div>
      </form>
    );
  }
);

export default MfaValidation;
