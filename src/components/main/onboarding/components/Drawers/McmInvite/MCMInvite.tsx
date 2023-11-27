import React, { useImperativeHandle, useState } from 'react'
import CommonDropDown from '../../../../../common/CommonDropDown'
import { Radio, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
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
}
const MCMInvite: React.FC<Props> = ({ siteDetailRef, setOpen, open }) => {
     const dispatch = useDispatch();
     const [loading, setLoading] = useState(false);
     const params = useParams();
     const siteId = params.siteId;
     const [validate, setValidate] = useState(false);
     const GeneralTabData = useSelector((state: RootState) => state.onboarding.onboardingGeneralTabDetails);

     const [mcmInviteData, setMcmInviteData] = useState<{
          inviteSent?: boolean;
          inviteStatus?: any;
          comments?: string
     }>({
          inviteSent: undefined,
          inviteStatus: undefined,
          comments: undefined
     })

     useImperativeHandle(siteDetailRef, () => ({
          onClickCreateInvite() {
               setValidate(true);
               // Validate form fields
               if (!mcmInviteData?.inviteSent || !mcmInviteData?.inviteStatus || !mcmInviteData?.comments) {
                    return;
               }
               setValidate(false);
               const payload = {
                    site_id:siteId,
                    mcm_require: mcmInviteData.inviteStatus,
                    invite_status: mcmInviteData.inviteSent,
                    comments: mcmInviteData.comments,
               };

               // Handle form submission
               setLoading(true);
               if (GeneralTabData?.mcmInviteData?.length > 0) {
                    Apis.editMcmInviteOnboardApi(payload, GeneralTabData?.mcmInviteData[GeneralTabData?.mcmInviteData?.length - 1]?.id)
                         .then(() => {
                              setLoading(false);
                              setOpen(false);
                              dispatch(MessageActions.showMessage({ text: `MCM invite updated successfully!`, error: false }));
                              dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                         })
                         .catch((err) => {
                              setLoading(false);
                              dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                         });
               } else {
                    Apis.createMcmInviteOnboardApi(payload)
                         .then(() => {
                              setLoading(false);
                              setOpen(false);
                              dispatch(MessageActions.showMessage({ text: `MCM invite created successfully!`, error: false }));
                              dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                         })
                         .catch((err) => {
                              setLoading(false);
                              dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                         });
               }
          },
     }));

     return (
          <div className='px-8'>
               <div className='bg-[#F6F9F7] px-5'>

                    <div className='my-5 w-[300px] pt-8'>
                         <CommonDropDown filterType='mcminvite' value={'MCM Required'} dataList={[
                                        { title: 'YES', value: 'Y' },
                                        { title: 'NO', value: 'N' },
                                    ]} 
                                    setValue={(e: any) => {
                                        setMcmInviteData({
                                            ...mcmInviteData,
                                            inviteSent: e,
                                        });
                                    }}
                                    />
                    </div>
                    <div>
                         <Radio.Group value={mcmInviteData?.inviteStatus} onChange={(e) => {
                              setMcmInviteData({
                                   ...mcmInviteData,
                                   inviteStatus: e.target.value
                              })
                         }}>
                              <div className='flex gap-8'>
                                   <Radio className='font-[Roboto] font-[500] text-[16px]' value={'sent'}>MCM Invite Sent</Radio>
                                </div>

                              <div className='flex flex-wrap gap-8 mt-5'>
                                   <Radio className='font-[Roboto] font-[500] text-[16px]' value={'approved'}>MCM Invite Approved</Radio>
                                   <Radio className='font-[Roboto] font-[500] text-[16px]' value={'onhold'}>MCM Onhold</Radio>
                                   <Radio className='font-[Roboto] font-[500] text-[16px]' value={'rejected'}>MCM Invite rejected</Radio>
                              </div>
                         </Radio.Group>
                    </div>
                    {validate && !mcmInviteData?.inviteStatus && <span className="common_error ml-1">Please Select an option</span>}
                    <div className='mt-5'>
                         <label className="ml-1 font-[Montserrat]">
                              {'Comments'}
                         </label>
                         <div className='mt-1 pb-8'>
                              <TextArea
                                   placeholder="Enter the comment"
                                   autoSize={{ minRows: 5 }}
                                   value={mcmInviteData?.comments}
                                   onChange={(e) => {
                                        setMcmInviteData({
                                             ...mcmInviteData,
                                             comments: e.target.value
                                        })
                                   }}
                              />
                         </div>
                    </div>
               </div>
               {loading && (
                <div className="absolute w-full top-0">
                    <div className="flex h-[70vh] justify-center items-center ">
                        <Spin />
                    </div>
                </div>
            )}
          </div>
     )
}

export default MCMInvite
