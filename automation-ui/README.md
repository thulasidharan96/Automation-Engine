# Automation Studio (UI + Backend Stubs)

Front-end demo inspired by Microsoft Power Automate with optional backend stubs. UI is deployable to GitHub Pages. Backend is optional for local testing and shows how MSAL and Power Automate triggers can be wired.

## Features

- Dashboard with quick links
- Template gallery (Power Automate-like)
- Dynamic configuration forms generated from template definitions
- My Automations list with local persistence (localStorage)
- Drag-and-drop designer canvas (basic) using dnd-kit
- Fluent UI 9 app shell, header, nav, and theming
- Hash-based routing for static hosting

## Tech Stack

- React 19, TypeScript, Vite
- Fluent UI 9 (`@fluentui/react-components`)
- React Router v6 (`HashRouter` via `createHashRouter`)
- Zustand for simple state and local persistence
- dnd-kit for drag-and-drop

## Project Structure

```
automation-ui/
  src/
    components/
      AppShell.tsx          # Fluent UI layout, header, nav, outlet
      DynamicForm.tsx       # Generates fields from template definitions
      RequireAuth.tsx       # Unused in demo (kept for future auth)
    data/
      templates.ts          # Template definitions (Excel alert, List digest, Teams message)
    pages/
      Dashboard.tsx         # Landing page after 'Sign in'
      Login.tsx             # Dummy login that routes to Dashboard
      Gallery.tsx           # Template gallery list
      ConfigureTemplate.tsx # Dynamic form for selected template
      MyAutomations.tsx     # List of saved automations (localStorage)
      Designer.tsx          # Basic drag & drop canvas
      Profile.tsx           # Demo profile page
    state/
      store.ts              # Zustand store, types, ids, persistence
    main.tsx                # Hash router and routes
    index.css               # Minimal global styles
  vite.config.ts            # Base configured for GH Pages
  package.json              # Scripts including deploy via gh-pages
```

## Running Locally (UI only)

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Routing Model (No Backend, No Auth)

- The app uses a dummy `Login` page. Clicking "Sign in" simply routes to `#/dashboard`.
- All pages are accessible; there is no auth gating.
- Routes use hash URLs so they work on GitHub Pages:
  - `#/dashboard`
  - `#/gallery`
  - `#/configure/:templateKey`
  - `#/automations`
  - `#/designer`
  - `#/profile`

## Template System (UI Only)

Templates are defined in `data/templates.ts` and rendered in the gallery. Each template includes a `parameters` array that drives the dynamic form.

Example template shape:

```ts
interface TemplateDefinition {
  key: string;
  title: string;
  description: string;
  parameters: {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'boolean' | 'choice';
    required?: boolean;
    options?: string[];
  }[];
}
```

Saving a configuration creates a local item in `My Automations`. There is no server; data persists in `localStorage` via Zustand's `persist` middleware.

## Designer (UI Mock)

The Designer page offers a minimal canvas. You can add nodes from a palette and reorder them via drag-and-drop. This is a UI placeholder for future logic.

## Deploy to GitHub Pages

Prerequisites:
- A GitHub repository with this project at the root or in a subfolder.
- GitHub Actions or local terminal access.

Vite config is set to use a `base` path when `GITHUB_PAGES=1` is present, and we deploy the `dist` folder via `gh-pages`.

### One-time setup

1. Ensure `homepage` path (repo name) in `vite.config.ts` base matches your repository name. It defaults to `/automation-ui/`. Update it if your repo is different.
2. Install dependencies:

```bash
npm install
```

3. Ensure `gh-pages` is installed (already in `devDependencies`).

### Deploy from local

```bash
npm run deploy
```

This runs a build and publishes `dist` to the `gh-pages` branch.

Then enable GitHub Pages in your repo settings targeting the `gh-pages` branch.

### Deploy via GitHub Actions (optional)

Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GH Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: write
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
        env:
          GITHUB_PAGES: '1'
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

If using Actions, you can remove the `gh-pages` dev dependency and scripts and rely solely on the action.

## Optional Backend (Node/Express) — commented MSAL integration

The `server/` folder contains an Express server with stub endpoints and commented MSAL On-Behalf-Of (OBO) flow. This is provided for future integration. For now, you can run it locally to simulate a trigger call without any real cloud dependencies.

Folder structure:

```
server/
  index.js         # Express app with stubbed routes
  package.json
  .env.example     # Environment variables (MSAL + Flow endpoint), commented
```

Install and run (optional):

```bash
cd server
npm install
npm run start
# visit http://localhost:3001/health
```

Endpoints:
- POST `/automations/trigger` — accepts `{ templateKey, customParameters }` and returns `{ status: 'queued' }` (stub). Replace with a Power Automate HTTP Request trigger URL by setting `FLOW_ENGINE_URL` in `.env` and uncommenting the fetch block.
- GET `/templates` — placeholder for fetching template library (would come from SharePoint list via Microsoft Graph).
- POST `/configurations` — placeholder to save a configuration (would write to SharePoint list).

Commented MSAL OBO outline (server/index.js):
1. Configure `@azure/msal-node` `ConfidentialClientApplication` with `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.
2. Receive a user token from the front-end (Authorization: Bearer <token>), call `acquireTokenOnBehalfOf` to get an access token for downstream APIs (Graph or your custom Engine API).
3. Call your Engine API or Graph with the OBO access token.

Power Automate Engine Flow trigger options:
- HTTP Request trigger (simple): Expose a URL with a function key and POST `{ templateKey, customParameters }` from `/automations/trigger`.
- Secured custom API: Protect with AAD; the server obtains an access token via MSAL OBO and calls the API.

SharePoint Lists (for production):
- Automation Templates (definition library)
- Automation Configurations (user configurations)

Front-end wiring for backend (future):
- Replace local Zustand persistence in `My Automations` with calls to `/configurations`.
- Replace `data/templates.ts` with a fetch to `/templates`.

## Optional Front-end MSAL (commented scaffold)

For production auth, the front-end includes a commented MSAL scaffold in `src/auth/msal.ts` and a commented "Sign in with Microsoft" button in `src/pages/Login.tsx`.

To enable:
1. Set env vars in a `.env` (or `.env.local`):
   - `VITE_AZURE_CLIENT_ID`
   - `VITE_AZURE_TENANT_ID`
   - `VITE_REDIRECT_URI` (optional; defaults to window.location.origin)
2. Uncomment the imports and button in `Login.tsx`.
3. Create the MSAL provider at app root (wrap router) if you want full token handling across pages.

Server-side OBO (see `server/index.js`) can exchange front-end tokens for downstream API calls to Graph or a custom Engine API.

## How to Add More Templates

1. Edit `src/data/templates.ts` and add a new object to the `templates` array.
2. Use parameter `type` to control the rendered field.
3. The `ConfigureTemplate` page will automatically render the form and save the result to `My Automations`.

## Notes

- This is a UI-only demo patterned after Power Automate. No Microsoft Graph or SharePoint calls are made.
- MSAL libraries are installed but not used; kept for future integration.
- For a custom repo name, change `base` in `vite.config.ts` and rerun `npm run deploy`.
