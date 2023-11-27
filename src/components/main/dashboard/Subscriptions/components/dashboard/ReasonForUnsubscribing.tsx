import React, { useEffect } from 'react';
import { Empty, Progress, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SubsDashboardAction from '../../redux/actions';
import { RootState } from '../../../../../../store/RootReducer';

type Props = {
    startDate: any;
    endDate: any;
    siteId: any;
};

const ReasonForUnsubscribing: React.FC<Props> = ({ startDate, endDate, siteId }) => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.subsDashboard.reasonForUnsubscriptionData);
    const loading = useSelector((state: RootState) => state.subsDashboard.reasonForUnsubscriptionLoader);
    useEffect(() => {
        dispatch(
            SubsDashboardAction.fetchReasonForUnSubscription({
                start_date: startDate,
                end_date: endDate,
                site_id: siteId,
            }),
        );
    }, [dispatch, startDate, endDate, siteId]);

    return (
        <div className="bg-white shadow-xl mt-10 rounded-lg">
            <div className="mx-5 flex justify-between py-5 border-b-[1px] border-[#B9B8B8]">
                <div className="font-bold text-[28px] mx-2">Reasons for Unsubscribing</div>
                <div className="flex flex-col items-end">
                    <div className="text-[22px]">Total Unsubscribers:</div>
                    <div className="font-bold text-[24px]">{data?.total_unsub}</div>
                </div>
            </div>
            {!loading && data?.unsub_data.length !== 0 && (
                <div className="mt-14 pb-14">
                    {data?.unsub_data?.map((item: any, key: any) => {
                        return (
                            <div key={key} className="flex mx-10 mt-7">
                                <div className="w-[250px]">{item.reason_for_cancel ? item.reason_for_cancel : 'Unknown'}</div>
                                <div className="grow">
                                    <Progress strokeWidth={20} strokeColor={'#166534'} percent={Number(parseFloat(item.percentage).toFixed(2))} format={(percentage) => `${percentage}%`} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {!loading && data?.unsub_data.length === 0 && (
                <div className="flex justify-center items-center h-40">
                    <Empty description={'No data found'} />
                </div>
            )}
            {loading && (
                <div className="flex justify-center items-center h-40">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default ReasonForUnsubscribing;
