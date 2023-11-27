import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdBlockDashboardActions from '../../../redux/actions';
// import AlertAppeared from './AlertAppeared'
// import ConversionRatio from './ConversionRatio'
//import SubscribersType from './SubscribersType'
type Props = {
    startDate?: string;
    endDate?: string;
    siteId?: any;
    widgetId?: string|null;
};

const InfoGraph: React.FC<Props> = ({ startDate, endDate, siteId, widgetId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (startDate && endDate) {
            dispatch(
                AdBlockDashboardActions.fetchAdBlockBrowser({
                    start_date: startDate,
                    end_date: endDate,
                    site_id: siteId,
                    widget_id: widgetId,
                }),
            );
        }
    }, [startDate, endDate, dispatch, siteId, widgetId]);
    return (
        <div className="flex gap-5">
            {/* <div className='w-1/3'>
                    <AlertAppeared />
               </div> */}
            {/* <div className='w-full'>
                    <SubscribersType />
               </div> */}
            {/* <div className='w-1/3'>
                    <ConversionRatio />
               </div> */}
        </div>
    );
};

export default InfoGraph;
