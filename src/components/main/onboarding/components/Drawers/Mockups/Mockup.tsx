import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Checkbox, Input, Spin } from 'antd';
import PNormalInput from '../../../../../common/NormalInput';
import { RoundButton } from '../../../../../common/Button';
import FileDragAndDrop from '../../OnBoardingSiteDetails/FileDragAndDrop';
import Apis from '../../../../../../api';
import MessageActions from '../../../../../message/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../../../store/RootReducer';
import OnboardActions from '../../../redux/actions';
const { TextArea } = Input;

type Props = {
    siteDetailRef?: any;
    setOpen?: any;
    open: boolean;
};
const Mockup: React.FC<Props> = ({ siteDetailRef, setOpen, open }) => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [deletedDoc, setDeletedDoc] = useState<string[]>([]);
    const params = useParams();
    const [validate, setValidate] = useState(false);
    const GeneralTabData = useSelector((state: RootState) => state.onboarding.onboardingGeneralTabDetails);
    const siteId = params.siteId;

    const [mockupData, setMockupData] = useState<{
        emailIds?: any;
        message?: any;
        status?: boolean;
    }>({
        emailIds: '',
        message: '',
        status: undefined,
    });

    useEffect(() => {
        if (open) {
            if (GeneralTabData?.mockUp?.length > 0) {
                setMockupData({
                    ...mockupData,
                    emailIds: GeneralTabData?.mockUp[GeneralTabData?.mockUp.length - 1]?.email,
                    message: GeneralTabData?.mockUp[GeneralTabData?.mockUp.length - 1]?.message,
                    status: GeneralTabData?.mockUp[GeneralTabData?.mockUp.length - 1]?.status === 'N' ? false : true,
                });
                setFiles(GeneralTabData?.mockUp[GeneralTabData?.mockUp.length - 1]?.mockup_documents);
            } else {
                setMockupData({
                    ...mockupData,
                    emailIds: '',
                    message: '',
                    status: undefined,
                });
                setFiles([]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [GeneralTabData, siteId, open]);

    const onClickSendMockupForm = () => {
        setValidate(true);
        if (!mockupData?.message || mockupData?.message.trim() === '' || !mockupData?.emailIds || mockupData?.emailIds.trim() === '') {
            return;
        }
        if (attachmentCount < 1) {
            return;
        }
        setValidate(false);
        if (attachmentCount > 0) {
            const mockupMailData = new FormData();
            mockupMailData.append('site_id', String(siteId));
            mockupMailData.append('status', mockupData?.status === true ? 'Y' : 'N');
            mockupMailData.append('email', mockupData?.emailIds);
            mockupMailData.append('message', mockupData?.message);
            mockupMailData.append('deleted_documents', deletedDoc.join(','));
            files.forEach((file: any, index: number) => {
                mockupMailData.append(`upload_mockup[${index}][id]`, file?.id ? file?.id : '');
                mockupMailData.append(`upload_mockup[${index}][doc_check]`, file?.doc_check ? '1' : '0');
                mockupMailData.append(`upload_mockup[${index}][status]`, file?.status || 'IN');
                mockupMailData.append(`upload_mockup[${index}][document]`, file?.document ? file?.document : file);
            });
            if (GeneralTabData?.mockUp?.length > 0) {
                setLoading(true)
                mockupMailData.append('mockup_id', GeneralTabData?.mockUp[GeneralTabData?.mockUp.length - 1]?.id);
                Apis.getSendMockupMailOnboardApi(mockupMailData)
                    .then(() => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: `Mockup Mail Send Successfully!`, error: false }));
                        dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                    })
                    .catch((err) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            } else {
                setLoading(true)
                Apis.getSendMockupMailOnboardApi(mockupMailData)
                    .then(() => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: `Mockup Mail Send Successfully!`, error: false }));
                        dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                    })
                    .catch((err) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            }
        }
    };

    useImperativeHandle(siteDetailRef, () => ({
        onClickCreateMockup() {
            if (GeneralTabData?.mockUp?.length > 0) {
                const editFormData = new FormData();
                editFormData.append('site_id', String(siteId));
                editFormData.append('status', mockupData?.status === true ? 'Y' : 'N');
                editFormData.append('email', mockupData?.emailIds);
                editFormData.append('message', mockupData?.message);
                editFormData.append('deleted_documents', deletedDoc.join(','));
                files.forEach((file: any, index: number) => {
                    editFormData.append(`upload_mockup[${index}][id]`, file?.id ? file?.id : '');
                    editFormData.append(`upload_mockup[${index}][doc_check]`, file?.doc_check ? '1' : '0');
                    editFormData.append(`upload_mockup[${index}][status]`, file?.status || 'IN');
                    editFormData.append(`upload_mockup[${index}][document]`, file?.document ? file?.document : file);
                });
                setLoading(true);
                Apis.editGeneralMockupOnboardApi(editFormData, GeneralTabData?.mockUp[GeneralTabData?.mockUp.length - 1]?.id)
                    .then(() => {
                        setLoading(false);
                        setOpen(false);
                        dispatch(MessageActions.showMessage({ text: `mockup updated successfully!`, error: false }));
                        dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                    })
                    .catch((err) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            } else {
                const createFormData = new FormData();
                createFormData.append('site_id', String(siteId));
                createFormData.append('status', mockupData?.status === true ? 'Y' : 'N');
                createFormData.append('email', mockupData?.emailIds);
                createFormData.append('message', mockupData?.message);
                files.forEach((file: any, index: number) => {
                    createFormData.append(`upload_mockup[${index}][doc_check]`, file?.doc_check ? '1' : '0');
                    createFormData.append(`upload_mockup[${index}][status]`, file?.status || 'IN');
                    createFormData.append(`upload_mockup[${index}][document]`, file);
                });
                setLoading(true);

                Apis.createMockupOnboardApi(createFormData)
                    .then(() => {
                        setLoading(false);
                        setOpen(false);
                        dispatch(MessageActions.showMessage({ text: `mockup created successfully!`, error: false }));
                        dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                    })
                    .catch((err) => {
                        setLoading(false);
                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                    });
            }
        },
    }));
    const attachmentCount = useMemo(() => {
        return files.filter((item: any) => item.doc_check === 1 || item.doc_check === true).length;
    }, [files]);

    const fileValidation = () => {
        let count = 0;
        if (files?.length === 0) {
            return true
        }
        if (files?.length > 0) {
            files?.forEach((item: any) => {
                if (item?.status === 'IN' || item?.status === 'AP') {
                    count++;
                }
            })
            if (count === 0) {
                return true;
            }
        }
        return false;
    }

    return (
        <div>
            <div className="px-8">
                <div className="flex gap-3 mt-5">
                    <Checkbox
                        checked={mockupData?.status}
                        className="customCheckBox2"
                        onChange={(e) => {
                            setMockupData({
                                ...mockupData,
                                status: e.target.checked,
                            });
                        }}
                    />
                    <div className="font-[Roboto] font-[400] text-[16px]">Mark as Complete</div>
                </div>
            </div>

            <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Upload Mockups</div>

            {/* file input */}

            <FileDragAndDrop files={files} setFiles={setFiles} deletedDoc={deletedDoc} setDeletedDoc={setDeletedDoc} type="mockup" />
            {validate && fileValidation() && <span className="common_error ml-1 px-8">Atleast 1 attachment with non-rejected status is required</span>}
            {validate && attachmentCount < 1 && !fileValidation() && <div className="common_error ml-1 px-8">Check Atleast 1 attachment</div>}

            {/* send email */}
            <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Send Email</div>
            <div className="px-8">
                <div className="mt-5">
                    <PNormalInput
                        title="Enter Email Ids"
                        name="nick_name"
                        placeholder="Enter Email or Multiple Emails (with comma)"
                        value={mockupData?.emailIds}
                        onChange={(e) => {
                            setMockupData({
                                ...mockupData,
                                emailIds: e.value ? String(e.value) : '',
                            });
                        }}
                    />
                    {validate && !mockupData?.emailIds && <span className="common_error ml-1">Please Enter Email</span>}
                </div>
                <div className="mt-5">
                    <label className="ml-1 font-[Montserrat]">{'Message'}</label>
                    <div className="mt-1">
                        <TextArea
                            placeholder="Enter the message"
                            autoSize={{ minRows: 5 }}
                            value={mockupData?.message}
                            onChange={(e) => {
                                setMockupData({
                                    ...mockupData,
                                    message: e.target.value ? String(e.target.value) : '',
                                });
                            }}
                        />
                        {validate && !mockupData?.message && <span className="common_error ml-1">Please Enter Message</span>}
                    </div>
                </div>
            </div>

            <div className=" flex justify-end mx-8 mt-8">
                <RoundButton onClick={onClickSendMockupForm} title={`Send ${attachmentCount || ''} Mockup`} />
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

export default Mockup;
