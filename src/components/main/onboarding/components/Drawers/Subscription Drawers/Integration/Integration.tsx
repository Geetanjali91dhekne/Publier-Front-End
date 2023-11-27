import { Radio } from 'antd'
import React, { useState } from 'react'
import { RxDotFilled } from 'react-icons/rx'

const Integration: React.FC = () => {
     const [data, setData] = useState()
     return (
          <div>
               <div className='px-8'>
                    <div className=''>
                         <Radio.Group value={data} onChange={(e) => {
                              setData(e.target.value)
                         }}>
                              <div className='flex gap-5'>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Integrated Header Code '}>Integrated Header Code </Radio>
                                   </div>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Installed Wordpress Plugin'}>Installed Wordpress Plugin</Radio>
                                   </div>
                              </div>
                         </Radio.Group>
                    </div>
               </div>
               <div className=" bg-[#EFEFEF] pl-8 mt-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Instructions - Integrate Header Code</div>
               <div className='mx-8 my-5 border-[12px] rounded-xl border-[#F2F2F2] py-5 flex items-center justify-center'>
                    <pre className='font-[Roboto] font-[400] text-[16px]'>
                         {`<script src="https://a.publir.com/platform/1234.js"></script>`}
                    </pre>
               </div>

               <div className=" bg-[#EFEFEF] pl-8 mt-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Instructions - Installing Publir Wordpress Plugin </div>
               <div className='bg-[#F2F2F2] rounded-xl mt-5 mx-8 p-5 font-[Roboto] text-[16px]'>
                    <div className='font-[700]'>It’s very easy to get setup with Wordpress: </div>
                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              The preferred way is to install our WordPress plugin: https://wordpress.org/plugins/publir-ump/.
                         </div>
                    </div>
                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              To integrate via WordPress, go to the Plugins directory of your wordpress backend, click on "Add New" search for "Publir" in the WordPress plugin directory. Then you would have to install and activate the plugin. Once activated, you will see the field for site id and subscription login page. The values to enter are:
                         </div>
                    </div>
                    <div className='px-8'>
                         <div className='flex mt-5'>
                              <div className='px-2 pt-1'><RxDotFilled /></div>
                              <div>
                                   Publir Site Id: 1289 (This is Freedom Press’ unique ID and will tie the site to the account we created for you on our platform)
                              </div>
                         </div>
                         <div className='flex mt-5'>
                              <div className='px-2 pt-1'><RxDotFilled /></div>
                              <div>
                                   Subscription Page Login URL: subscribe (You can replace this suggestion with membership or subscriptions - Ex. subscribe.freedompress.com OR membership.freedompress.com)
                              </div>
                         </div>
                         <div className='flex mt-5'>
                              <div className='px-2 pt-1'><RxDotFilled /></div>
                              <div>
                                   Implementing our plugin should not make any changes to your site's functionality until subscriptions are activated on our platform.
                              </div>
                         </div>
                         <div className='flex mt-5'>
                              <div className='px-2 pt-1'><RxDotFilled /></div>
                              <div>
                                   Once our plugin has been installed and activated, it should create a link on the Wordpress admin page on the left column (see screenshot below of an example):
                              </div>
                         </div>
                    </div>

                    <div className='text-[#056433] font-[500] mt-5 mb-16 px-5'>
                         Please click to view the sample screenshot
                    </div>
               </div>
          </div>
     )
}

export default Integration
