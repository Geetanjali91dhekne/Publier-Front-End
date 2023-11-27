import { Checkbox, Drawer } from 'antd'
import React, { useState } from 'react'
import { RoundButton } from '../../../../../common/Button'
import PNormalInput from '../../../../../common/NormalInput'

const list = [
     { title: "Underdone", id: 1 },
     { title: "Media.net", id: 2 },
     { title: "Brealtime OLD", id: 3 },
     { title: "Sonobi", id: 4 },
     { title: "RevContent", id: 5 },
]
const AddEditNetwork: React.FC = () => {
     const [open, setOpen] = useState(false)
     return (
          <>
               <div onClick={() => setOpen(true)} className='bg-[#C2D9CD] h-[40px] font-[Roboto] font-[600] text-[16px] text-[#056433] mx-5 rounded-lg flex justify-center items-center'>
                    Add/Edit Network
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
                              <div className='flex items-center gap-4'>
                                   <div className="bg-[#C2D9CD] w-[50px] flex justify-center items-center text-[14px] font-[500] py-1 px-3 rounded-lg cursor-pointer" onClick={() => setOpen(false)}>
                                        Back
                                   </div>
                                   <div className='font-[700] font-[Roboto] text-[16px]'><span className='text-[#056433]'>Partners</span> {"> Add/Edit Network"}</div>
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
                                             title='Update'
                                             className='w-[100px]'
                                        />
                                   </div>
                              </div>
                         </div>

                         <div className='px-8'>
                              <div className='flex justify-between items-center bg-[#056433] h-[41px] px-5 font-[700] font-[Roboto] text-[16px] text-[white]'>
                                   <div className=''>Name</div>
                                   <div className='flex gap-14'>
                                        <div className=''>ID</div>
                                        <div className='w-[280px]'>Site Alias</div>
                                   </div>
                              </div>

                              {
                                   list?.map((item: any, index: any) => (
                                        <div className='mt-3 px-5 py-3 bg-[#F6F9F7] flex justify-between items-center'>
                                             <div className='flex gap-4'>
                                                  <div><Checkbox className='customCheckBox2' defaultChecked={false} onChange={(e) => { }} /></div>
                                                  <div className='font-[Roboto] font-[500] text-[16px]'>{item?.title}</div>
                                             </div>
                                             <div className='flex gap-14 items-center'>
                                                  <div>{item?.id}</div>
                                                  <div className='w-[280px]'>
                                                       <PNormalInput value={'Site Alias'} title='' name='site alias' onChange={() => { }} />
                                                  </div>
                                             </div>
                                        </div>
                                   ))
                              }
                         </div>

                    </div>
               </Drawer>
          </>
     )
}

export default AddEditNetwork