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
            customLoginAccountTitle: "Log in",
            backToLogin: "Back",
            emailForgotTitle: "Forgot Your Password?",
            emailInstructionUsername:
                "Please enter your username or email address. You will receive a link to create a new password via email.",
            emailInstruction:
                "Please enter your email address. You will receive a link to create a new password via email."
        },
        // cspell: disable
        sv: {
            doLogIn: "Nästa",
            doForgotPassword: "Återställ",
            forgotPassword: "Glömt lösenord?",
            customLoginAccountTitle: "Logga in",
            backToLogin: "Tillbaka",
            emailForgotTitle: "Glömt ditt lösenord?",
            emailInstructionUsername:
                "Ange ditt användarnamn eller e-postadress. Du kommer att få en länk för att skapa ett nytt lösenord via e-post.",
            emailInstruction: "Du får ett e-postmeddelande med instruktioner."
        }
        // cspell: enable
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
