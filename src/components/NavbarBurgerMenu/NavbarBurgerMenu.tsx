import { useLocation } from 'react-router';
import { linksData } from '@/data/linksData';
import { LinkOrAnchor, CollapsibleComponent, TriggerArgs } from '@/components/Shared';
import { ArrowIcon } from '../Shared/Icons';

const CollapsibleTrigger = ({ open, toggle, direction = 'down', toggleIconHidden = false, label }: TriggerArgs) => {
  const shouldRotate = direction === 'down' ? open : !open;
  return (
    <button
      className="w-full border-b bg-imos-pale-blue px-6 py-3"
      onClick={toggle}
      aria-expanded={open}
      aria-label={`${open ? 'Collapse' : 'Expand'} content`}
    >
      <div className="flex items-center justify-between">
        <div>{label}</div>
        {!toggleIconHidden && (
          <ArrowIcon
            color="imos-black"
            size="sm"
            className={`transition-transform duration-300 ease-in-out ${shouldRotate ? 'rotate-180' : ''}`}
          />
        )}
      </div>
    </button>
  );
};

const NavbarBurgerMenu = ({ closeMobileMenu }: { closeMobileMenu: () => void }) => {
  const location = useLocation();

  const isLinkActive = (url: string): boolean => {
    const processedCurrentPath =
      location.pathname.split('/product')[1] || location.pathname.split('/map')[1] || location.pathname;
    const linkPathProduct = url.split('?')[0].split('/map')[1];

    return processedCurrentPath.startsWith(linkPathProduct);
  };

  return (
    <nav className="mt-20 w-full bg-transparent px-4">
      <div className="overflow-hidden rounded-lg bg-imos-cloud-tint shadow-sm">
        {linksData.map((item, index) => (
          <div key={item.title}>
            <CollapsibleComponent
              defaultOpen={index === 0}
              disable={!item.links || item.links.length === 0}
              toggleIconHidden={!item.links || item.links.length === 0}
              wrapperClassName={`w-full border-imos-light-grey ${index === linksData.length - 1 ? '' : 'border-b-2'}`}
              trigger={({ toggle, open, direction, toggleIconHidden }: TriggerArgs) => (
                <CollapsibleTrigger
                  open={open}
                  toggle={toggle}
                  direction={direction}
                  toggleIconHidden={toggleIconHidden}
                  label={
                    item.url ? (
                      <LinkOrAnchor
                        className="mb-4 text-base font-medium text-gray-900"
                        to={item.url}
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </LinkOrAnchor>
                    ) : (
                      <span className="mb-4 text-base font-medium text-gray-900">{item.title}</span>
                    )
                  }
                />
              )}
            >
              {item.links && (
                <div className="my-[1px]">
                  {item.links?.length > 0 &&
                    item.links.map(({ id, url, Icon, title }) => (
                      <LinkOrAnchor
                        key={id}
                        className="mr-auto block w-full font-semibold text-gray-700"
                        to={url}
                        onClick={closeMobileMenu}
                      >
                        <p
                          className={`flex w-full items-center gap-x-4 p-3 ${isLinkActive(url) ? 'bg-imos-light-blue' : ''}`}
                        >
                          <Icon size="xxl" color="imos-grey" />
                          {title}
                        </p>
                      </LinkOrAnchor>
                    ))}
                </div>
              )}
            </CollapsibleComponent>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavbarBurgerMenu;
