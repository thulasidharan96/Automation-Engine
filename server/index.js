import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import { ConfidentialClientApplication } from '@azure/msal-node';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MSAL (commented demo configuration)
// const msalConfig = {
//   auth: {
//     clientId: process.env.AZURE_CLIENT_ID,
//     authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
//     clientSecret: process.env.AZURE_CLIENT_SECRET,
//   },
// };
// const msalApp = new ConfidentialClientApplication(msalConfig);
//
// async function acquireOboToken(userAccessToken, scopes = ['https://graph.microsoft.com/.default']) {
//   const result = await msalApp.acquireTokenOnBehalfOf({
//     oboAssertion: userAccessToken,
//     scopes,
//   });
//   return result.accessToken;
// }

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// POST /auth/login - Exchange authorization code for tokens (commented out)
/*
app.post('/auth/login', async (req, res) => {
  // Implement Authorization Code with PKCE flow if hosting a backend for web
  // For local demo, front-end uses mock auth; backend remains stubbed
});
*/

// POST /automations/trigger - trigger Power Automate Engine flow
app.post('/automations/trigger', async (req, res) => {
  // Expected body: { templateKey: string, customParameters: object }
  const { templateKey, customParameters } = req.body || {};
  if (!templateKey) {
    return res.status(400).json({ error: 'templateKey is required' });
  }
  // Option A (recommended): Call a Power Automate HTTP Request trigger
  // const engineUrl = process.env.FLOW_ENGINE_URL; // e.g., https://prod-XX.azure-apim.net/.../invoke?code=...
  // if (engineUrl) {
  //   const r = await fetch(engineUrl, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ templateKey, customParameters }),
  //   });
  //   const data = await r.json().catch(() => ({}));
  //   return res.status(r.ok ? 200 : r.status).json({ status: r.ok ? 'queued' : 'error', response: data });
  // }

  // Option B: Call a secured Engine endpoint using AAD token (requires custom API)
  // const userToken = req.headers.authorization?.replace('Bearer ', '');
  // const engineScope = process.env.ENGINE_API_SCOPE?.split(',');
  // const accessToken = userToken ? await acquireOboToken(userToken, engineScope) : null;
  // const r = await fetch(process.env.ENGINE_API_URL, { headers: { Authorization: `Bearer ${accessToken}` }, ... });

  // Local demo fallback
  res.json({ status: 'queued', templateKey, customParameters, requestId: Date.now().toString() });
});

// GET /templates - fetch template library (placeholder for SharePoint list)
app.get('/templates', async (req, res) => {
  // In production, fetch from SharePoint list via Microsoft Graph or REST
  res.json({ items: [] });
});

// POST /configurations - save a configuration (placeholder for SharePoint create)
app.post('/configurations', async (req, res) => {
  res.status(201).json({ id: Date.now().toString(), ...req.body });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
