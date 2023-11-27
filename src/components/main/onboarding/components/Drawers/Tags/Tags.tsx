import { Radio } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'

type Props = {
     siteDetailRef?: any;
     setOpen?: any;
     open: boolean;
 }

const Tags:React.FC<Props> = ({ siteDetailRef, setOpen, open }) => {
     const [data,setData] = useState<{
          status?:string;
          comments:string;
     }>({
          status:undefined,
          comments:""
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
                    <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Tags Shared'}>Tags Shared</Radio>
                    <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Tags Implemented'}>Tags Implemented</Radio>
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

export default Tags