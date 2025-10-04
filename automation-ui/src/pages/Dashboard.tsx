import { Button, Card, CardHeader, Text, tokens } from '@fluentui/react-components';

export default function Dashboard() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Text as="h2" weight="semibold">Dashboard</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: tokens.spacingHorizontalM }}>
        <Card>
          <CardHeader header={<Text weight="semibold">Start with a template</Text>} />
          <Button as="a" href="#/gallery" appearance="primary">Browse templates</Button>
        </Card>
        <Card>
          <CardHeader header={<Text weight="semibold">Your automations</Text>} />
          <Button as="a" href="#/automations" appearance="secondary">View list</Button>
        </Card>
        <Card>
          <CardHeader header={<Text weight="semibold">Design a flow</Text>} />
          <Button as="a" href="#/designer" appearance="secondary">Open designer</Button>
        </Card>
      </div>
    </div>
  );
}
