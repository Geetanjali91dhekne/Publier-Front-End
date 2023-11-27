import { Checkbox } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'

const VerifySellerID: React.FC = () => {
     const [data, setData] = useState<{
          gamId: boolean;
          siteAds: boolean;
          comments: string;
     }>({
          gamId: false,
          siteAds: false,
          comments: ''
     })
     return (
          <div className='px-8'>
               <div className='flex flex-col gap-8'>
                    <div className='flex gap-3 '>
                         <Checkbox className="customCheckBox2" checked={data?.gamId} onChange={(e) => { setData({ ...data, gamId: e.target.checked }) }}></Checkbox>
                         <div className='font-[Roboto] font-[400] text-[16px]'>Verify Seller ID in DGAM</div>
                    </div>
                    <div className='flex gap-3 '>
                         <Checkbox className="customCheckBox2" checked={data?.siteAds} onChange={(e) => { setData({ ...data, siteAds: e.target.checked }) }}></Checkbox>
                         <div className='font-[Roboto] font-[400] text-[16px]'>Verify Seller ID in Site Ads.txt</div>
                    </div>
               </div>


               <div className='mt-8'>
                    <label className="ml-1 pb-2 font-[Montserrat]">
                         {'Comments'}
                    </label>
                    <TextArea
                         placeholder="Enter the message"
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
     )
}

export default VerifySellerID