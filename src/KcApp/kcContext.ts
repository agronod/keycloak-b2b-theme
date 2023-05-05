import { getKcContext } from "keycloakify/lib/getKcContext";

export const { kcContext } = getKcContext<
  // NOTE: A 'keycloakify' field must be added
  // in the package.json to generate theses pages
  // https://docs.keycloakify.dev/build-options#keycloakify.extrapages
  | { pageId: "mfa-validation.ftl" }
  | { pageId: "mfa-validation-error.ftl" }
  // NOTE: register.ftl is deprecated in favor of register-user-profile.ftl
  // but let's say we use it anyway and have this plugin enabled: https://github.com/micedre/keycloak-mail-whitelisting
  // keycloak-mail-whitelisting define the non standard ftl global authorizedMailDomains, we declare it here.
  | { pageId: "register.ftl"; authorizedMailDomains: string[] }
>({
  // Uncomment to test the login page for development.
  // mockPageId: "mfa-validation.ftl",
  mockData: [
    {
      pageId: "login.ftl",
      realm: {
        password: true,
        internationalizationEnabled: false,
      },
      locale: {
        //When we test the login page we do it in french
        currentLanguageTag: "sv",
      },
    },
    {
      pageId: "mfa-validation.ftl",
      locale: {
        currentLanguageTag: "sv",
      },
      message: {
        type: "error",
        summary: "test",
      },
    },
    {
      pageId: "mfa-validation-error.ftl",
      locale: {
        currentLanguageTag: "sv",
      },
    },
    {
      pageId: "register.ftl",
      authorizedMailDomains: [
        "example.com",
        "another-example.com",
        "*.yet-another-example.com",
        "*.example.com",
        "hello-world.com",
      ],
    },
    {
      //NOTE: You will either use register.ftl (legacy) or register-user-profile.ftl, not both
      pageId: "register-user-profile.ftl",
      locale: {
        currentLanguageTag: "sv",
      },
      profile: {
        attributes: [
          {
            validators: {
              pattern: {
                pattern: "^[a-zA-Z0-9]+$",
                "ignore.empty.value": true,
                // eslint-disable-next-line no-template-curly-in-string
                "error-message": "${alphanumericalCharsOnly}",
              },
            },
            //NOTE: To override the default mock value
            value: undefined,
            name: "username",
          },
          {
            validators: {
              options: {
                options: [
                  "male",
                  "female",
                  "non-binary",
                  "transgender",
                  "intersex",
                  "non_communicated",
                ],
              },
            },
            // eslint-disable-next-line no-template-curly-in-string
            displayName: "${gender}",
            annotations: {},
            required: true,
            groupAnnotations: {},
            readOnly: false,
            name: "gender",
          },
        ],
      },
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
