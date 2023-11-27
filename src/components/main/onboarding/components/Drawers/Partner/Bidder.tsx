import { Switch } from 'antd'
import React, { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import Banner from './Banner';

type Props = {
     title: string;
     banners: any;
     status: boolean;
}
const Bidder: React.FC<Props> = ({ title, banners, status }) => {
     const [showContent, setShowContent] = useState(false);
     return (
          <div className='mt-2'>
               <div className='flex items-center justify-between px-8 mt-2 h-[50px] bg-[#056433] font-[600] font-[Montserrat] text-[14px] cursor-pointer' onClick={() => setShowContent(!showContent)}>
                    <div className='text-[white]'>{title}</div>
                    <div className='flex gap-5'>
                         {
                              !showContent && <div className='flex gap-3 text-[white] font-[400] font-[Montserrat] text-[12px]' onClick={(e) => e.stopPropagation()}>
                                   <Switch size='small' defaultChecked={status} />
                                   <div>Status</div>
                              </div>
                         }
                         {
                              showContent ? <IoMdArrowDropup color='white' size={22} /> : <IoMdArrowDropdown color='white' size={22} />
                         }
                    </div>
               </div>
               {
                    showContent && banners?.map((item: any, index: any) => (
                         <Banner key={index} name={item?.name} status={item?.status} />
                    ))
               }
          </div>
     )
}

export default Bidder