# Template principles

> **Draft.** Written from this kit's own docs, not from user research. Edit
> "Who it's for" to match the people you actually see using it.

This file is about the template itself: who it is for and how it should behave.
Your own product's context lives in `CURRENT-WORK.md`, `DESIGN_SYSTEM.md` and
`docs/research/`.

**Read this before you add, change or remove a skill, command, agent, hook or
setup step.** You do not need it for normal product work.

The two kits: **prototype-starter** is for trying ideas fast.
**product-workspace** adds stricter checks for work that is heading to production.

## Who it's for

**Primary: a designer or PM who is starting to build with AI.**
They understand products, users and requirements. They may not read a stack
trace or know what a terminal command does. They want to turn an idea into
something people can click, then discuss it with their team.

- **A good first session:** the app runs and the agent understands their
  product, and they never had to type a terminal command.
- **Friction to watch for:** setup steps that assume engineering knowledge,
  commands in the docs that do not exist, and a prototype that looks finished
  but hides open questions.

**Secondary: the engineer who receives the prototype.**
They need to read the code and the thinking behind it: what is real, what is
faked, and what still needs a decision. They should not have to use the
template to do that.

## How the kit behaves

1. **Get people to a working result fast.** Prefer smart defaults to choices.
   The first session ends with something running, not a reading list.
2. **Every instruction earns its place.** Each skill, rule or line of docs
   helps a decision or prevents a real failure. If it does neither, cut it.
   Put repeatable steps in scripts, not prose.
3. **The human directs, the agent does the work.** The agent handles setup,
   code and checks. The person sets the intent, judges the result and decides.
4. **Ask, don't invent.** Never make up research, brand decisions or
   requirements. Say what is known, what is assumed and what is missing.
5. **Plain language.** Write for someone who is not an engineer. Use short
   sentences. Explain any technical word.
6. **Works in Claude Code and Cursor.** Keep both copies of each command the
   same. `scripts/check-command-drift.sh` warns you when they differ.

## Using these

When you change the kit, say which principle the change supports. If two
principles pull against each other, tell the person. Do not pick one silently.
