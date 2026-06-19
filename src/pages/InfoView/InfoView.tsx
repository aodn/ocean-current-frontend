import React from 'react';
import { useParams } from 'react-router';
import { ArticleCard } from '@/components/Shared';
import ErrorContent from '@/errors/error-content/ErrorContent';
import { infoContentBySlug } from './InfoData';

// Renders a product-unrelated info page (e.g. glossary, references), looking up
// its content in the info registry by the :slug url segment. Adding a new page
// is registry-only — no routing changes needed. Mirrors AboutView, which does
// the same lookup for product-keyed about content.
const InfoView: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const content = slug ? infoContentBySlug[slug] : undefined;

  if (!content) {
    return (
      <div className="flex md:min-h-200">
        <ErrorContent title="Content Not Available" description="The content for this page is not available." />
      </div>
    );
  }

  return <ArticleCard title={content.title}>{content.description()}</ArticleCard>;
};

export default InfoView;
