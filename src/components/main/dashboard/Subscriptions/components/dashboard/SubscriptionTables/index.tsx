import React, { useEffect, useMemo, useState } from 'react';
import PButton from '../../../../../../common/Button';
import PTabs from '../../../../../../common/Tabs';
import DomainTable from './DomainTable';
import { useDispatch } from 'react-redux';
import SubsDashboardAction from '../../../redux/actions';
import CountryTable from './CountryTable';
import DeviceTable from './DeviceTable';
import PageTable from './PageTable';
import Apis from '../../../../../../../api';
import download from 'downloadjs';
import moment from 'moment';
import MessageActions from '../../../../../../message/redux/actions';

type Props = {
    startDate?: any;
    endDate?: any;
    revenueType?: any;
    compare?: any;
    comparison?: any;
    compare_start_date?: any;
    compare_end_date?: any;
    siteId: any;
};

const SubscriptionsTables: React.FC<Props> = ({ startDate, endDate, revenueType, compare, comparison, compare_start_date, compare_end_date, siteId }) => {
    const [activeTab, setActiveTab] = useState('Domains');
    const dispatch = useDispatch();
    const [fileLoading, setLoading] = useState(false);
    const [dates, setDates] = useState<{
        domains: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: any;
        };
        countries: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: any;
        };
        devices: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: any;
        };
        pages: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: any;
        };
        subscribers: {
            startDate?: string;
            endDate?: string;
            revenue?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: any;
        };
    }>({
        domains: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
        },
        countries: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
        },
        devices: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
        },
        pages: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
        },
        subscribers: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
        },
    });

    useEffect(() => {
        if (startDate && endDate) {
            if (
                activeTab === 'Domains' &&
                (dates.domains.startDate !== startDate ||
                    dates.domains.revenue !== revenueType ||
                    dates.domains.endDate !== endDate ||
                    (compare && (dates.domains.compare_start_date !== compare_start_date || dates.domains.compare_end_date !== compare_end_date)))
            ) {
                setDates({
                    ...dates,
                    domains: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                    },
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionDomainTable({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                    }),
                );
            }

            if (
                activeTab === 'Countries' &&
                (dates.countries.startDate !== startDate ||
                    dates.countries.revenue !== revenueType ||
                    dates.countries.endDate !== endDate ||
                    (compare && (dates.countries.compare_start_date !== compare_start_date || dates.countries.compare_end_date !== compare_end_date)))
            ) {
                setDates({
                    ...dates,
                    countries: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                    },
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionCountries({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                    }),
                );
            }

            if (
                activeTab === 'Devices' &&
                (dates.devices.startDate !== startDate ||
                    dates.devices.revenue !== revenueType ||
                    dates.devices.endDate !== endDate ||
                    (compare && (dates.devices.compare_start_date !== compare_start_date || dates.devices.compare_end_date !== compare_end_date)))
            ) {
                setDates({
                    ...dates,
                    devices: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                    },
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionDevice({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                    }),
                );
            }

            if (
                activeTab === 'Pages' &&
                (dates.pages.startDate !== startDate ||
                    dates.pages.revenue !== revenueType ||
                    dates.pages.endDate !== endDate ||
                    (compare && (dates.pages.compare_start_date !== compare_start_date || dates.pages.compare_end_date !== compare_end_date)))
            ) {
                setDates({
                    ...dates,
                    pages: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                    },
                });
                dispatch(
                    SubsDashboardAction.fetchSubscriptionPage({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                    }),
                );
            }
        }
    }, [dispatch, siteId, activeTab, startDate, endDate, dates, compare_end_date, compare_start_date, compare, revenueType]);

    const onTabChange = (data: string) => {
        setActiveTab(data);
    };

    const exportData = () => {
        if (startDate && endDate && compare_start_date && compare_end_date) {
            const data = {
                start_date: startDate,
                end_date: endDate,
                table_type: activeTab === 'Domains' ? 'domains' : activeTab === 'Countries' ? 'countries' : activeTab === 'Devices' ? 'devices' : activeTab === 'Pages' ? 'pages' : null,
                compare: compare,
                compare_start_date: compare_start_date,
                compare_end_date: compare_end_date,
                site_id: siteId,
            };
            setLoading(true);

            Apis.fetchsubscriptionDashboardExportTable(data)
                .then(({ data }) => {
                    download(data, `${moment().format('YYYY/MM/DD')}_${activeTab}.xlsx`);
                })
                .catch((err) => {
                    dispatch(MessageActions.showMessage({ text: String('Something went wrong'), error: true }));
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const table = useMemo(() => {
        switch (activeTab) {
            case 'Domains':
                return <DomainTable compare={comparison} />;
            case 'Countries':
                return <CountryTable compare={comparison} />;
            case 'Devices':
                return <DeviceTable compare={comparison} />;
            case 'Pages':
                return <PageTable compare={comparison} />;
            default:
                return null;
        }
    }, [activeTab, comparison]);

    return (
        <div className=" mt-4">
            <div className="w-[100%] relative flex flex-row-reverse">
                <PButton loading={fileLoading} className="top-12" title={'Export'} onClick={exportData} />
            </div>

            <PTabs
                activeTab={activeTab}
                setActiveTab={onTabChange}
                tabs={[
                    { key: 'Domains', title: 'Domains' },
                    { key: 'Countries', title: 'Countries' },
                    { key: 'Devices', title: 'Devices' },
                    { key: 'Pages', title: 'Pages' },
                ]}
            />
            <div className="-mt-2">{table}</div>
        </div>
    );
};

export default SubscriptionsTables;
