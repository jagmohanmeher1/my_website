# Robotics Portfolio Website: Stack + Structure Blueprint

## 1. Your Goal (What we’re building now)
You want a simple, professional portfolio for a robotics engineer with:
1. Material Design–style UI (clean, modern, consistent components)
2. Strong interactivity so visitors “feel” your work (without making the page heavy)
3. A structure that can grow later into:
   - Blogs
   - Teaching lessons (courses/tutorials)

## 2. Recommended Approach (Key decision)
Rebuild from the current static HTML/CSS/JS into a modern React/Next.js app using Material UI components, while keeping your current “engineering vibe” interactive ideas:
- Particle/canvas hero background
- 3D robot (lightweight, optional fallback)
- Animated skill/progress cards
- Interactive project cards

Rationale:
- Blogs/lessons fit naturally into Next.js routing + MDX content.
- Material UI (MUI) gives you “professional UI” out of the box: theming, spacing, components, accessibility patterns.
- We can keep interactions from your current site (canvas + scroll animations) with better performance controls.

## 3. Non-Goals (for the first iteration)
1. No CMS integration yet (we’ll store content in repo files first)
2. No authentication/paywalls
3. No complex multi-tenant admin panels

## 4. UI Principles (Material-style, robotics-themed)
### Design language
- Dark theme by default (matches your current brand + robotics vibe)
- Primary accent: cyan/blue (technical feel)
- Secondary accent: violet/purple (innovation feel)
- Typography: Material defaults (Roboto) for professional consistency

### Interaction principles
- Use motion for meaning (hover, focus, scroll-reveal), not constant animation
- Respect `prefers-reduced-motion`
- Ensure keyboard and screen-reader support for every interactive element

## 5. Information Architecture (Pages)
For now (simple portfolio):
1. `Home` (`/`)
   - Hero with interactive background
   - Quick “what I do” highlights
   - Featured projects teaser
   - Skills summary
   - Contact CTA
2. `About` (`/about`)
   - Engineering story + values
   - Robotics journey timeline (interactive)
   - Stats (projects, years, robots built) with subtle animation
3. `Projects` (`/projects`)
   - Project grid + filters (basic)
   - Project detail pages (`/projects/[slug]`) for deeper content
4. `Skills` (can be a section or dedicated page) (`/skills`)
   - Skill categories + proficiency bars
   - “Toolbox” style cards (ROS, control, vision, embedded, etc.)
5. `Contact` (`/contact`)
   - Material form (validation + user feedback)
   - Social links + quick contact details

Later (when you add content):
6. `Blog` (`/blog`)
   - List (`/blog`)
   - Post page (`/blog/[slug]`)
7. `Lessons` (`/lessons`)
   - List of lessons/courses
   - Lesson detail (`/lessons/[slug]`)

## 6. Interaction & “Feel” (What will be interactive)
These are the interactive elements we’ll design as components from day one:
1. Hero background
   - Canvas particle network effect (lightweight)
   - Optional reduced-motion mode (turn off connections or animation)
2. Robot visual
   - Lightweight “3D-like” robot using CSS transforms first
   - Upgrade option: `three.js`/`react-three-fiber` if you want richer interaction
   - Pointer interaction: subtle rotate/parallax, never disorienting
3. Scroll reveal
   - Use intersection observer / motion library for fade/slide-in
4. Skill proficiency cards
   - Progress bars animate when visible
5. Projects
   - Cards with hover elevation + quick stats
   - Project detail page with gallery area + expandable “tech breakdown”
6. Timeline (About)
   - Clickable steps (expand/collapse) or scroll-linked reveal

## 7. Data Model (content types we’ll support)
Start with simple JSON/TS objects and/or MDX frontmatter.

### Projects
Fields:
- `slug`
- `title`
- `summary`
- `description` (markdown/MDX or structured sections)
- `tech` (array of tags)
- `highlights` (array of bullets)
- `links` (repo/live/other)
- `media` (optional: image URLs)

