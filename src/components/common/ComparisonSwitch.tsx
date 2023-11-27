import React from 'react';
import { Switch } from 'antd';

type Props = {
    onChange: any;
    compaison: boolean;
    title: string;
};

const ComparisonSwitch: React.FC<Props> = ({ onChange, compaison, title }) => {
    return (
        <>
            <div className="flex items-center py-3 px-3 rounded-lg bg-[#B4D0C133] mt-4">
                <p className="text-sm mr-2">{title}</p>
                <Switch defaultChecked={compaison} onChange={onChange} />
            </div>
        </>
    );
};

export default ComparisonSwitch;
