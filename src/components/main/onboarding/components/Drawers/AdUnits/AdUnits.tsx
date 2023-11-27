import { Checkbox, Radio } from 'antd';
import React, { useState } from 'react'
import AddAds from './AddAds';
import AdSettings from './AdSettings';

const stickyAds = [
     { title: 'Horizontal Sticky', dimension: '- Right - 160 x 600, 300 x 250' },
     { title: 'Horizontal Sticky', dimension: '- Left - 160 x 600, 300 x 250' },
     { title: 'Desktop - Tablet Vertical Sticky ', dimension: '- Bottom - 728 x 90' },
     { title: 'Mobile Vertical Sticky ', dimension: '- Bottom - 320 x 50 ' },
]
const inPageAds = [
     { title: 'In-Page Skyscraper One ', dimension: '160 x 600, 300 x 600' },
     { title: 'In-Page Skyscraper Two ', dimension: '160 x 600, 300 x 600' },
     { title: 'In-Page Billboard ', dimension: '160 x 600, 300 x 600' },
     { title: 'In-Page Window One', dimension: '160 x 600, 300 x 600' },
     { title: 'In-Page Window Two', dimension: '160 x 600, 300 x 600' },
     { title: 'In-Page Window Three ', dimension: '160 x 600, 300 x 600' },
     { title: 'In-Page Window Four', dimension: '160 x 600, 300 x 600' },
     { title: 'Leader Banner', dimension: '160 x 600, 300 x 600' },
     { title: 'Mobile BTF Banner', dimension: '160 x 600, 300 x 600' },
]
const outPageAds = [
     { title: 'In-Page Skyscraper One', dimension: '160 x 600, 300 x 600' },
     { title: 'In-Page Skyscraper Two', dimension: '160 x 600, 300 x 600' },
]

const AdUnits: React.FC = () => {
     const [adUnitData, setAdUnit] = useState<{
          integration?: String;
     }>({
          integration: undefined
     })
     return (
          <div className='px-8'>
               <div>
                    <Radio.Group value={adUnitData?.integration} onChange={(e) => {
                         setAdUnit({
                              ...adUnitData,
                              integration: e.target.value
                         })
                    }}>
                         <div className='flex flex-col gap-5 '>
                              <div>
                                   <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Simple Integration'}>Simple Integration (place ad codes manually on site)</Radio>
                              </div>
                              <div>
                                   <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Advanced Integration'}>Advanced Integration (Dynamic Insertion)</Radio>
                              </div>
                         </div>
                    </Radio.Group>
               </div>
               <div className='mt-5'>
                    <div className='font-[700] font-[Roboto] text-[16px] pl-5'>Sticky Ads</div>
                    {
                         stickyAds?.map((item, key) => (
                              <div className='bg-[#F6F9F7] p-5 mt-3 flex items-center'>
                                   <div className='w-1/2 flex items-center gap-4'>
                                        <div>
                                             <Checkbox
                                                  style={{ fontWeight: 'bold', color: "red" }}
                                                  className="customCheckBox2"
                                                  defaultChecked={false}
                                                  onChange={(e) => { }}
                                             ></Checkbox>
                                        </div>
                                        <div className='font-[Roboto] font-[400] text-[16px]'>
                                             <div>{item?.title}</div>
                                             <div>{item?.dimension}</div>
                                             <AdSettings addType='sticky'/>
                                        </div>
                                   </div>
                                   <div className='w-1/2 flex justify-between'>
                                        <div className='flex gap-3'>
                                             <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                             <div className='font-[Roboto] font-[400] text-[16px]'>Mobile</div>
                                        </div>
                                        <div className='flex gap-3'>
                                             <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                             <div className='font-[Roboto] font-[400] text-[16px]'>Tablet</div>
                                        </div>
                                        <div className='flex gap-3'>
                                             <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                             <div className='font-[Roboto] font-[400] text-[16px]'>Desktop</div>
                                        </div>
                                   </div>
                              </div>
                         ))
                    }
                    <AddAds addType='sticky'/>
               </div>

               <div className='font-[Roboto] font-[400] text-[16px] mt-5 pr-[80px]'>
                    Publir recommends 6 to 8 in-page ad units per page. These ads sit within your site’s
                    content (<span className='text-[#056433]'>see example here</span>). You may change the default settings as per your
                    requirements
               </div>

               <div className='mt-8'>
                    <div className='font-[700] font-[Roboto] text-[16px] pl-8'>In-page ads</div>
                    {
                         inPageAds?.map((item, key) => (
                              <div className='bg-[#F6F9F7] py-5 px-8 mt-3 flex items-center'>
                                   <div className='w-1/2 flex items-center gap-4'>
                                        <div className='font-[Roboto] font-[400] text-[16px]'>
                                             <div>{item?.title}</div>
                                             <div>{item?.dimension}</div>
                                             <AdSettings addType='inpage'/>
                                        </div>
                                   </div>
                                   <div className='w-1/2 flex justify-between'>
                                        <div className='flex gap-3'>
                                             <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                             <div className='font-[Roboto] font-[400] text-[16px]'>Mobile</div>
                                        </div>
                                        <div className='flex gap-3'>
                                             <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                             <div className='font-[Roboto] font-[400] text-[16px]'>Tablet</div>
                                        </div>
                                        <div className='flex gap-3'>
                                             <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                             <div className='font-[Roboto] font-[400] text-[16px]'>Desktop</div>
                                        </div>
                                   </div>
                              </div>
                         ))
                    }
                    <AddAds addType='inpage'/>
               </div>


               <div className='mt-8'>
                    <div className='font-[700] font-[Roboto] text-[16px] pl-8'>Out-page ads</div>
                    {
                         outPageAds?.map((item, key) => (
                              <div className='bg-[#F6F9F7] py-5 px-8 mt-3 flex items-center'>
                                   <div className='w-1/2 flex items-center gap-4'>
                                        <div className='font-[Roboto] font-[400] text-[16px]'>
                                             <div>{item?.title}</div>
                                             <div>{item?.dimension}</div>
                                             <AdSettings addType='outpage'/>
                                        </div>
                                   </div>
                                   <div className='w-1/2 flex justify-between'>
                                        <div className='flex gap-3'>
                                             <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                             <div className='font-[Roboto] font-[400] text-[16px]'>Mobile</div>
                                        </div>
                                        <div className='flex gap-3'>
                                             <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                             <div className='font-[Roboto] font-[400] text-[16px]'>Tablet</div>
                                        </div>
                                        <div className='flex gap-3'>
                                             <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                             <div className='font-[Roboto] font-[400] text-[16px]'>Desktop</div>
                                        </div>
                                   </div>
                              </div>
                         ))
                    }
                    <AddAds addType='outpage'/>
               </div>
          </div>
     )
}

export default AdUnits