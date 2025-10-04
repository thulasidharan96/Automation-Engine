import { useEffect } from 'react';
import { Button, Card, CardHeader, Text, tokens, makeStyles, Divider } from '@fluentui/react-components';
// import { msalInstance, loginRequest } from '../auth/msal';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: tokens.spacingHorizontalL,
    backgroundImage:
      `radial-gradient(1200px 600px at 10% -10%, ${tokens.colorBrandBackground2}22, transparent),` +
      `radial-gradient(800px 400px at 110% 10%, ${tokens.colorBrandBackground2}22, transparent),` +
      `${tokens.colorNeutralBackground3}`,
  },
  card: {
    width: '100%',
    maxWidth: '440px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  actions: {
    display: 'grid',
    gap: tokens.spacingVerticalS,
  },
  subtle: {
    color: tokens.colorNeutralForeground3,
  },
});

function MicrosoftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 23 23" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#F35325" />
      <rect x="12" y="1" width="9" height="9" fill="#81BC06" />
      <rect x="1" y="12" width="9" height="9" fill="#05A6F0" />
      <rect x="12" y="12" width="9" height="9" fill="#FFBA08" />
    </svg>
  );
}

export default function Login() {
  const styles = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sign in • Automation Studio';
  }, []);

  function signInWithMicrosoft() {
    // To enable real auth, uncomment imports and use:
    // (msalInstance as any)?.loginRedirect(loginRequest as any);
    navigate('/dashboard', { replace: true });
  }

  // function continueAsGuest() {
  //   navigate('/dashboard');
  // }

  return (
    <div className={styles.root}>
      <Card className={styles.card} appearance="filled-alternative">
        <CardHeader
          header={
            <div className={styles.brand}>
              <MicrosoftIcon />
              <Text weight="semibold">Automation Studio</Text>
            </div>
          }
        />

        <div style={{ display: 'grid', gap: 12 }}>
          <Text size={400} weight="semibold">Welcome back</Text>
          <Text className={styles.subtle}>Sign in to create and manage your automations</Text>

          <div className={styles.actions}>
            <Button appearance="primary" size="large" icon={<MicrosoftIcon />} onClick={signInWithMicrosoft}>
              Sign in with Microsoft
            </Button>

            {/* Uncomment the button below to use email/pass locally or keep SSO only */}
            {/* <Button appearance="secondary" onClick={continueAsGuest}>Continue as guest</Button> */}
          </div>

          <Divider />
          <Text size={200} className={styles.subtle}>
            OAuth is mocked in this demo. The button will route to your dashboard. To enable real OAuth, follow the README to configure MSAL and Azure AD.
          </Text>
        </div>
      </Card>
    </div>
  );
}
