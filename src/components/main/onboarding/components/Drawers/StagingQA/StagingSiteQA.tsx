import { Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'

const StagingSiteQA: React.FC = () => {
     const [data, setData] = useState<{
          comments: string;
          status?: string;
     }>({
          status: undefined,
          comments: ""
     })
     return (
          <div className='mx-8'>
               <div>
                    <Radio.Group value={data?.status} onChange={(e) => {
                         setData({
                              ...data,
                              status: e.target.value
                         })
                    }}>
                         <div className='flex gap-8'>
                              <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Inprogress'}>In progress</Radio>
                              <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Completed'}>Completed</Radio>
                         </div>
                    </Radio.Group>
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

export default StagingSiteQA
