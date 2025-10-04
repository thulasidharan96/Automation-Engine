// @ts-check
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import { ConfidentialClientApplication } from '@azure/msal-node';

const app = express();
app.use(cors({
  // origin: [/^http:\/\/localhost:\d+$/],
  // credentials: true,
}));
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

// ===== Auth (Authorization Code + PKCE) — commented template =====
/*
// Start login — redirect to Microsoft identity platform
app.get('/auth/login', async (req, res) => {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const redirectUri = process.env.AZURE_REDIRECT_URI;
  const scope = encodeURIComponent('openid profile offline_access');
  const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&response_mode=query&scope=${scope}`;
  res.redirect(authUrl);
});

// Redirect URI handler — exchange code for tokens
app.get('/auth/redirect', async (req, res) => {
  // const { code } = req.query;
  // const token = await msalApp.acquireTokenByCode({ code, redirectUri: process.env.AZURE_REDIRECT_URI, scopes: ['User.Read'] });
  // res.cookie('id_token', token.idToken, { httpOnly: true, secure: true, sameSite: 'lax' });
  // res.redirect('/');
  res.status(501).json({ error: 'auth redirect not enabled in demo' });
});

app.post('/auth/logout', async (req, res) => {
  // Invalidate session / clear cookies
  // res.clearCookie('id_token');
  res.json({ status: 'signed_out' });
});
*/

// ===== Me — Graph profile (commented) =====
/*
app.get('/me', async (req, res) => {
  // const userToken = extractBearer(req);
  // const graphToken = await acquireOboToken(userToken, ['https://graph.microsoft.com/User.Read']);
  // const me = await fetch('https://graph.microsoft.com/v1.0/me', { headers: { Authorization: `Bearer ${graphToken}` } }).then(r => r.json());
  // res.json(me);
  res.status(501).json({ error: 'me endpoint not enabled in demo' });
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
  /* Example (Graph):
  const siteId = process.env.SP_SITE_ID; // {hostname},{spsite-id},{spweb-id}
  const listId = process.env.SP_TEMPLATES_LIST_ID;
  const userToken = extractBearer(req);
  const graphToken = await acquireOboToken(userToken, ['https://graph.microsoft.com/.default']);
  const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items?expand=fields`; 
  const data = await fetch(url, { headers: { Authorization: `Bearer ${graphToken}` } }).then(r => r.json());
  */
  res.json({ items: [] });
});

// POST /configurations - save a configuration (placeholder for SharePoint create)
app.post('/configurations', async (req, res) => {
  res.status(201).json({ id: Date.now().toString(), ...req.body });
});

// PUT /configurations/:id — update configuration (stub)
app.put('/configurations/:id', async (req, res) => {
  res.json({ id: req.params.id, ...req.body });
});

// DELETE /configurations/:id — delete configuration (stub)
app.delete('/configurations/:id', async (req, res) => {
  res.status(204).send();
});

/** @type {number} */
const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
