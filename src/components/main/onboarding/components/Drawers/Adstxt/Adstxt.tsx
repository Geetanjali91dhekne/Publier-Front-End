import { Checkbox } from 'antd';
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import Recipt from "../../../../../../assets/icons/onboarding/recipt.svg";
import { RoundButton } from '../../../../../common/Button';
import PNormalInput from '../../../../../common/NormalInput';

const Adstxt: React.FC = () => {
     const [data, setData] = useState<{
          comments: string;
          emailIds: string;
          emailContent: string;
     }>({
          comments: "",
          emailIds: "",
          emailContent: ""
     })
     return (
          <>
               <div className='px-8'>
                    <div className='bg-[#F6F9F7] px-5 pt-5'>
                         <div className='flex gap-8'>
                              <div className='flex gap-4'>
                                   <div><Checkbox className='customCheckBox2' defaultChecked={false} onChange={(e) => { }} /></div>
                                   <div className='font-[Roboto] font-[500] text-[16px]'>Ads.txt Updated on site.</div>
                              </div>
                              <div className='flex gap-4'>
                                   <div><Checkbox className='customCheckBox2' defaultChecked={false} onChange={(e) => { }} /></div>
                                   <div className='font-[Roboto] font-[500] text-[16px]'>Redirect to Publir Ads.txt</div>
                              </div>
                         </div>

                         <div className='mt-8'>
                              <img src={Recipt} alt='recipt'></img>
                         </div>

                         <div className='flex gap-5 mt-5'>
                              <RoundButton title="Update ads.txt" />
                              <RoundButton title="Copy ads.txt" />
                              <RoundButton title="Email ads.txt" />
                         </div>

                         <div className='mt-8'>
                              <label className="ml-1 font-[Montserrat]">
                                   {'Comments'}
                              </label>
                              <div className='mt-1 pb-8'>
                                   <TextArea
                                        placeholder="Enter the comment"
                                        autoSize={{ minRows: 5 }}
                                        value={data?.comments}
                                        onChange={(e) => {
                                             setData({
                                                  ...data,
                                                  comments: e.target.value
                                             })
                                        }}
                                   />
                              </div>
                         </div>


                    </div>
               </div>
               {/* send email */}
               <div>
                    <div className="flex items-center px-8 justify-between mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">
                         <div className="text-left">Send Email</div>
                         <div className="text-right">One attachment selected</div>
                    </div>
                    <div className='px-8'>
                         <div className='mt-5'>
                              <PNormalInput
                                   title="Enter Email Ids"
                                   name="nick_name"
                                   placeholder='Enter Email or Multiple Emails (with comma)'
                                   value={data?.emailIds}
                                   onChange={(e) => {
                                        setData({
                                             ...data,
                                             emailIds: e.value ? String(e.value) : ''
                                        })
                                   }}
                              />
                         </div>
                         <div className='mt-5'>
                              <label className="ml-1 font-[Montserrat]">
                                   {'Message'}
                              </label>
                              <div className='mt-1'>
                                   <TextArea
                                        placeholder="Enter the message"
                                        autoSize={{ minRows: 5 }}
                                        value={data?.emailContent}
                                        onChange={(e) => {
                                             setData({
                                                  ...data,
                                                  emailContent: e.target.value
                                             })
                                        }}
                                   />
                              </div>
                         </div>
                    </div>

                    <div className='w-full flex justify-end px-8 pb-12 mt-5 '>
                         <RoundButton title="Send ads.txt" />
                    </div>
               </div>
          </>
     )
}

export default Adstxt