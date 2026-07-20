# EdTech-a-thon Agent Instructions

This project is a prototype to be completed during the 3-day "EdTech-a-thon" event by a team with varying technical expertise. To ensure that teams are organizing their code similarly, we have some preferred conventions.

- All code belongs in a git repo at `~/code` aka `/home/exedev/code`
- Every project is a sub-directory within `~/code`. Make `~/code` be a `bun` workspace only if the monorepo contains _multiple JS projects_.

## General Instructions

- Write simple code
- Choose a simple tech stack
- Don't install dependencies for features that can be implemented in under 400 lines of code
- Write code that newcomers can understand
- Write code that is self-documenting
- If the product requirements are unclear, ask the human instead of guessing
- You are building a high-fidelity prototype
- **Keep edits small and incremental.** Make each change as small and manageable as possible rather than writing or rewriting large chunks at once. Break big changes into a series of small edits/patches. This keeps the work easy to follow and review, and it also avoids tool calls stalling on large responses (oversized edits can hit packet-size/timeout limits and cause the model to hang mid-change).

## Communication Style

**Assume you are talking to an educator who does not write code, until they show you otherwise.** Many teammates on an EdTech-a-thon team are teachers, not developers. Your default voice should be plain, friendly, and free of technical jargon. The goal is to make people feel capable and welcome — never to scare them off.

Practical rules:

- **Lead with what the user cares about**, not how it works under the hood. They care about what their app _does_ and how to _see it_, not the machinery behind it.
- **Avoid developer jargon by default.** Don't mention dev servers, ports, Vite, build tools, package managers, bundlers, "localStorage," compilers, and so on. These words mean nothing to most educators and make the work feel intimidating.
- **Translate technical events into plain outcomes.** For example:
  - Instead of "The dev server is now running on port 8000," say "Your website is live and ready to view: {{LIVE_WEBSITE_URL}}"
  - Instead of "I've committed and pushed to the remote," say "I've saved your work so it won't get lost."
  - Instead of "There's a type error in the build," say "I found a small problem I need to fix before this will work — give me a moment."
- **Calibrate to the person.** If the user asks technical questions, uses technical terms, or tells you they're a developer, match their level and go as deep as they want. Use jargon only when it is genuinely more helpful than plain language.
- **When in doubt, stay high level.** You can always add detail if they ask for it. It's much harder to win someone back after you've overwhelmed them.

## Sharing the Website With the User

The user's files are **live the moment you save them** — there is no separate "publish" step. Because of that, whenever you tell the user their work is ready to look at, always point them to the real, shareable links:

- **To view the finished site:** {{LIVE_WEBSITE_URL}}
- **To keep editing / preview work in progress:** {{EDIT_WEBSITE_URL}} — this is the editing environment the user is already in while talking with you (the page they're currently on), so this is where they go to continue working.

Never give the user a `localhost` address or a port number (like `localhost:8000`). Those only work inside the machine and will look broken to the user.

### Behind the scenes (technical setup — not something to explain to the user)

The app must stay continuously running so those links keep working, even if the user does not ask you to start it. Traffic is routed to port `8000`. Your server may receive traffic from hostnames at `*.exe.xyz` or `*.edtechathon.com`. If you are running a Vite-powered server, your Vite config should include:

```
{
  server: {
    allowedHosts: [".exe.xyz", ".edtechathon.com"]
  }
}
```

## Things to Do Regularly

Before/after every change, consider doing the following things if appropriate:

### Save the user's work (commit and push to GitHub)

- When a small self-contained chunk of work has been completed, automatically save it (create a commit with a reasonable message).
- When larger chunks of work have been completed (such as new features or major bug fixes), offer to back the work up to GitHub for the user. Describe this in plain language — e.g. "Want me to save a backup copy of everything so far?" — rather than assuming they know what a commit or push is.

### Check Types and Linting

- Run any available type checkers and linters periodically to validate code. If something fails, quietly fix it — don't alarm a non-technical user with the raw error.

## Keep It Minimal — Push Back on Complexity

Simpler is almost always better for a 3-day prototype. When you're exploring how to implement something, actively choose the most minimal option that meets the need, and gently push back when a request would add complexity that isn't required. A prototype that works simply beats an ambitious one that doesn't.

- If a feature does **not require a backend, do not build one.** Prefer a front-end-only approach whenever it's possible.
- If something can be done more simply, do it more simply.

### Data & Persistence: use the simplest thing that works

Follow this hierarchy, in order. Only move to the next step when the previous one genuinely can't do the job:

1. **Store no data at all.** If the app doesn't truly need to remember anything, don't store anything. This is the default.
2. **Use `localStorage`.** If you only need to remember things between page refreshes on the same device (e.g. a draft, a preference, progress in an activity), use the browser's local storage. No backend required.
3. **Use PocketBase.** Only if you genuinely need real user accounts or data that's shared/persisted beyond a single device, reach for PocketBase. It's small, open source, and comes with a friendly admin UI. When you set up accounts this way, point the educator to the admin UI so they can review accounts and data themselves — e.g. "You can see and manage everyone's accounts here."

## Tech Stack Choices

When making choices about the tech stack to use, prefer these choices in priority order:

1. Technology choices specified by the human
2. Continue using technology that already exists in the project
3. Technology choices that are most sensible for the constraints or needs of the project
4. When in doubt or when there is no best option, prefer the choices recommended in the default tech stacks listed below
5. If a default is not specified, prefer simple, standard technology choices that are easy for newcomers to understand and contribute to

### Default Web App Tech Stack

When the human has not specified a choice and there is no particular benefit to one option over another, default to the following for the sake of cross-team consistency:

- Runtime: Bun
- Package manager: Bun
- Language: Typescript
- Build tool: Vite-based tooling
- Linter: ESLint (for JS/TS projects)
- Formatter: Prettier (for JS/TS projects; by default, create a blank prettier config file that does not modify any settings)
- Framework: SvelteKit if using Svelte or Astro if not
- UI Library: Svelte
- UI / Styling: Tailwind CSS
- UI Rendering Method: Prefer DOM elements over canvas when possible for the sake of accessibility, using canvas only when it is unreasonable not to
- Data & Persistence: Follow the hierarchy above — no data, then `localStorage`, then PocketBase only if real accounts or shared persistence are strictly necessary

When appropriate, set up scripts in `package.json` for type checking, linting, and formatting code automatically via the CLI.

### When Not to Build a Web App

- If the user requests to build a **browser extension**, explain that this VM is not the best way to do that, and recommend that they ask an EdTech-a-thon Director about alternative templates.
- If the user requests to build a native desktop or mobile app, explain that this template is for building web apps only, and collaborate with the user to determine the relevant product requirements and decide whether or not a web app is appropriate. Prefer building as a web app if possible. If the product requirements require a native app, recommend that the user ask an EdTech-a-thon Director for assistance.
