# Cybercraft Full-Site Redesign Design

Date: 2026-06-01

## Goal

Rebuild the current Cybercraft website from scratch as a modern Next.js site while preserving the existing Cybercraft content, logos, vendor/partner assets, navigation structure, contact information, and three-language experience.

The redesign should use the Sadewa Framer template as the visual and motion reference: clean white and soft-gray editorial surfaces, oversized confident typography, compact boxed navigation, black/charcoal text, Cybercraft green accent actions, animated arrow buttons, scroll reveals, hover states, and a polished Framer-like feel. The site must not reuse Sadewa's brand, copy, logos, or business claims.

## Technology

Use the latest stable Next.js version available at approval time: Next.js 16.2.6 with the App Router and React 19. Build the site as a static-first company website with reusable React components and local content files.

Use TypeScript, Tailwind CSS, and a small component system for:

- Layout shell and navigation
- Language switcher
- Hero sections
- Content sections
- Logo grids and partner/vendor displays
- Service cards and service detail pages
- Process/approach sections
- Contact section and visual-only form
- Footer
- Motion wrappers and transitions

## Source Content Scope

Mirror the public Cybercraft website at `https://cybercraft.az/` across English, Azerbaijani, and Russian.

The current English page inventory discovered from WordPress includes:

- Home
- Vendors
- Partners
- Product & Solutions
- Contact Us
- IT Hardware and Software Solutions for Your Business
- IT Sales & Solutions by Cybercraft
- Advanced Cybersecurity Services
- Smart CCTV Solutions for Modern Security
- Strategic IT Consulting
- Innovation & Emerging Tech
- IT Equipment & Smart Solutions
- Virtualization & Server Consolidation
- Collaboration Tools & Unified Communications
- IT Support & Help Desk Services
- IT Consulting & Digital Transformation
- Network Solutions & Optimization
- IT Infrastructure Design & Deployment
- Managed IT Services
- Cyber Security Solutions
- Cloud Solutions

The rebuild should crawl or extract the corresponding Azerbaijani and Russian public pages via the current site's language URLs and keep each language's copy in separate content files. Exclude WordPress utility, staging, test, and coming-soon pages from the rebuilt public navigation and sitemap; this specifically excludes `testing` and `soon`.

## Routing And Languages

Use clean localized routes:

- English: `/`
- Azerbaijani: `/az`
- Russian: `/ru`
- English detail pages: `/cloud-solutions`, `/managed-it-services`, and so on
- Azerbaijani detail pages: `/az/<localized-or-current-slug>`
- Russian detail pages: `/ru/<localized-or-current-slug>`

Each language must include the same page set and a visible language switcher. The language switcher should preserve the current page when an equivalent translation exists and fall back to that language's homepage if no equivalent is available.

## Information Architecture

Keep Cybercraft's current top-level navigation:

- Vendors
- Partners
- Product & Solutions
- Contact Us
- Language switcher

For Product & Solutions, replace the existing heavy WordPress mega-menu with a clean animated menu or panel that exposes the service pages. The menu should feel close to the Sadewa reference: compact, high-contrast, fast, and deliberate, with clear hover/focus states.

## Visual Direction

The redesign should translate Sadewa's style into Cybercraft's identity:

- Use Cybercraft's logo and green brand accent.
- Use a white or very light-gray page background, not the current dark network-photo hero as the default site mood.
- Use large black headings, generous spacing, and editorial section breaks.
- Use Cybercraft green for primary accents, button arrow squares, active language states, and selected UI details.
- Use charcoal, gray, and restrained borders for structure.
- Use Cybercraft's existing technology/cybersecurity imagery where it strengthens the page, but restyle it in clean frames and layouts.
- Use vendor and partner logos exactly from Cybercraft's current media where possible.
- Avoid generic cybersecurity stock clutter, excessive blue gradients, or repeating the current dark network background as the main design system.

The homepage should open with a strong first viewport inspired by Sadewa: Cybercraft logo/nav at the top, a large headline derived from current Cybercraft copy, a hero visual using Cybercraft imagery/assets, concise supporting text from the current site, and primary actions to Product & Solutions and Contact Us.

## Animation And Interaction

Animations are a requirement, not optional polish. Match the Sadewa reference's quality and timing in a Next.js implementation:

