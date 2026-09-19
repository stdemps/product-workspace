---
name: a11y-audit
description: Deep accessibility audit against WCAG 2.2 AA — contrast ratios across all theme variants, ARIA patterns, keyboard navigation, focus management, target sizing, pointer input alternatives, authentication accessibility, semantic HTML, and screen reader compatibility. Use when the user wants to check accessibility, a11y compliance, screen reader support, keyboard navigation, contrast issues, target size, drag alternatives, or WCAG conformance for specific pages or components. Also use when the user mentions "accessibility", "a11y", "screen reader", "keyboard nav", "focus trap", "ARIA", "contrast ratio", or "target size".
user-invocable: true
argument-hint: "<page, component, or feature area to audit>"
---

Perform a deep, targeted accessibility audit of the specified page(s) or component(s). This is a report-only skill — document every issue with its exact location, but leave fixing to the user or other skills.

This skill audits against **WCAG 2.2 AA** (W3C Recommendation, October 2023). Note: SC 4.1.1 Parsing was removed in WCAG 2.2 as obsolete — modern HTML parsers handle malformed markup consistently, so it is no longer evaluated.

## Before You Start

Read the target files thoroughly. For each component, also read any design system primitives it uses (from `ds/` or `ui/`) since accessibility issues often originate in shared components and propagate everywhere they're used.

If the target is a page, trace its full component tree — the page file, every component it renders, and the ds/ui primitives those components use. A page-level audit that only reads the page file will miss most issues.

Also check sibling pages in the same feature area for accessibility patterns that should be shared but may be missing from the target. For example, if one settings page has a skip link and another doesn't, that's a gap worth flagging. Look at route siblings and similarly-structured pages to catch these inconsistencies.

## Audit Dimensions

Work through each dimension below. Skip dimensions that genuinely don't apply to the target (e.g., skip "Color & Contrast" for a component that renders no visible content), but err on the side of checking.

### 1. Semantic Structure (WCAG 1.3.1, 1.3.2, 2.4.1, 2.4.6, 4.1.2)

Check that the DOM structure communicates meaning, not just appearance:

- **Heading hierarchy**: h1 → h2 → h3 in order, no skipped levels, no headings used for styling alone. Every page needs exactly one h1.
- **Landmarks**: `<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>` used appropriately. Interactive side panels should have `role="region"` or `role="dialog"` with `aria-label`.
- **Lists**: Groups of related items use `<ul>`/`<ol>` with `<li>`, not bare divs.
- **Buttons vs links**: `<button>` for actions, `<a>` for navigation. Never `<div onClick>` or `<span onClick>` for interactive elements — native elements provide keyboard handling and screen reader semantics for free.
- **Tables**: Data grids use `<table>` with `<th>` and `scope`. Never layout tables.
- **Form labels**: Every `<input>`, `<select>`, `<textarea>` has a visible `<label>` or `aria-label`. Placeholder text is not a substitute for a label — it disappears on focus.

### 2. Color & Contrast (WCAG 1.4.1, 1.4.3, 1.4.6, 1.4.11)

**First, learn the project's color system.** Find where colors are defined — CSS custom properties in a theme file, a Tailwind config, a design-token JSON, or hardcoded values. Identify every theme variant the project supports (light/dark, brand themes). Contrast must pass in ALL variants, not just the default.

**How to check contrast:**

1. Find the component's text color and background color (usually token references like `var(--*)` or Tailwind semantic classes).
2. Trace each token through the theme file(s) to a concrete hex value — once per theme variant. Token systems are often layered (e.g. a reference palette → semantic aliases → component tokens); follow the chain all the way down, don't stop at an intermediate alias.
3. Compute the WCAG 2.2 contrast ratio using relative luminance. For `rgba()` or colors with opacity, blend against the actual background color before computing.
4. Apply opacity multipliers — if a component sets `opacity: 0.5` on text, blend the text color with its background at that opacity to get the effective color, then compute contrast.

**Thresholds:**
- Normal text (< 18px or < 14px bold): **4.5:1 minimum** (AA)
- Large text (≥ 18px or ≥ 14px bold): **3:1 minimum** (AA)
- UI components and graphical objects: **3:1 minimum** (AA, WCAG 1.4.11)

