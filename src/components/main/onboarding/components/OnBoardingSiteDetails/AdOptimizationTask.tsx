import React from 'react'
import AdOpt from '../../../../../assets/icons/onboarding/adopt.svg'
import TaskDrawer from '../Drawers/TaskDrawer'
import { Switch } from 'antd'
import CustomTask from '../Drawers/CustomTask/CustomTask'

const data = [
  { title: 'MCM Invite', status: true },
  { title: 'Ads.txt', status: true },
  { title: 'Create Prebid.js', status: true },
  { title: 'Google Approval', status: true },
  { title: 'Ad Units', status: true },
  { title: 'Partner', status: true },
  { title: 'Ad Tags', status: true },
  { title: 'Staging Site QA', status: true },
  { title: 'Live', status: false },
  { title: 'Reports Data QA', status: false },
  { title: 'Verify Seller ID', status: false },
]

type Props = {
  active:any;
  setActive:any;
}
const AdOptimizationTask: React.FC<Props> = ({active,setActive}) => {
  return (
    <div className='mt-5'>
      <div className='bg-[#F6F9F7] h-[50px] px-5 flex justify-between items-center'>
        <div className={active?.adOpt?'flex gap-3 items-center':'flex gap-3 items-center opacity-30 pointer-events-none'}>
          <img className='w-[33px] h-[32px]' src={AdOpt} alt='globe icon'></img>
          <div className='font-[600] text-[14px] font-[montserrat]'>Ad Optimization {!active?.adOpt && '(Not active)'}</div>
        </div>
        <div className='flex items-center gap-10'>
          <div className={active?.adOpt?'flex gap-3 items-center':'flex gap-3 items-center opacity-30 pointer-events-none'}>
            <CustomTask/>
          </div>
          <div className='flex gap-3 items-center'>
            <Switch checked={active?.adOpt} onChange={() => setActive({...active,adOpt:!active?.adOpt})} size='small'/>
            <div className='font-[400] text-[13px] font-[montserrat]'>Currently {active?.adOpt ? 'Active' : 'InActive'}</div>
          </div>
        </div>
      </div>

      <div className={active?.adOpt?`flex flex-wrap gap-5 pt-5 mx-5`:`flex flex-wrap gap-5 pt-5 mx-5 opacity-30 pointer-events-none`}>
        {
          data?.map((item: any, index: number) => (
            <TaskDrawer key={index} title={item?.title} status={item?.status} />
          ))
        }
      </div>
    </div>
  )
}

export default AdOptimizationTask
