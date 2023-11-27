import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdOptDashboardAction from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../../../store/RootReducer';
import NetGrossFilter from '../NetGrossFilter';
import ChartsClientRealTimeData from './ChartsClientRealTimeData';
import { Spin } from 'antd';
import { AiFillStar } from 'react-icons/ai';
import moment from 'moment';

function ClientRealTimeData() {
    const [revenueType, setRevenueType] = useState<string | undefined>('gross');
    const [hourSelected, setHourSelected] = useState('12');
    const [updatedTime,setUpdatedTime] =useState('');
    const dispatch = useDispatch();
    const params = useParams();
    const siteId = params.siteId;
    const [rowid, setrowid]: any = useState({
        status: false,
        id: '',
        current: false,
    });

    const sites = useSelector((state: RootState) => state.adOptDashboard.allSites);
    const siteName = sites.find((d) => String(d.site_id) === siteId)?.site_name;
    const favunfav = useSelector((state: RootState) => state.adOptDashboard.FavouriteUnfavourite);
    const SITE_DETAILS = sites.find((d) => String(d.site_id) === siteId);

    useEffect(() => {
        if (favunfav?.status === true) {
            setrowid({
                status: false,
                currrent: true,
            });
        }
    }, [dispatch, favunfav?.status]);
    return (
        <div className="bg-white  mt-4 pt-8 px-8">
            <div className="bg-white flex flex-row justify-between items-center px-8 py-8 rounded-xl drop-shadow-md">
                <div className="flex flex-row items-center gap-3">
                    <div>
                        {siteName && (
                            <div className="cursor-pointer rounded-full flex justify-center items-center">
                                {rowid.status === true ? (
                                    <Spin />
                                ) : (
                                    <AiFillStar
                                        onClick={() => {
                                            setrowid({
                                                status: true,
                                            });
                                            dispatch(
                                                AdOptDashboardAction.fetchSitesFavUnfav(
                                                    {
                                                        site_id: SITE_DETAILS?.site_id,
                                                        favourite_flag: SITE_DETAILS?.favourite !== undefined ? (SITE_DETAILS?.favourite > 0 ? 0 : 1) : 0,
                                                    },
                                                    'DashBoard',
                                                ),
                                            );
                                        }}
                                        size={'1.5rem'}
                                        color={SITE_DETAILS?.favourite !== undefined ? (SITE_DETAILS.favourite > 0 ? '#F0A236' : 'lightgray') : 'lightgray'}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="text-[22px] font-bold">{siteName}</div>
                        <div className="text-[12px]">Last Updated {moment().format('MMM DD YYYY')} , {updatedTime}.</div>
                    </div>
                </div>

                <div className="flex flex-row flex-wrap justify-end gap-6">
                    <div className="">
                        <NetGrossFilter revenueType={revenueType} setRevenueType={setRevenueType} />
                    </div>
                    <div className="flex flex-row w-[250px] px-4 h-[50px] cursor-pointer  justify-around items-center bg-[#B4D0C133] rounded-lg">
                        <div
                            onClick={() => setHourSelected('1')}
                            className={hourSelected === '1' ? 'bg-green-700 text-white w-16 h-10 rounded-lg  flex flex-row justify-center items-center' : 'text-gray-400 w-16 h-12 rounded-lg  flex flex-row justify-center items-center'}
                        >
                            1hr
                        </div>

                        <div
                            onClick={() => setHourSelected('6')}
                            className={hourSelected === '6' ? 'bg-green-700 text-white w-16 h-10 rounded-lg  flex flex-row justify-center items-center' : 'text-gray-400 w-16 h-12 rounded-lg  flex flex-row justify-center items-center'}
                        >
                            6hr
                        </div>

                        <div
                            onClick={() => setHourSelected('12')}
                            className={hourSelected === '12' ? 'bg-green-700 text-white w-16 h-10 rounded-lg  flex flex-row justify-center items-center' : 'text-gray-400 w-16 h-12 rounded-lg  flex flex-row justify-center items-center'}
                        >
                            12hr
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <ChartsClientRealTimeData hourSelected={hourSelected} revenueType={revenueType} setUpdatedTime={setUpdatedTime}/>
            </div>
        </div>
    );
}

export default ClientRealTimeData;
