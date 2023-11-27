import { Modal, Switch } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PButton from '../../../../common/Button';
import PDatePicker from '../../../../common/PDatePicker';

type Props = {
    open: boolean;
    setOpen: (f: boolean) => void;
    compareValue?: boolean;
    onClickCustomApply: (c: boolean, toDate: string, fromDate: string, ctoDate: string | undefined, cfromDate: string | undefined) => void;
    onClickClose: () => void;
    setValueChanged: any;
    valueChanged: boolean;
};

const CustomDatePicker: React.FC<Props> = ({ open, setOpen, compareValue, onClickCustomApply, onClickClose, valueChanged, setValueChanged }) => {
    const [fromDate, setFromDate] = useState<string | undefined>(undefined);
    const [toDate, setToDate] = useState<string | undefined>(undefined);
    const [compareFromDate, setCompareFromDate] = useState<string | undefined>(undefined);
    const [compareToDate, setCompareToDate] = useState<string | undefined>(undefined);
    const [compare, setCompare] = useState(compareValue);
    const [isValidate, setIsValidate] = useState(false);
    
    useEffect(() => {
        if (valueChanged === true) {
            setFromDate(undefined);
            setToDate(undefined);
            setCompareFromDate(undefined);
            setCompareToDate(undefined);
        }
    }, [valueChanged])
    
    const onClose = () => {
        setOpen(false);
        setIsValidate(false);
        setValueChanged(false)
        onClickClose();
    };

    const onClickApply = () => {
        setIsValidate(true);
        if (!toDate || toDate.trim() === '' || !fromDate || fromDate.trim() === '') {
            return;
        }
        if (compare && (!compareFromDate || compareFromDate.trim() === '' || !compareToDate || compareToDate.trim() === '')) {
            return;
        }
        if (compare && moment(toDate).diff(moment(fromDate)) < moment(compareToDate).diff(moment(compareFromDate))) {
            return;
        }
        setIsValidate(false);
        onClickCustomApply(compare || false, fromDate, toDate, compareFromDate, compareToDate);
        onClose();
    };

    return (
        <Modal maskClosable={false} open={open} onCancel={onClose} footer={null} centered closable={false}>
            <div className="px-4 py-6 pt-10 rounded-2xl bg-[#f7f7f7]">
                <div className="flex items-center ">
                    <div className="w-2/5">
                        <PDatePicker className="border-black h-10 mt-1" isDisableFuture title="From" value={fromDate} onChange={(d) => setFromDate(d)} isRequired />
                        {isValidate && (!fromDate || fromDate.trim() === '') && <span className="common_error">Please select from date</span>}
                    </div>
                    <div className="w-1/5 flex justify-center items-center mt-4">-</div>
                    <div className="w-2/5">
                        <PDatePicker className="border-black h-10 mt-1" isDisableFuture title="To" value={toDate} onChange={(d) => setToDate(d)} isRequired />
                        {isValidate && (!toDate || toDate.trim() === '') && <span className="common_error">Please select to date</span>}
                    </div>
                </div>
            </div>
            <div className="px-4 py-6 pt-4 rounded-2xl bg-[#f7f7f7] mt-4">
                <div className="flex items-center pl-1 pb-6 rounded-lg">
                    <p className="text-sm mr-2 montserrat">Compare to</p>
                    <Switch
                        defaultChecked={compare}
                        onChange={(checked: boolean) => {
                            setCompare(checked);
                            setCompareFromDate(undefined);
                        }}
                    />
                </div>
                {compare && (
                    <div className="flex items-center ">
                        <div className="w-2/5">
                            <PDatePicker isDisableFuture title="From" value={compareFromDate} onChange={(d) => setCompareFromDate(d)} isRequired className="border-black h-10 mt-1" />
                            {isValidate && (!compareFromDate || compareFromDate.trim() === '') && <span className="common_error">Please select from date</span>}
                        </div>
                        <div className="w-1/5 flex justify-center items-center mt-4">-</div>
                        <div className="w-2/5">
                            <PDatePicker isDisableFuture title="To" value={compareToDate} onChange={(d) => setCompareToDate(d)} isRequired className="border-black h-10 mt-1" />
                            {isValidate && (!compareToDate || compareToDate.trim() === '') && <span className="common_error">Please select to date</span>}
                        </div>
                    </div>
                )}
                <div className="flex justify-center">
                    {isValidate && toDate && fromDate && compareFromDate && compareToDate && moment(toDate).diff(moment(fromDate)) < moment(compareToDate).diff(moment(compareFromDate)) && <span className="common_error">Number of days allowed for comparison should be same or less than the selected period</span>}
                </div>
            </div>
            <div className="flex flex-col mt-6">
                <PButton title="Apply" onClick={onClickApply} />
                <PButton title="Cancel" light className="close_btn mt-2" onClick={onClose} />
            </div>
        </Modal>
    );
};

export default CustomDatePicker;
