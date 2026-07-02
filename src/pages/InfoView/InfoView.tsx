import React from 'react';
import { useParams } from 'react-router';
import { ArticleCard } from '@/components/Shared';
import ErrorContent from '@/errors/error-content/ErrorContent';
import { useScrollToHash } from '@/hooks/useScrollToHash/useScrollToHash';
import { infoContentBySlug } from './InfoData';

const InfoView: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  useScrollToHash();
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
