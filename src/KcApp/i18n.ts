import { useI18n as useI18nBase } from "keycloakify";

type Props = Omit<Parameters<typeof useI18nBase>[0], "extraMessages">;

export function useI18n(props: Props) {
  const { kcContext } = props;
  return useI18nBase({
    kcContext,
    extraMessages: {
      en: {
        mfaCode: "Enter code",
        doMfaValidation: "Send",
        mfaValidationError: "Please contact your system administrator",
        alphanumericalCharsOnly: "Only alphanumerical characters",
        gender: "Gender",
        // Here we overwrite the default english value for the message "doForgotPassword"
        // that is "Forgot Password?" see: https://github.com/InseeFrLab/keycloakify/blob/f0ae5ea908e0aa42391af323b6d5e2fd371af851/src/lib/i18n/generated_messages/18.0.1/login/en.ts#L17
        doForgotPassword: "I forgot my password",
      },
      fr: {
        /* spell-checker: disable */
        mfaCode: "Code d'authentification",
        doMfaValidation: "Code",
        mfaValidationError: "Veuillez contacter votre administrateur système",
        alphanumericalCharsOnly: "Caractère alphanumérique uniquement",
        gender: "Genre",
        doForgotPassword: "J'ai oublié mon mot de passe",
        /* spell-checker: enable */
      },
      sv: {
        mfaCode: "Ange kod",
        doMfaValidation: "Skicka",
        mfaValidationError: "Vänligen kontakta din systemadministratör",
        alphanumericalCharsOnly: "Endast alfanumeriska tecken",
        gender: "Kön",
        doForgotPassword: "Jag har glömt mitt lösenord",
      },
    },
  });
}

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
