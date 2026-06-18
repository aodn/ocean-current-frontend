import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { getProductByPath } from '@/utils/product-utils/product';
import { useRegionLatestDates } from '@/services/hooks/useRegionLatestDates';
import { ProductID, standaloneProductIDs, StandaloneProductID, RootProductID, ChildProductID } from '@/types/product';
import { Button } from '@/components/Shared';
import ErrorContent from '@/errors/error-content/ErrorContent';
import { GeneralText } from '@/constants/textConstant';
import { aboutContentByProductId } from './AboutData';

const AboutView: React.FC = () => {
  const { product: productPath, subProduct: subProductPath } = useParams<{
    product?: string;
    subProduct?: string;
  }>();
  const navigate = useNavigate();

  let mainProductKey: RootProductID | undefined;
  let subProductKey: ChildProductID | undefined;
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

  const aboutContent = mainProductKey ? aboutContentByProductId[mainProductKey] : null;
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

  if (!aboutContent) {
    return (
      <div className="flex md:min-h-200">
        <ErrorContent
          title="About Content Not Available"
          description="The about content for this product is not available."
        />
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="bg-imos-cloud-tint/70 flex items-center justify-center rounded-t-lg px-12 py-4">
        <h1 className="font-poppins text-imos-deep-blue text-center text-xl font-medium">{aboutContent.title}</h1>
      </div>
      <div className="px-6 pt-6 pb-6 md:px-10">
        <div className="mb-4">
          <Button onClick={() => navigate(explorePath)} borderRadius="small" type="secondary" className="md:px-4!">
            <span className="text-imos-deep-blue text-lg">{GeneralText.EXPLORE_DATASET}</span>
          </Button>
        </div>
        {aboutContent.description()}
      </div>
    </div>
  );
};

export default AboutView;
