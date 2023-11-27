import React, { useRef, useState } from 'react';
import { Drawer, Steps } from 'antd';
import { RoundButton } from '../../../../common/Button';
import SiteSecondPage from './SiteSecondPage';
import SiteThirdPage from './SiteThirdPage';
import SiteFirstPage from './SiteFirstPage';
import { SecondPageState } from '../../redux/types';

const CreateSite: React.FC = () => {
    const firstPageRef = useRef<any>();
    const submitRef = useRef<any>();
    const submitPublisherRef = useRef<any>();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [current, setCurrent] = useState(0);
    const [firstPageData, setfirstPageData] = useState<{
        publisherID?: any;
        searchData?: string;
    }>({
        publisherID: undefined,
        searchData: undefined,
    });

    const [secondPageData, setSecondPageData] = useState<SecondPageState>({
        info: {
            publisherId: '',
            publisherName: '',
            contactEmail: '',
            MCMEmail: '',
            password: '',
            accessType: '',
            showNetworkLevel: false,
            BusinessName: '',
            sameMCMemail: false,
        },
        gam: {
            gamId: '',
            gamAPIName: '',
            gamAPIEmail: '',
            gamAPIPasscode: '',
            gamAPIStatus: false,
        },
        status: {
            status: 'Y',
        },
    });

    const onClickCreateOrEdit = () => {
        setOpenDrawer(true);
    };

    const onClose = () => {
        setOpenDrawer(false);
        setCurrent(0);
    };

    const next = () => {
        if (current === 0) {
            firstPageRef?.current?.onClickNext();
        } else {
            submitPublisherRef?.current?.onClickCreateEditPublisher();
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'First',
            content: <SiteFirstPage firstPageData={firstPageData} setfirstPageData={setfirstPageData} firstPageRef={firstPageRef} current={current} setCurrent={setCurrent} />,
        },
        {
            title: 'Second',
            content: <SiteSecondPage secondPageData={secondPageData} setSecondPageData={setSecondPageData} ID={firstPageData?.publisherID || ''} submitRef={submitPublisherRef} current={current} setCurrent={setCurrent} />,
        },
        {
            title: 'Last',
            content: <SiteThirdPage publisherPrev={secondPageData?.info?.publisherId} ID={''} submitRef={submitRef} />,
        },
    ];

    return (
        <>
            <>{<RoundButton onClick={onClickCreateOrEdit} title="Create New Site" className="w-[200px] text-[14px]" />}</>
            <Drawer width={750} open={openDrawer} closable={false} onClose={() => setOpenDrawer(false)} closeIcon={null}>
                <div className="sticky -top-6 bg-white z-50 pb-4">
                    <div className="pt-8 pl-10 first-line:text-[12px] font-[700] font-[Roboto]">
                        <Steps
                            current={current}
                            className="pl-10 w-[550px]"
                            items={[
                                {
                                    title: 'Step 1',
                                    description: 'Select/Create Publisher',
                                },
                                {
                                    title: 'Step 2',
                                    description: 'Create/Edit Publisher',
                                },
                                {
                                    title: 'Step 3',
                                    description: 'Create Site',
                                },
                            ]}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-9 ">
                        <div className="flex">
                            <div className={current > 0 ? 'mr-4 border rounded-3xl border-green-800' : ''}>{current > 0 && <RoundButton onClick={() => prev()} light={true} title={'Back'} className="w-[136px] h-[40px] text-[14px]" />}</div>
                            <div className="flex gap-4">
                                {current === steps.length - 1 && <RoundButton onClick={() => submitRef?.current?.onClickCreateEditSite()} title={'Save'} className="w-[136px] h-[40px] text-[14px]" />}

                                {current < steps.length - 1 && <RoundButton onClick={() => next()} title={'Next'} className="w-[136px] h-[40px] text-[14px]" />}
                                <div className={'mr-4 border rounded-3xl border-green-800'}>
                                    <RoundButton onClick={() => onClose()} light={true} title={'Cancel'} className="w-[136px] h-[40px] text-[14px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-5 ">{steps[current].content}</div>
            </Drawer>
        </>
    );
};

export default CreateSite;
