import React from 'react';
import { Checkbox, Switch } from 'antd';
import { InputNumber } from 'antd';

import CommonDropDown from '../../../../../../common/CommonDropDown';
type Props = {
    newPreset: any;
    setNewPreset: any;
};

const OtherPresets: React.FC<Props> = ({ newPreset, setNewPreset }) => {
    return (
        <div>
            {/* form */}
            <div className="mt-8 ml-8 pb-10 ">
                <div className="">
                    <div className="text-[15px] font-bold">AdBlock Recovery Notice deployment:</div>
                    <div className="flex gap-5 items-center mt-2 ">
                        <div className="w-full ">
                            <CommonDropDown
                                title="Location"
                                dataList={location}
                                value={newPreset?.notice_location}
                                setValue={(e: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        notice_location: e,
                                    });
                                }}
                                width={280}
                            />
                        </div>
                        <div className="w-full">
                            <CommonDropDown
                                title="Timing(After)"
                                dataList={timing_location_after}
                                value={newPreset.show_notice_after}
                                setValue={(e: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        show_notice_after: e,
                                    });
                                }}
                                width={280}
                            />
                        </div>
                    </div>
                </div>

                <div className=" mt-10">
                    <div className="flex justify-between items-center">
                        <div className="text-[15px] font-bold ">Stop Showing Notice After*</div>
                        <div>
                            <Switch
                                checked={newPreset?.hide_notice_status}
                                onClick={(e) => {
                                    setNewPreset({
                                        ...newPreset,
                                        hide_notice_status: !newPreset?.hide_notice_status,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className={newPreset?.hide_notice_status ? 'flex gap-5 items-center mt-5' : 'flex gap-5 items-center mt-5 pointer-events-none opacity-20'}>
                        <div className="w-full ">
                            <CommonDropDown
                                title="Timing"
                                filterType="timing_notice"
                                dataList={timing_notice}
                                value={newPreset?.hide_notice}
                                setValue={(e: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        hide_notice: e,
                                    });
                                }}
                                width={280}
                            />
                        </div>
                        <div className="w-full">
                            <CommonDropDown
                                title="Timing(After)"
                                filterType="timing_notice_after"
                                dataList={timing_notice_after}
                                value={newPreset?.hide_notice_for}
                                setValue={(e: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        hide_notice_for: e,
                                    });
                                }}
                                width={280}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex justify-between items-center">
                        <div className="text-[15px] font-bold ">Lock Access After*</div>
                        <div>
                            <Switch
                                checked={newPreset?.lock_access_status}
                                onClick={(e) => {
                                    setNewPreset({
                                        ...newPreset,
                                        lock_access_status: !newPreset?.lock_access_status,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className={newPreset?.lock_access_status ? 'flex gap-5 items-center mt-5' : 'flex gap-5 items-center mt-5 pointer-events-none opacity-20'}>
                        <div className="w-full ">
                            <CommonDropDown
                                title="Timing"
                                filterType="timing_access"
                                dataList={timing_access}
                                value={newPreset?.lock_access}
                                setValue={(e: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        lock_access: e,
                                    });
                                }}
                                width={280}
                            />
                        </div>
                        <div className="w-full">
                            <CommonDropDown
                                title="Timing(After)"
                                filterType="timing_access_after"
                                dataList={timing_access_after}
                                value={newPreset?.lock_access_for}
                                setValue={(e: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        lock_access_for: e,
                                    });
                                }}
                                width={280}
                            />
                        </div>
                    </div>
                </div>

                <div className="pl-1 pt-5">
                    <div className="mt-12">
                        <Checkbox
                            checked={newPreset?.allow_close}
                            onChange={() => {
                                setNewPreset({
                                    ...newPreset,
                                    allow_close: !newPreset?.allow_close,
                                });
                            }}
                            style={{ gap: '20px', fontWeight: 'bold', fontSize: '14px', fontFamily: 'Roboto' }}
                            className="customCheckBox"
                        >
                            {'Allow Close'}
                        </Checkbox>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-9">
                        <Checkbox
                            onChange={() => {
                                setNewPreset({
                                    ...newPreset,
                                    blur_content: !newPreset?.blur_content,
                                });
                            }}
                            checked={newPreset.blur_content}
                            style={{ gap: '20px', fontWeight: 'bold', fontSize: '14px', fontFamily: 'Roboto' }}
                            className="customCheckBox"
                        >
                            {'Blur Site Content Behind Notice'}
                        </Checkbox>

                        <div className={newPreset?.blur_content ? '' : 'pointer-events-none opacity-20'}>
                            <div className="text-[14px] ml-1 montserrat">Blur Content Percentage</div>
                            <InputNumber
                                min={1}
                                max={100}
                                title="Blur Content Percentage "
                                className="flex items-center"
                                defaultValue={1}
                                value={newPreset?.blur_content_percentage}
                                style={{ width: '280px', height: '40px', padding: '10px' }}
                                onChange={(e: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        blur_content_percentage: e,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <Checkbox
                            style={{ gap: '20px', fontWeight: 'bold', fontSize: '14px', fontFamily: 'Roboto' }}
                            className="customCheckBox"
                            checked={newPreset?.show_whitelist_instructions}
                            onChange={() => {
                                setNewPreset({
                                    ...newPreset,
                                    show_whitelist_instructions: !newPreset?.show_whitelist_instructions,
                                });
                            }}
                        >
                            {'Show Whitelist Instructions'}
                        </Checkbox>
                    </div>

                    <div className="mt-8">
                        <Checkbox
                            style={{ gap: '20px', fontWeight: 'bold', fontSize: '14px', fontFamily: 'Roboto' }}
                            className="customCheckBox"
                            checked={newPreset?.show_visits_left}
                            onChange={() => {
                                setNewPreset({
                                    ...newPreset,
                                    show_visits_left: !newPreset?.show_visits_left,
                                });
                            }}
                        >
                            {'Show visits left before user is locked out (Lock Access must be enabled)'}
                        </Checkbox>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherPresets;

export const location = [
    { title: 'Top', value: 'top' },
    { title: 'Bottom', value: 'bottom' },
    { title: 'Pop Up', value: 'popup' },
];

export const timing_location_after = [
    {
        title: 'Every Page View',
        value: '0',
    },
    {
        title: 'First Page View',
        value: '1',
    },
    {
        title: 'Second Page View',
        value: '2',
    },
    {
        title: 'Third Page View',
        value: '3',
    },
    {
        title: 'Fourth Page View',
        value: '4',
    },
    {
        title: 'Fifth Page View',
        value: '5',
    },
    {
        title: 'Sixth Page View',
        value: '6',
    },
    {
        title: 'Seventh Page View',
        value: '7',
    },
    {
        title: 'Eighth Page View',
        value: '8',
    },
    {
        title: 'Ninth Page View',
        value: '9',
    },
    {
        title: 'Tenth Page View',
        value: '10',
    },
    {
        title: 'Never',
        value: 'No',
    },
];

export const timing_notice = [
    {
        title: 'First Time',
        value: '1',
    },
    {
        title: 'Second Time',
        value: '2',
    },
    {
        title: 'Third Time',
        value: '3',
    },
    {
        title: 'Fourth Time',
        value: '4',
    },
    {
        title: 'Fifth Time',
        value: '5',
    },
    {
        title: 'Six Time',
        value: '6',
    },
    {
        title: 'Seventh Time',
        value: '7',
    },
    {
        title: 'Eight Time',
        value: '8',
    },
    {
        title: 'Nine Time',
        value: '9',
    },
    {
        title: 'Tenth Time',
        value: '10',
    },
];

const timing_notice_after = [
    {
        title: '1 Minute',
        value: '1',
    },
    {
        title: '2 Minutes',
        value: '2',
    },
    {
        title: '5 Minutes',
        value: '5',
    },
    {
        title: '10 Minutes',
        value: '10',
    },
    {
        title: '30 Minutes',
        value: '30',
    },
    {
        title: '1 Hour',
        value: '60',
    },
    {
        title: '2 Hours',
        value: '120',
    },
    {
        title: '12 Hours',
        value: '720',
    },
    {
        title: '24 Hours',
        value: '1440',
    },
    {
        title: '36 Hours',
        value: '2160',
    },
    {
        title: '48 Hours',
        value: '2880',
    },
    {
        title: '5 Days',
        value: '7200',
    },
    {
        title: '1 Week',
        value: '10080',
    },
    {
        title: '1 Month',
        value: '43800',
    },
];

export const timing_access = [
    {
        title: '1 Free Visit',
        value: '1',
    },
    {
        title: '2 Free Visit',
        value: '2',
    },
    {
        title: '3 Free Visit',
        value: '3',
    },
    {
        title: '4 Free Visit',
        value: '4',
    },
    {
        title: '5 Free Visit',
        value: '5',
    },
    {
        title: '6 Free Visit',
        value: '6',
    },
    {
        title: '7 Free Visit',
        value: '7',
    },
    {
        title: '8 Free Visit',
        value: '8',
    },
    {
        title: '9 Free Visit',
        value: '9',
    },
    {
        title: '10 Free Visit',
        value: '10',
    },
];

export const timing_access_after = [
    {
        title: '1 Minute',
        value: '1',
    },
    {
        title: '2 Minutes',
        value: '2',
    },
    {
        title: '5 Minutes',
        value: '5',
    },
    {
        title: '10 Minutes',
        value: '10',
    },
    {
        title: '30 Minutes',
        value: '30',
    },
    {
        title: '1 Hour',
        value: '60',
    },
    {
        title: '2 Hours',
        value: '120',
    },
    {
        title: '12 Hours',
        value: '720',
    },
    {
        title: '24 Hours',
        value: '1440',
    },
    {
        title: '36 Hours',
        value: '2160',
    },
    {
        title: '48 Hours',
        value: '2880',
    },
    {
        title: '5 Days',
        value: '7200',
    },
    {
        title: '1 Week',
        value: '10080',
    },
    {
        title: '1 Month',
        value: '43800',
    },
];
