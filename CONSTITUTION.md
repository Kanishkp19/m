# mansi-portfolio Constitution

## Core Principles

### I. Code Quality
- **Clarity over Cleverness**: Code must be readable and self-documenting. Use descriptive naming for variables, functions, and components.
- **Component-Driven Development**: Maintain high modularity. Keep components focused, reusable, and isolated from side effects where possible.
- **Prop-Drilling Avoidance**: Use centralized state management (like the `usePortfolioData` hook) or Context API to manage shared data effectively.
- **Documentation**: Logic-heavy functions, hooks, and complex UI components must be documented with JSDoc to ensure maintainability.

### II. Testing Standards
- **Critical Logic Coverage**: Essential business logic, such as data merging algorithms (`deepMerge`) and storage handlers, must be covered by unit tests.
- **Component Validation**: UI components should be tested for correct rendering across different states (loading, empty, error, and success).
- **Integration Reliability**: Verify that the interaction between the frontend, IndexedDB, and JSON export remains stable after any schema changes.
- **Manual QA for Admin**: Ensure that all administrative operations (create, update, delete) are manually validated in the browser before deploying JSON configurations.

### III. User Experience Consistency
- **Premium Design System**: Adhere strictly to the established design language (teal/mint accents, Playfair Display typography, and soft shadows).
- **Fluid Responsiveness**: Every feature must be designed mobile-first and tested across all screen sizes (mobile, tablet, desktop).
- **Interactive Feedback**: Users must receive immediate visual feedback for all actions (e.g., loading spinners for uploads, "Saved ✓" indicators).
- **Accessibility (a11y)**: Ensure all interactive elements have proper labels and support keyboard navigation.

### IV. Performance Requirements
- **Optimized Assets**: All portfolio images and files must be compressed before being uploaded to Storage to minimize load times.
- **Strategic Loading**: Use React Suspense and `React.lazy` for heavy modules like the Admin Panel to keep the initial bundle size small.
- **Minimal Re-renders**: Optimize hooks and use `React.memo` where appropriate to avoid unnecessary component updates in data-heavy sections.
- **Bundle Efficiency**: Regularly audit dependencies to ensure no bloated libraries are added to the project.

## Quality Gates

- **Code Review**: Every PR must be reviewed for compliance with these principles.
- **Build Success**: Linting and build steps must pass before any deployment.
- **Mobile Check**: A visual audit on at least one physical mobile device is required for major UI updates.

## Governance
This constitution serves as the primary guideline for development. Any deviation must be justified in documentation. Amendments to these principles require a rationale and an updated versioning of this document.

**Version**: 1.0.0 | **Ratified**: 2026-05-13 | **Last Amended**: 2026-05-13
