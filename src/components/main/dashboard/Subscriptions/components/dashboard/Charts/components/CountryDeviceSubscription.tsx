import React, { useEffect } from 'react';
import SimplePieChart from './SimplePieChart';
import { useDispatch, useSelector } from 'react-redux';
import SubsDashboardAction from '../../../../redux/actions';
import { RootState } from '../../../../../../../../store/RootReducer';

type Props = {
    startDate: any;
    endDate: any;
    siteId: any;
};

const CountryDeviceSubscription: React.FC<Props> = ({ startDate, endDate, siteId }) => {
    const dispatch = useDispatch();
    const subsByCountry = useSelector((state: RootState) => state.subsDashboard.subscriptionByCountryGraph);
    const subsByCountryLoader = useSelector((state: RootState) => state.subsDashboard.subscriptionByCountryGraphLoader);
    const subsByDevice = useSelector((state: RootState) => state.subsDashboard.subscriptionByDeviceGraph);
    const subsByDeviceLoader = useSelector((state: RootState) => state.subsDashboard.subscriptionByDeviceGraphLoader);
    useEffect(() => {
        dispatch(
            SubsDashboardAction.fetchSubscriptionByCountry({
                start_date: startDate,
                end_date: endDate,
                site_id: siteId,
            }),
        );

        dispatch(
            SubsDashboardAction.fetchSubscriptionByDevice({
                start_date: startDate,
                end_date: endDate,
                site_id: siteId,
            }),
        );
    }, [startDate, endDate, dispatch, siteId]);

    return (
        <div className="grid grid-cols-2 gap-5 mt-16">
            <div className=" min-w-[360px]">
                <SimplePieChart compaison={false} loading={subsByCountryLoader} list={subsByCountry} title={'Subscription Page Views By Country'} prefix={''} suffix={''} chart={'country'} />
            </div>
            <div className=" min-w-[360px]">
                <SimplePieChart compaison={false} loading={subsByDeviceLoader} list={subsByDevice} title={'Subscriptions Page Views By Devices'} prefix={''} suffix={''} chart={'device'} />
            </div>
        </div>
    );
};

export default CountryDeviceSubscription;
