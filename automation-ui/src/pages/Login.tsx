import { useEffect } from 'react';
import { Button, Card, CardHeader, Field, Input, Text, tokens, makeStyles } from '@fluentui/react-components';
import { useAutomationStudio } from '../state/store';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    placeItems: 'center',
    minHeight: '100vh',
    background: tokens.colorNeutralBackground2,
  },
  card: {
    width: 420,
  },
});

export default function Login() {
  const styles = useStyles();
  const isAuthenticated = useAutomationStudio((s) => s.isAuthenticated);
  const signIn = useAutomationStudio((s) => s.signIn);

  useEffect(() => {
    document.title = 'Sign in • Automation Studio';
  }, []);

  function handleMockLogin() {
    signIn({ name: 'A. User', email: 'user@example.com' });
  }

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">Sign in to continue</Text>} />
        <div style={{ display: 'grid', gap: 12 }}>
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
