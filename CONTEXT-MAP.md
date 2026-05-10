# Context Map

Multi-context monorepo. Each app under `apps/` has its own bounded context.

- **dancer-runner** (`apps/dancer-runner/CONTEXT.md`) — isometric arena dance prototype. Sprite-based. (Originally `apps/runner` — rename pending.)
- **motion-runner** (`apps/motion-runner/CONTEXT.md`) — tag-driven ECS sandbox. Geometric primitives, Matter.js collision.

Shared kernel: `packages/common` (atomic ECS components, math utils). No domain language of its own.
