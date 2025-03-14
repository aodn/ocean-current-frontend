import dayjs from 'dayjs';
import useProductStore from '@/stores/product-store/productStore';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { useDateRange, useQueryParams } from '@/hooks';
import { yearOptionsData } from '@/data/current-meter/sidebarOptions';
import { RootProductID } from '@/types/product';

const MapSidebar: React.FC = () => {
  const { updateQueryParamsAndNavigate } = useQueryParams();
  const { allDates, selectedDateIndex, formatDate } = useDateRange();
  const useProductId = useProductStore((state) => state.productParams.productId);
  const productIdWithoutSubProduct = useProductId.split('-')[0];
  const selectedDate = dayjs(allDates[selectedDateIndex]?.date).format(formatDate);

  const handleProductChange = (id: RootProductID) => {
    if (id === useProductId) {
      return;
    }

    let queryToUpdate = { date: selectedDate, region: null } as Record<string, string | null>;

    // EAC Mooring Array has data from only one region, we're setting the region automatically so user shouldn't need to manually select the region
    if (id === 'EACMooringArray') {
      queryToUpdate = { date: selectedDate, region: 'Brisbane' };
    }

    if (id === 'currentMeters') {
      queryToUpdate = { date: yearOptionsData[0].id, region: null };
    }

    const targetPath = getProductPathWithSubProduct(id);
    updateQueryParamsAndNavigate(targetPath, queryToUpdate);
  };

  return (
    <div className="w-full overflow-hidden rounded bg-[#fff] p-4 shadow" data-testid="drop-down-menu">
      {sidebarProductsNav.map((element) => (
        <div
          key={element.id}
          aria-hidden="true"
          className={`mb-4 flex cursor-pointer items-center rounded-md border border-[#3A6F8F] p-3 duration-300 hover:border-[#52BDEC] ${element.id === productIdWithoutSubProduct ? 'border-[#52BDEC] bg-[#52BDEC80]' : 'bg-white'}`}
          onClick={() => handleProductChange(element.id)}
        >
          <img className="mr-4 h-9 w-9" src={element.icon} alt={`${element.label} icon`} />
          <span className="text-left text-base text-[#787878]">{element.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MapSidebar;
