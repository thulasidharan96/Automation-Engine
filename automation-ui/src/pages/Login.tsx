import { useEffect } from 'react';
import { Button, Card, CardHeader, Field, Input, Text, tokens, makeStyles } from '@fluentui/react-components';
// import { msalInstance, loginRequest } from '../auth/msal';
import { useNavigate } from 'react-router-dom';
// No auth in demo

const useStyles = makeStyles({
  root: {
    display: 'grid',
    placeItems: 'center',
    minHeight: '100vh',
    background: tokens.colorNeutralBackground2,
  },
  card: {},
});

export default function Login() {
  const styles = useStyles();
  // This demo has no real auth; clicking Sign in just routes
  const navigate = useNavigate();
  // no-op

  useEffect(() => {
    document.title = 'Sign in • Automation Studio';
  }, []);

  function handleMockLogin() {
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">Sign in to continue</Text>} />
        <div style={{ display: 'grid', gap: 12 }}>
          {/*
          <Button appearance="primary" onClick={() => msalInstance?.loginRedirect(loginRequest as any)}>
            Sign in with Microsoft
          </Button>
          <Text size={200}>
            The Microsoft OAuth button above is commented in code. Uncomment imports and button, and set VITE_AZURE_CLIENT_ID, VITE_AZURE_TENANT_ID in your env.
          </Text>
          */}
          <Field label="Email">
            <Input placeholder="you@contoso.com" type="email" />
          </Field>
          <Field label="Password">
            <Input placeholder="••••••••" type="password" />
          </Field>
          <Button appearance="primary" onClick={handleMockLogin}>Sign in</Button>
          <Text size={200}>
            This demo uses mock auth. Replace with MSAL later.
          </Text>
        </div>
      </Card>
    </div>
  );
}
