import { Switch } from 'antd';
import React, { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import PNormalInput from '../../../../../common/NormalInput';

type Props = {
     name: string;
     status: boolean;
}
const Banner: React.FC<Props> = ({ name, status }) => {
     const [showBannerDetails, setShowBannerDetails] = useState(false);
     return (
          <>
               <div className='bg-[#EFEFEF] px-8 mb-1 h-[36px] flex justify-between items-center cursor-pointer' onClick={() => setShowBannerDetails(!showBannerDetails)}>
                    <div className='font-[Roboto] font-[700] text-[16px]'>{name}</div>
                    <div className='flex gap-10'>
                         <div className='flex gap-3 font-[400] font-[Montserrat] text-[12px]' onClick={(e) => e.stopPropagation()}>
                              <Switch size='small' defaultChecked={status} />
                              <div>Status</div>
                         </div>
                         {
                              showBannerDetails ? <IoMdArrowDropup size={22} /> : <IoMdArrowDropdown size={22} />
                         }
                    </div>
               </div>
               {
                    showBannerDetails && <div className='px-8 pb-8 pt-2'>
                         <div className='grid grid-cols-2 gap-5 '>
                              <PNormalInput title='Size' name='size' value={''} onChange={() => { }} />
                              <PNormalInput title='Ad Type' name='adType' value={''} onChange={() => { }} />
                              <PNormalInput title='GPT Tag ID' name='gptTagId' value={''} onChange={() => { }} />
                              <PNormalInput title='Bidder Code' name='bidderCode' value={''} onChange={() => { }} />
                              <PNormalInput title='Ad Sizes' name='adSizes' value={''} onChange={() => { }} />
                         </div>
                         <div className='grid grid-cols-2 gap-5 mt-5'>
                              <PNormalInput title='Bidder Params - accountID' name='accountId' value={''} onChange={() => { }} />
                              <PNormalInput title='Bidder Params - siteId' name='siteId' value={''} onChange={() => { }} />
                              <PNormalInput title='Bidder Params - zoneId' name='zoneId' value={''} onChange={() => { }} />
                              <PNormalInput title='Bidder Params - position' name='position' value={''} onChange={() => { }} />
                         </div>
                    </div>
               }
          </>
     )
}

export default Banner