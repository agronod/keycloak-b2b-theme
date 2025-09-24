# Code Patterns and Conventions

This document outlines the code patterns and conventions used in the Keycloak Lantbrukare theme project.

## TypeScript Patterns

### File Naming
Use PascalCase for React component files and camelCase for utility files:
- ✅ `Login.tsx` (see src/login/pages/Login.tsx)
- ✅ `BaseLayout.tsx` (see src/components/BaseLayout/BaseLayout.tsx)
- ✅ `i18n.ts` (see src/login/i18n.ts)
- ❌ `login.tsx` or `base-layout.tsx`

### Component Structure Pattern
```typescript
// Pattern from: src/components/Logo.tsx:5-22
type ComponentProps = {
    prop: string;
};

const Component = ({ prop }: ComponentProps) => {
    return (
        // JSX content
    );
};

export default Component;
```

### Import Organization
Imports follow this order:
1. React and external dependencies
2. Keycloakify imports
3. Material-UI imports
4. Local components
5. Assets and styles

```typescript
// Pattern from: src/login/pages/Login.tsx:1-6
import { FormEventHandler, useEffect, useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, FormControl, FormLabel, Link, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useConstCallback } from "powerhooks/useConstCallback";
```

### Component Props Pattern
All Keycloak page components receive standardized props:
```typescript
// Pattern from: src/login/pages/Login.tsx:8-9
export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    // Component implementation
}
```

### Hook Usage Pattern
Custom hooks from powerhooks for performance optimization:
```typescript
// Pattern from: src/login/pages/Login.tsx:24-35
const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    setIsLoginButtonDisabled(true);
    const formElement = e.target as HTMLFormElement;
    formElement.submit();
});
```

## Material-UI Patterns

### Theme Usage
Always use theme object for responsive design and consistent styling:
```typescript
// Pattern from: src/login/pages/Login.tsx:169-170
sx={{
    color: `${theme.palette.text.primary} !important`
}}
```

### Responsive Breakpoints
```typescript
// Pattern from: src/components/BaseLayout/BaseLayout.tsx:14-18
[theme.breakpoints.down("sm")]: {
    display: "block",
    height: "100dvh",
    overflow: "hidden"
}
```

### Component Styling
Use sx prop for component-specific styles:
```typescript
// Pattern from: src/login/pages/Login.tsx:110-114
sx={{
    display: "grid",
    gap: 3,
    width: "100%"
}}
```

## Image Handling Pattern

### WebP with Fallback
Always provide WebP with PNG fallback for optimal performance:
```typescript
// Pattern from: src/components/Logo.tsx:10-18
<Picture
    webpSrc={agronodLogoWebP}
    fallbackSrc={agronodLogoPNG}
    alt="Logo image"
    style={{
        width: size === "small" ? 108 : 148
    }}
/>
```

### Picture Component Interface
```typescript
// Pattern from: src/components/Picture.tsx:3-9
interface PictureProps {
    webpSrc: string;
    fallbackSrc: string;
    alt?: string;
    style?: CSSProperties;
    className?: string;
}
```

## Export Patterns

### Named Exports for Components
Use default exports for React components:
```typescript
// Pattern from: src/components/Logo.tsx:22
export default Logo;
```

### Index File Pattern for Folders
```typescript
// Pattern from: src/components/AsideLogoSection/index.ts:1-3
import AsideLogoSection from "./AsideLogoSection";

export { AsideLogoSection };
```

## Internationalization (i18n) Pattern

### Custom Translations
```typescript
// Pattern from: src/login/i18n.ts:11-30
.withCustomTranslations({
    en: {
        doLogIn: "Next",
        doForgotPassword: "Reset",
        forgotPassword: "Forgot password?",
        customLoginAccountTitle: "Log in",
        // More translations...
    },
    // Other languages...
})
```

## TypeScript Configuration

### Strict Mode
The project uses TypeScript strict mode with specific compiler options:
- Target: ES2020
- Module: ESNext
- JSX: react-jsx
- Strict mode enabled
- No unused locals/parameters
- No fallthrough cases in switch

## Code Formatting

### Indentation and Style
- Indentation: 4 spaces (configured in .prettierrc.json:3)
- Line length: 90 characters default, 150 for specific template files
- Quotes: Double quotes for strings
- Semicolons: Always use semicolons
- Trailing commas: None
- Arrow function parentheses: Avoid when possible

### Formatting Commands
Available formatting commands:
- `yarn format` - Run Prettier on all files (from package.json:15)

### File-Specific Formatting
Template files have extended line length:
```json
// Pattern from: .prettierrc.json:12-22
"overrides": [
    {
        "files": [
            "**/login/pages/*.tsx",
            "**/account/pages/*.tsx",
            "**/login/Template.tsx",
            "**/account/Template.tsx",
            "**/login/UserProfileFormFields.tsx",
            "KcApp.tsx"
        ],
        "options": {
            "printWidth": 150
        }
    }
]
```

## ESLint Configuration

