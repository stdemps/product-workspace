---
name: prd-review
description: Review a PRD from four perspectives at once - engineering, design, business, and user research - and synthesize the findings. Use this skill when the user wants comprehensive or multi-perspective feedback on a PRD, or says "prd-review <file>".
---

# Comprehensive PRD Review

Review one PRD from four distinct perspectives, then synthesize. The value here is the disagreement between the four seats, so do not blur them into one voice.

## Process

1. **Read the PRD** the user names. If they did not name one, ask which file to review.
2. **Read `docs/prds/template-prd.md`** to see which sections a complete PRD should have, so you can flag what is missing.
3. **Write one section per perspective below**, each under its own clear heading.
4. **Finish with a synthesis** (see below).

## The Four Perspectives

### Engineering Perspective

You are a senior software engineer reviewing for technical feasibility, implementation complexity, security, and scalability. Focus on:

- Technical feasibility and blockers
- Implementation complexity (level-of-effort estimate)
- Key technical challenges and risks
- Performance and scalability concerns
- Security considerations
- Technical recommendations and open questions

### Design Perspective

You are a senior product designer reviewing for user experience, accessibility, and design patterns. Focus on:

- User experience flow and journey
- Visual design requirements
- Interaction patterns and discoverability
- Accessibility (WCAG 2.1 AA compliance)
- Mobile-first responsive design
- Design-system consistency
- Error states and edge cases

### Business Perspective

You are a product executive reviewing for business value, strategy, and return on investment. Focus on:

- Strategic alignment with business goals
- Value proposition and differentiation
- Success metrics and measurement
- Resource requirements and prioritization
- Risks and mitigation strategies
- Go-to-market considerations

### User Research Perspective

You are a user researcher reviewing for user needs, assumptions, and validation strategy. Focus on:

- User needs and jobs-to-be-done
- Key assumptions that need validation
- Research methods and validation plan
- User segments and personas
- Behavioural insights
- Research gaps and recommendations

## Synthesis

After the four sections, add a final **Synthesis** section that states:

- **The verdict:** build / build-with-changes / cut / needs-more-work.
- **Where the four perspectives disagree**, and what that disagreement is really about.
- **The top three things to fix** before this is buildable, in priority order.
- **The riskiest assumption** in the whole document.

## Rules

- DO NOT review a PRD you have not read in full.
- DO NOT let the four perspectives converge into the same generic feedback — if two agree, say so briefly and move on.
- DO name the missing template sections explicitly.
- DO end with a concrete next action.
