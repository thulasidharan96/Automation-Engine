import { Button, Text } from '@fluentui/react-components';
import { useAutomationStudio } from '../state/store';

export default function Profile() {
  const user = useAutomationStudio((s) => s.user);
  const signOut = useAutomationStudio((s) => s.signOut);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Text as="h2" weight="semibold">Profile</Text>
      <Text>Name: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
      <Button appearance="secondary" onClick={signOut}>Sign out</Button>
    </div>
  );
}
