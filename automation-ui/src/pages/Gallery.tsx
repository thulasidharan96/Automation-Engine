import { Card, CardHeader, Button, Text, tokens, makeStyles, Body1, Caption1 } from '@fluentui/react-components';
import { useAutomationStudio, TemplateDefinition, generateId } from '../state/store';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: tokens.spacingHorizontalM,
  },
});

export default function Gallery() {
  const styles = useStyles();
  const templates = useAutomationStudio((s) => s.templates);

  return (
    <div>
      <Text as="h2" weight="semibold">Template Gallery</Text>
      <div className={styles.grid}>
        {templates.map((t) => (
          <TemplateCard key={t.key} template={t} />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: TemplateDefinition }) {
  return (
    <Card>
      <CardHeader header={<Text weight="semibold">{template.title}</Text>} />
      <Body1>{template.description}</Body1>
      <div style={{ height: 8 }} />
      <Button as={Link} to={`/configure/${template.key}`} appearance="primary">
        Use this template
      </Button>
      <div style={{ height: 8 }} />
      <Caption1>{template.parameters.length} parameters</Caption1>
    </Card>
  );
}
