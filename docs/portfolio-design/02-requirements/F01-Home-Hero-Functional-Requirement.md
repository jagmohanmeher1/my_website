---
title: Home Page - Hero (Particles + Robot + CTAs)
author: Jagmohan Meher
date: 2026-03-20
version: 0.1
uuid: 4d2f1b7c9a8e4f3d8c2b1a0e9d7c6b5a
---

# Functional Requirement Specification - F01 Home Hero

## 1. Feature Overview
The Home page must present a professional, Material-style hero section that immediately communicates your identity as a robotics engineer and gives visitors an interactive preview of your work.

Business motivation:
- Make the first impression technical and memorable (robotics vibe + motion).
- Lead visitors to “Projects” and “Contact” quickly.
- Keep animations smooth and accessible (including `prefers-reduced-motion`).

## 2. Requirement / User Story
- **As a** visitor (first-time user),
- **I want** a hero section with an interactive background and a responsive robot visual,
- **So that** I feel what it is like to work with you and understand what you do within seconds.

## 3. Acceptance Criteria
Write in Given-When-Then format. Each scenario must be verifiable as a functional test.

- **Scenario 1: Hero content is visible**
  - **Given** the Home page is loaded
  - **When** the page finishes rendering
  - **Then** the hero title, subtitle, and both primary CTAs are visible and readable

- **Scenario 2: CTA navigation works**
  - **Given** the visitor is on the Home page
  - **When** the visitor activates “View My Work”
  - **Then** the user navigates to `Projects` (route `/projects`) OR scrolls to the Projects section (if single-page mode is selected)

- **Scenario 3: CTA navigation works (contact)**
  - **Given** the visitor is on the Home page
  - **When** the visitor activates “Get In Touch”
  - **Then** the user navigates to `Contact` (route `/contact`) OR scrolls to the Contact section (if single-page mode is selected)

- **Scenario 4: Particle background renders**
  - **Given** the hero section is mounted in the browser
  - **When** the user views the Home page
  - **Then** a particle canvas is visible and animates (connections optional but should match the site style)

- **Scenario 5: Reduced motion respects user preferences**
  - **Given** the OS/browser setting `prefers-reduced-motion: reduce` is enabled
  - **When** the Home page loads
  - **Then** the particle animation is disabled or heavily reduced and the robot motion/tilt is minimized

- **Scenario 6: Robot interaction is subtle and safe**
  - **Given** the visitor uses a pointer device
  - **When** the pointer moves over the robot visual area
  - **Then** the robot tilts/parallaxes subtly within a bounded range and does not jump or flicker

- **Scenario 7: Keyboard accessibility for CTAs**
  - **Given** the visitor uses a keyboard
  - **When** the visitor tabs through interactive elements in the hero
  - **Then** focus indicators are visible and activation triggers the same behavior as mouse clicks

- **Scenario 8: Performance guardrails**
  - **Given** the Home page is open for at least 30 seconds
  - **When** the browser devtools performance/memory is observed
  - **Then** there is no continuous memory growth from the particle animation loop (cleanup occurs on unmount/navigation)

## 4. Test Scenarios / Examples

| ID  | Scenario | Given | When | Then | Priority |
|-----|----------|--------|-------|-------|----------|
| TC1 | Hero content is visible | Home page loads | wait for render | Title/subtitle/CTAs appear | High |
| TC2 | “Projects” CTA navigation | Home page | click “View My Work” | Navigate to `/projects` OR scroll to projects | High |
| TC3 | “Contact” CTA navigation | Home page | click “Get In Touch” | Navigate to `/contact` OR scroll to contact | High |
| TC4 | Particle canvas animates | JS enabled | view hero | Canvas present + animates | High |
| TC5 | Reduced motion mode | `prefers-reduced-motion: reduce` | Home page loads | Motion reduced/disabled | High |
| TC6 | Robot tilts on pointer | pointer device | move over robot | subtle bounded tilt/parallax | Medium |
| TC7 | Focus states | keyboard navigation | tab to CTAs | focus ring visible; Enter activates | High |
| TC8 | Animation cleanup | navigate away | return after unmount | no memory growth / no duplicate loops | Medium |

## 5. Implementation Notes
- Use `Next.js` (App Router) + `TypeScript`.
- Use `MUI` components for the hero layout and buttons, with a dark Material theme.
- Implement particle animation in a client component:
  - Create canvas in `useEffect`
  - Use `requestAnimationFrame`
  - On unmount, cancel the animation frame and remove listeners
- Reduced motion:
  - Gate animation updates using `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Robot visual:
  - Start with CSS transform + pointer events
  - Cap rotation/translation values for safety and user comfort
- Accessibility:
  - CTAs must be real `<Button>`/`<a>` elements
  - If the robot is decorative, mark it `aria-hidden`
  - Ensure color contrast meets WCAG AA for text

## 6. Additional Notes
- Decision needed: single-page scroll vs multi-page routing determines whether CTAs scroll to anchors or route to other pages.
- Placeholder robot/title/subtitle values should be replaced with your real copy before “done” status.

## Appendix: TDD Implementation Checklist
1. Write and refine this requirement doc so each scenario maps to a verifiable test.
2. Create failing tests for:
   - Navigation behavior
   - Reduced motion mode handling
   - Cleanup of animation loop on unmount (via E2E or unit checks)
3. Implement the smallest solution to satisfy TC1-TC7 first.
4. Ensure the Home page passes all scenarios.
5. Refactor for readability/performance only after tests are green.
6. Keep docs and versions in sync as implementation evolves.

