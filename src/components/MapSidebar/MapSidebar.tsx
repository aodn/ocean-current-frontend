import useProductStore from '@/stores/product-store/productStore';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { useQueryParams } from '@/hooks';
import { RootProductID } from '@/types/product';
import MenuList from '@/components/Shared/MenuList/MenuList';

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
      queryToUpdate = { region: null };
    }

    const targetPath = getProductPathWithSubProduct(id);
    updateQueryParamsAndNavigate(targetPath, queryToUpdate);
  };

  return (
    <div className="shadow-menu w-full overflow-hidden rounded-md">
      <MenuList
        showIcons
        widePadding
        elements={sidebarProductsNav}
        selectedId={productIdWithoutSubProduct as RootProductID}
        onItemClick={({ id }) => handleProductChange(id)}
        testId="map-sidebar-menu"
      />
    </div>
  );
};

export default MapSidebar;
