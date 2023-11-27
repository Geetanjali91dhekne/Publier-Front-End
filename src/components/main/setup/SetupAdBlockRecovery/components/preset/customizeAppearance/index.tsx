import React, { useEffect } from 'react';
import ColorPicker from '../../../../../../common/ColorPicker';
import { Select } from 'antd';
const { Option } = Select;

type Props = {
    newPreset: any;
    setNewPreset: any;
};

const PresetAppearance: React.FC<Props> = ({ newPreset, setNewPreset }) => {
    useEffect(() => {
        setNewPreset(newPreset);
    }, [newPreset, setNewPreset]);

    return (
        <div className="mx-5 mb-10 font-[Roboto] text-[14px] font-semibold">
            <div className="flex justify-between mt-8 ">
                {/* column 1 */}
                <div id="col-1" className=" w-1/2 border-r pr-5">
                    <div className="flex justify-between">
                        <div>Notice Background Color</div>
                        <div>
                            <ColorPicker
                                color={newPreset?.notice_bg_color}
                                setColor={(color: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        notice_bg_color: color,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between">
                        <div>Font Color</div>
                        <div>
                            <ColorPicker
                                color={newPreset?.notice_text_color}
                                setColor={(color: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        notice_text_color: color,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between">
                        <div>Border Color</div>
                        <div>
                            <ColorPicker
                                color={newPreset?.notice_border_color}
                                setColor={(color: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        notice_border_color: color,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between">
                        <div>Link Color</div>
                        <div>
                            <ColorPicker
                                color={newPreset?.link_color}
                                setColor={(color: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        link_color: color,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                        <div>Border Width</div>
                        <div>
                            <Select
                                value={newPreset?.notice_border_width}
                                className="w-[90px] rounded-lg border font-[montserrat]"
                                style={{ fontSize: '5px' }}
                                onChange={(e) =>
                                    setNewPreset({
                                        ...newPreset,
                                        notice_border_width: e,
                                    })
                                }
                            
                            >
                                <Option value="0">None</Option>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="15">15</Option>
                                <Option value="20">20</Option>
                            </Select>
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                        <div>Whitelist Button Location</div>
                        <div>
                            <Select
                                value={newPreset?.whitelist_btn_location}
                                className="w-[90px] border rounded-lg"
                                style={{ fontSize: '5px' }}
                                onChange={(e) =>
                                    setNewPreset({
                                        ...newPreset,
                                        whitelist_btn_location: e,
                                    })
                                }
                            >
                                <Option value="left">Left</Option>
                                <Option value="right">Right</Option>
                                <Option value="center">Center</Option>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* column 2 */}
                <div id="col-2" className=" w-1/2 border-l pl-5">
                    <div className="flex justify-between">
                        <div>Close Button Background Color</div>
                        <div>
                            <ColorPicker
                                color={newPreset?.close_btn_bg_color}
                                setColor={(color: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        close_btn_bg_color: color,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between">
                        <div>Close Button Font Color</div>
                        <div>
                            <ColorPicker
                                color={newPreset?.close_btn_font_color}
                                setColor={(color: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        close_btn_font_color: color,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between">
                        <div>Whitelist Button Color</div>
                        <div>
                            <ColorPicker
                                color={newPreset?.whitelist_btn_color}
                                setColor={(color: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        whitelist_btn_color: color,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between">
                        <div>Whitelist Button Font Color</div>
                        <div>
                            <ColorPicker
                                color={newPreset?.whitelist_btn_font_color}
                                setColor={(color: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        whitelist_btn_font_color: color,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between">
                        <div>Link Hover Color</div>
                        <div>
                            <ColorPicker
                                color={newPreset?.link_hover_color}
                                setColor={(color: any) => {
                                    setNewPreset({
                                        ...newPreset,
                                        link_hover_color: color,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresetAppearance;
