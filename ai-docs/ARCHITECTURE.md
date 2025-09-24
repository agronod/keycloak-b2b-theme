# How the System Fits Together

This document explains the architecture of the Keycloak Lantbrukare theme and how different components interact.

## Component Boundaries

### Directory Structure and Purpose

```
src/
├── assets/           # Brand images and backgrounds (WebP + PNG fallbacks)
├── components/       # Reusable UI components
│   ├── AsideLogoSection/  # Brand section with responsive logo display
│   ├── BaseLayout/        # Root layout wrapper with theme provider
│   ├── Logo.tsx           # Logo component with size variants
│   └── Picture.tsx        # WebP image component with fallback
├── login/            # Keycloak login theme implementation
│   ├── pages/        # Individual login flow pages
│   ├── KcContext.ts  # Keycloak context type definitions
│   ├── KcPage.tsx    # Page router for different login screens
│   ├── Template.tsx  # Base template for all login pages
│   └── i18n.ts       # Internationalization configuration
├── kc.gen.tsx        # Generated Keycloak app wrapper
└── main.tsx          # Application entry point
```

### Key Interfaces and Extension Points

#### 1. Page Component Interface
All login pages must implement this interface:
```typescript
// From src/login/pages/Login.tsx:8
PageProps<Extract<KcContext, { pageId: "page-name.ftl" }>, I18n>
```

#### 2. Theme Provider Integration
The BaseLayout component wraps all content with Agronod's theme:
```typescript
// From src/components/BaseLayout/BaseLayout.tsx:8
<ThemeProvider options={agronodTheme}>
```

#### 3. Template System
All pages use the Template component which provides:
- Consistent layout structure
- Message display handling
- Internationalization
- Theme application

## Data Flow and System Interactions

### 1. Application Bootstrap Flow
```
main.tsx
  └─> kc.gen.tsx (Keycloakify generated wrapper)
      └─> KcPage.tsx (Route to specific page)
          └─> Login.tsx (or other page component)
              └─> Template.tsx (Base layout)
                  └─> BaseLayout.tsx (Theme provider)
```

### 2. Form Submission Flow
Login forms follow this pattern:
1. User input captured in controlled components
2. Form submission prevented, data processed
3. Username field renamed if needed (email → username)
4. Native form submission to Keycloak

```typescript
// Pattern from src/login/pages/Login.tsx:24-35
const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
    setIsLoginButtonDisabled(true);
    const formElement = e.target as HTMLFormElement;
    formElement.querySelector("input[name='email']")?.setAttribute("name", "username");
    formElement.submit();
});
```

### 3. Internationalization Flow
```
i18n.ts (defines translations)
  └─> Template/Page component (uses i18n hook)
      └─> msg() or msgStr() functions render text
```

## Page Routing and Template System

### Keycloakify Page Router
The KcPage.tsx component acts as the central router for all authentication pages:

```typescript
// From src/login/KcPage.tsx:26-48
switch (kcContext.pageId) {
    case "login.ftl":
        return <Login {...props} />;
    default:
        return <DefaultPage {...props} />;
}
```

### Available Pages (pageId values)
Keycloakify supports customization of the following authentication pages:

**Core Authentication Pages:**
- `login.ftl` - Main username/password login
- `register.ftl` - New user registration
- `error.ftl` - Error display page
- `info.ftl` - Information/confirmation messages
- `terms.ftl` - Terms and conditions

**Password Management:**
- `login-reset-password.ftl` - Password reset request
- `login-update-password.ftl` - Password update/change
- `login-password.ftl` - Password-only entry

**Multi-factor Authentication:**
- `login-otp.ftl` - One-time password entry
- `login-otp-text.ftl` - OTP with text message
- `webauthn-authenticate.ftl` - WebAuthn/FIDO authentication
- `login-recovery-authn-code-config.ftl` - Recovery code configuration
- `login-recovery-authn-code-input.ftl` - Recovery code input

**Profile and Account Management:**
- `login-update-profile.ftl` - Profile update during login
- `login-verify-email.ftl` - Email verification
- `login-idp-link-confirm.ftl` - Identity provider link confirmation
- `login-idp-link-email.ftl` - IDP email link page

