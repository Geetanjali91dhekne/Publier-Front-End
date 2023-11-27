import React from 'react'
import AdblockRecovery from '../../../../../assets/icons/onboarding/adblockrecovery.svg'
import { Switch } from 'antd';
import TaskDrawer from '../Drawers/TaskDrawer';
import CustomTask from '../Drawers/CustomTask/CustomTask';

const data = [
  { title: 'Set Up Notice Rules', status: false },
  { title: 'JS Code/Set Live', status: false }
]

type Props = {
  active: any;
  setActive: any;
}
const AdblockRecoveryTask: React.FC<Props> = ({active,setActive}) => {

  return (
    <div className='mt-5'>
      <div className='bg-[#F6F9F7] h-[50px] px-5 flex justify-between items-center'>
        <div className={active?.adblockRecovery ? 'flex gap-3 items-center' : 'flex gap-3 items-center opacity-40 pointer-events-none'}>
          <img className='w-[33px] h-[32px]' src={AdblockRecovery} alt='globe icon'></img>
          <div className='font-[600] text-[14px] font-[montserrat]'>Adblock Recovery {!active?.adblockRecovery && '(Not active)'}</div>
        </div>
        <div className='flex items-center gap-10'>
          <div className={active?.adblockRecovery ? 'flex gap-3 items-center' : 'flex gap-3 items-center opacity-40 pointer-events-none'}>
            <CustomTask />
          </div>
          <div className='flex gap-3 items-center'>
            <Switch checked={active?.adblockRecovery} onChange={() => setActive({...active,adblockRecovery:!active.adblockRecovery})} size='small' />
            <div className='font-[400] text-[13px] font-[montserrat]'>Currently {active?.adblockRecovery ? 'Active' : 'InActive'}</div>
          </div>
        </div>
      </div>

      <div className={active?.adblockRecovery ? `flex flex-wrap gap-5 pt-5 mx-5` : `flex flex-wrap gap-5 pt-5 mx-5 opacity-40 pointer-events-none`}>
        {
          data?.map((item: any, index: number) => (
            <TaskDrawer key={index} title={item?.title} status={item?.status} />
          ))
        }
      </div>
    </div>
  )
}

export default AdblockRecoveryTask