**Common patterns to check:**
- Badge variants: text color on tinted background (resolve the specific variant's `bg` and `text` tokens)
- Muted/subtle text tokens (e.g. `--*-muted`, `text-muted-foreground`) on surface and app backgrounds
- Placeholder text on input backgrounds
- Interactive/link text on surface backgrounds
- Disabled states: often use opacity or muted tokens — check these pass 3:1 minimum
- **Color as sole indicator** (1.4.1): information must not be conveyed by color alone. Check that status badges, form validation, alerts etc. also use text labels, icons, or patterns.

### 3. Keyboard Navigation & Focus (WCAG 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11)

Every interactive element must be operable via keyboard alone:

- **Tab order**: follows visual reading order (left→right, top→bottom). Check `tabIndex` values — only `0` and `-1` are acceptable. Positive tabIndex values break natural flow.
- **Focus visibility**: every focusable element has a visible focus indicator. Check for `outline: none` or `outline: 0` without a replacement style. The focus indicator must have at least 3:1 contrast against adjacent colors (WCAG 2.4.11).
- **Focus not obscured** (WCAG 2.4.11, new in 2.2): when an element receives keyboard focus, it must not be **entirely** hidden by author-created content such as sticky headers, sticky footers, cookie banners, chat widgets, or notification overlays. Partial obscuring is acceptable at AA level, but complete hiding is a failure. Check for:
  - Sticky headers/footers that overlap focused elements near page edges
  - Persistent banners or overlays that cover interactive content beneath them
  - Toast notifications that completely cover a focused element
  - Side panels or chat widgets that open over form fields without displacing content
  - **Fix pattern**: use `scroll-padding-top`/`scroll-padding-bottom` to ensure focused elements scroll clear of sticky elements, or make persistent overlays modal so they capture focus.
- **Keyboard activation**: buttons respond to Enter and Space, links respond to Enter. Custom interactive elements (divs/spans with click handlers) must implement `onKeyDown` for these keys — or better, be replaced with native `<button>` or `<a>`.
- **No keyboard traps** (2.1.2): focus must never get stuck. Check modals and panels for proper focus trap + escape key handling. Rule of thumb: overlay/modal surfaces should trap focus; inline/docked panels should not.
- **Focus management on state change**: when a panel opens, focus should move into it. When it closes, focus should return to the trigger element.
- **Skip links**: pages should have a "skip to main content" mechanism or use landmark regions that screen readers can jump between.

### 4. Pointer Input (WCAG 2.5.7, 2.5.8) — New in WCAG 2.2

These criteria ensure interactive elements work for users with motor impairments who may struggle with precise pointer control or dragging gestures.

#### Target Size (2.5.8)

Interactive targets for pointer input must be at least **24 × 24 CSS pixels**, with these exceptions:
- **Spacing**: an undersized target passes if a 24px-diameter circle centered on its bounding box does not intersect any other target's 24px circle
- **Equivalent**: the function is available through another control on the same page that meets the size requirement
- **Inline**: the target is a link within a sentence or constrained by surrounding text line-height
- **User agent control**: the browser determines the size and the author hasn't modified it
- **Essential**: the specific presentation is essential to the information being conveyed

**Common patterns to check:**
- Icon-only buttons in toolbars or action rows — check `min-width` and `min-height` are at least 24px, or have enough margin/padding that 24px circles don't overlap
- Close (X) buttons that are small and positioned near other interactive elements
- Compact controls: pagination, steppers, toggle groups, badge-like clickable elements
- Dropdown menu items — check vertical height meets 24px or has sufficient spacing
- Custom-styled elements where the visual target is smaller than the clickable area — verify the clickable area itself is 24px+

**How to measure:** check the element's `min-width`/`min-height`, `padding`, and `margin` in CSS. The target size includes padding but not margin — margin contributes to spacing between targets.

#### Dragging Movements (2.5.7)

Any functionality that uses a dragging movement must also be achievable by a **single pointer without dragging**, unless dragging is essential.

"Dragging" = pointer engages on a down-event and the element follows the pointer until an up-event.

**Common patterns to check:**
- Sortable/reorderable lists — must have "move up"/"move down" buttons or a menu alternative
- Kanban boards — cards must be movable via click-based UI (e.g., "move to" dropdown), not just drag-and-drop
- Sliders/range inputs — must be operable by clicking a position on the track, not just dragging the thumb
- Map or canvas panning — must have directional buttons or click-to-pan alternatives
- File upload areas — must have a file picker button, not just drag-and-drop
- Resizable panels — must have an alternative way to resize (e.g., preset size buttons or a size input)

**Important:** this is about pointer alternatives, not keyboard. Even if keyboard controls exist, a non-drag pointer alternative is still required.

### 5. ARIA Patterns (WCAG 4.1.2, 1.3.1)

ARIA supplements semantic HTML — it should not replace it. Check for correct usage:

- **Decorative elements**: Icons, avatars, and decorative images must have `aria-hidden="true"`. If the project has a shared `Icon` wrapper component, verify it sets `aria-hidden` — a miss there leaks to every icon in the app.
- **Icon-only buttons**: must have `aria-label` describing the action, not the icon name. "Close dialog" not "close" or "x".
- **Dynamic content**: regions that update (toast notifications, live status) should use `aria-live="polite"` or `role="status"`.
- **Expandable controls**: collapsible sections need `aria-expanded` on the trigger, and `aria-controls` pointing to the panel ID.
- **Selected state**: in lists where items can be selected, the selected item should have `aria-selected="true"` or `aria-current="true"`.
- **Dialogs**: must have `role="dialog"` and `aria-label` or `aria-labelledby`. Check the project's shared modal/panel primitives provide these — if the primitive misses it, every dialog in the app fails at once.
- **Tab patterns**: tab UIs should follow the WAI-ARIA tabs pattern — `role="tablist"`, `role="tab"`, `role="tabpanel"`, with `aria-selected` on the active tab.
- **No redundant ARIA**: don't add `role="button"` to a `<button>` or `role="link"` to an `<a>` — the native semantics already communicate this.

### 6. Screen Reader Experience (WCAG 1.1.1, 2.4.4, 2.4.6)

Think about what a screen reader user actually *hears* when navigating:

- **Link and button text**: must make sense out of context. "Click here", "Read more", "Learn more" are insufficient — the user hears a list of links and needs to know where each one goes.
- **Image alt text**: informative images need descriptive alt text. Decorative images need `alt=""` or `aria-hidden="true"`.
- **Reading order**: the DOM order should match the visual order. CSS reordering (flexbox `order`, grid placement) can create a mismatch.
- **Grouped content**: related badges, stats, or metadata clusters should be wrapped with `role="group"` and `aria-label` to provide context. A screen reader encountering "146 runs 9 in progress 132 complete" without grouping has no idea these are workflow statistics.
- **Hidden content**: content that is visually hidden but should be announced needs `sr-only` class (or equivalent). Content that is visible but shouldn't be announced needs `aria-hidden="true"`.
- **Announcements**: important state changes (save success, validation errors, panel open/close) should be announced. Check for `aria-live` regions or toast notifications with proper ARIA.

### 7. Forms & Authentication (WCAG 3.3.7, 3.3.8) — New in WCAG 2.2

#### Redundant Entry (3.3.7 — Level A)

Information the user has already entered within the same process must be auto-populated or available for selection when requested again, not re-entered. Exceptions: re-entry is essential, needed for security, or prior information is no longer valid.

**Common patterns to check:**
- Multi-step forms that ask for the same information in different steps without pre-filling
- Forms that clear all data when a validation error occurs, forcing complete re-entry
- Checkout-style flows where address, name, or other data entered early isn't carried forward
- Search fields that don't preserve the previous query when returning from results

**How to pass:** pre-populate previously entered data, provide "same as above" checkboxes, preserve form data across validation errors.

**Important:** browser autocomplete alone does NOT satisfy this criterion — the application itself must handle it.

#### Accessible Authentication (3.3.8 — Level AA)

No step in an authentication process may rely on a **cognitive function test** unless an alternative exists or a mechanism assists completion.

"Cognitive function test" includes: remembering a password without assistance, transcribing a code, solving a puzzle, performing calculations, remembering specific characters from a password.

**Common failure patterns:**
- Blocking paste in password fields (`onpaste="return false"` or similar JS prevention)
- Blocking browser autofill on login forms (`autocomplete="off"` on password fields)
- Requiring manual transcription of OTP codes into separate single-character inputs that don't support pasting the full code
- "Enter the 3rd and 7th characters of your password" patterns
- CAPTCHA puzzles with no alternative authentication path

**How to pass:**
- Use standard `<input type="password">` with `autocomplete="current-password"` so password managers work
- Use `<input type="email">` with `autocomplete="username"` for email/username fields
- Never block paste or autofill on authentication fields
- For OTP fields, use a single input with `autocomplete="one-time-code"` that accepts paste
- Offer WebAuthn/passkeys, biometrics, OAuth, or magic link alternatives
- If using CAPTCHA, provide an alternative non-cognitive path

### 8. Consistent Help & Predictability (WCAG 3.2.6) — New in WCAG 2.2

#### Consistent Help (3.2.6 — Level A)

If help mechanisms (human contact details, contact forms, self-help pages, chatbots) appear on multiple pages, they must appear in the **same relative order** to other page content across all pages. This does NOT require you to provide help — only that help, if present, is consistently positioned.

**What to check:**
- Help links, support buttons, or contact info that appear in headers/footers/sidebars — verify they appear in the same position on every page
- The order of help-related items (FAQ, Contact, Chat) should not vary between pages
- Chatbot triggers should be in the same screen position throughout the application

### 9. Motion & Animation (WCAG 2.3.1, 2.3.3)

- **Reduced motion**: all animations should respect `prefers-reduced-motion`. Check that motion/react (Framer Motion) animations have reduced-motion variants or are wrapped in a media query check.
- **No flashing**: nothing should flash more than 3 times per second.
- **Auto-playing content**: any content that auto-advances (carousels, auto-scroll) must have pause/stop controls.

## Report Format

### Summary

| Category | Issues | Critical | Major | Minor |
|----------|--------|----------|-------|-------|
| Semantic Structure | ? | ? | ? | ? |
| Color & Contrast | ? | ? | ? | ? |
| Keyboard Navigation & Focus | ? | ? | ? | ? |
| Pointer Input | ? | ? | ? | ? |
| ARIA Patterns | ? | ? | ? | ? |
| Screen Reader | ? | ? | ? | ? |
| Forms & Authentication | ? | ? | ? | ? |
| Consistent Help | ? | ? | ? | ? |
| Motion & Animation | ? | ? | ? | ? |
| **Total** | **?** | **?** | **?** | **?** |

**WCAG 2.2 AA conformance**: Pass / Partial / Fail

### Issues

For each issue, document:

```
**[CRITICAL|MAJOR|MINOR] Issue title**
- WCAG: [success criterion number and name]
- Location: [file path:line number]
- Element: [the specific element or pattern]
- Impact: [who is affected and how — be specific about which assistive technology or user group]
- Current: [what it does now]
- Expected: [what it should do]
```

**Severity definitions:**
- **CRITICAL**: Blocks access entirely for a group of users. Missing keyboard access to core functionality, zero-contrast text, keyboard traps, no pointer alternative for drag-only interactions. WCAG Level A failures.
- **MAJOR**: Significant difficulty but workaround exists. Poor contrast (fails AA but above 3:1), missing labels on secondary controls, inconsistent focus management, undersized targets without spacing compensation, focus obscured by sticky elements. WCAG Level AA failures.
- **MINOR**: Suboptimal but functional. Missing `aria-expanded` on a collapsible, heading level skip, focus ring style could be stronger. Level AAA concerns or best-practice gaps.

### Positive Findings

Note what's working well — patterns the codebase gets right that should be maintained. This helps the user understand what NOT to break when fixing issues.

### Recommended Fixes

Group by priority. For each fix, note the estimated scope (single component, design system primitive, app-wide):

1. **[Scope: ds/Icon]** Add aria-hidden to Icon — fixes decorative icon leaking to screen readers across the entire app
2. **[Scope: SettingsPage]** Replace div-buttons with native button elements — restores keyboard semantics
3. ...

Do not apply fixes. The user will decide which to tackle and in what order.
