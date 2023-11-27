import { Select, Tag } from 'antd';
import React from 'react';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

const { Option } = Select;
type Props = {
    title?: string | any;
    filterType?: string;
    value?: any;
    setValue?: any;
    width?: any;
    mode?: any;
    placeholder?: string;
    disabledSet?: any;
    disable?:boolean;
    defaultValue?: any;
    loader?: boolean;
    customClass?: any;
    dataList?: any;
};
const CommonDropDown: React.FC<Props> = ({ title, filterType,disable, value, setValue, width, mode, placeholder, defaultValue, disabledSet, loader, customClass, dataList }) => {
    const disableSet = new Set(disabledSet);

    const handleChange = (value: any) => {
        const empty = value?.length > 0 && value?.includes('All');
        if (empty) {
            if (value?.length > 1 && value[0] === 'All') {
                value?.splice(0, 1);
                setValue(value);
            } else {
                setValue(['All']);
            }
        } else {
            setValue(value);
        }
    };

    return (
        <div className="flex flex-col w-full" id="dateFilter">
            <label className="ml-1 montserrat mb-1">{title}</label>
            <Select
                defaultValue={defaultValue}
                disabled = {disable}
                value={value}
                mode={mode}
                size="large"
                onChange={handleChange}
                optionFilterProp="children"
                placeholder={placeholder}
                loading={loader}
                tagRender={(props: CustomTagProps) => {
                    const { label, closable, onClose } = props;
                    return (
                        <Tag
                            className="flex items-center rounded-lg flex-row py-0.5 px-2 bg-[#B4D0C133] text-[#056433] border-none"
                            style={{
                                margin: '5px 4px',
                                fontWeight: '500',
                                fontFamily: 'montserrat',
                            }}
                            closable={closable}
                            onClose={onClose}
                        >
                            {label}
                        </Tag>
                    );
                }}
                className={customClass ? customClass : `customSelector w-[${width}px] border rounded-lg overflow-auto font-[montserrat] `}
            >
                {dataList?.map((item: any, key: any) => {
                    return (
                        <Option
                            key={key}
                            value={item?.value}
                            // disabled={value?.length > 0 && ((value?.includes('All') && item?.value !== 'All') || (!value?.includes('All') && item?.value === 'All'))}
                            title={'location'}
                            className="font-[montserrat]"
                            disabled={disableSet.has(item?.value)}
                        >
                            {item.title}
                        </Option>
                    );
                })}
            </Select>
        </div>
    );
};


export default CommonDropDown;