### Disabled Rules
- `react-hooks/exhaustive-deps`: off
- `@typescript-eslint/no-redeclare`: off
- `no-labels`: off

### Special Rules for Stories
```javascript
// Pattern from: eslint.config.js:43-47
files: ["**/*.stories.*"],
rules: {
    "import/no-anonymous-default-export": "off",
}
```

## Testing Patterns

### Storybook Story Structure
Stories follow a consistent pattern for testing different states:
```typescript
// Pattern from: src/login/pages/Login.stories.tsx:6-11
const meta = {
    title: "login/login.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### Story Naming Convention
Use descriptive names for different test scenarios:
```typescript
// Pattern from: src/login/pages/Login.stories.tsx:15-17
export const Default: Story = {
    render: () => <KcPageStory />
};

// Pattern from: src/login/pages/Login.stories.tsx:19-43
export const WithInvalidCredential: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                // Mock context overrides
            }}
        />
    )
};
```

### Mocking Keycloak Context
Override specific context properties for testing:
```typescript
// Pattern from: src/login/pages/Login.stories.tsx:26-39
messagesPerField: {
    existsError: (fieldName: string, ...otherFieldNames: string[]) => {
        const fieldNames = [fieldName, ...otherFieldNames];
        return fieldNames.includes("username") || fieldNames.includes("password");
    },
    get: (fieldName: string) => {
        if (fieldName === "username" || fieldName === "password") {
            return "Invalid username or password.";
        }
        return "";
    }
}
```

### Test File Location
Place story files next to the component they test:
- `src/login/pages/Login.tsx`
- `src/login/pages/Login.stories.tsx`

## Keycloakify-Specific Patterns

### Lazy Loading Components
Use lazy loading to reduce bundle size:
```typescript
// Pattern from: src/login/KcPage.tsx:10-13
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);
const Login = lazy(() => import("./pages/Login"));
```

### Page Routing Pattern
Route pages based on pageId in KcPage.tsx:
```typescript
// Pattern from: src/login/KcPage.tsx:26-48
switch (kcContext.pageId) {
    case "login.ftl":
        return (
            <Login
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
            />
        );
    default:
        return (
            <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={false}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
            />
        );
}
```

### Template Wrapper Pattern
All pages use the Template component for consistent styling:
```typescript
// Pattern from: src/login/KcPage.tsx:31-33
Template={Template}
doUseDefaultCss={false}
```

This ensures:
- Consistent branding across all pages
- BaseLayout with AsideLogoSection applied
- Material-UI theme integration
- No need to eject pages just for styling

### Context Extension Pattern
For custom pages with additional properties:
```typescript
// In KcContext.ts
const kcContextExtensionPerPage: KcContextExtensionPerPage = {
    "custom-page.ftl": {
        customProperty: string;
        anotherProperty?: boolean;
    }
};
```

### Import Optimization
Avoid barrel file imports that increase bundle size:
```typescript
// ✅ Good - specific import
import { createGetKcContext } from "keycloakify/login/kcContext/createGetKcContext";

// ❌ Bad - imports entire barrel file
import { createGetKcContext } from "keycloakify/login";
```

### Custom CSS Pattern
Disable default CSS for fully customized pages:
```typescript
// For ejected pages with custom styling
<YourPage
    doUseDefaultCss={false}
    // Keep PatternFly for non-redesigned pages
/>
```

### Form Validation Hook
For custom registration pages:
```typescript
// Use built-in validation hook
const { formValidationState, formValidationDispatch } = useFormValidationSlice();
```

### Adding New Page Pattern
To customize a new page:
```typescript
// 1. Eject the page using CLI
npx keycloakify eject-page
// Select the page (e.g., register.ftl)

// 2. Create the page component
// src/login/pages/Register.tsx
export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, doUseDefaultCss, classes } = props;
    // Custom implementation
}

// 3. Add lazy import in KcPage.tsx
const Register = lazy(() => import("./pages/Register"));

// 4. Add case in the switch statement
case "register.ftl":
    return (
        <Register
            {...{ kcContext, i18n, classes }}
            Template={Template}
            doUseDefaultCss={false}
        />
    );
```

### useInitialize Hook Pattern
Replace deprecated hooks in v11:
```typescript
// Pattern from Template.tsx
import { useInitialize } from "keycloakify/login/Template.useInitialize";

// Use instead of deprecated useInsertScriptTags/useInsertLinkTags
useInitialize({ kcContext, doUseDefaultCss });
```

## Anti-Patterns to Avoid

### ❌ Don't use kebab-case for TypeScript files
```typescript
// Wrong
user-profile.tsx
```

### ❌ Don't mix import styles
```typescript
// Wrong - mixing named and namespace imports
import React, * as ReactAll from "react";
```

### ❌ Don't use inline styles without theme
```typescript
// Wrong
style={{ color: "#000000" }}
// Correct
sx={{ color: theme.palette.text.primary }}
```

### ❌ Don't forget WebP fallbacks
```typescript
// Wrong
<img src={logo.webp} />
// Correct
<Picture webpSrc={logo.webp} fallbackSrc={logo.png} />
```