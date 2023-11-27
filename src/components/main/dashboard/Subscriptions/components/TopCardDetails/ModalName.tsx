import React, { useEffect, useState } from 'react';
import { Input, Drawer, DatePicker, DatePickerProps } from 'antd';
import { GrClose } from 'react-icons/gr';
import { GoPrimitiveDot } from 'react-icons/go';
import dayjs from 'dayjs';

type Props = {
    open: boolean;
    setOpen: (f: boolean) => void;
    modalData?: any;
};

const ModalName: React.FC<Props> = ({ open, setOpen, modalData }) => {
    const dateFormat = 'MM/DD/YYYY';
    const [data, setData] = useState<{
        siteName?: string;
        id?: string;
        name?: string;
        email?: string;
        stipId?: string;
        nextCharge?: string;
        cardType?: string;
        lastFourDigit?: string;
        amount?: string;
        payTime?: string;
        mode?: string;
        cancelReason?: string;
        cancelDate?: string;
    }>({
        siteName: undefined,
        id: undefined,
        name: undefined,
        email: undefined,
        stipId: undefined,
        nextCharge: undefined,
        cardType: undefined,
        lastFourDigit: undefined,
        amount: undefined,
        payTime: undefined,
        mode: undefined,
        cancelReason: undefined,
        cancelDate: undefined,
    });

    useEffect(() => {
        setData({
            siteName: modalData?.site_name || '',
            id: modalData?.id || '',
            name: modalData?.name || '',
            email: modalData?.email || '',
            stipId: modalData?.stripe_customerid || '',
            nextCharge: modalData?.next_charge_date || '',
            cardType: modalData?.card_type || '',
            lastFourDigit: modalData?.card_last4 || '',
            amount: modalData?.amount || '',
            payTime: '',
            mode: modalData?.subs_mode || '',
            cancelReason: modalData?.reason_for_cancel || '',
            cancelDate: modalData?.cancel_date || '',
        });
    }, [modalData]);

    const onChangeField: DatePickerProps['onChange'] = (date, dateString) => {
        setData({
            ...data,
            nextCharge: dateString,
        });
    };
    return (
        <div>
            <Drawer placement={'right'} width={500} onClose={() => setOpen(false)} open={open} closeIcon={null} closable={false}>
                <div>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex justify-between items-center gap-2">
                                <GoPrimitiveDot size={24} className="text-green-700" />
                                <div>
                                    <h1 className="text-2xl font-bold">{data.name}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-5">
                            {/* <span className="flex items-center py-2 px-5 rounded-lg bg-[#B4D0C133] cursor-pointer hover:bg-green-800">Save</span> */}
                            <GrClose size={20} className="font-bold cursor-pointer" onClick={() => setOpen(false)} />
                        </div>
                    </div>
                    <div className="mt-1 ml-10">
                        <span>{data.siteName}</span>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="flex flex-col gap-2">
                        <p>ID</p>
                        <Input disabled={true} size="large" value={data.id} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Name</p>
                        <Input disabled={true} size="large" value={data.name} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Email</p>
                        <Input disabled={true} size="large" value={data.email} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Stipe Id</p>
                        <Input disabled={true} size="large" value={data.stipId} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Next Charge</p>
                        <DatePicker
                            disabled={true}
                            className={'border-black h-10 mt-1 montserrat'}
                            //disabledDate={(current) => (true ? current > moment().subtract(1, 'day') : false)}
                            onChange={onChangeField}
                            value={dayjs(data.nextCharge)}
                            format={dateFormat}
                        />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Card Type</p>
                        <Input disabled={true} size="large" value={data.cardType} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Card Last 4 Digits</p>
                        <Input disabled={true} size="large" value={data.lastFourDigit} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Amount</p>
                        <Input disabled={true} size="large" value={data.amount} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Playtimes</p>
                        <Input disabled={true} size="large" value={data.payTime} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Mode</p>
                        <Input disabled={true} size="large" value={data.mode} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Cancel Reason</p>
                        <Input disabled={true} size="large" value={data.cancelReason} />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>Cancel Date</p>
                        <Input disabled={true} size="large" value={data.cancelDate} />
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default ModalName;
