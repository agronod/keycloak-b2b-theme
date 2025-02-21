/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withExtraLanguages({
        /* ... */
    })
    .withCustomTranslations({
        en: {
            doLogIn: "Next",
            doForgotPassword: "Reset",
            forgotPassword: "Forgot password?",
            customLoginAccountTitle: "Log in"
        },
        // cspell: disable
        sv: {
            doLogIn: "Nästa",
            doForgotPassword: "Återställ",
            forgotPassword: "Glömt lösenord?",
            customLoginAccountTitle: "Logga in"
        }
        // cspell: enable
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
