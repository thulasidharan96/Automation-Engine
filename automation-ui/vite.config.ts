import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const isGitHubPages = process.env.GITHUB_PAGES === '1';
const repoNameFromEnv = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
const basePathOverride = process.env.VITE_GH_PAGES_BASE; // e.g. repo name
const basePath = isGitHubPages
  ? `/${(basePathOverride || repoNameFromEnv || '').replace(/^\/+|\/+$/g, '')}/`
  : '/';

export default defineConfig({
  plugins: [react()],
  base: basePath,
});
