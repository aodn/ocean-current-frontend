import React from 'react';
import AboutCard from './components/AboutCard';
import { GlossaryAboutData } from './AboutData/standalone/GlossaryAboutData';

const GlossaryView: React.FC = () => {
  return (
    <AboutCard title="Some explanation of oceanographic terminology, techniques and principles">
      <GlossaryAboutData />
    </AboutCard>
  );
};

export default GlossaryView;
