import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const ConversionRatioQuickShop: React.FC = () => {
    const data = useSelector((state: RootState) => state.quickShopDashboard.quickShopConversionRatioGraph);
    const loader = useSelector((state: RootState) => state.quickShopDashboard.quickShopConversionRatioGraphLoader);
    return <AdOptBarChart data={data || []} loading={loader} />;
};

export default ConversionRatioQuickShop;