### Skills
Fields:
- `category`
- `skills[]`: `{ name, level, description }`

### Blog posts (later)
MDX frontmatter:
- `title`
- `date`
- `summary`
- `tags[]`
- `readingTime`

### Lessons (later)
MDX or structured content:
- `title`
- `level` (beginner/intermediate/advanced)
- `duration`
- `topics[]`
- `content` (MDX)

## 8. Recommended Tech Stack
### Core framework
- `Next.js` (App Router)
- `TypeScript`

### UI system (Material Design)
- `MUI` (Material UI / MUI) with a custom theme (dark mode)
- `@mui/icons-material` for professional icons

### Motion/animations
- `Framer Motion` for scroll/hover transitions (keeps animation predictable)

### 3D (optional)
- Start with CSS 3D for the robot
- Optionally move to `react-three-fiber` later if desired

### Content
- MDX for `blog` and `lessons`
- Content in-repo first (files under `/content/...`)

### Hosting
- Recommendation for simplest publishing later: Vercel
- If you must use GitHub Pages, we can still support a static build, but we must keep server features minimal

## 9. Proposed Repo / Folder Structure
Assuming the app lives under `src/` once rebuilt:

### App routes
- `src/app/layout.tsx` (global layout + MUI theme provider)
- `src/app/page.tsx` (Home)
- `src/app/about/page.tsx`
- `src/app/projects/page.tsx` (projects list)
- `src/app/projects/[slug]/page.tsx` (project detail)
- `src/app/skills/page.tsx` (or `src/components/SkillsSection.tsx` in Home/About)
- `src/app/contact/page.tsx`

### Blog/lessons later
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/lessons/page.tsx`
- `src/app/lessons/[slug]/page.tsx`

### Components
- `src/components/layout/TopNav.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/hero/ParticleBackground.tsx`
- `src/components/hero/RobotVisual.tsx`
- `src/components/cards/SkillCard.tsx`
- `src/components/cards/ProjectCard.tsx`
- `src/components/timeline/Timeline.tsx`
- `src/components/forms/ContactForm.tsx`

### Content reading
- `src/lib/content/projects.ts`
- `src/lib/content/mdx.ts` (shared MDX utilities)

### Content
- `content/projects/*.mdx` or `content/projects/*.json`
- `content/blog/*.mdx`
- `content/lessons/*.mdx`

### Styling/theme
- `src/theme/theme.ts`
- `src/theme/components.ts` (optional: MUI component overrides)
- `src/app/globals.css`

## 10. Accessibility + Performance Checklist (we will follow)
- Color contrast for dark background
- Visible focus states (`:focus-visible`)
- All buttons/links are real `<button>`/`<a>` elements
- Keyboard navigation for nav menu and expandable sections
- Respect `prefers-reduced-motion` and turn off heavy animation
- Lazy-load non-critical media (especially 3D)

## 11. Implementation Plan (phases)
Phase A: Foundation (no content changes yet)
1. Install Next.js + MUI + TypeScript
2. Set up MUI theme + layout (nav/footer)
3. Add routing for Home/About/Projects/Skills/Contact

Phase B: Portfolio UI
1. Implement hero + particle background + robot visual
2. Implement skills + project cards + timeline
3. Implement Contact form with proper UI feedback

Phase C: Content model
1. Add project data and connect list/detail pages
2. Make Projects page functional (filtering or tag selection)

Phase D: Blogs/Lessons
1. Add MDX pipeline
2. Add blog/lesson listing and post detail pages

## 12. Open Questions (please answer after you review)
1. Do you want the site to be:
   - `Single-page scroll` (sections on one page), or
   - `Multi-page` (Home/About/Projects separate pages)?
2. For the robot:
   - Prefer `CSS-only` (lighter), or
   - Are you okay with `three.js` later (heavier but richer)?
3. Do you have:
   - Project images already, or
   - Should we start with placeholders and replace later?
4. Where do you plan to host:
   - Vercel, GitHub Pages, or something else?

