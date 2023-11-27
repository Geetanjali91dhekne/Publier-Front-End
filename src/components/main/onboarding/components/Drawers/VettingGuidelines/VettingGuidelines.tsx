import { Radio, Spin } from 'antd'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../../../../store/RootReducer'
import Apis from '../../../../../../api'
import MessageActions from '../../../../../message/redux/actions'
import OnboardActions from '../../../redux/actions'

type Props = {
     siteDetailRef?: any;
     setOpen?: any;
}
const VettingGuidelines: React.FC<Props> = ({ siteDetailRef, setOpen }) => {
     const [data, setData] = useState("")
     const [loading, setLoading] = useState(false);
     const [validate, setValidate] = useState(false);
     const generalTabData = useSelector((state: RootState) => state.onboarding.onboardingGeneralTabDetails)
     const dispatch = useDispatch();
     const params = useParams();
     const siteId = params.siteId;

     useEffect(() => {
          if (siteId && generalTabData?.vettingGuidelines?.length > 0) {
               setData(generalTabData?.vettingGuidelines[0]?.status)
          }else{
               setData("");
          }
     }, [siteId, generalTabData?.vettingGuidelines])

     useImperativeHandle(
          siteDetailRef,
          () => ({
               createEditVettingGuidlines() {
                    setValidate(true);
                    if (data === '') {
                         return
                    }
                    setValidate(false);
                    if (generalTabData?.vettingGuidelines?.length > 0) {
                         if (siteId && data) {
                              setLoading(true);
                              Apis.editVettingGuildlinesApi({
                                   site_id: siteId,
                                   status: data
                              }, generalTabData?.vettingGuidelines[0]?.id)
                                   .then(() => {
                                        setLoading(false);
                                        setOpen(false);
                                        dispatch(MessageActions.showMessage({ text: `Vetting Guidlines Status Updated Successfully!`, error: false }));
                                        dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));
                                   })
                                   .catch((err) => {
                                        setLoading(false);
                                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                                   })
                         }
                    } else {
                         if (siteId && data) {
                              Apis.createVettingGuildlinesApi({
                                   site_id: siteId,
                                   status: data
                              })
                                   .then(() => {
                                        setLoading(false);
                                        setOpen(false);
                                        dispatch(MessageActions.showMessage({ text: `vetting guidlines created successfully!`, error: false }));
                                        dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));

                                   })
                                   .catch((err) => {
                                        setLoading(false);
                                        dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                                   })
                         }
                    }
               }
          })
     )

     return (
          <div>
               <div className='px-8'>
                    <div className=''>
                         <Radio.Group value={data} onChange={(e) => {
                              setData(e.target.value)
                         }}>
                              <div className='flex gap-5'>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Y'}>Site meets Vetting Criteria </Radio>
                                   </div>
                                   <div>
                                        <Radio className='font-[Roboto] font-[500] text-[16px]' value={'N'}>Site does not meet Vetting Criteria </Radio>
                                   </div>
                              </div>
                         </Radio.Group>
                    </div>
                    {validate && (data === "") && <span className="common_error ml-5">Please select either of the options.</span>}

               </div>
               <div className=" bg-[#EFEFEF] pl-8 mt-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[700]">Vetting Criteria (Guidelines)</div>

               <div className='bg-[#F2F2F2] rounded-xl mt-5 mx-8 p-5 font-[Roboto] text-[16px]'>

                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              <span className='font-[700]'>Business Check </span>
                              - Is the publisher a valid/legitimate business? Which organization owns or manages the site?
                         </div>
                    </div>
                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              To Verify: Google Search; https://who.is/; Reach out to Business contact listed on website;
                         </div>
                    </div>
                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              <span className='font-[700]'> Owner Check </span>
                              - What is the owner's background and past work? Is there any information on legal cases or issues they've gone through? Google Search
                         </div>
                    </div>
                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              <span className='font-[700]'> Previous policy violations </span>
                              - Did the site get policy violations from ad manager or adsense in the past? What were they?
                         </div>
                    </div>

                    <div className='font-[700] mt-10'>Content </div>
                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              <span className='font-[700]'> Content Standards </span>
                              - Does the site have intellectual property infringement, adult content, hate speech, violence, or promotes false information?; look for original content; if curated, look for quality of content that adds value to their audience; High level of engagement with their audience/site visitors is great.
                         </div>
                    </div>
                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              <span className='font-[700]'> Invalid Click Activity </span>
                              - Does the publisher use bots to generate clicks on ads or ask others to click on ads to get more clicks?
                         </div>
                    </div>
                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              <span className='font-[700]'> Website Design </span>
                              - Is the site easy to navigate, visually appealing, and has a clear user policy or terms and conditions page?
                         </div>
                    </div>
                    <div className='flex mt-5'>
                         <div className='px-2 pt-1'><RxDotFilled /></div>
                         <div>
                              <span className='font-[700]'> Pageview Threshold </span>
                              - Does the publisher have a minimum of 300K monthly pageviews?
                         </div>
                    </div>
               </div>

               {
                    (loading) && <div className='absolute w-full top-0'>
                         <div className='flex h-[70vh] justify-center items-center '><Spin /></div>
                    </div>
               }
          </div>
     )
}

export default VettingGuidelines
