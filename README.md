# Keycloak B2B Theme

Custom keycloak theme based on <https://github.com/InseeFrLab/keycloakify>

## Running locally

Edit (do not forget to undo before publishing)

```typescript
import { getKcContext } from "keycloakify";

 const { kcContext } = getKcContext({
+    "mockPageId": "mfa-validation.ftl"
 });
```

and run

```bash
npm install
npm start
```

## Extra pages

### Mfa validation

> Name: "mfa-validation"
>
> Fields: "mfaCode"

### Mfa validation error

> Name: "mfa-validation-error"