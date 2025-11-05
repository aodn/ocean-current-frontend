import { LinkOrAnchor } from '@/components/Shared';
import { DetailedLink } from '@/types/navbar';

interface MenuItemProps {
  link: DetailedLink;
  isActive: boolean;
  onClick: () => void;
}

export const MenuItem = ({ link, isActive, onClick }: MenuItemProps) => {
  const { id, url, Icon, title } = link;

  return (
    <LinkOrAnchor key={id} className="mr-auto block w-full font-semibold text-gray-700" to={url} onClick={onClick}>
      <p className={`flex w-full items-center gap-x-4 p-3 ${isActive ? 'bg-imos-light-blue' : ''}`}>
        <Icon size="xxl" color="imos-grey" />
        {title}
      </p>
    </LinkOrAnchor>
  );
};
