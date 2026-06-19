import { GlossaryData } from './GlossaryData';
import { ReferencesData } from './ReferencesData';

export interface InfoContent {
  title: string;
  description: () => JSX.Element;
}

// Product-unrelated info page content, keyed by url slug. Rendered by InfoView
// at /info/<slug>. Mirrors the product about registry in AboutView/AboutData,
// but keyed by slug rather than product id.
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
