import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Button, Card, CardHeader, Text, tokens } from '@fluentui/react-components';
import { generateId } from '../state/store';
import type { DesignerNode } from '../state/store';

const palette: Omit<DesignerNode, 'id'>[] = [
  { kind: 'trigger', label: 'When schedule runs' },
  { kind: 'condition', label: 'Condition' },
  { kind: 'sendEmail', label: 'Send email' },
  { kind: 'postTeams', label: 'Post to Teams' },
  { kind: 'delay', label: 'Delay' },
];

export default function Designer() {
  const [nodes, setNodes] = useState<DesignerNode[]>([]);

  function add(kind: DesignerNode['kind'], label: string) {
    setNodes((n) => [...n, { id: generateId('node'), kind, label }]);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = nodes.findIndex((n) => n.id === active.id);
      const newIndex = nodes.findIndex((n) => n.id === over.id);
      setNodes((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Text as="h2" weight="semibold">Designer</Text>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: tokens.spacingHorizontalM }}>
        <Card>
          <CardHeader header={<Text weight="semibold">Palette</Text>} />
          <div style={{ display: 'grid', gap: 8 }}>
            {palette.map((p) => (
              <Button key={p.kind} appearance="secondary" onClick={() => add(p.kind as any, p.label)}>
                {p.label}
              </Button>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader header={<Text weight="semibold">Canvas</Text>} />
          <DndContext onDragEnd={onDragEnd}>
            <SortableContext items={nodes.map((n) => n.id)} strategy={rectSortingStrategy}>
              <div style={{ display: 'grid', gap: 8 }}>
                {nodes.map((n) => (
                  <SortableNode key={n.id} id={n.id} label={n.label} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </Card>
      </div>
    </div>
  );
}

function SortableNode({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Button appearance="outline" style={{ width: '100%' }}>{label}</Button>
    </div>
  );
}
