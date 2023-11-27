import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const ProductPvsGraph: React.FC = () => {
    const data = useSelector((state: RootState) => state.quickShopDashboard.quickShopProductPvsGraph);
    const loader = useSelector((state: RootState) => state.quickShopDashboard.quickShopProductPvsGraphLoader);
    return <AdOptBarChart data={data || []} loading={loader} />;
};

export default ProductPvsGraph;
