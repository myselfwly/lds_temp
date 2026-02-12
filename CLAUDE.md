# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**winopt_assistant** - A PC client desktop application built with React + TypeScript + Vite + TailwindCSS, designed to run within a CEF (Chromium Embedded Framework) browser environment. The project uses the MPA (Multi-Page Application) pattern via `vite-plugin-mpa-plus` for managing multiple windows.

**Client Baseline**: CEF 69 (equivalent to Chrome 69) - ensure compatibility when adding third-party scripts.

## Development Commands

### Core Commands
- `yarn dev` or `yarn dev:lds` - Start dev server (mode: lds, port: 5174)
- `yarn dev:lx` - Start dev server for Lenovo variant
- `yarn build:lds` / `yarn build:lx` / `yarn build:wv` - Platform-specific builds
- `yarn build_offline:lds` / `yarn build_offline:lx` / `yarn build_offline:wv` - Build with `@lds/encrypt-bundler` for offline packages
- `yarn preview` - Preview production build
- `yarn lint` / `yarn lint-fix` - ESLint code linting
- `yarn commit` - Commit with git-cz (conventional commits)

### Build & Deploy
- `yarn upload` - Upload build artifacts to OSS via `@lds/upload`
- `yarn analyze` - Visualize bundle size with vite-bundle-visualizer

### Testing
- `tsc -p tsconfig.json --noEmit` - Type checking (runs via lint-staged)

## Architecture

### MPA Structure
The project uses `vite-plugin-mpa-plus` for multi-window management. Each entry is defined in `vite.config.ts` under `mpa.pages`:

- **Main entry**: `src/mpa/main/index.tsx` - Primary window with `isMain=true` in `bridgeInit()`
- Additional entries can be added via `pc-cli mpa --name <name>` command

### Platform Variants (VIP Plugins)
The project supports multiple platforms (LDS, Lenovo, WV) through a VIP plugin system:

- Use `@vip` alias to import platform-specific code (resolves to `src/plugins/vip/lds/index.ts` by default)
- Platform variants configured in `vite.config.ts` via `vipPlugins(mode)` function
- Build mode selected via `--mode` flag (e.g., `vite --mode lds`)

### Client Bridge Communication
Uses `@lds/cef-bridge` for CEF browser communication:

- **`src/client/common.ts`** - Common client methods (login, user info, window controls)
- **`src/mpa/main/bridge.ts`** - BridgeModal integration with event registration
- **`src/mpa/main/bridge/event/`** - Event definitions
- **`src/mpa/main/store/vip.ts`** - VIP middleware integration

Bridge initialization requires `isMain` parameter:
```typescript
bridgeInit(true)  // Main window only; self-created windows use false
```

### State Management
- **Zustand** for global state (`src/store/`)
- **VIP Middleware** (`src/plugins/vip/`) - Handles membership/payments across platforms

### Styling
- **TailwindCSS** with custom config in `tailwind.config.js`
- Uses CSS variables for theming (light/dark mode support)
- `tailwindcss-animate` for animations (accordion-down, shake)

### Polyfill Handling
Polyfills are pre-processed via Babel in `vite.config.ts` (`processPolyfill()` function), targeting Chrome 49+ for legacy browser support.

## Key Path Aliases
```typescript
"@/*" → "src/*"
"@vip" → "src/plugins/vip/lds/index.ts" (platform-specific)
"~/*" → "src/*"
```

## Code Style Notes
- ESLint with `simple-import-sort` for import ordering
- Prettier for formatting
- Semicolons required; double quotes for strings
- `mpa/no-cross-mpa-imports` rule enforces isolation between MPA entries
- Direct imports from `src/plugins/vip/**` blocked - use `@vip` alias

## Offline Package Configuration
For `@lds/encrypt-bundler`, configure platform-specific keys:
- `encrypt-bundler.lds.config.js`
- `encrypt-bundler.lenovo.config.js`
- `encrypt-bundler.wv.config.js`

Each requires `fileName` and `key` properties.

## PM2 Development (Optional)
`ecosystem.config.cjs` configures PM2 for development:
- Runs on port 8083
- Logs to `pm2Logs/`
- Uses global Yarn for execution

## Client Logging
- **Client logs**: `log/<app>.log` in installation directory
- **JSBridge logs**: `%appdata%/JsBasic/log/<app>.js_basic.log` (primary debugging location)

## MCP Integration
API documentation available via Apifox MCP server (project ID: 7795789).
