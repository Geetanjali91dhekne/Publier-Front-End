import React, { useState } from 'react';
import { BsFillCheckCircleFill, BsFillCircleFill } from 'react-icons/bs';
import Group from '../../../../../../assets/icons/Group.png';
import { Preset } from '../../redux/types';
import { Spin } from 'antd';
import Apis from '../../../../../../api';
import { useDispatch, useSelector } from 'react-redux';
import MessageActions from '../../../../../message/redux/actions';
import { RootState } from '../../../../../../store/RootReducer';
import CreateOrEditPresetDrawer from './CreateOrEditPresetDrawer';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';
import { useNavigate } from 'react-router-dom';
import DeletePreset from '../../modal/DeletePreset';

type Props = {
    siteId: string;
    preset: Preset;
    setAllPresets: (list: Preset[]) => void;
};

const PresetCard: React.FC<Props> = ({ preset, setAllPresets, siteId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [statusLoading, setStatusLoading] = useState<string | undefined>(undefined);

    const presets = useSelector((state: RootState) => state.setupAdblockRecovery.allPresets);

    const onClickUpdateStatus = () => {
        setStatusLoading(preset.widget_id);
        Apis.setupAdBlockUpdatePresetStatusApi({
            widget_id: preset.widget_id,
            status: preset.status === 1 ? 0 : 1,
        })
            .then(() => {
                let presetlist = [...presets];
                const index = presetlist.findIndex((s) => s.widget_id === preset.widget_id);
                if (index !== -1) {
                    presetlist[index].status = preset.status === 1 ? 0 : 1;
                }
                setAllPresets(presetlist);
                dispatch(MessageActions.showMessage({ text: 'Status updated successfully!', error: false }));
            })
            .catch((err) => {
                dispatch(MessageActions.showMessage({ text: String(err), error: true }));
            })
            .finally(() => {
                setStatusLoading(undefined);
            });
    };

    return (
        <div className=" rounded-lg border border-[#E2E2E2] flex justify-between h-[100px] items-center">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <div className="min-w-[40px] h-[40px] flex justify-center items-center m-5 border rounded-lg border-[#056433] ">
                        <img alt={'group'} src={Group} width={'20px'} height={'20px'} />
                    </div>
                    <div className="flex flex-col justify-center  min-w-[180px] ">
                        <div className="text-[18px] font-[700] text-[#494D61]">{preset.nick_name}</div>
                        <div className="text-[#056433] text-[18px] font-[400]">
                            <span className="cursor-pointer" onClick={() => navigate(`${HEADERMENU_PATH.dashboard}${HEADERMENU_PATH.adBlockRecovery}/${preset.site_id}`, { state: { widgetId: preset?.widget_id } })}>
                                Report
                            </span>{' '}
                            |
                            <CreateOrEditPresetDrawer siteId={siteId} widgetId={preset.widget_id} allPresets={presets} />
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col items-center gap-1 w-[36px] mr-5 pt-1 h-full">
                    <DeletePreset widId={preset.widget_id} siteId={siteId} />
                    <div onClick={onClickUpdateStatus}>{statusLoading === preset.widget_id ? <Spin /> : preset.status === 1 ? <BsFillCheckCircleFill size={'1.5rem'} color={'#056433'} /> : <BsFillCircleFill size={'1.5rem'} color={'#E3E3E3'} />}</div>
                </div>
            </div>
        </div>
    );
};

export default PresetCard;
