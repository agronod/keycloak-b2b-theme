# Common Development Tasks

This document provides step-by-step guides for common development tasks in the Keycloak theme project.

## Keycloakify CLI Commands

### Adding Storybook Stories
```bash
npx keycloakify add-story
```
This command automatically generates Storybook stories for your Keycloak pages.

### Initializing Theme Types
```bash
# Initialize account theme
npx keycloakify initialize-account-theme

# Initialize email theme  
npx keycloakify initialize-email-theme
```

### Ejecting Default Pages
To customize a default Keycloak page:
```bash
npx keycloakify eject-page
```
Then select the page you want to customize from the list.

### Available Pages to Customize

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

### When to Eject vs Use Default

**Use DefaultPage (no ejection needed) when:**
- You only need to apply consistent branding
- The form structure is acceptable as-is
- You want Material-UI styling applied automatically
- Standard Keycloak functionality is sufficient

**Eject the page when you need to:**
- Change form fields or structure
- Add custom validation logic
- Implement complex UI interactions
- Remove or reorder form elements
- Add custom components or features

## How to Add New Features

### Adding a New Login Page

1. **Eject the page using Keycloakify CLI**
   ```bash
   npx keycloakify eject-page
   # Select the page you want to customize (e.g., register.ftl)
   ```

2. **Create the page component**
   ```bash
   touch src/login/pages/YourNewPage.tsx
   ```

3. **Implement the page following the standard pattern**
   ```typescript
   import type { PageProps } from "keycloakify/login/pages/PageProps";
   import type { KcContext } from "../KcContext";
   import type { I18n } from "../i18n";

   export default function YourNewPage(props: PageProps<Extract<KcContext, { pageId: "your-page.ftl" }>, I18n>) {
       const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
       const { msg, msgStr } = i18n;

       return (
           <Template
               kcContext={kcContext}
               i18n={i18n}
               doUseDefaultCss={doUseDefaultCss}
               classes={classes}
               headerNode={msg("yourPageTitle")}
           >
               {/* Your page content */}
           </Template>
       );
   }
   ```

4. **Add lazy import in KcPage.tsx**
   ```typescript
   const YourNewPage = lazy(() => import("./pages/YourNewPage"));
   ```

5. **Add the page to the router in KcPage.tsx**
   ```typescript
   case "your-page.ftl":
       return (
           <YourNewPage
               {...{ kcContext, i18n, classes }}
               Template={Template}
               doUseDefaultCss={false}
           />
       );
   ```

6. **Add translations in i18n.ts**
   ```typescript
   .withCustomTranslations({
       en: {
           yourPageTitle: "Your Page Title",
           // Other translations
       }
   })
   ```

7. **Test the page**
   ```bash
   yarn dev
   ```

### Important Note: Template Pattern
Remember that all pages automatically receive your custom styling through the Template component. This includes:
- BaseLayout with AsideLogoSection
- Agronod branding and colors
- Material-UI theme
- Responsive layouts

You don't need to eject pages just for styling - the Template handles that automatically!

### Adding a New Reusable Component

1. **Create component directory**
   ```bash
   mkdir src/components/YourComponent
   touch src/components/YourComponent/YourComponent.tsx
   touch src/components/YourComponent/index.ts
   ```

2. **Implement the component**
   ```typescript
   // YourComponent.tsx
   import { Box } from "@mui/material";

   type YourComponentProps = {
       prop1: string;
       prop2?: number;
   };

   const YourComponent = ({ prop1, prop2 = 0 }: YourComponentProps) => {
       return (
           <Box>
               {/* Component implementation */}
           </Box>
       );
   };

   export default YourComponent;
   ```

3. **Create the index export**
   ```typescript
   // index.ts
   import YourComponent from "./YourComponent";
   export { YourComponent };
   ```

4. **Optional: Add Storybook story**
   ```bash
   touch src/components/YourComponent/YourComponent.stories.tsx
   ```

## How to Modify Existing Components

### Updating Component Styling

1. **Locate the component** (e.g., `src/components/Logo.tsx`)

2. **Modify using Material-UI sx prop or style**
   ```typescript
   // For responsive changes
   sx={(theme) => ({
       width: size === "small" ? 108 : 148,
       [theme.breakpoints.down("sm")]: {
           width: 80
       }
   })}
   ```

3. **Test across breakpoints**
   - Open dev tools
   - Toggle device toolbar
   - Check mobile, tablet, and desktop views

### Adding New Props to Components

1. **Update the type definition**
   ```typescript
   type ComponentProps = {
       existingProp: string;
       newProp?: boolean; // Add new optional prop
   };
   ```

2. **Add prop to component signature with default**
   ```typescript
   const Component = ({ existingProp, newProp = false }: ComponentProps) => {
   ```

3. **Implement the prop logic**
   ```typescript
   {newProp && <SomeConditionalContent />}
   ```

4. **Update all component usages** (TypeScript will help identify these)

## How to Debug and Troubleshoot

### Development Mode Debugging

1. **Start dev server with source maps**
   ```bash
   yarn dev
   ```

2. **Enable React Developer Tools**
   - Install browser extension
   - Inspect component props and state
   - Check Material-UI theme values

3. **Use browser console for Keycloak context**
   ```javascript
   // In browser console
   console.log(window.kcContext);
   ```

### Common Issues and Solutions

