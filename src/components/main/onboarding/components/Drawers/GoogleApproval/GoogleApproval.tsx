import { Radio } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import PNormalInput from '../../../../../common/NormalInput';
import { RoundButton } from '../../../../../common/Button';

const GoogleApproval: React.FC = () => {
     const [googelApprovalData, setGoogleData] = useState<{
          status?: string;
          comments?: string;
          gam?: string;
          networkCode?: any;
     }>({
          status: undefined,
          comments: undefined,
          gam: undefined,
          networkCode: undefined,
     })
     return (
          <div className='px-8'>
               <div className='bg-[#F6F9F7] px-5 pt-8'>
                    <div>
                         <Radio.Group value={googelApprovalData?.status} onChange={(e) => {
                              setGoogleData({
                                   ...googelApprovalData,
                                   status: e.target.value
                              })
                         }}>
                              <div className='flex flex-col gap-5'>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Google/AdX Submitted'}>Google/AdX Submitted</Radio>
                                   </div>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Google/AdX Approved'}>Google/AdX Approved</Radio>
                                   </div>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'MCM Invite rejected'}>MCM Invite rejected</Radio>
                                   </div>
                              </div>
                         </Radio.Group>
                    </div>

                    <div className='mt-8'>
                         <label className="ml-1 font-[Roboto]">
                              {'Comments'}
                         </label>
                         <div className='mt-1 pb-[60px]'>
                              <TextArea
                                   placeholder="Enter the comment"
                                   autoSize={{ minRows: 5 }}
                                   value={googelApprovalData?.comments}
                                   onChange={(e) => {
                                        setGoogleData({
                                             ...googelApprovalData,
                                             comments: e.target.value
                                        })
                                   }}
                              />
                         </div>
                    </div>
               </div>
               <div className='bg-[#F6F9F7] p-5 mt-5'>
                    <div className='font-[Roboto] font-[700] text-[14px]'>Connect to GAM</div>
                    <div className='flex items-end gap-5'>
                         <div className='mt-5'>
                              <PNormalInput
                                   title="Network Code"
                                   name="nick_name"
                                   placeholder=''
                                   value={googelApprovalData?.networkCode}
                                   onChange={(e) => {
                                        setGoogleData({
                                             ...googelApprovalData,
                                             networkCode: e.value ? String(e.value) : ''
                                        })
                                   }}
                              />
                         </div>
                         <div>
                              <RoundButton title='Verify' />
                         </div>
                    </div>
                    <div className='mt-8'>
                         <Radio.Group value={googelApprovalData?.gam} onChange={(e) => {
                              setGoogleData({
                                   ...googelApprovalData,
                                   gam: e.target.value
                              })
                         }}>
                              <div className='flex flex-col gap-5'>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Trafficked under Publir Google Ad Manager Account'}>Trafficked under Publir Google Ad Manager Account</Radio>
                                   </div>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Trafficked under Own Google Ad Manager Account'}>Trafficked under Own Google Ad Manager Account</Radio>
                                   </div>
                              </div>
                         </Radio.Group>
                    </div>
               </div>
               <div className='bg-[#F6F9F7] p-5 mt-5'>
                    <div>
                         <Radio.Group value={googelApprovalData?.gam} onChange={(e) => {
                              setGoogleData({
                                   ...googelApprovalData,
                                   gam: e.target.value
                              })
                         }}>
                              <div className='flex flex-col gap-5'>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'No Adserver (No GAM Account)'}>No Adserver (No GAM Account)</Radio>
                                   </div>
                              </div>
                         </Radio.Group>
                    </div>
               </div>
          </div>
     )
}

export default GoogleApproval