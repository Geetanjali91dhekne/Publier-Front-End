import download from 'downloadjs';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Apis from '../../../../../../../api';
import PButton from '../../../../../../common/Button';
import PTabs from '../../../../../../common/Tabs';
import MessageActions from '../../../../../../message/redux/actions';
import AdBlockDashboardActions from '../../../redux/actions';
import CountryTableAdBlockRecovery from './CountryTableAdBlockRecovery';
import DeviceTableAdBlockRecovery from './DeviceTableAdBlockRecovery';
import DomainTableAdBlockRecovery from './DomainTableAdBlockRecovery';

type Props = {
    startDate?: any;
    endDate?: any;
    comparison?: boolean;
    compare?: any;
    compare_start_date?: any;
    compare_end_date?: any;
    siteId: any;
    widgetId?: string|null;
};

const AdBlockRecoveryTables: React.FC<Props> = ({ startDate, endDate, comparison, compare, compare_start_date, compare_end_date, siteId, widgetId }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('Domains');
    const [btnLoading, setLoading] = useState(false);
    const [dates, setDates] = useState<{
        domains: {
            startDate?: string;
            endDate?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: any;
            widgetId?: string|null;
        };
        countries: {
            startDate?: string;
            endDate?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: any;
            widgetId?: string|null;
        };
        devices: {
            startDate?: string;
            endDate?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: any;
            widgetId?: string|null;
        };
    }>({
        domains: {
            startDate: undefined,
            endDate: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
            widgetId: undefined,
        },
        countries: {
            startDate: undefined,
            endDate: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
            widgetId: undefined,
        },
        devices: {
            startDate: undefined,
            endDate: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
            widgetId: undefined,
        },
    });

    useEffect(() => {
        if (startDate && endDate) {
            if (
                activeTab === 'Domains' &&
                (dates.domains.startDate !== startDate ||
                    dates.domains.endDate !== endDate ||
                    dates.domains.compare_start_date !== compare_start_date ||
                    dates.domains.compare_end_date !== compare_end_date ||
                    dates.domains.compare !== compare ||
                    dates.domains.siteId !== siteId ||
                    dates.domains.widgetId !== widgetId) 
            ) {
                setDates({
                    ...dates,
                    domains: {
                        startDate: startDate,
                        endDate: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                        widgetId: widgetId,
                    },
                });
                dispatch(
                    AdBlockDashboardActions.fetchAdBlockDomainTable({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                        widget_id: widgetId,
                    }),
                );
            }

            if (
                activeTab === 'Countries' &&
                (dates.countries.startDate !== startDate ||
                    dates.countries.endDate !== endDate ||
                    dates.countries.compare_start_date !== compare_start_date ||
                    dates.countries.compare_end_date !== compare_end_date ||
                    dates.countries.compare !== compare ||
                    dates.countries.siteId !== siteId ||
                    dates.countries.widgetId !== widgetId)
            ) {
                setDates({
                    ...dates,
                    countries: {
                        startDate: startDate,
                        endDate: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                        widgetId: widgetId,
                    },
                });
                dispatch(
                    AdBlockDashboardActions.fetchAdBlockCountryTable({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                        widget_id: widgetId,
                    }),
                );
            }

            if (
                activeTab === 'Devices' &&
                (dates.devices.startDate !== startDate ||
                    dates.devices.endDate !== endDate ||
                    dates.devices.compare_start_date !== compare_start_date ||
                    dates.devices.compare_end_date !== compare_end_date ||
                    dates.devices.compare !== compare ||
                    dates.devices.siteId !== siteId ||
                    dates.devices.widgetId !== widgetId)
            ) {
                setDates({
                    ...dates,
                    devices: {
                        startDate: startDate,
                        endDate: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                        widgetId: widgetId,
                    },
                });
                dispatch(
                    AdBlockDashboardActions.fetchAdBlockDeviceTable({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                        widget_id: widgetId,
                    }),
                );
            }
        }
    }, [dispatch, startDate, endDate, compare, compare_start_date, compare_end_date, siteId, activeTab, dates, widgetId]);

    const TableExport = () => {
        if (startDate && endDate) {
            const data = {
                start_date: startDate,
                end_date: endDate,
                compare: compare,
                compare_start_date: compare_start_date,
                compare_end_date: compare_end_date,
                table_type: activeTab === 'Domains' ? 'domains' : activeTab === 'Countries' ? 'countries' : activeTab === 'Devices' ? 'devices' : null,
                site_id: siteId,
            };
            setLoading(true);

            Apis.fetchAdBlockTableExportApi(data)
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

    const onTabChange = (data: string) => {
        setActiveTab(data);
    };

    const table = useMemo(() => {
        switch (activeTab) {
            case 'Domains':
                return <DomainTableAdBlockRecovery comparison={comparison} />;
            case 'Countries':
                return <CountryTableAdBlockRecovery comparison={comparison} />;
            case 'Devices':
                return <DeviceTableAdBlockRecovery comparison={comparison} />;
            default:
                return null;
        }
    }, [activeTab, comparison]);

    return (
        <div className="">
            <div className="w-[100%] relative flex flex-row-reverse">
                <PButton loading={btnLoading} className="top-12" title={'Export'} onClick={TableExport} />
            </div>

            <PTabs
                activeTab={activeTab}
                setActiveTab={onTabChange}
                tabs={[
                    { key: 'Domains', title: 'Domains' },
                    { key: 'Countries', title: 'Countries' },
                    { key: 'Devices', title: 'Devices' },
                    // { key: 'Pages', title: 'Pages' },
                ]}
            />
            <div className="pb-4">{table}</div>
        </div>
    );
};

export default AdBlockRecoveryTables;
