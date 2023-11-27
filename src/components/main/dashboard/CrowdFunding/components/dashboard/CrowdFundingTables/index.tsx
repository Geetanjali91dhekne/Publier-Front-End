import download from 'downloadjs';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Apis from '../../../../../../../api';
import PButton from '../../../../../../common/Button';
import PTabs from '../../../../../../common/Tabs';
import MessageActions from '../../../../../../message/redux/actions';
import CrowdFundingDashboardActions from '../../../redux/actions';
import CountryTableCrowdFunding from './CountryTableCrowdFunding';
import DevicesTableCrowdFunding from './DevicesTableCrowdFunding';
import DomainTableCrowdFunding from './DomainTableCrowdFunding';
import PagesTableCrowdFunding from './PagesTableCrowdFunding';

type Props = {
    startDate?: any;
    endDate?: any;
    revenueType?: any;
    compare?: any;
    compare_start_date?: any;
    compare_end_date?: any;
    comparison?: any;
    siteId?: any;
};

const CrowdFundingTables: React.FC<Props> = ({ startDate, endDate, compare, compare_start_date, compare_end_date, siteId, comparison }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('Domains');
    const [loading, setLoading] = useState(false);
    const [dates, setDates] = useState<{
        domain: {
            startDate?: string;
            endDate?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: string;
        };
        country: {
            startDate?: string;
            endDate?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: string;
        };
        device: {
            startDate?: string;
            endDate?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: string;
        };
        pages: {
            startDate?: string;
            endDate?: string;
            compare?: boolean;
            compare_start_date?: string;
            compare_end_date?: string;
            siteId?: string;
        };
    }>({
        domain: {
            startDate: undefined,
            endDate: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
        },
        country: {
            startDate: undefined,
            endDate: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
        },
        device: {
            startDate: undefined,
            endDate: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
        },
        pages: {
            startDate: undefined,
            endDate: undefined,
            compare: undefined,
            compare_start_date: undefined,
            compare_end_date: undefined,
            siteId: undefined,
        },
    });

    useEffect(() => {
        if (
            activeTab === 'Domains' &&
            (dates.domain.startDate !== startDate || dates.domain.endDate !== endDate || dates.domain.compare_start_date !== compare_start_date || dates.domain.compare_end_date !== compare_end_date || dates.domain.siteId !== siteId)
        ) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    domain: {
                        startDate: startDate,
                        endDate: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                    },
                });
                dispatch(
                    CrowdFundingDashboardActions.fetchCrowdFundDomainTable({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                    }),
                );
            }
        }
        if (
            activeTab === 'Countries' &&
            (dates.country.startDate !== startDate ||
                dates.country.endDate !== endDate ||
                dates.country.compare !== compare ||
                dates.country.compare_start_date !== compare_start_date ||
                dates.country.compare_end_date !== compare_end_date ||
                dates.country.siteId !== siteId)
        ) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    country: {
                        startDate: startDate,
                        endDate: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                    },
                });
                dispatch(
                    CrowdFundingDashboardActions.fetchCrowdFundCountryTable({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                    }),
                );
            }
        }
        if (
            activeTab === 'Devices' &&
            (dates.device.startDate !== startDate ||
                dates.device.endDate !== endDate ||
                dates.device.compare !== compare ||
                dates.device.compare_start_date !== compare_start_date ||
                dates.device.compare_end_date !== compare_end_date ||
                dates.device.siteId !== siteId)
        ) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    device: {
                        startDate: startDate,
                        endDate: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                    },
                });
                dispatch(
                    CrowdFundingDashboardActions.fetchCrowdFundDeviceTable({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                    }),
                );
            }
        }
        if (
            activeTab === 'Pages' &&
            (dates.pages.startDate !== startDate ||
                dates.pages.endDate !== endDate ||
                dates.pages.compare !== compare ||
                dates.pages.compare_start_date !== compare_start_date ||
                dates.pages.compare_end_date !== compare_end_date ||
                dates.pages.siteId !== siteId)
        ) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    pages: {
                        startDate: startDate,
                        endDate: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        siteId: siteId,
                    },
                });
                dispatch(
                    CrowdFundingDashboardActions.fetchCrowdFundPagesTable({
                        start_date: startDate,
                        end_date: endDate,
                        compare: compare,
                        compare_start_date: compare_start_date,
                        compare_end_date: compare_end_date,
                        site_id: siteId,
                    }),
                );
            }
        }
    }, [dispatch, startDate, endDate, compare, compare_start_date, compare_end_date, dates, siteId, activeTab]);

    const TableExport = () => {
        if (startDate && endDate) {
            const data = {
                start_date: startDate,
                end_date: endDate,
                compare_start_date: compare_start_date,
                compare_end_date: compare_end_date,
                compare: compare,
                table_type: activeTab === 'Domains' ? 'domains' : activeTab === 'Countries' ? 'countries' : activeTab === 'Devices' ? 'devices' : activeTab === 'Pages' ? 'pages' : null,
                site_id: siteId,
            };
            setLoading(true);

            Apis.fetchCrowdFunExportTablesApi(data)
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
                return <DomainTableCrowdFunding comparison={comparison} />;
            case 'Countries':
                return <CountryTableCrowdFunding comparison={comparison} />;
            case 'Devices':
                return <DevicesTableCrowdFunding comparison={comparison} />;
            case 'Pages':
                return <PagesTableCrowdFunding comparison={comparison} />;
            default:
                return null;
        }
    }, [activeTab, comparison]);

    return (
        <div className=" mt-8">
            <div className="w-[100%] relative flex flex-row-reverse">
                <PButton loading={loading} className="top-12" title={'Export'} onClick={TableExport} />
            </div>

            <PTabs
                activeTab={activeTab}
                setActiveTab={onTabChange}
                tabs={[
                    { key: 'Domains', title: 'Domains' },
                    { key: 'Countries', title: 'Countries' },
                    { key: 'Devices', title: 'Devices' },
                    { key: 'Pages', title: 'Popular Pages' },
                ]}
            />
            <div className="py-4 pt-6">{table}</div>
        </div>
    );
};

export default CrowdFundingTables;
