import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';
import SimplePieChart from '../../../../Subscriptions/components/dashboard/Charts/components/SimplePieChart';
import CrowdFundingDashboardActions from '../../../redux/actions';

type Props = {
    startDate?: string;
    endDate?: string;
    revenueType?: string;
    siteId?: any;
};

const StatsCrowdFunding: React.FC<Props> = ({ startDate, endDate, revenueType, siteId }) => {
    const dispatch = useDispatch();
    const earnByCountry = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingEarnByCountryPieGraph);
    const earnByCountryLoader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingEarnByCountryPieGraphLoader);

    const earnByDevices = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingEarnByDevicePieGraph);
    const earnByDevicesLoader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingEarnByDevicePieGraphLoader);

    const donorByCountry = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDonorByCountryPieGraph);
    const donorByCountryLoader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDonorByCountryPieGraphLoader);

    const donorByDevices = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDonorByDevicePieGraph);
    const donorByDevicesLoader = useSelector((state: RootState) => state.crowdFundDashboard.crowdFundingDonorByDevicePieGraphLoader);

    useEffect(() => {
        if (startDate && endDate) {
            dispatch(
                CrowdFundingDashboardActions.fetchCrowdFundEarningByCountryPieGraph({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );

            dispatch(
                CrowdFundingDashboardActions.fetchCrowdFundEarningByDevicesPieGraph({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );

            dispatch(
                CrowdFundingDashboardActions.fetchCrowdFundDonorByCountryPieGraph({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );

            dispatch(
                CrowdFundingDashboardActions.fetchCrowdFundDonorByDevicesPieGraph({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );
        }
    }, [dispatch, startDate, endDate, revenueType, siteId]);
    return (
        <div className="flex flex-col gap-5 mt-16">
            <div className="grid grid-cols-2 gap-5">
                <div className="grow  min-w-[360px]">
                    <SimplePieChart compaison={false} loading={earnByCountryLoader} list={earnByCountry} title={'Earnings By Country'} prefix={'$'} suffix={''} chart={'CFEarnByCountry'} />
                </div>
                <div className="grow  min-w-[360px]">
                    <SimplePieChart compaison={false} loading={earnByDevicesLoader} list={earnByDevices} title={'Earnings By Devices'} prefix={'$'} suffix={''} chart={'CFEarnByDevices'} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div className="grow min-w-[360px]">
                    <SimplePieChart compaison={false} loading={donorByCountryLoader} list={donorByCountry} title={'Donors By Country'} prefix={''} suffix={''} chart={'CFDonorByCountry'} />
                </div>
                <div className="grow min-w-[360px]">
                    <SimplePieChart compaison={false} loading={donorByDevicesLoader} list={donorByDevices} title={'Donors By Devices'} prefix={''} suffix={''} chart={'CFDonorByDevices'} />
                </div>
            </div>
        </div>
    );
};

export default StatsCrowdFunding;
