import { Button } from '@/components/Shared';
import { VideoIcon } from '@/components/Shared/Icons/ui';
import { ProductMenubarText } from '@/constants/textConstant';

interface Props {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const VideoToggleButton = ({ active, disabled, onClick }: Props) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    borderRadius="extraSmall"
    className={`flex-center h-full w-full border-none px-2! md:p-3 md:px-5 ${active ? '' : 'bg-white'}`}
    aria-label="Toggle video"
    aria-pressed={!!active}
  >
    <VideoIcon color={active ? 'imos-white' : 'imos-deep-blue'} size="xl" className="shrink-0" />
    <p
      className={`ml-2 text-sm md:ml-3 md:w-20 md:text-base ${active ? 'text-white' : 'text-imos-deep-blue md:text-imos-dark-grey'}`}
    >
      {ProductMenubarText.VIDEO}
    </p>
  </Button>
);

export default VideoToggleButton;
