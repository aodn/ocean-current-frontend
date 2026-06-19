import { GlossaryData } from './GlossaryData';
import { ReferencesData } from './ReferencesData';

export interface InfoContent {
  title: string;
  description: () => JSX.Element;
}

export const infoContentBySlug: Record<string, InfoContent> = {
  glossary: {
    title: 'Some explanation of oceanographic terminology, techniques and principles',
    description: GlossaryData,
  },
  references: {
    title: 'References',
    description: ReferencesData,
  },
};
