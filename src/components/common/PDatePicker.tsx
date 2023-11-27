import { DatePicker, DatePickerProps } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import moment from 'moment-timezone';

type Props = {
    value?: string;
    onChange: (d?: string) => void;
    title?: string;
    isRequired?: boolean;
    isDisableFuture?: boolean;
    className?: string;
};

const dateFormat = 'MM/DD/YYYY';

const PDatePicker: React.FC<Props> = ({ value, onChange, title, isRequired, isDisableFuture, className }) => {
    const onChangeField: DatePickerProps['onChange'] = (date, dateString) => {
        onChange(dateString);
    };

    return (
        <div className="flex flex-col">
            {title && (
                <label className="ml-1 montserrat">
                    {title}
                    <span className="text-red-500">{isRequired ? '*' : ''}</span>
                </label>
            )}
            <DatePicker
                className={`${className} montserrat`}
                disabledDate={(current) => (isDisableFuture ? current > moment().subtract(1, 'day') : false)}
                onChange={onChangeField}
                value={value !== undefined ? dayjs(value, dateFormat) : value}
                format={dateFormat}
            />
        </div>
    );
};

export default PDatePicker;
