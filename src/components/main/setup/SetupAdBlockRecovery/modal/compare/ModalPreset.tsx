import { Avatar, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { RoundButton } from '../../../../../common/Button';
import { Preset } from '../../redux/types';
import { HEADERMENU_PATH } from '../../../../../../routes/RoutesURL';
import { useNavigate } from 'react-router-dom';
import PModal from '../../../../../common/Modal';

type Props = {
    allPresets: Preset[];
};

const ModalPreset: React.FC<Props> = ({ allPresets }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedPresets, setSelectedPresets] = useState<string[]>([]);

    const handleCheckBox = (widId: any) => {
        let dumList = [...selectedPresets];
        let index = dumList.indexOf(widId);
        if (index > -1) {
            dumList.splice(index, 1);
        } else {
            dumList.push(widId);
        }
        setSelectedPresets(dumList);
    };

    const handleCompare = () => {
        let sortedList: string[] = [];
        selectedPresets?.forEach((items: any) => {
            if (items?.widget_id) {
                sortedList.push(items?.widget_id);
            }
        });
        if (sortedList?.length > 0) {
            let siteId = allPresets[0]?.site_id;
            const url = `${HEADERMENU_PATH.setup}${HEADERMENU_PATH.setupAdBlockRecovery}/${siteId}${HEADERMENU_PATH.presetsComparison}`;
            navigate(url, {
                state: {
                    data: sortedList,
                },
            });
        }
    };

    useEffect(() => {
        if (showModal === false) {
            setSelectedPresets([]);
        }
    }, [showModal])

    return (
        <div>
            <>
                <>
                    <RoundButton
                        title="Compare"
                        light={true}
                        className={'w-[200px] text-[14px]'}
                        onClick={() => {
                            setShowModal(!showModal);
                        }}
                    />
                </>

                <PModal
                    title="Compare Presets"
                    open={showModal}
                    setOpen={setShowModal}
                    width='350px'
                    bodyStyle={{ height: '500px', overflowY: 'scroll' }}
                    className='noscrollbar'
                    footer={
                        <div className="flex justify-end gap-5 mt-5  px-5 pb-4">
                            <div
                                className="text-[green] text-[16px] font-bold font-[Roboto] cursor-pointer"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                Cancel
                            </div>
                            <div className={selectedPresets?.length > 0 ? 'text-[green] text-[16px] font-bold font-[Roboto] cursor-pointer' : 'text-[#4d544d] text-[16px] font-bold font-[Roboto] opacity-50 cursor-not-allowed'} onClick={handleCompare}>
                                Compare
                            </div>
                        </div>
                    }
                >
                    <p className="text-[gray] font-[Roboto]">{`Select ${allPresets?.length > 5 ? 'up to 5' : ''} presets to compare the performance`}</p>

                    <div>
                        {allPresets?.map((item, key) => (
                            <div key={key} className=" flex justify-between mt-4 items-center">
                                <div className="flex justify-between items-center gap-3 ">
                                    <div className="">
                                        <Avatar style={{ backgroundColor: '#D3EFC5', verticalAlign: 'middle' }} size="large">
                                            {<div className="text-black font-semibold">A</div>}
                                        </Avatar>
                                    </div>

                                    <div className="font-medium font-[Roboto]  text-[16px] w-[210px] ">{item?.nick_name}</div>
                                </div>

                                <div className=" w-[22px] ">
                                    <Checkbox
                                        style={{ fontWeight: 'bold' }}
                                        className="customCheckBox"
                                        checked={selectedPresets?.findIndex((s: any) => s.widget_id === item?.widget_id) === -1 ? false : true}
                                        disabled={selectedPresets.length > 4 && selectedPresets.findIndex((s: any) => s.widget_id === item.widget_id) === -1}
                                        onChange={(e) => handleCheckBox(item)}
                                    ></Checkbox>
                                </div>
                            </div>
                        ))}
                    </div>


                </PModal>
            </>
        </div>
    );
};

export default ModalPreset;
