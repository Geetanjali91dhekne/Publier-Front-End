import React from 'react';
import { VscCircleFilled } from 'react-icons/vsc';
import LineGraphWithoutAxis from '../../../../Subscriptions/components/dashboard/Charts/components/LineGraphWithoutAxis';

const ConversionRatio: React.FC = () => {
    return (
        <div className="bg-white py-5  rounded-xl drop-shadow-lg min-h-[340px]">
            <div className="font-bold text-[20px] mx-5">Conversion Ratio</div>

            <div className="flex flex-row mx-5 items-center">
                <div className="w-[40%] ">
                    <div className="font-bold text-[40px] pl-5">0.02</div>
                </div>
                <div className="w-[60%]">
                    <LineGraphWithoutAxis />
                </div>
            </div>

            <div className="mx-5 mt-10">
                <div className="flex flex-row gap-10 items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <div>
                            <VscCircleFilled color="#296140" />
                        </div>
                        <div className="inter">Adblock PVs</div>
                    </div>
                    <div>1,234,876</div>
                </div>
                <div className="flex flex-row gap-10 items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <div>
                            <VscCircleFilled color="#296140" />
                        </div>
                        <div className="inter">Whitelisted Times</div>
                    </div>
                    <div>32,000</div>
                </div>
            </div>
        </div>
    );
};

export default ConversionRatio;
