import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import AdOptBarChart from '../../../../AdOptimization/components/dashboard/Charts/components/BarChart';

const ItemsSoldQuickShop: React.FC = () => {
    const data = useSelector((state: RootState) => state.quickShopDashboard.quickShopItemsGraph);
    const loader = useSelector((state: RootState) => state.quickShopDashboard.quickShopItemsGraphLoader);
    return <AdOptBarChart data={data || []} loading={loader} />;
};

export default ItemsSoldQuickShop;
