import { Avatar, Empty, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/RootReducer';
import { commaSeperator } from '../../../../../../../../utils/Validation';
import PButton from '../../../../../../../common/Button';
import PCard from '../../../../../../../common/Card';
import { COLORS } from '../../../../../../../../utils/Colors';
import { useNavigate } from 'react-router-dom';
import { HEADERMENU_PATH } from '../../../../../../../../routes/RoutesURL';
import { useDispatch } from 'react-redux';
import AdOptDashboardAction from '../../../../redux/actions';
const FavoritesSites: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.adOptDashboard.favoriteLoader);
    const favorites = useSelector((state: RootState) => state.adOptDashboard.favorites);
    const [showAll, setShowAll] = useState(4);
    const [rowid, setrowid]: any = useState({
        status: false,
        id: '',
        current: false,
    });
    const redirectToDetail = (id: number) => {
        navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adOptimization}/${id}`);
    };

    const favunfav = useSelector((state: RootState) => state.adOptDashboard.FavouriteUnfavourite);

    useEffect(() => {
        if (favunfav?.status === true) {
            setrowid({
                status: false,
                id: '',
            });
        }
    }, [dispatch, favunfav?.status]);
    return (
        <div className="py-6">
            {!loading && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[...favorites].splice(0, showAll).map((i, index) => (
                            <PCard className="rounded-lg " key={`${Math.random() * 100}`}>
                                <div onClick={() => redirectToDetail(i.site_id)} className="px-4 py-4 flex justify-between items-center cursor-pointer">
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs color-BDBDBD roboto-medium">Revenue</p>
                                        </div>
                                        <p className="text-lg roboto-medium">${commaSeperator(parseFloat(i.total_revenue).toFixed(2))}</p>
                                    </div>
                                </div>

                                <div className="pt-3 pb-2 px-4 flex justify-between items-center border-t" style={{ borderColor: '#E6E6E6' }}>
                                    <div className="flex items-center w-[90%]">
                                        <Avatar style={{ color: '#fff', backgroundColor: COLORS[index > COLORS.length ? index % COLORS.length : index] }}>{(i.site_name || '').charAt(0)}</Avatar>
                                        <p className="text-sm ml-2 montserrat-medium text-ellipsis overflow-hidden whitespace-nowrap w-4/5" style={{ color: '#313942' }}>
                                            {i.site_name}
                                        </p>
                                    </div>
                                    <div>{/* <AiFillStar size={'1.2rem'} color="#F0A236" /> */}</div>
                                    <div className="cursor-pointer rounded-full flex justify-center items-center">
                                        {rowid.id === i.site_id && rowid.status === true ? (
                                            <Spin />
                                        ) : (
                                            <AiFillStar
                                                onClick={() => {
                                                    setrowid({
                                                        status: true,
                                                        id: i.site_id,
                                                    });
                                                    dispatch(
                                                        AdOptDashboardAction.fetchSitesFavUnfav(
                                                            {
                                                                site_id: i.site_id,
                                                                favourite_flag: i.favourite > 0 ? 0 : 1,
                                                            },
                                                            'favouriteDash',
                                                        ),
                                                    );
                                                }}
                                                size={'1.2rem'}
                                                className="cursor-pointer"
                                                color={i.favourite > 0 ? '#F0A236' : 'lightgray'}
                                            />
                                        )}
                                    </div>
                                </div>
                            </PCard>
                        ))}
                    </div>
                    {favorites.length > 4 && (
                        <div className="flex justify-center items-center py-2 pt-10">
                            <PButton title={showAll === 4 ? 'View more' : 'View less'} light className="w-full" onClick={() => setShowAll(showAll === 4 ? 12 : 4)} style={{ boxShadow: `0px 2px 24px rgba(0, 0, 0, 0.08)` }} />
                        </div>
                    )}
                </>
            )}
            {loading && (
                <div className="flex justify-center items-center py-6">
                    <Spin />
                </div>
            )}
            {!loading && favorites.length === 0 && <Empty description="No favorites data" />}
        </div>
    );
};

export default FavoritesSites;
