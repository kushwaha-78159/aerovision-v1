# AeroVision V-1 — Design Direction

## Three Initial Approaches

### Theme Name: Neon Flight Deck
Very dark, high-contrast aerospace interface with electric cyan, magenta, and phosphor green accents. It makes the product feel like a classified prototype under active test.

**Probability:** 0.04

### Theme Name: Mineral Velocity
A sculptural, gallery-like direction using graphite, warm mineral white, brushed metal, and one vivid vermilion accent. The car reads as an engineered object in a contemporary design museum.

**Probability:** 0.07

### Theme Name: Signal / Silence
An editorial industrial system built from near-black panels, off-white type, pale blue instrument marks, and deliberate empty space. The interface feels quiet, precise, and confident rather than loudly futuristic.

**Probability:** 0.03

## Chosen Direction: Signal / Silence

### Design Movement
Swiss International Typographic Style fused with aerospace instrumentation and contemporary automotive art direction.

### Core Principles
1. **Quiet authority:** the vehicle is the hero; interface language frames it instead of competing with it.
2. **Instrumented precision:** thin rules, coordinate labels, small caps, and measured spacing make every control feel engineered.
3. **Asymmetric composition:** content is offset into the viewport with generous negative space, avoiding a generic centered landing-page stack.
4. **Tactile restraint:** motion is smooth and physical, while visual effects stay crisp, low-glow, and purposeful.

### Color Philosophy
The foundation is a near-black graphite field that lets the car silhouette and chrome highlights read immediately. A pale arctic blue is used for system annotations and interaction focus, while a single signal-orange accent communicates action, state changes, and reservation intent. The palette should feel like a flight-control interface under moonlight, not a gaming dashboard.

### Layout Paradigm
The page is a long, cinematic scroll track with a fixed scene stage and anchored editorial modules entering from the margins. The hero uses a left-set masthead and a right-set instrument rail; the exploded view shifts the reading axis so the car remains visually dominant while technical notes orbit the composition.

### Signature Elements
- Hairline coordinate grids and “A/V-01” engineering labels.
- A recurring orange signal dot connected to thin measurement rules.
- Translucent smoked-glass control decks with squared corners and clipped geometry.

### Interaction Philosophy
Controls should feel like physical toggles on a flight console: immediate, legible, and reversible. Hover states expose intent with a short underline or a small signal pulse. Every interactive element communicates its current mode, not just its affordance.

### Animation
The vehicle uses slow inertial rotation, with pointer movement adding only a small amount of yaw and pitch. Scroll progress drives the camera and part separation with eased interpolation, avoiding abrupt keyframes. UI panels enter with a 180–240ms ease-out and a slight horizontal translation. Background noise and telemetry lines remain nearly static, preserving a sense of a stable observation chamber. All non-essential motion is disabled or reduced under `prefers-reduced-motion`.

### Typography System
Use **Space Grotesk** for display titles and numeric performance figures, with **IBM Plex Mono** for labels, coordinates, control names, and spec metadata. Headlines are bold and tightly tracked; body copy stays compact at 14–16px with generous line height. Use uppercase mono labels sparingly as instrumentation, not decoration.

### Brand Essence
AeroVision V-1 is a precision electric hypercar concept for people who see motion as an engineered art form; unlike a conventional spec sheet, it lets the machine reveal itself in layers.

**Personality:** exacting, atmospheric, audacious.

### Brand Voice
Headlines are declarative and cinematic. CTAs are direct, never salesy. Microcopy sounds like a test protocol: concise, observant, and specific.

Example lines:
- “The air is not empty. It is part of the machine.”
- “Reserve a position in the first flight.”

### Wordmark & Logo
The mark is a compact “AV” flight vector: two opposing chevrons sharing one vertical spine, suggesting both a wing planform and a camera aperture. It should be drawn as a simple geometric symbol without text and used as the favicon, header mark, and signal glyph.

### Signature Brand Color
**Signal Orange — `#FF6A3D`**. It is the ownable color of action, used only for the live state, active hotspot, and reservation CTA so it retains meaning.

## Implementation Notes

- This frontend uses TypeScript and React in the existing web-static scaffold.
- The 3D presentation will be implemented as a lightweight React Three Fiber scene with procedural vehicle geometry so the experience remains self-contained and responsive.
- The sound toggle will use a browser-safe synthesized ambient engine hum via the Web Audio API, activated only after user interaction.
- Generated visual assets will be limited to a transparent AV symbol/logo and a subtle non-text atmospheric texture; the vehicle itself remains interactive geometry rather than a static hero image.

## Style Decisions

- Display headlines use Space Grotesk with engineered weight and tight tracking; large cyan headline words are avoided except for rare technical emphasis.
- Pale arctic blue is reserved for instrumentation, coordinates, labels, selected values, and focus states, while Signal Orange `#FF6A3D` remains the only action/live-state color.
- Configuration and material language stays within graphite, smoked glass, brushed-metal/chrome, off-white, pale blue, and Signal Orange; vivid magenta is retained only as an initial test-finish option, not as a thematic UI color.
- Every section repeats the AeroVision grammar: section index, mono coordinate labels, one orange signal indicator, hairline measurement rules, and squared control surfaces.
