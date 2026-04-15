import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { getProductByPath } from '@/utils/product-utils/product';
import { getProductInfoByKey } from '@/components/DataVisualisationSidebar/utils';
import { useRegionLatestDates } from '@/services/hooks/useRegionLatestDates';
import { ProductID, standaloneProductIDs, StandaloneProductID } from '@/types/product';
import { Button } from '@/components/Shared';
import ErrorContent from '@/errors/error-content/ErrorContent';
import { GeneralText } from '@/constants/textConstant';

const AboutView: React.FC = () => {
  const { product: productPath, subProduct: subProductPath } = useParams<{
    product?: string;
    subProduct?: string;
  }>();
  const navigate = useNavigate();

  let mainProductKey: string | undefined;
  let subProductKey: string | undefined;
  try {
    if (productPath) {
      const mainProduct = getProductByPath(productPath);
      mainProductKey = mainProduct.key;
      if (subProductPath) {
        const subProduct = getProductByPath(productPath, subProductPath);
        subProductKey = subProduct.key;
      }
    }
  } catch {
    // Invalid product path — fall through to error state
  }

  const productInfo = mainProductKey ? getProductInfoByKey(mainProductKey, subProductKey) : null;
  const isStandaloneMain = mainProductKey
    ? standaloneProductIDs.includes(mainProductKey as StandaloneProductID)
    : false;
  const leafProductId = (subProductKey || (isStandaloneMain ? mainProductKey : undefined)) as ProductID | undefined;
  const { data: latestDates } = useRegionLatestDates(leafProductId ?? ('' as ProductID), !!leafProductId);

  const latestRegion = latestDates?.regionLatestDates[0];
  const basePath = subProductPath ? `/product/${productPath}/${subProductPath}` : `/product/${productPath}`;
  const explorePath = latestRegion
    ? `${basePath}?region=${latestRegion.region}&date=${latestRegion.latestDate}`
    : basePath;

  if (!productInfo?.aboutDescription) {
    return (
      <div className="flex md:min-h-[800px]">
        <ErrorContent
          title="About Content Not Available"
          description="The about content for this product is not available."
        />
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="flex items-center justify-center rounded-t-lg bg-imos-cloud-tint/70 px-12 py-4">
        <h1 className="text-center font-poppins text-xl font-medium text-imos-deep-blue">
          {productInfo.aboutTitle || productInfo.title}
        </h1>
      </div>
      <div className="px-6 pb-6 pt-6 md:px-10">
        <div className="mb-4">
          <Button onClick={() => navigate(explorePath)} borderRadius="small" type="secondary" className="md:!px-4">
            <span className="text-lg text-imos-deep-blue">{GeneralText.EXPLORE_DATASET}</span>
          </Button>
        </div>
        {productInfo.aboutDescription()}
      </div>
    </div>
  );
};

export default AboutView;
