import React, { useMemo } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Button } from 'antd';
import PublirPresetBackImage from '../../../../../../../assets/PublirPresetBackImage.png';
import { CreatePreset } from '../../../redux/types';
import adblockRecoverySetupUtils from '../../../utils';
import { EditorState } from 'draft-js';

type Props = {
    newPreset: CreatePreset;
    previewDrawer?: boolean;
    description: EditorState;
};

const position: any = {
    left: '-webkit-left',
    center: '-webkit-center',
    right: '-webkit-right',
};

const PreviewBox: React.FC<Props> = ({ newPreset, previewDrawer, description }) => {
    const handlestyle = () => {
        return {
            backgroundColor: newPreset?.notice_bg_color,
            border: `${newPreset?.notice_border_width}px solid ${newPreset?.notice_border_color}`,
            bottom: newPreset?.notice_location === 'bottom' ? 0 : 'unset',
            top: newPreset?.notice_location === 'top' ? (previewDrawer ? 0 : '11%') : 'unset',
        };
    };

    const handleButtoStyle = () => {
        return {
            color: newPreset?.whitelist_btn_font_color,
            backgroundColor: newPreset?.whitelist_btn_color,
        };
    };

    const blurPercentage = useMemo(() => {
        if (newPreset?.blur_content) {
            return (newPreset?.blur_content_percentage || 1 * 5) / 100;
        }
        return 0;
    }, [newPreset?.blur_content, newPreset?.blur_content_percentage]);

    const getDescriptionHTML = useMemo(() => {
        let desc_string = adblockRecoverySetupUtils.convertEditorStateDataToHtml(description);

        const linkColor = newPreset.link_color;
        const linkHoverColor = newPreset.link_hover_color;
        desc_string = desc_string.replace(
            /<a([^>]+)>/g,
            `<a$1 style="color: ${linkColor}" onMouseOver="style.color=\`${linkHoverColor}\`"
            onMouseOut="this.style.color=\`${linkColor}\`">`,
        );
        return desc_string;
    }, [description, newPreset]);
    return (
        <div>
            {!previewDrawer && <div className="h-[56px] pl-8 leading-[56px] text-[#FFFFFF] bg-[#000000] text-[18px] font-[600] font-[Roboto]">Preview</div>}
            <div className={previewDrawer && newPreset?.notice_location === 'top' ? 'relative' : ''}>
                {previewDrawer ? <img style={{ filter: `blur(${blurPercentage}px)` }} className="w-full" src={PublirPresetBackImage} alt="BackgroundImagePreset" /> : null}
                {!adblockRecoverySetupUtils.checkIsEmpty(description) ? (
                    <div style={handlestyle()} className={`w-full absolute flex justify-center items-center ${newPreset?.notice_location === 'popup' && 'modal'}`}>
                        <div className="m-5 flex flex-col text-left w-full">
                            <div className="flex justify-between">
                                <div className="text-[16px] mt-1 font-[400] font-[Roboto]" style={{ color: newPreset?.notice_text_color }}>
                                    <div dangerouslySetInnerHTML={{ __html: getDescriptionHTML }} />
                                </div>
                                {newPreset?.allow_close ? (
                                    <div className="w-[30px] mt-2 mx-2">
                                        <RxCross2 style={{ color: newPreset?.close_btn_font_color, backgroundColor: newPreset?.close_btn_bg_color }} size={20} />
                                    </div>
                                ) : null}
                            </div>
                            {newPreset?.show_whitelist_instructions ? (
                                <div className="w-full mt-5" style={{ textAlign: position[newPreset?.whitelist_btn_location || 'left'] }}>
                                    <Button className={`rounded-lg px-9 w-fit text-base flex justify-center items-center py-2`} style={handleButtoStyle()}>
                                        Whitelist Instructions
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="text-[16px] font-[400] text-[#000000] font-[Roboto] text-center mt-10">No Preview Available</div>
                )}
            </div>
        </div>
    );
};
export default PreviewBox;
