import { Checkbox } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'

const Live: React.FC = () => {
     const [data, setData] = useState<{
          live: boolean;
          comments: string;
     }>({
          live: false,
          comments: ""
     })
     return (
          <div className='mx-8'>
               <div className='flex gap-3 '>
                    <Checkbox className="customCheckBox2" checked={data?.live} onChange={(e) => { setData({ ...data, live: e.target.checked }) }}></Checkbox>
                    <div className='font-[Roboto] font-[400] text-[16px]'>Site is Live</div>
               </div>
               <div className='mt-8'>
                    <label className="ml-1 font-[Montserrat]">
                         {'Comments'}
                    </label>
                    <div className='mt-1'>
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
          </div>
     )
}

export default Live