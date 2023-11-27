import { Drawer } from 'antd';
import React, { useState } from 'react';
import PreviewBox from './PreviewBox';
import { RoundButton } from '../../../../../../common/Button';
import { RxCross2 } from 'react-icons/rx';
import { CreatePreset } from '../../../redux/types';
import { EditorState } from 'draft-js';

type Props = {
    newPreset: CreatePreset;
    description: EditorState;
};

const PreviewDrawer: React.FC<Props> = ({ newPreset, description }) => {
    const [previewDrawer, setPreviewDrawer] = useState(false);

    return (
        <div>
            <>
                <>
                    <RoundButton
                        title="Live Preview"
                        light={true}
                        onClick={() => {
                            setPreviewDrawer(!previewDrawer);
                        }}
                        className="w-[130px] text-[14px] font-medium"
                    />
                </>
                <Drawer placement={'right'} width={694} onClose={() => setPreviewDrawer(false)} open={previewDrawer} closeIcon={null} closable={false} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
                    <div className="mx-8 my-8 flex items-center justify-between">
                        <div className="flex gap-5">
                            <div onClick={() => setPreviewDrawer(!previewDrawer)} className="bg-[#C2D9CD] cursor-pointer h-[32px] flex items-center px-4 mt-1 rounded-lg text-[14px] font-[Roboto] font-[500] ">
                                Back
                            </div>
                            <div className="text-[24px] font-[500] font-[Roboto]">Live Preview - {newPreset?.nick_name}</div>
                        </div>
                        <div className="cursor-pointer" onClick={() => setPreviewDrawer(!previewDrawer)}>
                            <RxCross2 size={24} />
                        </div>
                    </div>

                    <PreviewBox newPreset={newPreset} previewDrawer={previewDrawer} description={description} />
                </Drawer>
            </>
        </div>
    );
};

export default PreviewDrawer;
