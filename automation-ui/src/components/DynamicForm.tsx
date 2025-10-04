import { Field, Input, Textarea, Switch, Dropdown, Option } from '@fluentui/react-components';
import type { ParameterDefinition } from '../state/store';

export interface DynamicFormProps {
  parameters: ParameterDefinition[];
  values: Record<string, unknown>;
  setValue: (key: string, value: unknown) => void;
}

export function DynamicForm({ parameters, values, setValue }: DynamicFormProps) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {parameters.map((p) => (
        <Field key={p.id} label={p.label} required={p.required}>
          {p.type === 'text' && (
            <Input value={(values[p.id] as string) ?? ''} onChange={(_, data) => setValue(p.id, data.value)} placeholder={p.placeholder} />
          )}
          {p.type === 'textarea' && (
            <Textarea value={(values[p.id] as string) ?? ''} onChange={(_, data) => setValue(p.id, data.value)} placeholder={p.placeholder} />
          )}
          {p.type === 'number' && (
            <Input type="number" value={String(values[p.id] ?? '')} onChange={(_, data) => setValue(p.id, Number(data.value))} />
          )}
          {p.type === 'boolean' && (
            <Switch checked={Boolean(values[p.id])} onChange={(_, data) => setValue(p.id, data.checked)} />
          )}
          {p.type === 'choice' && (
            <Dropdown selectedOptions={[(values[p.id] as string) ?? '']} onOptionSelect={(_, data) => setValue(p.id, data.optionValue)}>
              {p.options?.map((opt) => (
                <Option key={opt} value={opt}>{opt}</Option>
              ))}
            </Dropdown>
          )}
        </Field>
      ))}
    </div>
  );
}
