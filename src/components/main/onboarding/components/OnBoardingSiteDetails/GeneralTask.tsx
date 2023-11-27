import React, { useEffect, useState } from 'react'
import Globe from '../../../../../assets/icons/onboarding/globe.png'
import TaskDrawer from '../Drawers/TaskDrawer'
import CustomTask from '../Drawers/CustomTask/CustomTask'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../store/RootReducer'
import OnboardActions from '../../redux/actions'
import { useParams } from 'react-router-dom'

type Props = {
     siteData?: any
}
const GeneralTask: React.FC<Props> = ({ siteData }) => {
     const dispatch = useDispatch();
     const params = useParams();
     const siteId = params.siteId;
     const GeneralTabData = useSelector((state: RootState) => state.onboarding.onboardingGeneralTabDetails)
     const [data, setData] = useState<any>(
          [
               { title: 'Vetting Guidelines', status: false },
               { title: 'Billing', status: false },
               { title: 'Mockup', status: false },
               { title: 'Agreement', status: false }
          ]
     )

     useEffect(() => {
          if (GeneralTabData) {
               let dummData: any = [
                    { title: 'Vetting Guidelines', status: GeneralTabData?.vettingGuidelines[0]?.status === 'Y' ? true : false },
                    { title: 'Billing', status: GeneralTabData?.billingData[0]?.status === 'Y' ? true : false },
                    { title: 'Mockup', status: GeneralTabData?.mockUp[0]?.status === 'Y' ? true : false },
                    { title: 'Agreement', status: GeneralTabData?.agreementData[0]?.status === 'Y' ? true : false },
               ]

               if (GeneralTabData?.customTask?.length > 0) {
                    GeneralTabData?.customTask?.forEach((item: any, index: any) => {
                         dummData.push({ title: item?.task_name, status: item?.complete === 'Y' ? true : false, customDrawer: true, customTaskData: item })
                    })
               }
               setData(dummData)
          }
     }, [GeneralTabData])


     useEffect(() => {
          if (siteId) {
               dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
          }
     }, [dispatch, siteId]);
     return (
          <div className='mt-5'>
               <div className='bg-[#F6F9F7] h-[50px] px-5 flex justify-between items-center'>
                    <div className=' flex gap-3 items-center'>
                         <img className='w-[33px] h-[32px]' src={Globe} alt='globe icon'></img>
                         <div className='font-[600] text-[14px] font-[montserrat]'>General</div>
                    </div>
                    <div className='flex items-center gap-10'>
                         <CustomTask />
                    </div>
               </div>

               <div className='flex gap-5 pt-5 mx-5'>
                    {
                         data?.map((item: any, index: number) => (
                              <TaskDrawer key={index} title={item?.title} status={item?.status} customDrawer={item?.customDrawer || false} customTaskData={item?.customTaskData || null} />
                         ))
                    }
               </div>

          </div>
     )
}

export default GeneralTask
