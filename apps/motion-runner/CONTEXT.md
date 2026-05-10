# motion-runner — Domain Glossary

Tag-driven ECS sandbox. Geometric entities (circles, rects) move and collide in a bounded arena. Behavior emerges from component composition, not entity types.

## Terms

### Arena
Bounded simulation region, 1280×780 px. Walls = static Matter bodies. Entities cannot leave.

### Entity
Miniplex entity. Has no intrinsic type — its identity is the sum of its components.

### Component
Atomic data attached to an entity. Components are classified by **kind**:

| Kind     | Cardinality            | Purpose                                      | Examples                          |
|----------|------------------------|----------------------------------------------|-----------------------------------|
| tag      | many per entity        | Filterable label                             | `kinematic`, `predator`           |
| state    | exactly one per entity | Mutually-exclusive FSM slot                  | `idle` / `colliding` / `fleeing`  |
| data     | many (one per type)    | Typed payload                                | `Position`, `Velocity`, `Shape`   |
| relation | many                   | Reference to another entity                  | `parent`, `target`                |

Component kind is an architectural property — it shapes how systems query and how many of each can co-exist on one entity. Enforcement is convention-only; both Miniplex and TypeScript treat all components as equal keys.

### Tag
A `tag`-kind component. Entities carry a **set** of tags. Systems query by tag presence.

### State
A `state`-kind component. Exactly one active state per entity. Switching state = removing one, adding another. Listener-driven mutations target this.

### System
A function that runs each tick, takes one or more component queries, mutates matched entities. **Systems are generic** — they never reference entity types, only components.

### Shape
`data` component. `{ kind: 'circle' | 'rect', ...dims }`. Drives both Pixi rendering and Matter body creation.

### MatterBody
`data` component. Reference to a Matter body owned by the entity. Synced to `Position` each tick.

### Sensor
A Matter sensor body attached to an entity (`isSensor: true`). Detects overlap without physical response. Overlap events flow through the global Matter listener.

### Listener (Matter overlap)
Single global handler subscribed to Matter `collisionStart` / `collisionEnd`. **Thin** — only mutates the involved entities' `state` components. All business logic lives in systems that subsequently query that state.

### Configuration
All initial entities, tags, shapes, positions, velocities come from a config object. No hardcoded entity setup in code.

## Out of scope (v0)

Player avatar. Score / win-loss. Camera scrolling. Gravity. Sprites. Sub-tag genres beyond a minimal set.
