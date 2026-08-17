# AeroVision V-1

> **AeroVision V-1** is a cinematic, interactive hyper-electric vehicle showcase built with React, TypeScript, Vite, Three.js, and React Three Fiber. The experience is designed for product demos, design reviews, hackathons, and judge-facing presentations where the visual interaction should communicate as much as the specification sheet.

![AeroVision V-1](https://aerovision-6grqqn5d.manus.space/manus-storage/aerovision-atmosphere-grid_f2f1e5a8.png)

## Project overview

AeroVision V-1 presents a fictional hyper-electric platform through a dark aerospace instrumentation system called **Signal / Silence**. The interface combines a large editorial landing view, a live vehicle render, pointer-based tilt, scroll-driven staging, a control deck, technical hotspot cards, performance data, and a first-flight reservation CTA.

The project is a static frontend. It does not require a database, authentication service, or external API key for the current experience. The vehicle scene uses procedural Three.js geometry and a lightweight CSS fallback silhouette so the hero remains visible even when a browser or preview environment has limited WebGL support.

## Main features

| Area                  | What it does                                                                                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cinematic hero        | Displays the `AEROVISION V-1` title, aerospace telemetry, branded atmospheric background, visible vehicle render, and a “Enter the machine” CTA.                      |
| Pointer parallax      | Tracks pointer movement and applies a subtle tilt to the live vehicle scene.                                                                                          |
| Ambient sound         | Provides an `SOUND OFF / SOUND ON` control using the browser Web Audio API. Browser autoplay policies are respected because sound starts only after user interaction. |
| Scroll deconstruction | The Deconstruct section responds to scroll position and reveals the vehicle architecture in an exploded visual state.                                                 |
| Technical hotspots    | The Core and Contact cards surface motor, torque, wheel, brake, and material information.                                                                             |
| Control deck          | Supports Pink, Cyan, and Matte Black paint finishes, X-Ray / Wireframe mode, and Studio / Night lighting.                                                             |
| Performance sheet     | Presents top speed, acceleration, battery capacity, and peak power in a dedicated spec section.                                                                       |
| Reserve CTA           | Opens the “Request a Build Slot” reservation modal for the final first-flight action.                                                                                 |
| Responsive layout     | Reflows the editorial layout and control deck for narrow screens.                                                                                                     |

## Technology stack

| Technology          | Role                                                       |
| ------------------- | ---------------------------------------------------------- |
| React 19            | Component-based UI and interaction state.                  |
| TypeScript          | Type-safe application code and configuration.              |
| Vite                | Development server and production bundling.                |
| Three.js            | WebGL scene, lighting, geometry, and animation primitives. |
| React Three Fiber   | Declarative React integration for Three.js.                |
| `@react-three/drei` | Camera, floating animation, and scene helpers.             |
| Tailwind CSS 4      | Utility styling support from the project template.         |
| Framer Motion       | UI motion support where needed.                            |
| Lucide React        | Interface icons.                                           |
| Wouter              | Lightweight client-side routing.                           |

## Repository structure

```text
.
├── client/
│   ├── index.html                 # Document shell and metadata
│   ├── public/                    # Small public configuration files only
│   └── src/
│       ├── components/            # Shared UI and template components
│       ├── contexts/              # Theme context
│       ├── hooks/                 # Reusable React hooks
│       ├── lib/                   # Utility functions
│       ├── pages/
│       │   └── Home.tsx           # Main AeroVision experience
│       ├── App.tsx                # App shell and routing
│       ├── index.css              # Signal / Silence design system
│       └── main.tsx               # React entry point
├── server/
│   └── index.ts                   # Static production server wrapper
├── shared/
│   └── const.ts                   # Shared constants placeholder
├── ideas.md                       # Design direction and visual decisions
├── package.json                   # Scripts and dependencies
├── pnpm-lock.yaml                 # Locked dependency versions
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # This guide
```

The repository intentionally keeps large image and media files outside the application source tree. Prominent visuals are referenced through the project storage URLs returned by the hosting environment rather than being copied into `client/public`.

## Requirements

Install the following tools before working locally:

| Requirement    | Recommended version              | Purpose                                         |
| -------------- | -------------------------------- | ----------------------------------------------- |
| Node.js        | 20 or newer                      | JavaScript runtime used by Vite and TypeScript. |
| pnpm           | 10.x                             | Package manager used by this repository.        |
| Git            | Current stable version           | Source control and GitHub operations.           |
| Modern browser | Chrome, Edge, Safari, or Firefox | WebGL, pointer, audio, and responsive testing.  |

The repository declares its package manager in `package.json`. If `pnpm` is not installed, enable Corepack or install pnpm directly:

```bash
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm --version
```

## Run locally

Clone the repository, enter the project directory, install the locked dependencies, and start the development server:

```bash
git clone https://github.com/<OWNER>/<REPOSITORY>.git
cd aerovision-v1
pnpm install --frozen-lockfile
pnpm dev
```

Vite will print a local URL. Open the URL in a browser, normally `http://localhost:3000/`. The `dev` script uses `vite --host`, so it also binds to a network-accessible interface when the environment supports it.

For a production-like local run, first create the production bundle and then start the bundled server:

```bash
pnpm run build
pnpm run start
```

The production server listens on the `PORT` environment variable when it is set, otherwise it uses port `3000`:

```bash
PORT=4173 pnpm run start
```

## GitHub Codespaces setup

GitHub Codespaces provides a cloud development container attached to a repository. The workflow below assumes that the repository already exists on GitHub.

### Option A: Open Codespaces from the GitHub website

Open the repository on GitHub, select **Code**, open the **Codespaces** tab, and create a new codespace from the default branch. Once the terminal is ready, run:

```bash
cd /workspaces/<REPOSITORY>
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm --version
pnpm install --frozen-lockfile
pnpm dev
```

When Vite starts, open the **Ports** panel in Codespaces. Locate port `3000`, choose **Open in Browser**, and use that forwarded URL for review. If the port was not detected automatically, forward it manually:

```bash
gh codespace ports forward 3000:3000 -c "$CODESPACE_NAME"
```

The web preview should be opened through the forwarded Codespaces URL rather than through `localhost` on the user’s personal computer.

### Option B: Create a Codespace with GitHub CLI

If GitHub CLI is installed and authenticated, create a Codespace from the repository with:

```bash
gh auth status
gh codespace create \
  --repo <OWNER>/<REPOSITORY> \
  --branch main \
  --machine basicLinux32gb
```

After connecting to the Codespace terminal, install and run the project:

```bash
cd /workspaces/<REPOSITORY>
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile
pnpm dev
```

If your organization does not allow the requested machine type, remove the `--machine` flag or choose an available machine from the Codespaces interface. The exact machine catalog depends on the GitHub account and organization policy.

### Codespaces port commands

The most commonly used port commands are:

```bash
# List active Codespaces.
gh codespace list

# List ports for the current Codespace.
gh codespace ports -c "$CODESPACE_NAME"

# Forward local port 3000 to the Codespace port 3000.
gh codespace ports forward 3000:3000 -c "$CODESPACE_NAME"

# Stop the Codespace when work is finished.
gh codespace stop -c "$CODESPACE_NAME"
```

If the Codespaces terminal does not expose the site, start Vite explicitly on all interfaces:

```bash
pnpm exec vite --host 0.0.0.0 --port 3000
```

## Available npm scripts

| Command        | Result                                                                        |
| -------------- | ----------------------------------------------------------------------------- |
| `pnpm dev`     | Starts the Vite development server with host binding enabled.                 |
| `pnpm check`   | Runs `tsc --noEmit` and checks the TypeScript project without emitting files. |
| `pnpm build`   | Builds the frontend and bundles the production server into `dist/`.           |
| `pnpm start`   | Runs the bundled production server. Run `pnpm build` first.                   |
| `pnpm preview` | Serves the Vite production preview for frontend-only inspection.              |
| `pnpm format`  | Formats project files with Prettier.                                          |

A recommended validation sequence before committing is:

```bash
pnpm check
pnpm build
pnpm exec prettier --check .
```

## Verification checklist

Use the following checklist before showing the project to judges or reviewers.

| Test                            | Expected result                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Open the landing route          | The title, aerospace telemetry, background atmosphere, and vehicle are visible.                         |
| Move the pointer over the hero  | The vehicle responds with a subtle tilt/parallax motion.                                                |
| Toggle sound                    | The control changes from `SOUND OFF` to `SOUND ON`; audio starts only after interaction.                |
| Click “Enter the machine”       | The page scrolls to the deconstruction experience.                                                      |
| Scroll through Deconstruct      | The section updates its scroll progress and shows the exploded vehicle state.                           |
| Open the Core and Contact cards | Inline technical details for motor, torque, wheel, and braking performance are visible.                 |
| Click paint swatches            | The active finish changes between Pink, Cyan, and Matte Black.                                          |
| Toggle X-Ray / Wireframe        | The vehicle switches to a neon technical framework treatment.                                           |
| Toggle Night Lighting           | Lighting labels and the active render state switch to Night mode.                                       |
| Open the reservation CTA        | The build-slot request modal appears.                                                                   |
| Resize to mobile width          | Content remains readable and the control deck remains usable.                                           |
| Inspect browser Console         | No uncaught JavaScript, React, R3F, or WebGL errors should appear.                                      |
| Inspect Network                 | Storage assets should load successfully and large local media should not be copied into the repository. |

A first blank frame can occur while the deployed frontend and WebGL scene initialize. Wait briefly and refresh once before treating it as a runtime failure. If the page remains blank, inspect the Console and Network panels.

## Performance and WebGL notes

The page contains a live Three.js canvas, so GPU and browser behavior can differ across machines. For judge demonstrations, use a modern laptop browser, keep the browser zoom at 100%, and close unnecessary GPU-heavy tabs. Test on a physical mobile device when possible, especially if the device is older or has a low-power graphics processor.

The current vehicle is procedural and intentionally lightweight. If the project later adds GLB models, high-resolution textures, HDR environments, or video backgrounds, measure their transfer size and decode cost before committing them. Prefer compressed textures, lazy loading, and reduced device pixel ratio on low-power devices.

## Troubleshooting

### The page is blank in the browser

Wait several seconds for the dev server and WebGL canvas to initialize, then refresh once. Confirm the process is running and that the browser is using the correct port:

```bash
pnpm dev
curl -I http://localhost:3000/
```

If the page still fails, inspect the browser Console for a module, canvas, or runtime error. A production check can help separate TypeScript problems from browser-only WebGL problems:

```bash
pnpm check
pnpm build
```

### `pnpm: command not found`

Enable Corepack and activate the repository’s pnpm version:

```bash
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm --version
```

### Dependencies do not install

Use the lockfile and avoid mixing package managers in the same checkout:

```bash
rm -rf node_modules
pnpm install --frozen-lockfile
```

Do not delete `pnpm-lock.yaml` unless you intentionally want to regenerate all dependency resolutions.

### WebGL is unavailable

The interface includes a CSS vehicle fallback so the hero can remain readable when WebGL is unavailable. For a full scene, use a browser with WebGL enabled and confirm that hardware acceleration is active. In a restricted or remote browser, the procedural canvas may be reduced while the UI remains usable.

### Audio does not start

This is normally caused by browser autoplay rules. Click the sound control after the page has loaded. Browsers intentionally block automatic audio before a user gesture.

### Codespaces preview does not open

Confirm that Vite is listening on the Codespaces interface and that port `3000` is forwarded:

```bash
pnpm exec vite --host 0.0.0.0 --port 3000
gh codespace ports forward 3000:3000 -c "$CODESPACE_NAME"
```

Then use the URL shown in the Codespaces **Ports** panel.

## Git workflow

A simple branch-and-push workflow for future changes is:

```bash
git status
git switch -c feature/vehicle-upgrade
pnpm install --frozen-lockfile
pnpm check
pnpm build
git add README.md client/src package.json pnpm-lock.yaml
git commit -m "Document AeroVision setup and Codespaces workflow"
git push -u origin feature/vehicle-upgrade
```

Before opening a pull request, include a short summary of visual changes, interaction changes, browser testing performed, and any known WebGL limitations.

## Deployment notes

This project is compatible with static frontend hosting that supports the Vite build output. The project’s managed hosting workflow can build and serve the application from the repository checkpoint. If you use an external provider, configure the build command as `pnpm run build` and the start command as `pnpm run start` when a Node server is required.

For the managed AeroVision deployment, the current public URL is:

<https://aerovision-6grqqn5d.manus.space>

Do not commit private tokens, credentials, user data, or generated secrets. The current project does not require application secrets for its public frontend experience.

## Design direction

The interface follows **Signal / Silence**, a restrained aerospace instrumentation language. Graphite backgrounds create visual depth, pale blue is reserved for telemetry and selected technical states, and Signal Orange is used for actions, live state, and attention markers. Typography combines a strong display face with a compact mono system so the page reads like an aircraft test console rather than a generic automotive landing page.

The full design rationale is recorded in [`ideas.md`](./ideas.md).

## Known limitations

The Core and Contact hotspots currently expose their details as inline specification cards rather than separate modal dialogs. The reservation modal is a frontend interaction and does not submit to a production lead-capture service. The procedural vehicle can be replaced later with a production GLB asset and a true camera-driven exploded animation if the project moves from showcase prototype to product launch site.

## License

This project is licensed under the MIT License as declared in `package.json`. Replace this section if the repository is later distributed under a different license or includes third-party assets with separate terms.

## References

[1]: https://docs.github.com/en/codespaces "GitHub Codespaces documentation"
[2]: https://pnpm.io/ "pnpm documentation"
[3]: https://vite.dev/guide/ "Vite guide"
[4]: https://threejs.org/docs/ "Three.js documentation"
[5]: https://r3f.docs.pmnd.rs/getting-started/introduction "React Three Fiber documentation"
