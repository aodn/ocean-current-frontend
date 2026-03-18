import useProductStore from '@/stores/product-store/productStore';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { useQueryParams } from '@/hooks';
import { currentMeterSYearOptionsData } from '@/data/current-meter/sidebarOptions';
import { RootProductID } from '@/types/product';

const MapSidebar: React.FC = () => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const useProductId = useProductStore((state) => state.productParams.productId);
  const productIdWithoutSubProduct = useProductId.split('-')[0];

  const handleProductChange = (id: RootProductID) => {
    if (id === productIdWithoutSubProduct) {
      return;
    }

    let queryToUpdate = { region: null } as Record<string, string | null>;

    // EAC Mooring Array has data from only one region, we're setting the region automatically so user shouldn't need to manually select the region
    if (id === 'EACMooringArray') {
      queryToUpdate = { region: 'Brisbane' };
    }

    if (id === 'currentMeters') {
      queryToUpdate = { date: currentMeterSYearOptionsData[0].id, region: null };
    }

    const targetPath = getProductPathWithSubProduct(id);
    updateQueryParamsAndNavigate(targetPath, queryToUpdate);
  };

  return (
    <div className="w-full overflow-hidden rounded bg-[#fff] p-4 shadow" data-testid="drop-down-menu">
      {sidebarProductsNav.map(({ id, label, Icon }) => (
        <div
          key={id}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleProductChange(id);
            }
          }}
          className={`mb-4 flex cursor-pointer items-center rounded-md border border-imos-calypso-blue p-3 duration-300 hover:border-imos-sea-blue hover:bg-imos-hover-blue hover:bg-opacity-20 ${id === productIdWithoutSubProduct ? 'border-imos-sea-blue bg-imos-sea-blue/50' : 'bg-white'}`}
          onClick={() => handleProductChange(id)}
        >
          {Icon && <Icon className="mr-4 h-9 w-9" color="imos-grey" aria-label={label} />}
          <span className="text-left text-base text-imos-dark-grey">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default MapSidebar;
