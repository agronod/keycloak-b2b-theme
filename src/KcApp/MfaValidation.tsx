import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import React from "react";
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { msgStr } = i18n;

    return (
      <BaseLayout>
        <Button
          href={url.loginRestartFlowUrl}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            // TODO: remove when you update storybook to a new version
            "&:hover": {
              color: theme.palette.text.secondary,
              textDecoration: "underline solid #66646199",
            },
            [theme.breakpoints.down("sm")]: {
              position: "relative",
              justifySelf: "start",
            },
          }}
          startIcon={<ArrowBack />}
        >
          Tillbaka
        </Button>
        <Template props={props} url={url}>
          <Box id="kc-form-wrapper">
            <Box
              component="form"
              id="kc-mfa-validation-form"
              action={url.loginAction}
              method="post"
              sx={{
                display: "grid",
                gap: 3,
                width: "100%",
              }}
            >
              <Typography variant={isMobile ? "h4" : "h3"}>
                {msgStr("mfaValidationTitle")}
              </Typography>
              <Typography
                variant={isMobile ? "body2" : "body1"}
                color="text.secondary"
              >
                {msgStr("mfaValidationSubtitle")}
              </Typography>
              <div>
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
              <Stack
                sx={() => ({
                  alignItems: "center",
                  gap: 0.5,
                  position: "absolute",
                  bottom: "20px",
                  left: 0,
                  right: 0,
                  [theme.breakpoints.down("sm")]: {
                    position: "relative",
                    marginTop: `16px !important`,
                  },
                })}
              >
                <Box id="kc-form-buttons" sx={{ width: "100%" }}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    name="ValidateCode"
                    type="submit"
                  >
                    {msgStr("doMfaValidation")}
                  </Button>
                </Box>

                <Box id="kc-form-options">
                  <Typography
                    textAlign="center"
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: 2 }}
                  >
                    {msgStr("mfaVerificationInfoText")}
                  </Typography>

                  <Button
                    variant="text"
                    name="SendNewCode"
                    type="submit"
                    fullWidth={true}
                    sx={{ marginTop: 2 }}
                  >
                    {msgStr("mfaVerficationCodeLink")}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Template>
      </BaseLayout>
    );
  }
);

export default MfaValidation;
