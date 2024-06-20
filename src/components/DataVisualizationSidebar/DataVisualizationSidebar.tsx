import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import ProductSideBar from './components/ProductSidebar';
import ArgoSideBar from './components/ArgoSideBar';

const DataVisualizationSidebar: React.FC = () => {
  const { isArgo } = useProductCheck();

  return <>{isArgo ? <ArgoSideBar /> : <ProductSideBar />}</>;
};

export default DataVisualizationSidebar;
