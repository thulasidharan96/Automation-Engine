import { Button, Card, CardHeader, Caption1, Switch, Text, tokens } from '@fluentui/react-components';
import { useAutomationStudio } from '../state/store';

export default function MyAutomations() {
  const automations = useAutomationStudio((s) => s.automations);
  const updateAutomation = useAutomationStudio((s) => s.updateAutomation);
  const deleteAutomation = useAutomationStudio((s) => s.deleteAutomation);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Text as="h2" weight="semibold">My Automations</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: tokens.spacingHorizontalM }}>
        {automations.map((a) => (
          <Card key={a.id}>
            <CardHeader header={<Text weight="semibold">{a.title}</Text>} description={<Caption1>{a.templateKey} • {a.frequency}</Caption1>} />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Switch checked={a.isEnabled} onChange={(_, d) => updateAutomation(a.id, { isEnabled: d.checked })} label={a.isEnabled ? 'Enabled' : 'Disabled'} />
              <Button appearance="outline" onClick={() => console.log(a)}>View config</Button>
              <Button appearance="secondary" onClick={() => deleteAutomation(a.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
