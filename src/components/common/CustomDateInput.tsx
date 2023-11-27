import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { IoMdCalendar } from 'react-icons/io';

type Props = {
    width?: any;
    height?: any;
    selectedDate?: any;
    setSelectedDate?: any;
    style?: any;
    title?: any;
    disableDate?: any;
    format?: any;
};

const CustomDateInput: React.FC<Props> = ({ width, height, selectedDate, setSelectedDate, style, title, disableDate, format }) => {
    function handleDate(e: any) {
        setSelectedDate(e);
    }
    return (
        <div className="flex flex-col">
            <label className="text-[11px] text-[#566573]">{title}</label>
            <DatePicker
                clearIcon={true}
                style={{ width: `${width}px`, height: `${height}px`, border: '1px solid #566573' }}
                suffixIcon={<IoMdCalendar />}
                onChange={handleDate}
                value={selectedDate ? dayjs(selectedDate) : null}
                disabledDate={disableDate}
                format={format}
            />
            <label className="text-[10px] text-gray-600 pl-2">MM/DD/YYYY</label>
        </div>
    );
};

export default CustomDateInput;
