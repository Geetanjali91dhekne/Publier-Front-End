import React, { useState } from 'react'
import { RoundButton } from '../../../../../common/Button';
import { Drawer } from 'antd';
import PNormalInput from '../../../../../common/NormalInput';
import CommonDropDown from '../../../../../common/CommonDropDown';

type Props = {
     addType: string;
}
const AddAds: React.FC<Props> = ({ addType }) => {
     const [open, setOpen] = useState(false);
     const [newAd, setAd] = useState<{
          name?: string;
          primarySize?: string;
          allSize?: string;
          location?: string;
     }>({
          name: undefined,
          primarySize: undefined,
          allSize: undefined,
          location: undefined
     })
     return (
          <>
               <div className="border rounded-3xl border-green-800 w-fit mt-5">
                    <RoundButton
                         onClick={() => setOpen(!open)}
                         title={addType === 'sticky' ? "Add More Sticky ads" : addType === "inpage" ? "Add More In-Page Ads" : "Add More Out-Page Ads"}
                         light={true}
                    />
               </div>
               <Drawer
                    open={open}
                    width={750}
                    onClose={() => setOpen(false)}
                    closeIcon={null}
                    closable={false}
                    bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
               >
                    <div>
                         <div className='py-8 mx-8 flex justify-between items-center'>
                              <div className='w-[300px]'>
                                   {
                                        addType === 'sticky' ? <div className='font-[700] font-[Roboto] text-[16px]'><span className='text-[#056433]'>Sticky Ads</span> {"> Add Sticky Ads"}</div> :
                                             addType === 'inpage' ? <div className='font-[700] font-[Roboto] text-[16px]'><span className='text-[#056433]'>In-page Ads</span> {"> In-page Ads"}</div> :
                                                  <div className='font-[700] font-[Roboto] text-[16px]'><span className='text-[#056433]'>Out-page Ads</span> {"> Add Out-page Ads"}</div>
                                   }
                              </div>
                              <div className='flex gap-5 items-center'>
                                   <div className="border rounded-3xl border-green-800">
                                        <RoundButton
                                             light={true}
                                             title='Cancel'
                                             className={'w-[100px] text-[14px]'}
                                             onClick={() => setOpen(false)}
                                        />
                                   </div>
                                   <div>
                                        <RoundButton
                                             title='Save'
                                             className='w-[100px]'
                                        />
                                   </div>
                              </div>
                         </div>
                         <div className='mx-8 flex flex-col gap-3'>
                              <div>
                                   <PNormalInput
                                        title="Ad Name"
                                        name="nick_name"
                                        placeholder=''
                                        value={newAd?.name}
                                        onChange={(e: any) => {
                                             setAd({
                                                  ...newAd,
                                                  name: e.target.value
                                             })
                                        }}
                                   />
                              </div>
                              <div>
                                   <CommonDropDown title='All Sizes' />
                              </div>
                              <div>
                                   <CommonDropDown title='Primary Sizes' />
                              </div>
                              <div>
                                   <CommonDropDown title='Location' />
                              </div>
                         </div>
                    </div>
               </Drawer>
          </>
     )
}

export default AddAds