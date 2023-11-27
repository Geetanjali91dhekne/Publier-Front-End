import React, { useEffect, useMemo, useState } from 'react';
import ModalPreset from './modal/compare/ModalPreset';
import PresetCard from './components/preset/PresetCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/RootReducer';
import { Select, Spin } from 'antd';
import SetupAdBlockRecoveryActions from './redux/actions';
import { FavoriteOrRecent } from '../../dashboard/AdOptimization/redux/types';
import { Preset } from './redux/types';
import CreateOrEditPresetDrawer from './components/preset/CreateOrEditPresetDrawer';
import { useLocation } from 'react-router-dom';

const ExistingPresets: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [client, setClient] = useState<string | undefined>(undefined);
    const [allPresets, setAllPresets] = useState<Preset[]>([]);

    const sitesloading = useSelector((state: RootState) => state.adOptDashboard.allSitesLoading);
    const allSites = useSelector((state: RootState) => state.adOptDashboard.allSites);
    const fetchingallPresets = useSelector((state: RootState) => state.setupAdblockRecovery.allPresets);
    const allPresetsLoader = useSelector((state: RootState) => state.setupAdblockRecovery.allPresetsLoader);

    useEffect(() => {
        if (fetchingallPresets) {
            setAllPresets(fetchingallPresets);
        }
    }, [fetchingallPresets]);

    const siteName = useMemo(() => {
        return allSites?.find((e: FavoriteOrRecent) => String(e?.site_id) === String(client))?.site_name;
    }, [client, allSites]);

    useEffect(() => {
        if (allSites) {

            if (location?.state?.historySiteId) {
                setClient(String(location?.state?.historySiteId))
            }
            else {
                const firstClient = allSites[0]?.site_id;
                setClient(String(firstClient));
            }

        }
    }, [allSites,location]);

    useEffect(() => {
        if (client && client !== 'undefined') {
            dispatch(SetupAdBlockRecoveryActions.fetchAllPresetSetupAdblock(client));
        }
    }, [client, dispatch]);

    return (
        <div>
            <div className="flex justify-between mt-4">
                <div className="flex gap-5">
                    <div className="text-[24px] font-[500]">Presets</div>
                    <div className="w-[300px]">
                        <Select
                            loading={sitesloading}
                            size="large"
                            value={siteName}
                            optionFilterProp="children"
                            onChange={(e) => {
                                setClient(e);
                            }}
                            className="w-full"
                            showSearch
                            options={allSites.map((d) => {
                                return { value: d.site_id, label: d.site_name };
                            })}
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="border rounded-3xl border-green-800">{client && allPresets && <ModalPreset allPresets={allPresets} />}</div>
                    <div>{client && <CreateOrEditPresetDrawer siteId={client} allPresets={allPresets} />}</div>
                </div>
            </div>

            <div className="grid gap-5 gap-x-8 w-fit mt-8 md:grid-colos1 lg:grid-cols-2 xl:grid-cols-3">
                {client && allPresets?.map((item: Preset, key: number) => <PresetCard siteId={client} preset={item} key={`${key}_${item.site_id}_${item.widget_id}`} setAllPresets={setAllPresets} />)}
            </div>
            {allPresetsLoader && (
                <div className="flex justify-center items-center h-52">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default ExistingPresets;
