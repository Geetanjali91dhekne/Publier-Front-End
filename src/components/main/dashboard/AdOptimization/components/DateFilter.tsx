import { Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment-timezone';
import CustomDatePicker from '../modal/CustomDatePicker';

const { Option } = Select;
let localTimeZone = moment.tz.guess().split('/')[0];

type Props = {
    applyDate: string;
    dstring2: any;
    compare: boolean;
    setCompare: any;
    setApplyDate: (d: string) => void;
    setCustomEndDate: (d: string | undefined) => void;
    setCustomStartDate: (d: string | undefined) => void;
    setDatestring2: any;
    showCompare: boolean;
};

const DateFilter: React.FC<Props> = ({ applyDate, setApplyDate, setCustomEndDate, setCustomStartDate, setDatestring2, dstring2, compare, setCompare, showCompare }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateName, setDateName] = useState(applyDate);
    const [valueChanged, setValueChanged] = useState(false);

    useEffect(() => {
        switch (applyDate) {
            case 'last1Day':
                setDatestring2({
                    sdate: moment().startOf('day').subtract(1, 'day').format('YYYY/MM/DD'),
                    edate: moment().startOf('day').subtract(1, 'day').format('YYYY/MM/DD'),
                });
                break;

            case 'last7Day':
                setDatestring2({
                    sdate: moment().subtract(14, 'day').format('YYYY/MM/DD'),
                    edate: moment().subtract(8, 'day').format('YYYY/MM/DD'),
                });
                break;

            case 'last30Day':
                setDatestring2({
                    sdate: moment().subtract(60, 'day').format('YYYY/MM/DD'),
                    edate: moment().subtract(31, 'day').format('YYYY/MM/DD'),
                });
                break;

            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applyDate, showCompare]);

    const handleChange = (value: string) => {
        if (value === 'customDate') {
            setIsModalOpen(true);
            setCustomEndDate(undefined);
            setCustomStartDate(undefined);
            setDateName('Custom Dates');
        } else {
            setValueChanged(true);
            setApplyDate(value);
            setCompare(false);
            setDateName(value);
            sessionStorage.setItem('dates', value);
        }
    };

    const endDate = useMemo(() => {
        switch (applyDate) {
            case 'last1Day':
                return '';
            case 'last7Day':
            case 'last30Day':
                return moment().startOf('day').subtract(1, 'day').format('DD MMM YYYY');
            default:
                return applyDate?.split('-')[1];
        }
    }, [applyDate]);

    const startDate = useMemo(() => {
        switch (applyDate) {
            case 'last1Day':
                return moment().startOf('day').subtract(1, 'day').format('DD MMM YYYY');
            case 'last7Day':
                return moment().subtract(7, 'day').format('DD MMM YYYY');
            case 'last30Day':
                return moment().subtract(30, 'day').format('DD MMM YYYY');
            default:
                return applyDate?.split('-')[0];
        }
    }, [applyDate]);

    const compareDate = useMemo(() => {
        switch (applyDate) {
            case 'last1Day':
                return moment().startOf('day').subtract(1, 'day').format('DD MMM YYYY');
            case 'last7Day':
                return moment().subtract(14, 'day').format('DD MMM YYYY') + ' to ' + moment().subtract(8, 'day').format('DD MMM YYYY');
            case 'last30Day':
                return moment().subtract(60, 'day').format('DD MMM YYYY') + ' to ' + moment().subtract(31, 'day').format('DD MMM YYYY');
            default:
                if (!compare) {
                    const dates = applyDate.split('-');
                    let dayDiff = moment(new Date(dates[1])).diff(new Date(dates[0]), 'days');
                    if (localTimeZone === 'America') {
                        dayDiff += 1;
                    }
                    return (
                        moment(dates[0])
                            .subtract(dayDiff * 1, 'day')
                            .format('DD MMM YYYY') +
                        ' to ' +
                        moment(dates[1]).subtract(dayDiff, 'day').format('DD MMM YYYY')
                    );
                }
                if (dstring2?.sdate && compare) {
                    if (localTimeZone === 'America') {
                        let compareStartDate = moment(dstring2?.sdate).format('ll');
                        let compareEndDate = moment(dstring2?.edate).format('ll');
                        return `${compareStartDate} to ${compareEndDate}`;
                    } else {
                        let compareStartDate = moment(dstring2?.sdate).add(1, 'day').format('ll');
                        let compareEndDate = moment(dstring2?.edate).add(1, 'day').format('ll');
                        return `${compareStartDate} to ${compareEndDate}`;
                    }
                } else {
                    return applyDate;
                }
        }
    }, [applyDate, compare, dstring2]);

    const onClickCustomApply = (compare: boolean, fromDate: string, toDate: string, compareFromDate: string | undefined, compareToDate: string | undefined) => {
        if (localTimeZone === 'America') {
            setApplyDate(moment(fromDate).format('ll') + ' - ' + moment(toDate).format('ll'));
            setCustomEndDate(moment(toDate).format('YYYY/MM/DD'));
            setCustomStartDate(moment(fromDate).format('YYYY/MM/DD'));
            setDatestring2({
                sdate: moment(compareFromDate).format('YYYY/MM/DD') || '',
                edate: moment(compareToDate).format('YYYY/MM/DD') || '',
            });
        } else {
            setApplyDate(moment(fromDate).add(1, 'day').format('ll') + ' - ' + moment(toDate).add(1, 'day').format('ll'));
            setCustomEndDate(moment(toDate).add(1, 'day').format('YYYY/MM/DD'));
            setCustomStartDate(moment(fromDate).add(1, 'day').format('YYYY/MM/DD'));
            setDatestring2({
                sdate: moment(compareFromDate).add(1, 'day').format('YYYY/MM/DD') || '',
                edate: moment(compareToDate).add(1, 'day').format('YYYY/MM/DD') || '',
            });
        }

        setCompare(compare);
        sessionStorage.setItem('dates', 'Custom Date');
    };

    const onClickClose = () => {
        setDateName(sessionStorage.getItem('dates') !== null ? (sessionStorage.getItem('dates') as string) : 'last7Day');
    };

    return (
        <div id="dateFilter" className={`flex flex-col  `}>
            <label className="text-[10px]">Time Interval</label>
            <Select value={dateName} size="large" onChange={handleChange} className="w-auto">
                <Option value="last1Day">Last 1 Day</Option>
                <Option value="last7Day">Last 7 Days</Option>
                <Option value="last30Day">Last 30 Days</Option>
                <Option value="customDate">Custom Dates</Option>
            </Select>
            <div className="absolute z-10 left-5 bottom-0 flex gap-3">
                <div className="flex justify-between item-center">
                    <span className="pr-[3px] text-[14px] ">{applyDate === 'last1Day' || applyDate === 'last7Day' || applyDate === 'last30Day' ? 'Last' : 'Custom dates'}</span>
                    <span className="text-[14px] font-bold">
                        {`${
                            applyDate === 'last1Day'
                                ? ` 1 Day(${startDate})`
                                : applyDate === 'last7Day'
                                ? ` 7 Days(${startDate} to ${endDate !== '' ? `${endDate}` : ''})`
                                : applyDate === 'last30Day'
                                ? ` 30 Days(${startDate} to ${endDate !== '' ? `${endDate}` : ''})`
                                : ` (${startDate} to ${endDate})`
                        }`}
                    </span>
                    {/* <label className="text-[10px] text-right">{`${moment(startDate).format('ll')} ${endDate !== '' ? `- ${moment(endDate).format('ll')}` : ''}`}</label> */}
                </div>
                {showCompare && (
                    <div className="flex justify-between item-center">
                        <span className="pr-3 text-[14px] font-extrabold">|</span>
                        <span className="text-[14px] pr-1">Comparison dates</span>
                        <span className="text-[14px] text-right font-bold">{`(${compareDate})`}</span>
                    </div>
                )}
            </div>

            <CustomDatePicker valueChanged={valueChanged} setValueChanged={setValueChanged} open={isModalOpen} setOpen={setIsModalOpen} onClickCustomApply={onClickCustomApply} onClickClose={onClickClose} />
        </div>
    );
};

export default DateFilter;
