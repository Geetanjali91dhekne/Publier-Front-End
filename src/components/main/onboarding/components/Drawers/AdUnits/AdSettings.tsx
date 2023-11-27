import { Checkbox, Drawer } from 'antd';
import React, { useState } from 'react'
import { RoundButton } from '../../../../../common/Button';
import PNormalInput from '../../../../../common/NormalInput';
import CommonDropDown from '../../../../../common/CommonDropDown';
import TextArea from 'antd/es/input/TextArea';
type Props = {
     addType: string;
}
const AdSettings: React.FC<Props> = ({ addType }) => {
     const [open, setOpen] = useState(false);
     const [settings, setSettings] = useState<{
          existingAdUnit?: boolean;
          dpfCode?: string;
          dpfSlotId?: string;
          sizeMapping?: boolean;
          customMapping?: string;
          adAlignment?: string;
          minBrowserWidth?: string;
          minBrowserHeight?: string;
          refreshRates?: string;
          sizeAlis?: string;
          verticalPad?: string;
          horizontalPad?: string;
          closeButton?: boolean;
          adbackGroundColor?: string;
          adbackGroundOpacity?: string;
          closebackGroundColor?: string;
          closeLocation?: string;
          closeSize?: string;
          publirLogo?: boolean;
          topText?: string;
          bottomText?: string;
          preview?: boolean;
          excludeMode?: boolean;
          comments?: string;
          includeMode?: boolean;
     }>({
          existingAdUnit: undefined,
          dpfCode: undefined,
          dpfSlotId: undefined,
          sizeMapping: false,
          customMapping: undefined,
          adAlignment: undefined,
          minBrowserWidth: undefined,
          minBrowserHeight: undefined,
          refreshRates: undefined,
          sizeAlis: undefined,
          verticalPad: undefined,
          horizontalPad: undefined,
          closeButton: false,
          adbackGroundColor: '#000000',
          adbackGroundOpacity: undefined,
          closebackGroundColor: '#000000',
          closeLocation: undefined,
          closeSize: undefined,
          publirLogo: false,
          topText: undefined,
          bottomText: undefined,
          preview: false,
          excludeMode: false,
          comments: undefined,
          includeMode: false,
     })
     return (
          <>
               <div className='text-[12px] text-[#056433] cursor-pointer' onClick={() => setOpen(!open)}>Settings</div>
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
                                        addType === 'sticky' ? <div className='font-[700] font-[Roboto] text-[16px]'><span className='text-[#056433]'>Sticky Ads</span> {"> Settings"}</div> :
                                             addType === 'inpage' ? <div className='font-[700] font-[Roboto] text-[16px]'><span className='text-[#056433]'>In-page Ads</span> {"> Settings"}</div> :
                                                  <div className='font-[700] font-[Roboto] text-[16px]'><span className='text-[#056433]'>Out-page Ads</span> {"> Settings"}</div>
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
                         <div className='mx-8 flex flex-col gap-5'>
                              <div className='flex gap-3 my-2'>
                                   <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                   <div className='font-[Roboto] font-[400] text-[16px]'>Do you want to use an existing ad unit?</div>
                              </div>
                              <div>
                                   <PNormalInput
                                        title="DFP Code"
                                        name="dfpCode"
                                        value={settings?.dpfCode}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  dpfCode: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="DFP Slot ID"
                                        name="dfpSlotId"
                                        value={settings?.dpfSlotId}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  dpfSlotId: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div className='flex gap-3 my-2'>
                                   <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                   <div className='font-[Roboto] font-[400] text-[16px]'>Size Mapping</div>
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Custom Mapping"
                                        name="customMapping"
                                        value={settings?.customMapping}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  customMapping: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown title='Sticky Ad alignment' />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Minimum Browser Width (px)"
                                        name="browserWidth"
                                        value={settings?.minBrowserWidth}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  minBrowserWidth: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Minimum Browser Height (px)"
                                        name="browserHeight"
                                        value={settings?.minBrowserHeight}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  minBrowserHeight: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Refresh Rates (sec)"
                                        name="refreshRate"
                                        value={settings?.refreshRates}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  refreshRates: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Size Alias"
                                        name="sizeAlias"
                                        value={settings?.sizeAlis}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  sizeAlis: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Vertical Pad (px)"
                                        name="verticalPad"
                                        value={settings?.verticalPad}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  verticalPad: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Horizontal Pad (px)"
                                        name="horizontalPad"
                                        value={settings?.horizontalPad}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  horizontalPad: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Ad Background Color"
                                        name="backgroundColor"
                                        value={settings?.adbackGroundColor}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  adbackGroundColor: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Ad Background Opacity (%)"
                                        name="backgroundOpacity"
                                        value={settings?.adbackGroundOpacity}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  adbackGroundOpacity: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div className='flex gap-3 my-2'>
                                   <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                   <div className='font-[Roboto] font-[400] text-[16px]'>Show Close Button</div>
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Blose Background Color"
                                        name="closebackgroundColor"
                                        value={settings?.closebackGroundColor}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  closebackGroundColor: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <CommonDropDown
                                        title='Close Location'
                                        value={settings?.closeLocation}
                                        setValue={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  closeLocation: e
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Close Size (px)"
                                        name="closesize"
                                        value={settings?.closeSize}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  closeSize: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div className='flex gap-3 my-2'>
                                   <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                   <div className='font-[Roboto] font-[400] text-[16px]'>Show Publir Logo</div>
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Top Text"
                                        name="toptext"
                                        value={settings?.topText}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  topText: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div>
                                   <PNormalInput
                                        title="Bottom Text"
                                        name="bottomtext"
                                        value={settings?.bottomText}
                                        onChange={(e: any) => {
                                             setSettings({
                                                  ...settings,
                                                  bottomText: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div className='flex gap-3 my-2'>
                                   <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                   <div className='font-[Roboto] font-[400] text-[16px]'>Preview</div>
                              </div>

                              <div className='flex gap-3 my-2'>
                                   <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                   <div className='font-[Roboto] font-[400] text-[16px]'>Exclude Mode</div>
                              </div>

                              <div className='mt-1 pl-5'>
                                   <TextArea
                                        placeholder="Enter the message"
                                        autoSize={{ minRows: 5 }}
                                        value={settings?.comments}
                                        onChange={(e) => {
                                             setSettings({
                                                  ...settings,
                                                  comments: e.target.value
                                             })
                                        }}
                                   />
                              </div>

                              <div className='flex gap-3 my-2'>
                                   <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
                                   <div className='font-[Roboto] font-[400] text-[16px]'>Include Mode</div>
                              </div>
                         </div>
                    </div>
               </Drawer>
          </>
     )
}

export default AdSettings