**Session Management:**
- `logout-confirm.ftl` - Logout confirmation
- `login-page-expired.ftl` - Session expiration notice
- `restart-login.ftl` - Login restart page

### Template Pattern Benefits

The Template component (src/login/Template.tsx) provides consistent styling across ALL pages:

1. **Automatic Branding**: Every page receives:
   - BaseLayout with AsideLogoSection
   - Agronod theme colors and typography
   - Responsive mobile/desktop layouts
   - Company logos and backgrounds

2. **Consistent UX**: All pages share:
   - Common header structure
   - Error/info message display
   - Loading states
   - Form styling

3. **Efficiency**: No need to eject pages just for styling:
   - DefaultPage + Template handles most styling needs
   - Only eject when changing form structure or logic
   - Template ensures brand consistency automatically

## How to Integrate New Features

### Adding a New Login Page

1. Create page component in `src/login/pages/YourPage.tsx`
2. Follow the standard props pattern:
```typescript
export default function YourPage(props: PageProps<Extract<KcContext, { pageId: "your-page.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    // Your implementation
}
```

3. Update KcPage.tsx to include your page in the router
4. Add any custom translations to i18n.ts

### Adding Reusable Components

1. Create component in `src/components/ComponentName/`
2. Include an index.ts for clean exports:
```typescript
import ComponentName from "./ComponentName";
export { ComponentName };
```

3. Follow the component pattern with typed props
4. Use Material-UI components from @agronod/mui-components

### Extending the Theme

1. Import components from @agronod/mui-components
2. Use theme object for all styling decisions
3. Apply responsive breakpoints using theme.breakpoints
4. Maintain consistency with existing Agronod design system

## Build System Integration

### Keycloakify Build Process
1. TypeScript compilation via Vite
2. Keycloakify processes React components into Keycloak themes
3. Generates separate JARs for different Keycloak versions:
   - One JAR for Keycloak 22-25
   - Another for other versions

### Asset Handling
- Images imported as modules (WebP + PNG pairs)
- Vite handles bundling and optimization
- Picture component ensures cross-browser compatibility

## Deployment Architecture

### JAR Structure
The build creates theme JARs containing:
- Compiled React components
- FreeMarker templates (.ftl files)
- Static assets
- Theme configuration

### Keycloak Integration
1. Deploy JAR to Keycloak's deployments folder
2. Theme appears in Keycloak admin console
3. Apply theme to realm or specific clients
4. React components render within Keycloak's auth flows

## Keycloakify Architecture Patterns

### Theme Generation Process
Keycloakify v11 generates separate JARs for different Keycloak versions:
- Compatible with Keycloak 11+ 
- Automatic version detection and JAR generation
- Themes built with older Keycloakify versions incompatible with Keycloak 26+

### Integration Approaches

#### 1. Collocation Pattern (Recommended for SPAs)
Install Keycloakify directly in your React/Vite/Webpack project:
- Easy reuse of application styles and components
- Shared dependencies and build process
- Best for single-page applications

#### 2. Monorepo Pattern
For frameworks like Next.js where collocation isn't feasible:
- Separate package for Keycloak theme
- Shared components through workspace dependencies
- Independent build processes

#### 3. Standalone Pattern
Fork the starter and develop as independent project:
- Complete isolation from main application
- Useful when no existing React codebase
- Simplest deployment model

### Performance Optimization

#### Bundle Size Management
- Use lazy loading for page components
- Avoid barrel file imports
- Tree-shaking enabled by default
- Separate chunks for each Keycloak page

#### CSS Loading Strategy
- Default CSS can be disabled per page
- PatternFly styles loaded conditionally
- Custom CSS imported directly in components
- Theme variants (light/dark) supported

## Environment Considerations

### Development Mode
- Vite dev server with hot reload
- Storybook for component development
- Mock Keycloak context for testing

### Production Mode
- Optimized builds with minification
- WebP images with PNG fallbacks
- Responsive design for mobile/desktop
- Multi-language support through i18n