import { Checkbox, Spin } from 'antd';
import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react';
import CommonDropDown from '../../../../../common/CommonDropDown';
import PNormalInput from '../../../../../common/NormalInput';
import TextArea from 'antd/es/input/TextArea';
import DocumentImage from '../../../../../../assets/icons/onboarding/document.png';
import Preview from '../../../../../../assets/icons/onboarding/preview.svg';
import { RoundButton } from '../../../../../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import Apis from '../../../../../../api';
import MessageActions from '../../../../../message/redux/actions';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../../../store/RootReducer';
import OnboardActions from '../../../redux/actions';

type Props = {
    siteDetailRef?: any;
    setOpen?: any;
    open: boolean;
};
const Billing: React.FC<Props> = ({ siteDetailRef, setOpen, open }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const siteId = params.siteId;
    const [validate, setValidate] = useState(false);
    const GeneralTabData = useSelector((state: RootState) => state.onboarding.onboardingGeneralTabDetails);
    const backendUrl: any = process.env.REACT_APP_BACKEND_URL;

    const [billingData, setBillingData] = useState<{
        billingCompleted?: boolean;
        attachment?: string;
        sendAsPDF?: boolean;
        sendAsExcel?: boolean;
        emailIds?: string;
        message?: string;
        type?: string;
    }>({
        billingCompleted: undefined,
        attachment: undefined,
        sendAsPDF: undefined,
        sendAsExcel: undefined,
        emailIds: undefined,
        message: undefined,
        type: undefined,
    });

    useEffect(() => {
        if (open) {
            if (GeneralTabData?.billingData?.length > 0) {
                setBillingData({
                    billingCompleted: GeneralTabData?.billingData[GeneralTabData?.billingData?.length - 1]?.status === 'Y' ? true : false,
                    sendAsPDF: GeneralTabData?.billingData[GeneralTabData?.billingData?.length - 1]?.as_pdf === 'Y' ? true : false,
                    sendAsExcel: GeneralTabData?.billingData[GeneralTabData?.billingData?.length - 1]?.as_excel === 'Y' ? true : false,
                    emailIds: GeneralTabData?.billingData[GeneralTabData?.billingData?.length - 1]?.email,
                    message: GeneralTabData?.billingData[GeneralTabData?.billingData?.length - 1]?.message,
                    type: GeneralTabData?.billingData[GeneralTabData?.billingData?.length - 1]?.type,
                });
            } else {
                setBillingData({
                    billingCompleted: undefined,
                    sendAsPDF: undefined,
                    sendAsExcel: undefined,
                    emailIds: undefined,
                    message: undefined,
                    type: undefined,
                });
            }
        }
    }, [GeneralTabData?.billingData, siteId, open]);

    const onClickSendBillingForm = () => {
        if (GeneralTabData?.billingData?.length > 0) {
            setValidate(true);
            if (!billingData?.message || billingData?.message.trim() === '' || !billingData?.emailIds || billingData?.emailIds.trim() === '' || !billingData?.type || !(billingData?.sendAsExcel || billingData?.sendAsPDF)) {
                return;
            }
            setValidate(false);
            const mailPayload = {
                "billing_id": GeneralTabData?.billingData[GeneralTabData?.billingData?.length - 1]?.id,   // alredy billing created
                "site_id": siteId,
                "type": billingData?.type,
                "as_pdf": billingData?.sendAsPDF ? 'Y' : 'N',
                "as_excel": billingData?.sendAsExcel ? 'Y' : 'N',
                "email": billingData?.emailIds,
                "message": billingData?.message,
                "status": billingData?.billingCompleted ? 'Y' : 'N'
            }
            setLoading(true);
            Apis.getSendBillingMailOnboardApi(mailPayload)
                .then(() => {
                    setLoading(false);
                    dispatch(MessageActions.showMessage({ text: `Billing Mail Send Successfully!`, error: false }));
                    dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                })
                .catch((err) => {
                    setLoading(false);
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                });
        } else {
            setValidate(true);
            if (!billingData?.message || billingData?.message.trim() === '' || !billingData?.emailIds || billingData?.emailIds.trim() === '' || !billingData?.type || !(billingData?.sendAsExcel || billingData?.sendAsPDF)) {
                return;
            }
            setValidate(false);
            const newMailPayload = {
                "site_id": siteId,
                "type": billingData?.type,
                "as_pdf": billingData?.sendAsPDF ? 'Y' : 'N',
                "as_excel": billingData?.sendAsExcel ? 'Y' : 'N',
                "email": billingData?.emailIds,
                "message": billingData?.message,
                "status": billingData?.billingCompleted ? 'Y' : 'N'
            }
            setLoading(true);
            Apis.getSendBillingMailOnboardApi(newMailPayload)
                .then(() => {
                    setLoading(false);
                    dispatch(MessageActions.showMessage({ text: `Billing Mail Send Successfully!`, error: false }));
                    dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                })
                .catch((err) => {
                    setLoading(false);
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                });
        }
    };

    useImperativeHandle(siteDetailRef, () => ({
        onClickCreateBilling() {
            const payload = {
                site_id: siteId,
                type: billingData?.type,
                as_pdf: billingData?.sendAsPDF ? 'Y' : 'N',
                as_excel: billingData?.sendAsExcel ? 'Y' : 'N',
                email: billingData?.emailIds,
                message: billingData?.message,
                status: billingData?.billingCompleted ? 'Y' : 'N',
            };

            if (GeneralTabData?.billingData?.length > 0) {
                setLoading(true);
                Apis.editBillingOnbaordApi(payload, GeneralTabData?.billingData[GeneralTabData?.billingData?.length - 1]?.id)
                    .then(() => {
                        setLoading(false);
                        setOpen(false);
                        dispatch(MessageActions.showMessage({ text: `billing updated successfully!`, error: false }));
                        dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                    })
                    .catch((err) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            } else {
                setLoading(true);
                Apis.createBillingOnboardApi(payload)
                    .then(() => {
                        setLoading(false);
                        setOpen(false);
                        dispatch(MessageActions.showMessage({ text: `billing created successfully!`, error: false }));
                        dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                    })
                    .catch((err) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            }
        },
    }));


    const ViewFile = (fileIndex: any) => {
        const url = filteredFiles[fileIndex].fileurl;
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.click();
        console.log(url);
    };

    const filteredFiles = useMemo(() => {
        const fileArray = [
            {
                sendAsPDF: true,
                sendAsExcel: false,
                fileName: 'W8.pdf',
                type: 'W8',
                fileurl: `${backendUrl}/storage/general-billing/fw8.pdf`,
            },
            {
                sendAsPDF: true,
                sendAsExcel: false,
                fileName: 'W9.pdf',
                type: 'W9',
                fileurl: `${backendUrl}/storage/general-billing/fw9.pdf`,
            },
            {
                sendAsPDF: false,
                sendAsExcel: true,
                fileName: 'W8.xlsx',
                type: 'W8',
                fileurl: `${backendUrl}/storage/general-billing/fw8.xlsx`,
            },
            {
                sendAsPDF: false,
                sendAsExcel: true,
                fileName: 'W9.xlsx',
                type: 'W9',
                fileurl: `${backendUrl}/storage/general-billing/fw9.xlsx`,
            },
        ];
        if (billingData?.sendAsPDF || billingData?.sendAsExcel) {
            return fileArray.filter((item: any) => {
                return billingData?.type === item.type && (billingData?.sendAsPDF === item.sendAsPDF || billingData?.sendAsExcel === item.sendAsExcel);
            });
        }
        return [];
    }, [billingData, backendUrl]);

    return (
        <div>
            <div className="px-8">
                <div className="flex gap-4 items-center font-[Roboto] font-[500] text-[16px]">
                    <Checkbox
                        className="customCheckBox2"
                        checked={billingData?.billingCompleted}
                        onChange={(e) => {
                            setBillingData({
                                ...billingData,
                                billingCompleted: e.target.checked,
                            });
                        }}
                    />{' '}
                    Mark as Complete
                </div>
                <div className="flex mt-5 gap-10 items-center">
                    <div>
                        <CommonDropDown
                            filterType="BillingTask"
                            value={billingData?.type}
                            placeholder="Select W8 or W9"
                            dataList={[
                                { title: 'W8', value: 'W8' },
                                { title: 'W9', value: 'W9' },
                            ]}
                            setValue={(e: any) => {
                                setBillingData({
                                    ...billingData,
                                    type: e,
                                });
                            }}
                        />
                        {validate && !billingData?.type && <span className="common_error ml-1">Please Select an option</span>}
                    </div>

                    <div>
                        <div className="flex gap-5">
                            <div className="flex gap-4 items-center font-[Roboto] font-[500] text-[16px]">
                                <div>
                                    <Checkbox
                                        checked={billingData?.sendAsPDF}
                                        className="customCheckBox2"
                                        disabled={!billingData?.type}
                                        onChange={(e) => {
                                            setBillingData({
                                                ...billingData,
                                                sendAsPDF: e.target.checked,
                                            });
                                        }}
                                    />
                                </div>
                                <div>Send as PDF</div>
                            </div>

                            <div className="flex gap-4 items-center font-[Roboto] font-[500] text-[16px]">
                                <Checkbox
                                    checked={billingData?.sendAsExcel}
                                    className="customCheckBox2"
                                    disabled={!billingData?.type}
                                    onChange={(e) => {
                                        setBillingData({
                                            ...billingData,
                                            sendAsExcel: e.target.checked,
                                        });
                                    }}
                                />
                                <div>Send as Excel</div>
                            </div>
                        </div>
                        {validate && !(billingData?.sendAsPDF || billingData?.sendAsExcel) && <span className="common_error ml-1">Please Select Atleast one of the above options</span>}
                    </div>
                </div>
            </div>

            {/* send email */}
            <div>
                <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Send Email</div>
                <div className="px-8">
                    <div className="mt-5">
                        <PNormalInput
                            title="Enter Email Ids"
                            name="nick_name"
                            placeholder="Enter Email or Multiple Emails (with comma)"
                            value={billingData?.emailIds}
                            onChange={(e) => {
                                setBillingData({
                                    ...billingData,
                                    emailIds: e.value ? String(e.value) : '',
                                });
                            }}
                        />
                        {validate && !billingData?.emailIds && <span className="common_error ml-1">Please Enter Email</span>}
                    </div>
                    <div className="mt-5">
                        <label className="ml-1 font-[Montserrat]">{'Message'}</label>
                        <div className="mt-1">
                            <TextArea
                                placeholder="Enter the message"
                                autoSize={{ minRows: 5 }}
                                value={billingData?.message}
                                onChange={(e) => {
                                    setBillingData({
                                        ...billingData,
                                        message: e.target.value,
                                    });
                                }}
                            />
                            {validate && !billingData?.message && <span className="common_error ml-1">Please Enter Message</span>}
                        </div>
                    </div>
                </div>
            </div>

            {billingData?.type &&
                filteredFiles.map((file, index) => (
                    <div className="px-8 my-4" key={index}>
                        <div className="flex justify-between items-center bg-[rgba(194,217,205,0.4)] h-[50px] px-3 mb-4">
                            <div className="flex gap-3 items-center">
                                <img className="h-[20px] pl-2" src={DocumentImage} alt="document"></img>
                                <div className="font-[Roboto] font-[500] text-[14px]">{file.fileName}</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <img className="w-[30px]" onClick={() => ViewFile(index)} src={Preview} alt="preview"></img>
                                {/* <div>
                                    <RxCross1 size={22} />
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            <div className=" flex justify-end mx-8 mt-5">
                <RoundButton onClick={onClickSendBillingForm} title={'Send Forms'} />
            </div>
            {loading && (
                <div className="absolute w-full top-0">
                    <div className="flex h-[70vh] justify-center items-center ">
                        <Spin />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Billing;
