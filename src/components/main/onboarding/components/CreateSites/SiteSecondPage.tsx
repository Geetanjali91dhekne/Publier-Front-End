import { Checkbox, Radio, Spin } from 'antd';
import PNormalInput from '../../../../common/NormalInput';
import CommonDropDown from '../../../../common/CommonDropDown';
import { useEffect, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/RootReducer';
import OnboardActions from '../../redux/actions';
import Apis from '../../../../../api';
import MessageActions from '../../../../message/redux/actions';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
type Props = {
    ID?: any;
    submitRef?: any;
    setData?: any;
    current?: any;
    setCurrent?: any;
    setSecondPageData?: any;
    secondPageData?: any;
};
const SiteSecondPage: React.FC<Props> = ({ ID, submitRef, setData, current, setCurrent, setSecondPageData, secondPageData }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isHidePassword, setHidePassword] = useState(true);
    // const [isHideGamPassword, setHideGamPassword] = useState(true);
    const [isValidate, setValidate] = useState(false);
    const publisherData = useSelector((state: RootState) => state?.onboarding?.onboardingPublisherDetails);

    useEffect(() => {
        if (ID) {
            dispatch(OnboardActions.fetchOnboardGetPublisherDetails(ID));
        } else {
            dispatch(OnboardActions.setOnboardGetPublisherDetails(undefined));
        }
    }, [dispatch, ID]);

    useEffect(() => {
        if (ID && publisherData) {
            setSecondPageData({
                info: {
                    publisherId: publisherData?.publisher_id,
                    publisherName: publisherData?.full_name,
                    contactEmail: publisherData?.email,
                    MCMEmail: publisherData?.mcm_email,
                    password: publisherData?.password,
                    accessType: publisherData?.access_type,
                    showNetworkLevel: publisherData?.show_network_level_data === 'N' ? false : true,
                    BusinessName: publisherData?.business_name,
                    sameMCMemail: publisherData?.same_mcm_email === 'N' ? false : true,
                },
                gam: {
                    gamId: publisherData?.parent_gam_id,
                    gamAPIName: publisherData?.gam_api_name,
                    gamAPIEmail: publisherData?.gam_api_email,
                    gamAPIPasscode: publisherData?.gam_api_passcode,
                    gamAPIStatus: publisherData?.gam_api_status === 'N' ? false : true,
                },
                status: {
                    status: publisherData?.status || 'N',
                },
            });
        } else {
            setSecondPageData({
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
                    status: 'N',
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ID, publisherData]);

    useEffect(() => {
        if (secondPageData?.info?.sameMCMemail) {
            setSecondPageData({
                ...secondPageData,
                info: {
                    ...secondPageData?.info,
                    MCMEmail: secondPageData?.info?.contactEmail,
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondPageData?.info?.contactEmail, secondPageData?.info?.sameMCMemail]);

    const isValidEmail = (email: string) => {
        let format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        let res = email.match(format);
        if (res) {
            return true;
        } else {
            return false;
        }
    };

    useImperativeHandle(submitRef, () => ({
        onClickCreateEditPublisher() {
            setValidate(true);
            if (
                !secondPageData?.info?.publisherName ||
                secondPageData?.info?.publisherName.trim() === '' ||
                (secondPageData?.info.contactEmail && !isValidEmail(secondPageData?.info.contactEmail.trim())) ||
                !secondPageData?.info?.accessType ||
                (secondPageData?.info.MCMEmail && !isValidEmail(secondPageData?.info.MCMEmail.trim())) ||
                !secondPageData?.info?.BusinessName ||
                secondPageData?.info?.BusinessName.trim() === '' ||
                !secondPageData?.info?.password ||
                secondPageData?.info?.password.trim() === ''
            ) {
                return;
            }
            setValidate(false);
            const payload = {
                full_name: secondPageData?.info?.publisherName,
                business_name: secondPageData?.info?.BusinessName,
                email: secondPageData?.info?.contactEmail,
                same_mcm_email: secondPageData?.info?.MCMEmail ? 'Y' : 'N',
                mcm_email: secondPageData?.info?.MCMEmail,
                password: secondPageData?.info?.password,
                access_type: secondPageData?.info?.accessType,
                show_network_level_data: secondPageData?.info?.showNetworkLevel ? 'Y' : 'N',
                parent_gam_id: secondPageData?.gam?.gamId ? secondPageData?.gam?.gamId : null,
                gam_api_name: secondPageData?.gam?.gamAPIName ? secondPageData?.gam?.gamAPIName : null,
                gam_api_email: secondPageData?.gam?.gamAPIEmail ? secondPageData?.gam?.gamAPIEmail : null,
                gam_api_passcode: secondPageData?.gam?.gamAPIPasscode ? secondPageData?.gam?.gamAPIPasscode : null,
                gam_api_status: secondPageData?.gam?.gamAPIStatus ? 'Y' : 'N',
                status: secondPageData?.status?.status,
            };
            if (publisherData) {
                setLoading(true);
                Apis.editPublisherOnboardApi(payload, publisherData?.id)
                    .then(() => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: `Publisher updated successfully!`, error: false }));
                        setCurrent(current + 1);
                        dispatch(OnboardActions.fetchOnboardPublisherList());
                    })
                    .catch((err) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            } else {
                setLoading(true);
                Apis.createNewPublisherOnboardApi(payload)
                    .then(({ data }) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: `Publisher Created successfully!`, error: false }));
                        setCurrent(current + 1);
                        setSecondPageData({ ...secondPageData, info: { ...secondPageData?.info, publisherId: data?.data?.publisher_id } });
                        dispatch(OnboardActions.fetchOnboardPublisherList());
                    })
                    .catch((err) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            }
        },
    }));
    return (
        <div className="relative">
            <div className={ID && !publisherData ? 'opacity-50' : ''}>
                <div className="w-full">
                    <div className="bg-[#F6F9F7]  px-5 pt-5 pb-5">
                        <div className="flex flex-wrap w-full">
                            <div className="mt-4">
                                <Radio.Group
                                    className="flex flex-wrap w-full"
                                    value={secondPageData?.status?.status}
                                    onChange={(e) => {
                                        setSecondPageData({
                                            ...secondPageData,
                                            status: {
                                                ...secondPageData?.status,
                                                status: e.target.value,
                                            },
                                        });
                                    }}
                                >
                                    <div className="w-1/2  flex items-center" style={{ backgroundColor: '#F6F9F7' }}>
                                        <Radio value={'Y'}>
                                            <p className="font-normal roboto text-[16px]">Active</p>
                                        </Radio>
                                    </div>

                                    <div className="w-1/2  flex items-center" style={{ backgroundColor: '#F6F9F7' }}>
                                        <Radio value={'N'}>
                                            <p className="font-normal roboto text-[16px]">Inactive</p>
                                        </Radio>
                                    </div>
                                </Radio.Group>
                            </div>
                        </div>

                        <p className="my-5 font-[700] font-[Roboto] text-[14px]">Publisher Info</p>
                        <div className="mt-5 w-1/2">
                            <PNormalInput title="Publisher ID" name="nick_name" placeholder="Auto Filled" value={secondPageData?.info?.publisherId} disabled onChange={(e) => {}} />
                        </div>

                        <div className="flex gap-4">
                            <div className="mt-5 w-1/2">
                                <PNormalInput
                                    title={
                                        <span>
                                            Name <span className="common_error font-[800]">*</span>
                                        </span>
                                    }
                                    name="nick_name"
                                    placeholder="Enter Name"
                                    value={secondPageData?.info?.publisherName}
                                    onChange={(e) => {
                                        setSecondPageData({
                                            ...secondPageData,
                                            info: {
                                                ...secondPageData?.info,
                                                publisherName: e.value ? String(e.value) : '',
                                            },
                                        });
                                    }}
                                />
                                {isValidate && (!secondPageData?.info?.publisherName || secondPageData?.info?.publisherName.trim() === '') && <span className="common_error ml-1">Please Enter Name</span>}
                            </div>

                            <div className="mt-5 w-1/2">
                                <PNormalInput
                                    title={
                                        <span>
                                            Publisher Business Name <span className="common_error font-[800]">*</span>
                                        </span>
                                    }
                                    name="nick_name"
                                    placeholder="Enter Business Name"
                                    value={secondPageData?.info?.BusinessName}
                                    onChange={(e: any) => {
                                        setSecondPageData({
                                            ...secondPageData,
                                            info: {
                                                ...secondPageData?.info,
                                                BusinessName: e.value,
                                            },
                                        });
                                    }}
                                />
                                {isValidate && (!secondPageData?.info?.BusinessName || secondPageData?.info?.BusinessName.trim() === '') && <span className="common_error ml-1">Please Enter Business Name</span>}
                            </div>
                        </div>

                        <div className="flex">
                            <div className="mt-5 w-1/2">
                                <PNormalInput
                                    title={
                                        <span>
                                            Contact Email <span className="common_error font-[800]">*</span>
                                        </span>
                                    }
                                    name="nick_name"
                                    placeholder="Enter Email"
                                    value={secondPageData?.info?.contactEmail}
                                    onChange={(e: any) => {
                                        setSecondPageData({
                                            ...secondPageData,
                                            info: {
                                                ...secondPageData?.info,
                                                contactEmail: e.value,
                                            },
                                        });
                                    }}
                                />
                                {isValidate && !isValidEmail(String(secondPageData?.info?.contactEmail)) && <span className="common_error ml-1">Please Enter valid email</span>}
                            </div>

                            <div className="ml-5 mt-6 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={secondPageData?.info?.sameMCMemail}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setSecondPageData({
                                            ...secondPageData,
                                            info: {
                                                ...secondPageData?.info,
                                                sameMCMemail: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2 items-center">MCM Email Same as Contact email</div>
                            </div>
                        </div>
                        <div className="mt-5 w-1/2">
                            <PNormalInput
                                title={
                                    <span>
                                        MCM Email <span className="common_error font-[800]">*</span>
                                    </span>
                                }
                                name="mcm email"
                                placeholder="Enter MCM Email"
                                value={secondPageData?.info?.MCMEmail}
                                disabled={secondPageData?.info?.sameMCMemail}
                                onChange={(e: any) => {
                                    setSecondPageData({
                                        ...secondPageData,
                                        info: {
                                            ...secondPageData?.info,
                                            MCMEmail: e.value,
                                        },
                                    });
                                }}
                            />
                            {isValidate && !isValidEmail(String(secondPageData?.info?.MCMEmail)) && <span className="common_error ml-1">Please Enter valid email</span>}
                        </div>

                        <div className="mt-5 w-1/2">
                            <PNormalInput
                                title={
                                    <span>
                                        Password <span className="common_error font-[800]">*</span>
                                    </span>
                                }
                                name="nick_name"
                                type={isHidePassword ? 'password' : 'text'}
                                placeholder="Enter Password"
                                value={secondPageData?.info?.password}
                                onChange={(e) => {
                                    setSecondPageData({
                                        ...secondPageData,
                                        info: {
                                            ...secondPageData?.info,
                                            password: e.value ? String(e.value) : '',
                                        },
                                    });
                                }}
                                suffix={
                                    isHidePassword ? (
                                        <AiFillEyeInvisible size={'1.3rem'} color="#056433" onClick={() => setHidePassword(!isHidePassword)} />
                                    ) : (
                                        <AiFillEye size={'1.3rem'} color="#056433" onClick={() => setHidePassword(!isHidePassword)} />
                                    )
                                }
                            />
                            {isValidate && (!secondPageData?.info?.password || secondPageData?.info?.password.trim() === '') && <span className="common_error ml-1">Please Enter Password</span>}
                        </div>

                        <div className="flex mt-5 items-center">
                            <div className="w-1/2">
                                <CommonDropDown
                                    title={
                                        <span>
                                            Access Type <span className="common_error font-[800]">*</span>
                                        </span>
                                    }
                                    filterType="Access Type"
                                    value={secondPageData?.info.accessType}
                                    dataList={[
                                        { title: 'All', value: 'ALL' },
                                        { title: 'Setup', value: 'SETUP' },
                                        { title: 'Dashboard', value: 'DASHBOARD' },
                                    ]}
                                    setValue={(e: any) => {
                                        setSecondPageData({
                                            ...secondPageData,
                                            info: {
                                                ...secondPageData?.info,
                                                accessType: e,
                                            },
                                        });
                                    }}
                                />
                                {isValidate && !secondPageData?.info?.accessType && <span className="common_error ml-1">Please Select Access Type</span>}
                            </div>

                            <div className="ml-5 mt-6 flex items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={secondPageData?.info?.showNetworkLevel}
                                    className="customCheckBox2"
                                    onChange={(e) => {
                                        setSecondPageData({
                                            ...secondPageData,
                                            info: {
                                                ...secondPageData?.info,
                                                showNetworkLevel: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                                <div className="ml-2 items-center">Show Network Level Data</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className=' mt-5'>
                         <div className='bg-[#F6F9F7] px-5 pt-5 pb-5'>

                              <p className='my-5 font-[700] font-[Roboto] text-[14px]'>GAM Details</p>
                              <div className='mt-5'>
                                   <PNormalInput
                                        title="Parent GAM ID"
                                        name="nick_name"
                                        placeholder='Auto Filled'
                                        value={""}
                                        disabled
                                        onChange={(e) => {

                                        }}
                                   />
                              </div>

                              <div className='flex gap-4'>
                                   <div className='mt-5 flex-1'>
                                        <PNormalInput
                                             title="GAM API Name"
                                             name="nick_name"
                                             placeholder=''
                                             value={secondPageData?.gam?.gamAPIName}
                                             onChange={(e) => {
                                                  setSecondPageData({
                                                       ...secondPageData,
                                                       gam: {
                                                            ...secondPageData?.gam,
                                                            gamAPIName: e.value ? String(e.value) : ''
                                                       }
                                                  })
                                             }}
                                        />
                                   </div>

                                   <div className='mt-5 flex-1'>
                                        <PNormalInput
                                             title="GAM API Email"
                                             name="nick_name"
                                             placeholder=''
                                             value={secondPageData?.gam?.gamAPIEmail}
                                             onChange={(e) => {
                                                  setSecondPageData({
                                                       ...secondPageData,
                                                       gam: {
                                                            ...secondPageData?.gam,
                                                            gamAPIEmail: e.value ? String(e.value) : ''
                                                       }
                                                  })
                                             }}
                                        />
                                   </div>
                              </div>
                              <div className='w-[300px]'>
                                   <div className='mt-5 flex-1'>
                                        <PNormalInput
                                             title="GAM API PassCode"
                                             name="nick_name"
                                             type={isHideGamPassword ? 'password' : 'text'}
                                             placeholder=''
                                             value={secondPageData?.gam?.gamAPIPasscode}
                                             onChange={(e) => {
                                                  setSecondPageData({
                                                       ...secondPageData,
                                                       gam: {
                                                            ...secondPageData?.gam,
                                                            gamAPIPasscode: e.value ? String(e.value) : ''
                                                       }
                                                  })
                                             }}
                                             suffix={
                                                  isHideGamPassword ? <AiFillEyeInvisible size={'1.3rem'} color="#056433" onClick={() => setHideGamPassword(!isHideGamPassword)} /> : <AiFillEye size={'1.3rem'} color="#056433" onClick={() => setHideGamPassword(!isHideGamPassword)} />
                                             }
                                        />
                                   </div>
                              </div>
                              <div className='mt-5 flex items-center font-[Roboto] font-[500] text-[16px]'>
                                   <Checkbox
                                        checked={secondPageData?.gam?.gamAPIStatus}
                                        className='customCheckBox2'
                                        onChange={(e) => {
                                             setSecondPageData({
                                                  ...secondPageData,
                                                  gam: {
                                                       ...secondPageData?.gam,
                                                       gamAPIStatus: e.target.checked
                                                  }
                                             })
                                        }}
                                   />
                                   <div className='ml-2'>GAM API Status</div>
                              </div>
                         </div>
                    </div> */}
            </div>

            {((ID && (!publisherData || publisherData === undefined || publisherData?.length === 0)) || loading) && (
                <div className="absolute w-full top-0">
                    <div className="flex h-[70vh] justify-center items-center ">
                        <Spin />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SiteSecondPage;
