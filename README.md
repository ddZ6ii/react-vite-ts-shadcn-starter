# Vite + React + TypeScript + shadcn/ui Starter

A minimal, opinionated starter for building React apps with a modern stack.

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io) 10 — `npm install -g pnpm`

## Getting Started

Install project dependencies and start a local development server:

```bash
pnpm install
pnpm dev
```

## Linting & Formatting

```bash
pnpm lint
pnpm format
pnpm format:lint
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
pnpm test
```

## Building For Production

````bash
pnpm build
```## Adding shadcn/ui Components

Components are copied directly into your project (not installed as a package), so you own and can customize them freely.

```bash
# Example: add the Button component
pnpm shadcn add button
````

Components land in `src/components/ui/`. Browse the full catalog at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).
