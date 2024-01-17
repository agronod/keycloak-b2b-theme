import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";
import Template from "./Template";
import BaseLayout from "components/BaseLayout/BaseLayout";
import {
  Box,
  Button,
  MobileStepper,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { msgStr } = i18n;

    return (
      <BaseLayout>
        <Button
          href={url.loginRestartFlowUrl}
          sx={(theme: Theme) => ({
            position: "absolute",
            top: "50px",
            left: "50px",

            [theme.breakpoints.down("md")]: { top: "30px", left: "30px" },
          })}
          startIcon={<ArrowBack />}
        >
          Tilbaka
        </Button>
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
            <Box
              component="form"
              id="kc-mfa-validation-form"
              className={clsx(props.kcFormClass)}
              action={url.loginAction}
              method="post"
              sx={{
                display: "grid",
                gap: 3,
                width: "100%",
              }}
            >
              <Typography textAlign="center" variant={isMobile ? "h4" : "h3"}>
                {msgStr("mfaValidationTitle")}
              </Typography>
              <Typography
                textAlign="center"
                variant={isMobile ? "body2" : "body1"}
                color="text.secondary"
              >
                {msgStr("mfaValidationSubtitle")}
              </Typography>
              <div
                className={clsx(
                  props.kcFormGroupClass,
                  messagesPerField.printIfExists(
                    "code",
                    props.kcFormGroupErrorClass
                  )
                )}
              >
                <TextField
                  fullWidth={true}
                  autoFocus
                  placeholder={msgStr("mfaCode")}
                  name="user.attributes.code"
                  id="user.attributes.code"
                  type="phone"
                  error={kcContext.message?.type === "error"}
                  helperText={
                    kcContext.message?.type === "error"
                      ? kcContext.message?.summary
                      : undefined
                  }
                />
              </div>
              <div id="kc-form-buttons">
                <Button
                  variant="contained"
                  fullWidth={true}
                  name="ValidateCode"
                  type="submit"
                >
                  {msgStr("doMfaValidation")}
                </Button>
              </div>
              <MobileStepper
                variant="dots"
                steps={2}
                position="static"
                activeStep={1}
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
              <div className={clsx(props.kcFormGroupClass)}>
                <div
                  id="kc-form-options"
                  className={clsx(props.kcFormOptionsClass)}
                >
                  <div className={clsx(props.kcFormOptionsWrapperClass)}>
                    <Typography
                      textAlign="center"
                      variant="body2"
                      color="text.secondary"
                    >
                      {msgStr("mfaVerificationInfoText")}
                    </Typography>
                  </div>
                  <div className={clsx(props.kcFormOptionsWrapperClass)}>
                    <Button
                      variant="text"
                      name="SendNewCode"
                      type="submit"
                      fullWidth={true}
                    >
                      {msgStr("mfaVerficationCodeLink")}
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </Template>
      </BaseLayout>
    );
  }
);

export default MfaValidation;
