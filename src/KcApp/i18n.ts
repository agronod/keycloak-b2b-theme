import { useI18n as useI18nBase } from "keycloakify";

type Props = Omit<Parameters<typeof useI18nBase>[0], "extraMessages">;

export function useI18n(props: Props) {
  const { kcContext } = props;
  return useI18nBase({
    kcContext,
    extraMessages: {
      en: {
        mfaCode: "Verification code",
        doMfaValidation: "Log in",
        mfaValidationError: "Please contact your system administrator",
        alphanumericalCharsOnly: "Only alphanumerical characters",
        gender: "Gender",
        // Here we overwrite the default english value for the message "doForgotPassword"
        // that is "Forgot Password?" see: https://github.com/InseeFrLab/keycloakify/blob/f0ae5ea908e0aa42391af323b6d5e2fd371af851/src/lib/i18n/generated_messages/18.0.1/login/en.ts#L17
        doForgotPassword: "I forgot my password",
        doLogIn: "Next",
        mfaValidationTitle: "Verify your email address",
        mfaValidationSubtitle:
          "A verification code has been sent to your email address. If you don't find it in your inbox, it may have ended up in your spam folder.",
        backToLogin: "Back to login",
      },
      fr: {
        /* spell-checker: disable */
        mfaCode: "Code de vérification",
        doMfaValidation: "Valider",
        mfaValidationError: "Veuillez contacter votre administrateur système",
        alphanumericalCharsOnly: "Caractère alphanumérique uniquement",
        gender: "Genre",
        doForgotPassword: "J'ai oublié mon mot de passe",
        doLogIn: "Suivant",
        mfaValidationTitle: "Vérifiez votre adresse e-mail",
        mfaValidationSubtitle:
          "Un code de vérification a été envoyé à votre adresse e-mail. Si vous ne le trouvez pas dans votre boîte de réception, il peut se trouver dans vos courriers indésirables.",
        backToLogin: "Retour à la connexion",
        /* spell-checker: enable */
      },
      sv: {
        mfaCode: "Verifieringskod",
        doMfaValidation: "Logga in",
        mfaValidationError: "Vänligen kontakta din systemadministratör",
        alphanumericalCharsOnly: "Endast alfanumeriska tecken",
        gender: "Kön",
        doForgotPassword: "Jag har glömt mitt lösenord",
        doLogIn: "Nästa",
        mfaValidationTitle: "Verifiera din e-postadress",
        mfaValidationSubtitle:
          "En verifieringskod har skickats till din e-postadress. Hittar du den inte i inkorgen kan den ha hamnat som skräppost.",
        backToLogin: "Tillbaka till inloggning",
      },
    },
  });
}

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
