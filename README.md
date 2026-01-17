# Echo - AI Customer Support Platform

An AI-powered customer support platform featuring embeddable chat widgets, voice integration with VAPI, and AI agents powered by Convex. Built as a modern SaaS application with multi-tenancy support via Clerk organizations.

## What is Echo?

Echo is a comprehensive customer support solution that enables businesses to:

- Deploy AI chat widgets on their websites for automated customer support
- Handle conversations with AI agents backed by RAG (Retrieval Augmented Generation)
- Integrate voice support through VAPI
- Manage conversations, escalations, and contact sessions
- Configure widget appearance and behavior per organization
- Handle billing and subscriptions through Clerk

## Architecture

This is a **monorepo** built with Turborepo containing:

### Apps

- **`apps/web`** - Main dashboard application (Next.js 16)
  - Organization management & billing
  - Conversation management
  - Widget customization
  - Files & integrations management
  - Plugin configuration
- **`apps/widget`** - Embeddable chat widget (Next.js 16)
  - Customer-facing chat interface
  - Voice integration with VAPI
  - Contact session management
  - Runs on port 3001

### Packages

- **`packages/backend`** - Convex backend (serverless)
  - Database schema (conversations, contactSessions, widgetSettings, subscriptions, plugins)
  - API endpoints (public & private)
  - AI agent implementation with @convex-dev/agent
  - RAG integration for context-aware responses
  - Clerk authentication & webhook handlers
  - VAPI voice integration
  - AWS Secrets Manager for sensitive data

- **`packages/ui`** - Shared component library
  - shadcn/ui components
  - Custom AI chat components (AIInput, AIResponse)
  - Shared hooks and utilities

- **`packages/math`** - Utility functions
- **`packages/eslint-config`** - Shared ESLint configuration
- **`packages/typescript-config`** - Shared TypeScript configuration

## Tech Stack

### Frontend

- **Next.js 16** with App Router & Turbopack
- **React 19** with Server Components
- **TypeScript 5.7**
- **Tailwind CSS 4** via @tailwindcss/postcss
- **shadcn/ui** - UI component library
- **Radix UI** - Headless component primitives
- **Jotai** - State management
- **Clerk** - Authentication & multi-tenancy

### Backend

- **Convex** - Serverless backend platform
  - Real-time database
  - Serverless functions
  - File storage
  - Built-in authentication
- **@convex-dev/agent** - AI agent framework
- **@convex-dev/rag** - RAG implementation
- **AI SDK (Vercel)** - AI integration layer
- **Google AI** - LLM provider
- **VAPI** - Voice API integration
- **Svix** - Webhook infrastructure

### Development

- **Turborepo** - Monorepo build system
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Linting
- **Prettier** - Code formatting

## Prerequisites

- **Node.js** >= 20
- **pnpm** 10.4.1 (automatically enforced)
- **Convex account** - https://convex.dev
- **Clerk account** - https://clerk.com
- **VAPI account** (optional) - https://vapi.ai

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Create `.env.local` files in both apps:

**`apps/web/.env.local`:**

```bash
# Convex
CONVEX_URL=<your-convex-deployment-url>
NEXT_PUBLIC_CONVEX_URL=<your-convex-deployment-url>

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk-publishable-key>
CLERK_SECRET_KEY=<clerk-secret-key>
CLERK_WEBHOOK_SECRET=<clerk-webhook-secret>
```

**`apps/widget/.env.local`:**

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=<your-convex-deployment-url>

# VAPI (optional)
NEXT_PUBLIC_VAPI_PUBLIC_KEY=<vapi-public-key>
```

**`packages/backend/.env.local`:**

```bash
# Clerk
CLERK_WEBHOOK_SECRET=<clerk-webhook-secret>
CLERK_SECRET_KEY=<clerk-secret-key>

# AI
GOOGLE_GENERATIVE_AI_API_KEY=<google-ai-key>

# AWS (for secrets)
AWS_ACCESS_KEY_ID=<aws-access-key>
AWS_SECRET_ACCESS_KEY=<aws-secret-key>
AWS_REGION=<aws-region>
```

### 3. Initialize Convex

```bash
cd packages/backend
pnpm run dev
```

This will:

- Set up your Convex deployment
- Push the schema
- Start the Convex dev server

### 4. Start Development

From the root directory:

```bash
pnpm dev
```

This starts:

- Web dashboard: http://localhost:3000
- Widget: http://localhost:3001
- Convex backend (watching for changes)

## Project Scripts

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm dev --filter web # Start only web app

# Building
pnpm build            # Build all apps
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier

# Convex (from packages/backend)
pnpm run dev          # Start Convex dev server
pnpm run setup        # Initialize Convex (wait until success)
```

## Adding UI Components

To add shadcn/ui components:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Components are placed in `packages/ui/src/components` and can be imported:

```tsx
import { Button } from "@workspace/ui/components/button";
```

## Key Features

### Multi-Tenancy

- Uses Clerk organizations for isolation
- Each organization has separate:
  - Widget settings
  - Conversations
  - Contact sessions
  - Subscriptions
  - Plugins

### AI Agents

- Built with @convex-dev/agent
- RAG-powered responses using organization-specific knowledge
- Conversation threading with message history
- Escalation support for human handoff

### Voice Integration

- VAPI integration for voice calls
- Assistant and phone number configuration per organization
- Stored securely in AWS Secrets Manager

### Real-Time

- Convex provides real-time subscriptions
- Live conversation updates
- Instant widget configuration changes

## Important Notes

### Type Overrides

The project uses pnpm overrides to resolve React 19 type conflicts:

```json
{
  "csstype": "^3.2.3",
  "@types/react": "^19.2.7",
  "@types/react-dom": "^19.1.7"
}
```

### Ports

- Web app: 3000
- Widget: 3001
- Convex: Managed by Convex CLI

## Troubleshooting

### TypeScript Errors

If you see type errors after installing dependencies:

```bash
pnpm install  # Ensure overrides are applied
```

### Convex Connection Issues

Ensure `CONVEX_URL` and `NEXT_PUBLIC_CONVEX_URL` match your deployment URL from the Convex dashboard.

### Missing Dependencies

Some UI components require additional packages. Install as needed:

```bash
pnpm add <package-name> --filter @workspace/ui
```

## Learn More

- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [VAPI Documentation](https://docs.vapi.ai)
