import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { templates as defaultTemplates } from '../data/templates';

export type ThemeMode = 'light' | 'dark';

export type ParameterType = 'text' | 'textarea' | 'number' | 'boolean' | 'choice';

export interface ParameterDefinition {
  id: string;
  label: string;
  type: ParameterType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface TemplateDefinition {
  key: string;
  title: string;
  description: string;
  parameters: ParameterDefinition[];
  categories?: string[];
}

export interface UserProfile {
  name: string;
  email: string;
}

export type Frequency = 'Daily' | 'Weekly' | 'Monthly';

export interface AutomationConfig {
  id: string;
  title: string;
  ownerEmail: string;
  templateKey: string;
  isEnabled: boolean;
  customParameters: Record<string, unknown>;
  frequency: Frequency;
  lastRunTime?: string;
}

export interface DesignerNode {
  id: string;
  kind: 'trigger' | 'action' | 'condition' | 'sendEmail' | 'postTeams' | 'delay' | 'custom';
  label: string;
  data?: Record<string, unknown>;
}

interface AutomationStudioState {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;

  user: UserProfile | null;
  isAuthenticated: boolean;
  signIn: (profile: UserProfile) => void;
  signOut: () => void;

  templates: TemplateDefinition[];

  automations: AutomationConfig[];
  addAutomation: (config: AutomationConfig) => void;
  updateAutomation: (id: string, updates: Partial<AutomationConfig>) => void;
  deleteAutomation: (id: string) => void;

  designsByAutomationId: Record<string, DesignerNode[]>;
  setDesignForAutomation: (id: string, nodes: DesignerNode[]) => void;
}

export const useAutomationStudio = create<AutomationStudioState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (mode) => set({ theme: mode }),

      user: null,
      isAuthenticated: false,
      signIn: (profile) => set({ user: profile, isAuthenticated: true }),
      signOut: () => set({ user: null, isAuthenticated: false }),

      templates: defaultTemplates,

      automations: [],
      addAutomation: (config) => set({ automations: [...get().automations, config] }),
      updateAutomation: (id, updates) =>
        set({
          automations: get().automations.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        }),
      deleteAutomation: (id) =>
        set({ automations: get().automations.filter((a) => a.id !== id) }),

      designsByAutomationId: {},
      setDesignForAutomation: (id, nodes) =>
        set({ designsByAutomationId: { ...get().designsByAutomationId, [id]: nodes } }),
    }),
    {
      name: 'automation-studio-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        automations: state.automations,
        designsByAutomationId: state.designsByAutomationId,
      }),
    }
  )
);

export function generateId(prefix: string = 'id'): string {
  const random = Math.random().toString(36).slice(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${random}`;
}
