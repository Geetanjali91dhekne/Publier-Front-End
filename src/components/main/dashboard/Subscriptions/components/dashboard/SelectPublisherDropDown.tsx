import { Select } from 'antd';
import React from 'react';
const { Option } = Select;

type Props = {
    selectType: string | undefined;
    title: string | undefined;
    setSelectType: (f: string | undefined) => void;
};

const SelectPublisherDropDown: React.FC<Props> = ({ selectType, setSelectType, title }) => {
    const handleChange = (value: string) => {
        setSelectType(value);
    };

    return (
        <div className="flex flex-col" id="dateFilter">
            <label className="text-[10px]">{title}</label>
            <Select value={selectType} size="large" onChange={handleChange} className="w-44">
                <Option value="all">All</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
            </Select>
        </div>
    );
};

export default SelectPublisherDropDown;
