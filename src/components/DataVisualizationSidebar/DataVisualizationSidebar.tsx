import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import ProductSideBar from './components/ProductSidebar';
import ArgoSideBar from './components/ArgoSideBar';

const DataVisualiz2ationSidebar: React.FC = () => {
  const { isArgo } = useProductCheck();

  return <>{isArgo ? <ArgoSideBar /> : <ProductSideBar />}</>;
};

export default DataVisualiz2ationSidebar;
