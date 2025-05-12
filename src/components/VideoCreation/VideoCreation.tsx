import React from 'react';
import ActiveVideoCreation from './ActiveVideoCreation';
import DisabledVideoCreation from './DisabledVideoCreation';

interface VideoCreationProps {
  disabled?: boolean;
}

const VideoCreation: React.FC<VideoCreationProps> = ({ disabled = false }) => {
  if (disabled) {
    return <DisabledVideoCreation />;
  }
  return <ActiveVideoCreation />;
};

export default VideoCreation;
