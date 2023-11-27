import React, { useState } from 'react';
import Apis from '../../../../../api';
import { useDispatch } from 'react-redux';
import SetupAdBlockRecoveryActions from '../redux/actions';
import MessageActions from '../../../../message/redux/actions';
import { Dropdown, MenuProps } from 'antd';
import { BsThreeDots } from 'react-icons/bs';
import PModal from '../../../../common/Modal';
import { RoundButton } from '../../../../common/Button';

export type ItemKeys = 'delete';

interface Items {
    key: ItemKeys;
    label: React.ReactNode;
}

type Props = {
    siteId: string;
    widId: string;
};

const DeletePreset: React.FC<Props> = ({ siteId, widId }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onClickClose = () => {
        setOpen(false);
        setLoading(false);
    };

    let items: Items[] = [
        {
            key: 'delete',
            label: 'Delete',
        },
    ];

    const handleDeletePreset = () => {
        setLoading(true);
        Apis.deletePresetApi(widId)
            .then(() => {
                if (siteId) {
                    dispatch(SetupAdBlockRecoveryActions.fetchAllPresetSetupAdblock(siteId));
                    dispatch(MessageActions.showMessage({ text: 'Preset deleted successfully!', error: false }));
                    onClickClose();
                }
            })
            .catch((err) => {
                dispatch(MessageActions.showMessage({ text: String(err), error: true }));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onMenuClick: MenuProps['onClick'] = (e) => {
        const key = e.key as ItemKeys;
        if (key === 'delete') {
            setOpen(true);
        }
    };

    return (
        <div>
            <Dropdown
                menu={{
                    items,
                    onClick: onMenuClick,
                }}
                placement="bottomRight"
                trigger={['click']}
                overlayClassName="common_dropdown"
                disabled={items.length === 0}
            >
                <BsThreeDots size={'1.4rem'} className="cursor-pointer" />
            </Dropdown>
            <PModal title="Delete Preset" open={open} setOpen={onClickClose} footer={null}>
                <p>Are you sure you wants to delete preset?</p>
                <div className="flex justify-center items-center gap-3 pt-4">
                    <div className='border rounded-3xl border-[green]'><RoundButton title="No" light  onClick={onClickClose} /></div>
                    <div><RoundButton title="Yes" loading={loading} onClick={handleDeletePreset} /></div>
                </div>
            </PModal>
        </div>
    );
};

export default DeletePreset;
