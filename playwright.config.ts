import { defineConfig, devices } from '@playwright/test';

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

/* Read the token saved by global setup; fall back to the env var it also sets */
function getAccessToken(): string | undefined {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '.auth/token.json'), 'utf-8')).accessToken;
  } catch {
    return process.env.ACCESS_TOKEN;
  }
}

export default defineConfig({
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'html',
  globalSetup: path.join(__dirname, '.auth/auth-setup.ts'),
  timeout: 90000,
  use: {
    baseURL: 'https://petclinic.bondaracademy.com',
    trace: 'on-first-retry',
    storageState: path.join(__dirname, '.auth/user.json'),
    extraHTTPHeaders: {
      'Authorization': `Bearer ${getAccessToken()}`
    },
    actionTimeout: 10000,
    viewport: {height: 1080, width: 1920}
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium'
      },
    },
  ],

});
