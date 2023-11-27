import { Select } from 'antd';
import React from 'react';
const { Option } = Select;

type Props = {
    revenueType: string | undefined;
    setRevenueType: (f: string | undefined) => void;
};

const NetGrossFilter: React.FC<Props> = ({ revenueType, setRevenueType }) => {
    const handleChange = (value: string) => {
        setRevenueType(value);
    };

    return (
        <div className="flex flex-col" id="dateFilter">
            <label className="text-[10px]">Net Revenue / Gross Revenue</label>
            <Select value={revenueType} size="large" onChange={handleChange} className="w-44">
                <Option value="gross">Gross Revenue</Option>
                <Option value="net">Net Revenue</Option>
            </Select>
        </div>
    );
};

export default NetGrossFilter;
