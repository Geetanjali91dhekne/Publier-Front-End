import { Drawer } from 'antd';
import React, { useState } from 'react'
import { RoundButton } from '../../../../../../common/Button';
import PNormalInput from '../../../../../../common/NormalInput';
import { WidgetsData } from '../../../../redux/types';
import CommonDropDown from '../../../../../../common/CommonDropDown';
import TextArea from 'antd/es/input/TextArea';
import ColorPicker from '../../../../../../common/ColorPicker';
import { AiOutlineEye } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiCode } from 'react-icons/bi';
import { RxDotFilled } from 'react-icons/rx';
import PreviewOnboarding from '../../PreviewOnboarding';
type Props = {
     values: any;
}
const CreateNewWidget: React.FC<Props> = ({ values }) => {
     const [open, setOpen] = useState(false);
     const [data, setData] = useState<WidgetsData>({
          widgetTitle: '',
          widgetType: undefined,
          widgetText: undefined,
          donationAmt1: undefined,
          donationAmt2: undefined,
          donationAmt3: undefined,
          driveGoal: undefined,
          data: undefined,
          mode: undefined,
          styleType: undefined,
          termsAndPrivacy: undefined,
          donor: undefined,
          orientation: 'horizontal',
          backgroundColor: undefined,
          titleColor: undefined,
          fontColor: undefined,
          buttonsColor: undefined,
          buttonsTextColor: undefined,
          linkHoverColor: undefined,
          fontFamily: undefined,
          textSize: undefined,
          titleSize: undefined,
     })
     return (
          <div>
               {
                    values ?
                         <div className='h-[163px] rounded-lg shadow-xl cursor-pointer p-3'>
                              <div className='flex justify-between'>
                                   <div className='flex items-center gap-1'>
                                        <div className='text-[#056433] font-[600] font-[Roboto] text-[16px]'>{values?.name}</div>
                                        <div>{values?.status ? <RxDotFilled color='#11BE37' size={26} /> : <RxDotFilled size={26} color='#C9C9C9' />}</div>
                                   </div>
                                   <div className='flex items-center gap-2'>
                                        <div><BiCode color='#056433' size={22} /></div>
                                        <div><AiOutlineEye color='#056433' size={20} /></div>
                                        <div><BsThreeDotsVertical size={16} /></div>
                                   </div>
                              </div>

                              <div className='font-[Roboto] font-[400] text-[12px] text-[#5B5B5B] mt-2'>{values?.type}</div>
                              <div className='font-[Roboto] font-[400] text-[12px] mt-4'>{values?.title}</div>
                              <div className='mt-8 font-[Roboto] font-[400] text-[12px] text-[#AEAEAE]'>Created On: <span className='text-[#5B5B5B]'>{values?.createdOn}</span></div>
                         </div>
                         :
                         <div className='flex flex-col justify-center items-center h-[163px] rounded-lg shadow-xl cursor-pointer' onClick={() => setOpen(!open)}>
                              <div className='text-[#056433] font-[700] text-[32px]'>+</div>
                              <div className='text-[#056433] font-[Roboto] font-[700] text-[16px]'>Create New</div>
                         </div>
               }

               <Drawer
                    open={open}
                    width={750}
                    onClose={() => setOpen(false)}
                    closeIcon={null}
                    closable={false}
                    bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
               >
                    <div className=''>
                         <div className={data?.orientation === 'vertical'?'absolute rounded-lg -left-[400px] top-10 bg-white':'absolute rounded-lg -left-[520px] top-10 bg-white'}>
                              <PreviewOnboarding values={data} />
                         </div>
                         <div className='py-8 mx-8 flex justify-between items-center'>
                              <div className='flex items-center gap-4'>
                                   <div className="bg-[#C2D9CD] w-[50px] flex justify-center items-center text-[14px] font-[500] py-1 px-3 rounded-lg cursor-pointer" onClick={() => setOpen(false)}>
                                        Back
                                   </div>
                                   <div className='font-[700] font-[Roboto] text-[16px]'>Create New Widget</div>
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

                         <div className='px-8 flex flex-col gap-5'>
                              <div>
                                   <PNormalInput
                                        title='Widget Title*'
                                        value={data?.widgetTitle}
                                        name={'Widget Title'}
                                        onChange={(e: any) => setData({ ...data, widgetTitle: e.value })}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown
                                        title='Widget Type*'
                                        value={data?.widgetType}
                                        filterType='widgetdrawer'
                                        setValue={(e: any) => setData({ ...data, widgetType: e })}
                                   />
                              </div>

                              <div>
                                   <label className="ml-1 font-[Montserrat]">
                                        {'Widget Text'}
                                   </label>
                                   <div className='mt-1'>
                                        <TextArea
                                             placeholder="Please enter text here"
                                             autoSize={{ minRows: 5 }}
                                             value={data?.widgetText}
                                             onChange={(e) => {
                                                  setData({
                                                       ...data,
                                                       widgetText: e.target.value
                                                  })
                                             }}
                                        />
                                   </div>
                              </div>

                              <div>
                                   <PNormalInput
                                        title='Default Donation Amount 1'
                                        value={data?.donationAmt1}
                                        name={'Widget Title'}
                                        onChange={(e: any) => setData({ ...data, donationAmt1: e.value })}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title='Default Donation Amount 2'
                                        value={data?.donationAmt2}
                                        name={'Widget Title'}
                                        onChange={(e: any) => setData({ ...data, donationAmt2: e.value })}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title='Default Donation Amount 3'
                                        value={data?.donationAmt2}
                                        name={'Widget Title'}
                                        onChange={(e: any) => setData({ ...data, donationAmt2: e.value })}
                                   />
                              </div>
                         </div>

                         <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Advanced Options</div>
                         <div className='px-8 mt-8 flex flex-col gap-5'>
                              <div>
                                   <CommonDropDown
                                        title='Crowd Funding Mode'
                                        value={data?.mode}
                                        filterType='widgetdrawer'
                                        setValue={(e: any) => setData({ ...data, mode: e })}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown
                                        title='Widget Style Type'
                                        value={data?.styleType}
                                        filterType='widgetdrawer'
                                        setValue={(e: any) => setData({ ...data, styleType: e })}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown
                                        title='Show Privacy & Terms of Service Links'
                                        value={data?.termsAndPrivacy}
                                        filterType='widgetdrawer'
                                        setValue={(e: any) => setData({ ...data, termsAndPrivacy: e })}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown
                                        title='Top Donor Boards'
                                        value={data?.donor}
                                        filterType='widgetdrawer'
                                        setValue={(e: any) => setData({ ...data, donor: e })}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown
                                        title='Widget Orientation'
                                        value={data?.orientation}
                                        dataList={previewOrientation}
                                        setValue={(e: any) => setData({ ...data, orientation: e })}
                                   />
                              </div>
                         </div>

                         <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Customize Appearance</div>
                         <div className='px-8 mt-8 flex flex-col gap-5'>
                              <div>
                                   <PNormalInput
                                        title="Background Color"
                                        suffix={
                                             <div>
                                                  <ColorPicker
                                                       color={data?.backgroundColor}
                                                       className='w-[120px] m-0'
                                                       setColor={(color: any) => {
                                                            setData({
                                                                 ...data,
                                                                 backgroundColor: color,
                                                            });
                                                       }}
                                                  />
                                             </div>
                                        }
                                        name="nick_name"
                                        placeholder='#000000'
                                        value={data?.backgroundColor}
                                        onChange={() => { }}
                                        className='p-5'
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Title Color"
                                        suffix={
                                             <div>
                                                  <ColorPicker
                                                       color={data?.titleColor}
                                                       className='w-[120px] m-0'
                                                       setColor={(color: any) => {
                                                            setData({
                                                                 ...data,
                                                                 titleColor: color,
                                                            });
                                                       }}
                                                  />
                                             </div>
                                        }
                                        name="nick_name"
                                        placeholder='#000000'
                                        value={data?.titleColor}
                                        onChange={() => { }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Font Color"
                                        suffix={
                                             <div>
                                                  <ColorPicker
                                                       color={data?.fontColor}
                                                       className='w-[120px] m-0'
                                                       setColor={(color: any) => {
                                                            setData({
                                                                 ...data,
                                                                 fontColor: color,
                                                            });
                                                       }}
                                                  />
                                             </div>
                                        }
                                        name="nick_name"
                                        placeholder='#000000'
                                        value={data?.backgroundColor}
                                        onChange={() => { }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Buttons Color"
                                        suffix={
                                             <div>
                                                  <ColorPicker
                                                       color={data?.buttonsColor}
                                                       className='w-[120px] m-0'
                                                       setColor={(color: any) => {
                                                            setData({
                                                                 ...data,
                                                                 buttonsColor: color,
                                                            });
                                                       }}
                                                  />
                                             </div>
                                        }
                                        name="nick_name"
                                        placeholder='#000000'
                                        value={data?.backgroundColor}
                                        onChange={() => { }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Buttons Text Color"
                                        suffix={
                                             <div>
                                                  <ColorPicker
                                                       color={data?.buttonsTextColor}
                                                       className='w-[120px] m-0'
                                                       setColor={(color: any) => {
                                                            setData({
                                                                 ...data,
                                                                 backgroundColor: color,
                                                            });
                                                       }}
                                                  />
                                             </div>
                                        }
                                        name="nick_name"
                                        placeholder='#000000'
                                        value={data?.buttonsTextColor}
                                        onChange={() => { }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Link Hover Color"
                                        suffix={
                                             <div>
                                                  <ColorPicker
                                                       color={data?.linkHoverColor}
                                                       className='w-[120px] m-0'
                                                       setColor={(color: any) => {
                                                            setData({
                                                                 ...data,
                                                                 linkHoverColor: color,
                                                            });
                                                       }}
                                                  />
                                             </div>
                                        }
                                        name="nick_name"
                                        placeholder='#000000'
                                        value={data?.linkHoverColor}
                                        onChange={() => { }}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown
                                        title='Font Family'
                                        value={data?.fontFamily}
                                        filterType='widgetdrawer'
                                        setValue={(e: any) => setData({ ...data, fontFamily: e })}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown
                                        title='Text Font Size'
                                        value={data?.textSize}
                                        filterType='widgetdrawer'
                                        setValue={(e: any) => setData({ ...data, textSize: e })}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown
                                        title='Title Font Size'
                                        value={data?.titleSize}
                                        filterType='widgetdrawer'
                                        setValue={(e: any) => setData({ ...data, titleSize: e })}
                                   />
                              </div>
                         </div>
                    </div>
               </Drawer>
          </div>
     )
}

export default CreateNewWidget

const previewOrientation = [
     { title: 'Horizontal', value: 'horizontal' },
     { title: 'Vertical', value: 'vertical' },
 ]