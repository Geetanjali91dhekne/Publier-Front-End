import React, { useMemo } from 'react';
import { Empty, Progress, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/RootReducer';

const COLORS = ['#056433', '#0D934E', '#69A284', '#A9DFBF', '#D5F0E2'];

const SubscribersType: React.FC = () => {
    const data = useSelector((state: RootState) => state.adBlockDashboard.adBlockBrowserData);
    const loader = useSelector((state: RootState) => state.adBlockDashboard.adBlockBrowserDataLoader);
    let totalCount = 0;

    data?.forEach((el: any) => {
        totalCount += el?.count_browser;
    });

    const graphData = useMemo(() => {
        let d = [];
        if (data) {
            for (let i = 0; i < 4; i++) {
                if (data[i]) {
                    d.push({
                        borwser: data[i]?.browser,
                        count: data[i]?.count_browser,
                    });
                }
            }
        }
        if (data?.length > 4) {
            let start = 4;
            let end = data?.length;
            let otherdata = { borwser: 'Other', count: 0 };
            while (start < end) {
                otherdata.count += data[start]?.count_browser;
                start++;
            }
            d.push(otherdata);
        }

        return d;
    }, [data]);

    return (
        <div className="bg-white py-10 rounded-xl drop-shadow-lg ">
            <div className="font-bold text-[20px] mx-5">Browsers</div>

            <div className="flex flex-col gap-3 mt-8 mx-7">
                {!loader &&
                    graphData?.map((item: any, key: any) => (
                        <div key={key} className="flex ">
                            <div className="w-[250px]">{item?.borwser}</div>
                            <div className="flex  grow">
                                <Progress showInfo={false} strokeColor={COLORS[key]} strokeWidth={14} percent={(item.count / totalCount) * 100} />
                                <div className="w-[24px] flex justify-end">{item.count}</div>
                            </div>
                        </div>
                    ))}
                {loader && (
                    <div className="flex justify-center items-center">
                        <Spin />
                    </div>
                )}
                {!loader && data?.length === 0 && (
                    <div className="flex justify-center items-center h-40">
                        <Empty description={'No data found'} />
                    </div>
                )}
            </div>

            {/* <div className='flex'>
        <div className='w-1/3'></div>
        <div className='flex flex-end w-2/3 justify-between mx-5 mt-5'>
          <div>200</div>
          <div>300</div>
          <div>400</div>
        </div>
      </div> */}
        </div>
    );
};

export default SubscribersType;
