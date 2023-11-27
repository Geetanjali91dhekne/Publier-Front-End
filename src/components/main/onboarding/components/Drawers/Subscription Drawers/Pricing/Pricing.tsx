import { Checkbox } from 'antd'
import React, { useState } from 'react'
import PNormalInput from '../../../../../../common/NormalInput'

const Pricing:React.FC = () => {
     const [pricingData, setPricingData] = useState<{
          monthlyText?: string;
          yearlyText?: string;
          OTPText?: string;
          monthlyCheck?: boolean;
          yearlyCheck?: boolean;
          OTPCheck?: boolean;
          freeAccess?: boolean;
          message?: string;
     }>({
          monthlyText: undefined,
          yearlyText: undefined,
          OTPText: undefined,
          monthlyCheck: undefined,
          yearlyCheck: undefined,
          OTPCheck: undefined,
          freeAccess: undefined,
          message: undefined,
     })
     return (
          <div>
               <div>
                   
                 <div className="mt-8 p-3 bg-[#EFEFEF] rounded ml-8 h-[54px] w-fit leading-[29px] font-[Roboto] text-[16px] font-[400]">Select all the pricing options you want to offer your site users</div>
                 <div className='px-8'>
                     <div className='mt-5 flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                         <Checkbox
                                   checked={pricingData?.monthlyCheck}
                                   className='customCheckBox2'
                                   onChange={(e) => {
                                        setPricingData({
                                             ...pricingData,
                                             monthlyCheck: e.target.checked
                                        })
                                   }}
                         />
                         <div className='w-1/2'>
                              <PNormalInput
                                   title="Monthly"
                                   name="nick_name"
                                   placeholder='Enter Monthly'
                                   value={pricingData?.monthlyText}
                                   onChange={(e) => {
                                        setPricingData({
                                             ...pricingData,
                                             monthlyText: e.value ? String(e.value) : ''
                                        })
                                   }}
                             />
                         </div>
                     </div>
                     <div className='mt-5 flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                         <Checkbox
                                   checked={pricingData?.yearlyCheck}
                                   className='customCheckBox2'
                                   onChange={(e) => {
                                        setPricingData({
                                             ...pricingData,
                                             yearlyCheck: e.target.checked
                                        })
                                   }}
                         />
                        <div className='w-1/2'>
                              <PNormalInput
                                   title="Yearly"
                                   name="nick_name"
                                   placeholder='Enter Yearly'
                                   value={pricingData?.yearlyText}
                                   onChange={(e) => {
                                        setPricingData({
                                             ...pricingData,
                                             yearlyText: e.value ? String(e.value) : ''
                                        })
                                   }}
                             />
                        </div>     
                     </div>
                     <div className='mt-5 flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                         <Checkbox
                                   checked={pricingData?.OTPCheck}
                                   className='customCheckBox2'
                                   onChange={(e) => {
                                        setPricingData({
                                             ...pricingData,
                                             OTPCheck: e.target.checked
                                        })
                                   }}
                         />
                        <div className='w-1/2'>
                              <PNormalInput
                                   title="One-Time Payment"
                                   name="nick_name"
                                   placeholder='Enter One-Time Payment'
                                   value={pricingData?.OTPText}
                                   onChange={(e) => {
                                        setPricingData({
                                             ...pricingData,
                                             OTPText: e.value ? String(e.value) : ''
                                        })
                                   }}
                             />
                        </div>     
                         </div>
                     <div className='mt-8 flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                              <Checkbox
                                   checked={pricingData?.freeAccess}
                                   className='customCheckBox2'
                                   onChange={(e) => {
                                        setPricingData({
                                             ...pricingData,
                                             freeAccess: e.target.checked
                                        })
                                   }}
                              />
                         <div className='flex text-[12px]'><p className='font-[700]'>Free Access.&nbsp;</p> No Payment required. Users will just have to authenticate their email address</div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Pricing