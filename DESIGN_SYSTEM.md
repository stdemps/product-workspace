# Design System

> **Last updated:** <!-- update this date when you make changes -->
> Fill this in as your project's visual identity takes shape. AI agents and contributors will follow these rules.

---

## Design Philosophy

<!-- Describe the feel of your product in 1-2 sentences. What should it remind people of? -->

**Key principles:**
1. Content first — every element earns its place
2. Scannable — strong visual hierarchy, readable at a glance
3. Simple changes only — prefer editing existing components over new abstractions

---

## Colour System

### Design Tokens

All colours are CSS custom properties (HSL) defined in `app/globals.css`. **Never use hardcoded Tailwind colours (`text-red-500`, `bg-blue-200`) or hex values in components.** Always use semantic tokens.

| Token | Usage |
|---|---|
| `--primary` | Brand accent — <!-- describe your primary colour --> |
| `--destructive` | Destructive actions only |
| `--background` | Page background |
| `--foreground` | Primary text |
| `--card` | Card surface |
| `--muted` | Subdued backgrounds |
| `--muted-foreground` | Subdued text, secondary labels |
| `--border` | Borders (use `border-border/50` for subtlety) |
| `--accent` | Hover states, active elements |

### Colour Rules

- **Primary** — `variant="default"` buttons, active nav, focus rings, brand moments
- **Destructive** — `variant="destructive"` buttons inside confirmation dialogs only. Never on inline actions
- **Surfaces** — <!-- describe your surface palette (e.g. cool neutrals, warm tones) -->

---

## Typography

| Element | Font | Weight | Notes |
|---|---|---|---|
| Headings | <!-- e.g. Inter, Space Grotesk --> | <!-- e.g. 700 --> | <!-- e.g. tight tracking --> |
| Body text | <!-- e.g. Inter --> | 400 | All UI copy, labels, descriptions |

- Use `text-foreground` / `text-muted-foreground` for hierarchy — never hardcode `text-gray-*`

---

## Button System

### Variants

| Variant | Appearance | When to use |
|---|---|---|
| `default` | Solid primary | The single most important action on a surface |
| `outline` | Border + transparent background | Secondary actions alongside a primary |
| `ghost` | No border, no background | Tertiary / icon-only actions |

### Rules

- **One primary per surface** — each card, panel, or dialog has at most one `default` button
- **Primary on the right** — in any row of actions, the primary action is always rightmost
- On mobile (`flex-col-reverse`), the primary action renders at the top of the stack

```tsx
// Primary on the right, col-reverse on mobile
<div className="flex flex-col-reverse sm:flex-row gap-2 w-full">
  <Button variant="ghost">Cancel</Button>
  <Button>Save</Button>
</div>
```

---

## Form Fields

- **Labels:** Every input has a visible label. Never rely on placeholder as a label
- **Placeholders:** Only when they add real value — format hints, example values. Omit if they restate the label
- **Required vs optional:** Mark optional fields with `(optional)` in muted text. Required fields have no marker

---

## Layout

- **Container:** `max-w-7xl mx-auto`
- **Cards:** `rounded-xl`
- **Buttons:** `rounded-lg`
- **Base radius:** `--radius` token
- **Borders:** `border-border/50` (50% opacity for subtlety)

---

## Dropdown & Popover Alignment

| Trigger position | `align` prop |
|---|---|
| Left side of screen or row | `align="start"` |
| Right side of screen or row | `align="end"` |

---

## Mobile

- **Touch targets:** 44px minimum (`min-h-11`)
- **Full-width CTAs:** `w-full sm:w-auto` for standalone buttons
- **Icon-only:** Only when the icon is universally understood AND space is tight. Always include `aria-label`

---

## Anti-Patterns

| Don't | Do instead |
|---|---|
| `className="text-green-500"` on buttons | Use `variant="outline"` with no colour override |
| `bg-white`, `text-zinc-500`, `text-gray-400` | Use semantic tokens: `bg-background`, `text-muted-foreground` |
| Multiple `default` buttons on one surface | One primary per surface — demote others to `outline` or `ghost` |
| Placeholder text that restates the label | No placeholder, or a genuine format hint |

---

## Key Files

| File | Purpose |
|---|---|
| `app/globals.css` | CSS custom properties (design tokens) |
| `tailwind.config.ts` | Theme, animations, colour mapping |
| `components/ui/button.tsx` | Button variants |
| `components.json` | shadcn/ui config |
