import { Checkbox, Spin } from 'antd'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import FileDragAndDrop from '../../OnBoardingSiteDetails/FileDragAndDrop';
import { useDispatch, useSelector } from 'react-redux';
import MessageActions from '../../../../../message/redux/actions';
import Apis from '../../../../../../api';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../../../store/RootReducer';
import OnboardActions from '../../../redux/actions';
type Props = {
     siteDetailRef?: any;
     setOpen?: any;
}
const Agreement: React.FC<Props> = ({ siteDetailRef, setOpen }) => {
     const dispatch = useDispatch();
     const [loading, setLoading] = useState(false);
     const [files, setFiles] = useState<any>([]);
     const params = useParams();
     const SiteId = params.siteId;
     const [validate, setValidate] = useState(false);
     const [deletedDoc, setDeletedDoc] = useState<string[]>([]);
     const GeneralTabData = useSelector((state: RootState) => state.onboarding.onboardingGeneralTabDetails)


     const [agreementData, setAgreementData] = useState<{
          billingCompleted?: boolean;
          attachment?: boolean;
          comments?: string;
     }>({
          billingCompleted: undefined,
          attachment: undefined,
          comments: undefined,
     })

     useEffect(() => {
          if (GeneralTabData?.agreementData?.length > 0) {
               setFiles(GeneralTabData?.agreementData[GeneralTabData?.agreementData.length - 1]?.agreement_documents);
               setAgreementData({
                    billingCompleted: GeneralTabData?.agreementData[GeneralTabData?.agreementData.length - 1]?.status === 'Y' ? true : false,
                    attachment: GeneralTabData?.agreementData[GeneralTabData?.agreementData.length - 1]?.attachment_required === 'Y' ? true : false,
                    comments: GeneralTabData?.agreementData[GeneralTabData?.agreementData.length - 1]?.comment,
               })
          } else {
               setFiles([]);
               setAgreementData({
                    billingCompleted: undefined,
                    attachment: undefined,
                    comments: undefined,
               })
          }
     }, [GeneralTabData, setFiles, SiteId])

     const fileValidation = () => {
          let count = 0;
          if (agreementData?.attachment && files?.length === 0) {
               return true
          }
          if (agreementData?.attachment && files?.length > 0) {
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


     useImperativeHandle(
          siteDetailRef,
          () => ({
               onClickCreateAgreement() {
                    setValidate(true)
                    if (
                         !agreementData?.comments || agreementData?.comments.trim() === ""
                         || fileValidation()
                    ) {
                         return;
                    }
                    setValidate(false)

                    if (GeneralTabData?.agreementData?.length > 0) {
                         const editFormData = new FormData();
                         editFormData.append('site_id', String(SiteId))
                         editFormData.append('status', agreementData?.billingCompleted ? 'Y' : 'N')
                         editFormData.append('attachment_required', agreementData?.attachment ? 'Y' : 'N')
                         editFormData.append('comment', agreementData?.comments)
                         editFormData.append('deleted_documents', deletedDoc.join(','))
                         files.forEach((file: any, index: number) => {
                              editFormData.append(`upload_agreement[${index}][id]`, file?.id ? file?.id : '');
                              editFormData.append(`upload_agreement[${index}][doc_check]`, file?.doc_check ? '1' : '0');
                              editFormData.append(`upload_agreement[${index}][status]`, file?.status || 'IN');
                              editFormData.append(`upload_agreement[${index}][document]`, file?.document ? file?.document : file);
                         });
                         setLoading(true);
                         Apis.editGeneralAgreementOnboardApi(editFormData, GeneralTabData?.agreementData[GeneralTabData?.agreementData.length - 1]?.id)
                              .then(() => {
                                   setLoading(false);
                                   setOpen(false);
                                   dispatch(MessageActions.showMessage({ text: `agreement updated successfully!`, error: false }));
                                   dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(SiteId));
                              })
                              .catch((err) => {
                                   setLoading(false);
                                   dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                              })
                    } else {
                         const createFormData = new FormData();
                         createFormData.append('site_id', String(SiteId))
                         createFormData.append('status', agreementData?.billingCompleted ? 'Y' : 'N')
                         createFormData.append('attachment_required', agreementData?.attachment ? 'Y' : 'N')
                         createFormData.append('comment', agreementData?.comments)
                         files.forEach((file: any, index: number) => {
                              createFormData.append(`upload_agreement[${index}][doc_check]`, file?.doc_check ? '1' : '0');
                              createFormData.append(`upload_agreement[${index}][status]`, file?.status || 'IN');
                              createFormData.append(`upload_agreement[${index}][document]`, file);
                         });


                         setLoading(true);
                         Apis.createAgreementOnboardApi(createFormData)
                              .then(() => {
                                   setLoading(false);
                                   setOpen(false);
                                   dispatch(MessageActions.showMessage({ text: `create agreement successfully!`, error: false }));
                                   dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(SiteId));
                              })
                              .catch((err) => {
                                   setLoading(false);
                                   dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                              })

                    }
               }
          })
     )


     return (
          <div>
               <div className='px-8'>
                    <div className='flex gap-3 '>
                         <Checkbox
                              checked={agreementData?.billingCompleted}
                              className='customCheckBox2'
                              onChange={(e) => {
                                   setAgreementData({
                                        ...agreementData,
                                        billingCompleted: e.target.checked
                                   })
                              }}
                         />
                         <div className='font-[Roboto] font-[400] text-[16px]'>Mark as Complete</div>
                    </div>
                    <div className='flex mt-5 gap-10 items-center'>
                         <div className='flex gap-3 '>
                              <Checkbox className="customCheckBox2" checked={agreementData?.attachment} onChange={(e) => { setAgreementData({ ...agreementData, attachment: e.target.checked }) }}></Checkbox>
                              <div className='font-[Roboto] font-[400] text-[16px]'>Attachment Required</div>
                         </div>
                    </div>
               </div>

               <div>
                    <div className='px-8'>
                         {/* file input */}
                         {agreementData?.attachment && (
                              <div className='mx-[-32px]'>
                                   <FileDragAndDrop files={files} setFiles={setFiles} deletedDoc={deletedDoc} setDeletedDoc={setDeletedDoc} type='agremment'/>
                                   {validate && fileValidation() && <span className="common_error ml-1 px-8">Atleast 1 Attachment Required</span>}
                              </div>
                         )}
                         <div className='mt-5'>
                              <label className="ml-1 font-[Montserrat]">
                                   {'Comments'}
                              </label>
                              <div className='mt-1'>
                                   <TextArea
                                        placeholder="Enter the Comments"
                                        autoSize={{ minRows: 5 }}
                                        value={agreementData?.comments}
                                        onChange={(e) => {
                                             setAgreementData({
                                                  ...agreementData,
                                                  comments: e.target.value
                                             })
                                        }}
                                   />
                                   {validate && !agreementData?.comments && <span className="common_error ml-1">Please Enter comments</span>}
                              </div>
                         </div>
                    </div>
               </div>
               {
                    (loading) && <div className='absolute w-full top-0'>
                         <div className='flex h-[70vh] justify-center items-center '><Spin /></div>
                    </div>
               }
          </div>
     )
}

export default Agreement
