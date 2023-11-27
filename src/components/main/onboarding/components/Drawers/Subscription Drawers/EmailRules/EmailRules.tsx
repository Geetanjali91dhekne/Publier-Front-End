import React, { useState } from 'react'
import PNormalInput from '../../../../../../common/NormalInput'
import TextArea from 'antd/es/input/TextArea'

const EmailRules:React.FC = () => {
     const [billingData, setBillingData] = useState<{
          senderEmailText?: string;
          emailSubjectText?: string;
          message?: string;
     }>({
          senderEmailText: undefined,
          emailSubjectText: undefined,
          message: undefined,
     })
     return (
          <div>
               <div>
                   
                 <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Email Settings</div>
                 <div className='px-8'>
                     <div className='mt-5 flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                         
                         <div className='w-full'>
                              <PNormalInput
                                   title="Sender Email*"
                                   name="nick_name"
                                   placeholder='Enter Sender Email*'
                                   value={billingData?.senderEmailText}
                                   onChange={(e) => {
                                        setBillingData({
                                             ...billingData,
                                             senderEmailText: e.value ? String(e.value) : ''
                                        })
                                   }}
                             />
                         </div>
                     </div>
                     <div className='mt-5 flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                         
                    <div className='w-full'>
                              <PNormalInput
                                   title="Email Subject*"
                                   name="nick_name"
                                   placeholder='Enter Email Subject*'
                                   value={billingData?.emailSubjectText}
                                   onChange={(e) => {
                                        setBillingData({
                                             ...billingData,
                                             emailSubjectText: e.value ? String(e.value) : ''
                                        })
                                   }}
                             />
                        </div>     
                     </div>
                     
                     <div className='mt-5'>
                              <label className='ml-1 font-[Montserrat] font-[400] text-[12px]'>
                                   {'Message'}
                              </label>
                              <div className='mt-1'>
                                   <TextArea
                                        placeholder="Enter the message"
                                        autoSize={{ minRows: 5 }}
                                        value={billingData?.message}
                                        onChange={(e) => {
                                             setBillingData({
                                                  ...billingData,
                                                  message: e.target.value
                                             })
                                        }}
                                   />
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default EmailRules