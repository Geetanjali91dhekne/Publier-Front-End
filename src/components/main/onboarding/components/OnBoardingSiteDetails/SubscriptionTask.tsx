import React from 'react'
import SubsImage from '../../../../../assets/icons/onboarding/subscription.svg'
import { Switch } from 'antd';
import TaskDrawer from '../Drawers/TaskDrawer';
import CustomTask from '../Drawers/CustomTask/CustomTask';

const data = [
  { title: 'Pricing', status: false },
  { title: 'Set Rules', status: false },
  { title: 'Email Rules', status: false },
  { title: 'Integration', status: false },
  // { title: 'How it Works', status: false },
  // { title: 'Install WP Plugin', status: false },
  { title: 'Ad Wrapping Code', status: false },
]

type Props = {
  active:any;
  setActive:any;
}
const SubscriptionTask: React.FC<Props> = ({active,setActive}) => {

  return (
    <div className='mt-5'>
      <div className='bg-[#F6F9F7] h-[50px] px-5 flex justify-between items-center'>
        <div className={active?.subscription ? 'flex gap-3 items-center' : 'flex gap-3 items-center opacity-30 pointer-events-none'}>
          <img className='w-[33px] h-[32px]' src={SubsImage} alt='globe icon'></img>
          <div className='font-[600] text-[14px] font-[montserrat]'>Subscription {!active?.subscription  && '(Not active)'}</div>
        </div>
        <div className='flex items-center gap-10'>
          <div className={active?.subscription  ? 'flex gap-3 items-center' : 'flex gap-3 items-center opacity-30 pointer-events-none'}>
            <CustomTask />
          </div>
          <div className='flex gap-3 items-center'>
            <Switch checked={active?.subscription } onChange={() => setActive({...active,subscription:!active.subscription})} size='small' />
            <div className='font-[400] text-[13px] font-[montserrat]'>Currently {active?.subscription  ? 'Active' : 'InActive'}</div>
          </div>
        </div>
      </div>

      <div className={active?.subscription  ? `flex flex-wrap gap-5 pt-5 mx-5` : `flex flex-wrap gap-5 pt-5 mx-5 opacity-30 pointer-events-none`}>
        {
          data?.map((item: any, index: number) => (
            <TaskDrawer key={index} title={item?.title} status={item?.status} />
          ))
        }
      </div>
    </div>
  )
}

export default SubscriptionTask