- Initial page load/entrance sequence that feels intentional but not slow.
- Header/nav entrance and sticky behavior.
- Hero text reveal with staggered timing.
- Hero visual entrance with subtle scale, opacity, and position motion.
- Button hover states with arrow movement and accent-square treatment.
- Scroll-triggered section reveals.
- Logo grid hover states.
- Service card hover states.
- Animated Product & Solutions menu/panel.
- Smooth route transitions for internal navigation using the selected motion system, with reduced-motion fallbacks.
- Respect `prefers-reduced-motion` by reducing or disabling nonessential motion.

Use Framer Motion for production-grade animation quality and consistent reduced-motion handling.

## Pages

### Home

Keep all current homepage content:

- Main cybersecurity headline
- About Us copy
- Vendors description and vendor logos
- Product/services sections currently present
- Contact CTA, address, email, phone
- Map/location section with the current Bayil Plaza map embed and a fallback external map link

Redesign the homepage into a Sadewa-inspired sequence with a strong hero, logo/vendor trust area, About section, product/services overview, partner/vendor proof, and contact CTA.

### Vendors

Preserve current vendor page copy and all vendor logos. Use a clean logo-gallery system with responsive rows, subtle borders, hover reveal, and section labels. Keep the page useful for scanning rather than making it a decorative card wall.

### Partners

Preserve current partner page content and partner logos. Use the same visual system as Vendors but allow partner descriptions or relationship details where the current content provides them.

### Product & Solutions

Preserve current product/solution overview content and expose every current service detail page. Use a structured, animated service index with categories where the current content supports them. Each service card should link to its detail page.

### Service Detail Pages

Each current service page should be rebuilt as a focused detail page:

- Strong service hero using the current page title and copy.
- Clear body sections using the current text.
- Related services or back-to-services navigation.
- Contact CTA.

Do not invent new services or claims. If a page's current content is short or repetitive, preserve it but improve layout and readability.

### Contact Us

Preserve address, email, phone, map/location, and contact copy. Include a redesigned contact form as a view-only UI for this phase. The form should include the same visible fields as the current form:

- First name
- Last name
- Email
- Telephone
- Submit button

The form should not send submissions yet. It should be structured so a submission handler can be added in the next phase.

## Assets

Copy assets from Cybercraft's current public media where allowed by the existing site:

- Main Cybercraft logo
- Mini/fav icon
- Vendor logos
- Partner logos
- Existing page imagery such as the About image
- Any current service images used on public pages

Store assets locally in the Next.js project so the site is not dependent on WordPress media URLs at runtime. Optimize raster assets through the Next.js image workflow and preserve exact logo proportions, transparency, and visual fidelity.

## Content Management

Use local structured content files, grouped by language. Content should be easy to edit without hunting through JSX. Recommended shape:

- `src/content/en`
- `src/content/az`
- `src/content/ru`
- Shared asset metadata where the same logo/image is used across languages

Page components should render from content objects rather than hard-coded long copy blocks scattered through the UI.

## Accessibility And SEO

Use semantic headings, landmarks, accessible navigation, keyboard-operable menus, visible focus states, and meaningful alt text where the source content provides it. Keep language attributes correct per locale. Generate metadata per page from the current page title and content.

## Responsive Behavior

The site must work cleanly on desktop, tablet, and mobile:

- No overlapping text or controls.
- Header collapses into a polished mobile menu.
- Logo grids remain readable.
- Large headings scale with fixed responsive breakpoints, not viewport-width font scaling.
- Buttons and form fields remain usable on mobile.
- Animations should not cause layout jumps.

## Out Of Scope For This Phase

- Backend contact form submissions.
- CMS/editor integration.
- Payment, login, dashboards, or private admin tools.
- New copywriting beyond tiny connective labels needed for navigation and accessibility.
- Rebranding Cybercraft or altering official vendor/partner logos.

## Acceptance Criteria

- Next.js 16.2.6 App Router project builds successfully.
- The site includes the full current public Cybercraft page set in English, Azerbaijani, and Russian.
- Existing Cybercraft content and logos are preserved.
- The visual design clearly follows the Sadewa reference while using Cybercraft branding.
- Required animations and hover states are implemented and respect reduced-motion preferences.
- The contact form is visual-only and does not attempt to submit.
- Desktop and mobile layouts are verified in a browser.
- No Sadewa copy, brand assets, or logos appear in the final Cybercraft site.
