import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Field, Input, Option, Text } from '@fluentui/react-components';
import { useAutomationStudio, generateId } from '../state/store';
import type { Frequency } from '../state/store';
import { DynamicForm } from '../components/DynamicForm';

export default function ConfigureTemplate() {
  const { templateKey } = useParams();
  const navigate = useNavigate();
  const templates = useAutomationStudio((s) => s.templates);
  const addAutomation = useAutomationStudio((s) => s.addAutomation);
  const user = useAutomationStudio((s) => s.user);

  const template = useMemo(() => templates.find((t) => t.key === templateKey), [templates, templateKey]);
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('Daily');

  if (!template) {
    return <Text>Template not found.</Text>;
  }

  function setValue(key: string, value: unknown) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function save() {
    const id = generateId('automation');
    addAutomation({
      id,
      title: title || template!.title,
      ownerEmail: user?.email ?? 'unknown@contoso.com',
      templateKey: template!.key,
      isEnabled: true,
      customParameters: values,
      frequency,
      lastRunTime: undefined,
    });
    navigate(`/automations`);
  }

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 680 }}>
      <Text as="h2" weight="semibold">Configure: {template.title}</Text>
      <Field label="Title">
        <Input value={title} onChange={(_, d) => setTitle(d.value)} placeholder={template?.title} />
      </Field>
      <Field label="Frequency">
        <Dropdown selectedOptions={[frequency]} onOptionSelect={(_, d) => setFrequency(d.optionValue as Frequency)}>
          <Option value="Daily">Daily</Option>
          <Option value="Weekly">Weekly</Option>
          <Option value="Monthly">Monthly</Option>
        </Dropdown>
      </Field>
      {template && (
        <DynamicForm parameters={template.parameters} values={values} setValue={setValue} />
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <Button appearance="primary" onClick={save}>Save</Button>
        <Button appearance="secondary" onClick={() => navigate(-1)}>Cancel</Button>
      </div>
    </div>
  );
}
