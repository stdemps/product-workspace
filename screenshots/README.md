# Screenshots Directory

This directory stores screenshots generated during E2E testing for visual UI verification.

## Workflow

### 1. Generate Screenshots

Tests automatically generate screenshots in this directory:

```typescript
await page.screenshot({
  path: 'screenshots/feature-name.png',
  fullPage: true,
});
```

### 2. Review for Correctness

Check each screenshot for:
- ✅ Accessibility (contrast ratios, readable text)
- ✅ Responsive design (no horizontal scroll, proper layout)
- ✅ Component styling (shadcn/ui components render correctly)
- ✅ Alignment (elements properly positioned)
- ✅ Theme (light/dark mode works)

### 3. Verify and Rename

When a screenshot shows correct UI, add `verified_` prefix:

```bash
mv screenshots/feature-mobile.png screenshots/verified_feature-mobile.png
```

### 4. Git Tracking

**No screenshots in this directory are committed.** Every `.png` here is ignored by
git, including `verified_` ones. The `verified_` prefix is a note to yourself and to
the agent about what you have already checked — it is not a git flag.

This is deliberate. A screenshot of a logged-in page can contain real customer
names, email addresses and account data, and an "allow this one prefix" rule is how
that data gets committed by accident.

If you deliberately want a reference image in version control, put it somewhere
tracked normally, such as `docs/images/`, so the decision is explicit and visible.

## TDD + UI Verification Workflow

1. Tests generate screenshots automatically
2. Review screenshots for UI correctness
3. Rename correct screenshots with `verified_` prefix to record what you approved
4. Nothing in `screenshots/` is committed — the prefix is for you, not for git

## Naming Convention

Use descriptive names indicating what's being shown:

**Good examples:**
- `feature-mobile-375px.png` → `verified_feature-mobile-375px.png`
- `button-hover-state.png` → `verified_button-hover-state.png`
- `dark-mode-homepage.png` → `verified_dark-mode-homepage.png`

**Include in name:**
- Feature/component name
- State being shown (default, hover, error, etc.)
- Viewport size if responsive (mobile, tablet, desktop OR 375px, 768px, 1024px)
- Theme if applicable (light, dark)

## Cleaning Up

Periodically remove old unverified screenshots:

```bash
# Remove all unverified screenshots (be careful!)
rm screenshots/*.png

# Keep verified screenshots
ls screenshots/verified_*.png
```

## Integration with Quality Gates

Screenshots are reviewed manually or by Claude during development.

They are NOT automatically checked by pre-commit hooks - verification is a human or agent review process.
