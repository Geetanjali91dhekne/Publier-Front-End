import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PTabs from '../../../../../../common/Tabs';
import CrowdFundingDashboardActions from '../../../redux/actions';
import AvgDonationCrowdFunding from './AvgDonationCrowdFunding';
import EcpmCrowdFunding from './EcpmCrowdFunding';
import FundraiserViewsCrowdFunding from './FundraiserViewsCrowdFunding';
import TotalDonorCrowdFunding from './TotalDonorCrowdFunding';
import TotalEarningsCrowdFunding from './TotalEarningsCrowdFunding';
type Props = {
    startDate?: any;
    endDate?: any;
    revenueType?: any;
    compare?: any;
    compare_start_date?: any;
    compare_end_date?: any;
    siteId?: any;
};
function CrowdFundingCharts({ startDate, endDate, revenueType, compare, compare_start_date, compare_end_date, siteId }: Props) {
    const dispatch = useDispatch();
    const [activeChart, setActiveChart] = useState('totalEarning');
    const [dates, setDates] = useState<{
        totalEarning: {
            startDate?: string;
            endDate?: string;
            revenue?: String;
            siteId?: any;
        };
        totalDonor: {
            startDate?: string;
            endDate?: string;
            revenue?: String;
            siteId?: any;
        };
        fundRaiser: {
            startDate?: string;
            endDate?: string;
            revenue?: String;
            siteId?: any;
        };
        avgDonation: {
            startDate?: string;
            endDate?: string;
            revenue?: String;
            siteId?: any;
        };
        ecpm: {
            startDate?: string;
            endDate?: string;
            revenue?: String;
            siteId?: any;
        };
    }>({
        totalEarning: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        totalDonor: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        fundRaiser: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        avgDonation: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
        ecpm: {
            startDate: undefined,
            endDate: undefined,
            revenue: undefined,
            siteId: undefined,
        },
    });

    useEffect(() => {
        if (activeChart === 'totalEarning' && (dates.totalEarning.startDate !== startDate || dates.totalEarning.endDate !== endDate || dates.totalEarning.revenue !== revenueType || dates.totalEarning.siteId !== siteId)) {
            setDates({
                ...dates,
                totalEarning: {
                    startDate: startDate,
                    endDate: endDate,
                    revenue: revenueType,
                    siteId: siteId,
                },
            });
            dispatch(
                CrowdFundingDashboardActions.fetchCrowdFundEarningGraph({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );
        }
        if (activeChart === 'totalDonors' && (dates.totalDonor.startDate !== startDate || dates.totalDonor.endDate !== endDate || dates.totalDonor.revenue !== revenueType || dates.totalDonor.siteId !== siteId)) {
            setDates({
                ...dates,
                totalDonor: {
                    startDate: startDate,
                    endDate: endDate,
                    revenue: revenueType,
                    siteId: siteId,
                },
            });
            dispatch(
                CrowdFundingDashboardActions.fetchCrowdFundDonorGraph({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );
        }
        if (activeChart === 'fundraiserViews' && (dates.fundRaiser.startDate !== startDate || dates.fundRaiser.endDate !== endDate || dates.fundRaiser.revenue !== revenueType || dates.fundRaiser.siteId !== siteId)) {
            setDates({
                ...dates,
                fundRaiser: {
                    startDate: startDate,
                    endDate: endDate,
                    revenue: revenueType,
                    siteId: siteId,
                },
            });
            dispatch(
                CrowdFundingDashboardActions.fetchCrowdFundFundraiserGraph({
                    start_date: startDate,
                    end_date: endDate,
                    revenue: revenueType,
                    site_id: siteId,
                }),
            );
        }
        if (activeChart === 'averageDonation' && (dates.avgDonation.startDate !== startDate || dates.avgDonation.endDate !== endDate || dates.avgDonation.revenue !== revenueType || dates.avgDonation.siteId !== siteId)) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    avgDonation: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    CrowdFundingDashboardActions.fetchCrowdFundAvgDonationGraph({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }
        }
        if (activeChart === 'ecpm' && (dates.ecpm.startDate !== startDate || dates.ecpm.endDate !== endDate || dates.ecpm.revenue !== revenueType || dates.ecpm.siteId !== siteId)) {
            if (startDate && endDate) {
                setDates({
                    ...dates,
                    ecpm: {
                        startDate: startDate,
                        endDate: endDate,
                        revenue: revenueType,
                        siteId: siteId,
                    },
                });
                dispatch(
                    CrowdFundingDashboardActions.fetchCrowdFundEcpmGraph({
                        start_date: startDate,
                        end_date: endDate,
                        revenue: revenueType,
                        site_id: siteId,
                    }),
                );
            }
        }
    }, [dispatch, activeChart, startDate, endDate, revenueType, siteId, dates]);

    const onChangeTab = (tab: string) => {
        setActiveChart(tab);
    };

    const tabComponents = useMemo(() => {
        switch (activeChart) {
            case 'totalEarning':
                return <TotalEarningsCrowdFunding />;
            case 'totalDonors':
                return <TotalDonorCrowdFunding />;
            case 'averageDonation':
                return <AvgDonationCrowdFunding />;
            case 'fundraiserViews':
                return <FundraiserViewsCrowdFunding />;
            case 'ecpm':
                return <EcpmCrowdFunding />;
            default:
                return null;
        }
    }, [activeChart]);
    return (
        <div className="mt-8">
            <PTabs
                activeTab={activeChart}
                setActiveTab={onChangeTab}
                tabs={[
                    { key: 'totalEarning', title: 'Total Earning' },
                    { key: 'totalDonors', title: 'Total Donors' },
                    { key: 'averageDonation', title: 'Average Donation' },
                    { key: 'fundraiserViews', title: 'Fundraiser Views' },
                    { key: 'ecpm', title: 'eCPM' },
                ]}
            />
            <div className="py-4 pt-6">{tabComponents}</div>
        </div>
    );
}

export default CrowdFundingCharts;
