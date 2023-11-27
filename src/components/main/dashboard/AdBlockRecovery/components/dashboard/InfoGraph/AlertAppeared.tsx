import React from 'react';
import { VscCircleFilled } from 'react-icons/vsc';
import PercentagePieChart from '../../../../Subscriptions/components/dashboard/Charts/components/PercentagePieChart';

const AlertAppeared: React.FC = () => {
    return (
        <div className="bg-white py-5  rounded-xl drop-shadow-lg">
            {/* header */}
            <div className="mx-5">
                <div className="text-gray-400">No.of Times Alerts Appeared</div>
                <div className="font-bold text-[22px]">29,871</div>
            </div>

            {/* pieChart */}
            <div>
                <PercentagePieChart />
            </div>

            {/* footer */}
            <div className="mx-5">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <div>
                            <VscCircleFilled color="#296140" />
                        </div>
                        <div className="inter">Top Popup</div>
                    </div>
                    <div>7,213</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <div>
                            <VscCircleFilled color="#296140" />
                        </div>
                        <div className="inter">Middle Popup</div>
                    </div>
                    <div>7,213</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <div>
                            <VscCircleFilled color="#296140" />
                        </div>
                        <div className="inter">Bottom Popup</div>
                    </div>
                    <div>7,213</div>
                </div>
            </div>
        </div>
    );
};

export default AlertAppeared;
