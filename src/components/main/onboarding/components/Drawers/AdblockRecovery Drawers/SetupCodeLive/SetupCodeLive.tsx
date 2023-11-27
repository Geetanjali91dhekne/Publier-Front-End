import { Checkbox } from 'antd'
import React, { useState } from 'react'
import { RoundButton } from '../../../../../../common/Button'

const codeString =`<script src="https://a.publir.com/platform/1234.js"></script>`

const SetupCodeLive: React.FC = () => {
     const [data, setData] = useState(false);
     const [copy, setCopy] = useState(false);
     return (
          <div className=''>
               <div className='flex gap-3 px-8'>
                    <Checkbox className="customCheckBox2" checked={data} onChange={(e) => { setData(e.target.checked) }}></Checkbox>
                    <div className='font-[Roboto] font-[400] text-[14px]'>Completed</div>
               </div>

               <div className='bg-[#F2F2F2] mt-10 mx-4 px-4 py-8 rounded-xl font-[Roboto] font-[16px]'>
                    <div className='font-[700]'>
                         Your adblock recovery Notice is created Successfully
                    </div>
                    <div className='font-[700] mt-8'>
                         To activate, please copy the Javascript & Paste it on your website
                    </div>

                    <div className=' bg-[white] mt-8 py-5 px-2 rounded-xl flex flex-row-reverse justify-between items-center'>
                         <div className=''>
                              <RoundButton
                                   title={copy ? 'Code Copied' : 'Copy Code'}
                                   className='w-[110px] text-[14px]'
                                   onClick={() => {
                                        navigator.clipboard.writeText(codeString);
                                        setCopy(true);
                                        setTimeout(()=>{
                                             setCopy(false)
                                        },2000)
                                   }}
                              />
                         </div>
                         <pre className='font-[500] font-[Roboto] text-[16px]'>
                              <code >
                                   {codeString}
                              </code>
                         </pre>
                    </div>
               </div>
          </div>
     )
}

export default SetupCodeLive