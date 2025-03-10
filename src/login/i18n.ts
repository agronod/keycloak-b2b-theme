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
                "Please enter your email address. You will receive a link to create a new password via email.",
            mfaValidationTitle: "Verify your email address",
            mfaValidationSubtitle:
                "A verification code has been sent to your email address. If you don't see it in your inbox, it may have landed in your spam folder.",
            mfaCode: "Verification code",
            doMfaValidation: "Log in",
            mfaVerificationInfoText: "Didn't receive a verification code?",
            mfaVerficationCodeLink: "Resend code"
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
            emailInstruction: "Du får ett e-postmeddelande med instruktioner.",
            mfaValidationTitle: "Verifiera din e-postadress",
            mfaValidationSubtitle:
                "En verifieringskod har skickats till din e-postadress. Hittar du den inte i inkorgen kan den ha hamnat som skräppost.",
            mfaCode: "Verifieringskod",
            doMfaValidation: "Logga in",
            mfaVerificationInfoText: "Har du inte fått en verifieringskod?",
            mfaVerficationCodeLink: "Skicka ny kod"
        }
        // cspell: enable
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
