import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import SimplePieChart from '../../../../Subscriptions/components/dashboard/Charts/components/SimplePieChart';
import QuickShopDashboardActions from '../../../redux/actions';

type Props = {
    startDate?: string;
    endDate?: string;
    revenueType?: string;
    siteId?: any;
};

const StatsQuickShop: React.FC<Props> = ({ startDate, endDate, revenueType, siteId }) => {
    const dispatch = useDispatch();
    const countryData = useSelector((state: RootState) => state.quickShopDashboard.quickShopCountryGraph);
    const countryLoader = useSelector((state: RootState) => state.quickShopDashboard.quickShopCountryGraphLoader);
    useEffect(() => {
        if (startDate && endDate) {
            dispatch(
                QuickShopDashboardActions.fetchQuickShopCountryGraph({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );
        }
    }, [startDate, endDate, revenueType, siteId, dispatch]);
    return (
        <div className="mt-8">
            <div className="flex flex-wrap flex-row gap-5">
                <div className=" w-[600px]">
                    <SimplePieChart compaison={false} loading={countryLoader} list={countryData || []} title={'Earning By Country'} prefix={'$'} suffix={''} chart={'QSEarnByCountry'} />
                </div>
                {/* <div className='grow min-w-[360px]' >
          <SimplePieChart compaison={false} loading={false} list={data01} title={'Earning By Devices'} prefix={"$"} suffix={""} chart={"QSEarnByDevice"} />
        </div> */}
            </div>
        </div>
    );
};

export default StatsQuickShop;

// const data01 = [
//   {
//     "name": "Group A",
//     "value": 400
//   },
//   {
//     "name": "Group B",
//     "value": 300
//   },
//   {
//     "name": "Group C",
//     "value": 300
//   },
//   {
//     "name": "Group D",
//     "value": 200
//   },
//   {
//     "name": "Other",
//     "value": 278
//   }
// ];
