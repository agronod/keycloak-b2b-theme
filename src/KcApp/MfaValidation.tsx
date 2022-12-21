import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";
import Template from "./Template";

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

    const { msgStr } = i18n;

    return (
      <Template props={props} url={url}>
        <div
          id="kc-form-wrapper"
          className={clsx(
            false && [
              props.kcFormSocialAccountContentClass,
              props.kcFormSocialAccountClass,
            ]
          )}
        >
          <header className="login__header" style={{ paddingBottom: "20px" }}>
            <h1>{msgStr("mfaValidationTitle")}</h1>
            <h2>{msgStr("mfaValidationSubtitle")}</h2>
          </header>
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
                  "code",
                  props.kcFormGroupErrorClass
                )
              )}
            >
              {/* <div className={clsx(props.kcLabelWrapperClass)}>
                <label
                  htmlFor="user.attributes.code"
                  className={clsx(props.kcLabelClass)}
                >
                  {msg("mfaCode")}
                </label>
              </div> */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input
                  type="text"
                  id="user.attributes.code"
                  className={clsx(props.kcInputClass)}
                  name="user.attributes.code"
                  placeholder={msgStr("mfaCode")}
                  style={{ width: "410px" }}
                />
              </div>
              <div className={clsx(props.kcFormGroupErrorClass)}>
                <label
                  htmlFor="mfaValidationError"
                  className={clsx(props.kcInputErrorMessageClass)}
                >
                  {kcContext.message?.type == "error" && (kcContext.message?.summary)}
                </label>
              </div>
            </div>

            <div
              id="kc-form-buttons"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <div style={{ paddingRight: "15px" }}>
                <a
                  href={url.loginRestartFlowUrl}
                  className={clsx(props.kcButtonClass)}
                  type="button"
                  style={{ width: "200px", paddingRight: "20px" }}
                >
                  {msgStr("backToLogin")}
                </a>
              </div>
              <div>
                <input
                  className={clsx(
                    props.kcButtonClass,
                    props.kcButtonPrimaryClass,
                    props.kcButtonBlockClass,
                    props.kcButtonLargeClass
                  )}
                  type="submit"
                  value={msgStr("doMfaValidation")}
                  name="ValidateCode"
                  style={{ width: "200px" }}
                />
              </div>
            </div>
            <div className={clsx(props.kcFormGroupClass)}>
              <div
                id="kc-form-options"
                className={clsx(props.kcFormOptionsClass)}
                style={{ paddingTop: "20px" }}
              >
                <div className={clsx(props.kcFormOptionsWrapperClass)} style={{
                  fontFamily: 'Inter',
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px"
                }}>
                  <p>{msgStr("mfaVerificationInfoText")}</p>
                </div>
                <div className={clsx(props.kcFormOptionsWrapperClass)} style={{ fontFamily: 'Inter', fontStyle: "normal", fontWeight: 500, fontSize: "14px", lineHeight: "16px" }}>
                  <input
                    className={"btn-text"}
                    type="submit"
                    value={msgStr("mfaVerficationCodeLink")}
                    name="SendNewCode"
                  />
                </div>
              </div>
            </div>
          </form>
        </div >
      </Template >
    );
  }
);

export default MfaValidation;
