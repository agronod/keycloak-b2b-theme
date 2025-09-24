# Agent Context

<!-- 
This file provides consolidated context for AI agents working on this project.
-->

## AI Documentation Protocol

This protocol defines how AI agents must manage and evolve documentation within the ai-docs/ folder.

### 📁 Folder Overview

Every document in ai-docs/ has a clear purpose and update trigger. Agents must update files incrementally — appending or inserting into relevant sections, never replacing entire documents.

### 📜 Core Principles

1. **Scoped Updates Only**: Each document should be updated only with information relevant to its domain.
2. **Incremental Additions**: Documentation must evolve over time in small, relevant updates that reflect real project changes. Each addition should be scoped (e.g., a new module, design decision, or feature), dated if meaningful, and never overwrite unrelated content. Documents must remain continuously useful and current.
3. **Subsections by Document**: Each document in ai-docs/ must be described as a subsection in this file. Do not reference source files directly.
4. **Self-Awareness**: This protocol may be updated by agents as needs evolve, under strict guidelines (see Self-Revision).
5. **Plan** Any new plan or spec to update the codebase must start with updating relevant documentation in ai-docs/.

### 📘 Document Types & Rules

Each document in ai-docs/ must define its own update triggers. This section serves as a living registry of how each document should be maintained. AI agents must create a subsection below for every document added, keeping it in sync with the folder's content.

#### CONTEXT.md

- **Purpose**: Provide consolidated context for AI agents working on the project.
- **Trigger**: Whenever a new document is added to ai-docs/, or a previously undocumented pattern emerges.
- **Format**: This document itself serves as the protocol for managing ai-docs/ updates. It should be updated with new sections as needed, following the incremental update principle.

#### PATTERNS.md

- **Purpose**: Document code patterns, conventions, and style guidelines with concrete examples from the codebase.
- **Trigger**: When new coding patterns are introduced, when conventions change, or when anti-patterns are identified.
- **Format**: Pattern descriptions with real code examples including file:line references, formatting rules, and anti-patterns to avoid.
- **Recent Updates**: Added Keycloakify page routing patterns, Template wrapper pattern, and instructions for adding new pages.

#### ARCHITECTURE.md

- **Purpose**: Explain how the system components fit together, data flows, and integration points.
- **Trigger**: When new components are added, when system interactions change, or when deployment architecture evolves.
- **Format**: Component boundaries, key interfaces, data flow diagrams, and integration instructions.
- **Recent Updates**: Added comprehensive section on page routing system, complete list of available Keycloakify pages, and Template pattern benefits.

#### WORKFLOWS.md

- **Purpose**: Provide step-by-step guides for common development tasks and procedures.
- **Trigger**: When new workflows are established, when procedures change, or when common tasks need documentation.
- **Format**: Task-oriented guides with specific commands, code examples, and checklists.
- **Recent Updates**: Added complete list of available pages to customize, guidance on when to eject vs use DefaultPage, and Template pattern notes.

### 🔄 Self-Revision of the Protocol

Agents may propose a revision to this section only if:

- A new document is added to ai-docs/
- A previously undocumented pattern emerges

---

✅ AI agents must reference this protocol when updating or creating documents in ai-docs/. Future updates to this section must be scoped, appended, and appropriately dated.

---

## How to Use This Documentation

When starting work on this project:
1. Run `context-prime` to load relevant project context
2. Reference the ai-docs/ for contribution patterns
3. Follow the documented conventions to maintain consistency

The ai-docs/ folder contains guides for contributing to this project. Each document focuses on HOW to add or modify code correctly.

## Project Overview

### Project Type: Keycloak Theme
This is a custom Keycloak authentication theme project built for Agronod (Swedish agricultural technology company).

### Technology Stack
- **Framework**: Keycloakify v11 (React-based Keycloak theme framework)
- **UI Library**: React 18.2.0 with TypeScript
- **Component Library**: Material-UI v5 with @agronod/mui-components
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)
- **Development**: Storybook for component development

### Project Structure
- `src/` - Source code
  - `components/` - Reusable React components (AsideLogoSection, BaseLayout, Logo, Picture)
  - `login/` - Keycloak login theme implementation
  - `assets/` - Agronod branding images and backgrounds
- `dist_keycloak/` - Built JAR files for different Keycloak versions
- `.github/workflows/` - CI/CD pipeline configuration

### Development Commands
- `yarn dev` - Start development server
- `yarn build-keycloak-theme` - Build production JARs
- `yarn storybook` - Launch Storybook for component development
- `yarn format` - Format code with Prettier

### Key Conventions
- TypeScript strict mode enabled
- Emotion for component styling
- Material-UI components from Agronod's custom package
- WebP images with PNG fallbacks for performance
- Multi-version support (separate JARs for Keycloak 22-25 and others)

### Current Context
- Active development on `feat/v11` branch
- Recent work on responsive logo components and mobile layouts
- Agronod-specific branding integration

## Architecture Decisions

### Keycloakify Framework
The project uses Keycloakify v11 to create React-based Keycloak themes, enabling modern development practices while maintaining compatibility with Keycloak's theming system.

### Responsive Design
Components use Material-UI's breakpoint system for responsive layouts, with specific mobile and desktop variants for the AsideLogoSection.

### Image Optimization
WebP format is used with PNG fallbacks through a custom Picture component for optimal performance across browsers.