#### Images Not Loading
- Check import statements match file names exactly
- Ensure both WebP and PNG versions exist
- Verify Picture component usage

#### Styling Not Applied
- Check theme provider is wrapping component
- Verify sx prop syntax
- Use `!important` sparingly when overriding Keycloak styles

#### Form Submission Issues
- Ensure form action points to `url.loginAction`
- Check input name attributes (username vs email)
- Verify form submission isn't prevented without handling

### Keycloakify-Specific Debugging

#### Theme Not Appearing in Keycloak
1. Verify JAR was built successfully:
   ```bash
   ls -la dist_keycloak/
   ```

2. Check Keycloak logs for deployment errors:
   ```bash
   tail -f /path/to/keycloak/standalone/log/server.log
   ```

3. Ensure JAR is in correct directory:
   - Standalone: `deployments/` folder
   - Docker: Volume mounted correctly

#### Version Compatibility Issues
- Keycloakify 26+ required for Keycloak 26
- Check package.json for Keycloakify version
- Rebuild theme after upgrading:
  ```bash
  yarn upgrade keycloakify@latest
  yarn build-keycloak-theme
  ```

#### Missing Context Properties
- Check KcContext type definitions
- Verify property exists in Keycloak version
- Use optional chaining for safety:
  ```typescript
  kcContext.customProperty?.value
  ```

#### Bundle Size Issues
- Run bundle analyzer:
  ```bash
  yarn build --analyze
  ```
- Check for large dependencies
- Implement lazy loading for pages
- Use dynamic imports for heavy components

## Testing Procedures and Commands

### Local Development Testing

1. **Run development server**
   ```bash
   yarn dev
   ```

2. **Test with mock Keycloak context**
   - Uncomment test block in main.tsx
   - Set specific page and context values
   - Refresh to see changes

### Storybook Component Testing

1. **Start Storybook**
   ```bash
   yarn storybook
   ```

2. **Create stories for components**
   ```typescript
   export default {
       title: 'Components/YourComponent',
       component: YourComponent,
   };

   export const Default = {
       args: {
           prop1: "value"
       }
   };
   ```

### Build Testing

1. **Build the theme**
   ```bash
   yarn build-keycloak-theme
   ```

2. **Check output**
   ```bash
   ls -la dist_keycloak/
   ```

3. **Verify JAR contents**
   ```bash
   jar tf dist_keycloak/keycloak-lantbrukare-theme-*.jar | head -20
   ```

## PR Checklist and Review Process

### Before Creating a PR

1. **Format code**
   ```bash
   yarn format
   ```

2. **Check TypeScript compilation**
   ```bash
   yarn build
   ```

3. **Test theme build**
   ```bash
   yarn build-keycloak-theme
   ```

4. **Review changes**
   ```bash
   git diff
   git status
   ```

### PR Description Template

```markdown
## Summary
- Brief description of changes
- Related issue/ticket number

## Changes Made
- [ ] Added/modified component X
- [ ] Updated styling for Y
- [ ] Added translations for Z

## Testing
- [ ] Tested locally with yarn dev
- [ ] Verified responsive design
- [ ] Checked theme builds successfully
- [ ] Tested in Storybook (if applicable)

## Screenshots
[Add screenshots for UI changes]
```

### Review Considerations

1. **Code Quality**
   - Follows established patterns
   - TypeScript types are properly defined
   - No console.log statements left

2. **UI/UX**
   - Responsive design works
   - Maintains Agronod brand consistency
   - Accessibility considerations

3. **Performance**
   - Images use WebP with fallback
   - No unnecessary re-renders
   - Bundle size impact is reasonable

## Deployment Process

### Building for Production

1. **Update version in package.json**
   ```json
   "version": "0.1.0"
   ```

2. **Build theme JARs**
   ```bash
   yarn build-keycloak-theme
   ```

3. **Verify build outputs**
   - Check dist_keycloak/ for JAR files
   - Confirm multiple versions if needed

### Keycloak Deployment

1. **Copy JAR to Keycloak**
   ```bash
   cp dist_keycloak/keycloak-lantbrukare-theme-*.jar /path/to/keycloak/deployments/
   ```

2. **Restart Keycloak or wait for hot deployment**

3. **Apply theme in admin console**
   - Navigate to Realm Settings → Themes
   - Select the Lantbrukare theme
   - Save changes

## CI/CD Pipeline

### GitHub Actions Workflow

The project uses GitHub Actions for continuous integration and deployment:

1. **Trigger Events**
   - Push to main branch
   - Pull requests to main
   - Manual workflow dispatch
   - Ignores changes to markdown files

2. **Build Process**
   ```yaml
   # From .github/workflows/ci.yaml:22-24
   - run: |
       yarn install
       yarn run build-keycloak-theme
   ```

3. **Artifact Generation**
   - Builds JAR files for different Keycloak versions
   - Uploads artifacts for download
   - Creates GitHub releases automatically

4. **Release Creation**
   - Automatic tagging based on commits
   - JAR files attached to releases
   - Changelog generation
   - Dry run for pull requests

### Setting Up CI/CD

1. **Enable GitHub Actions**
   - Go to Settings → Actions → Workflow permissions
   - Select "Read and write permissions"

2. **Required Secrets**
   - `GITHUB_TOKEN` (automatically provided)
   - Additional tokens if using private npm packages

3. **Version Bumping**
   - Update version in package.json
   - Push to main branch
   - CI automatically creates tagged release