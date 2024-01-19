import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";

import type { I18n } from "./i18n";
import React from "react";
import Template from "./Template";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Box, Button, Typography } from "@mui/material";

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
      <BaseLayout>
        <Template props={props} url={url}>
          <Box
            component="form"
            id="kc-mfa-validation-error-form"
            action={url.loginAction}
            method="post"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
            }}
          >
            <ErrorOutlineOutlinedIcon
              color="error"
              fontSize="large"
              sx={{ width: "48px", height: "48px" }}
            />
            <Typography variant="h3" textAlign="center">
              {kcContext.message?.summary}
            </Typography>

            <Button variant="contained" href={url.loginRestartFlowUrl}>
              Försök igen
            </Button>
          </Box>
        </Template>
      </BaseLayout>
    );
  }
);

export default MfaValidationError;
