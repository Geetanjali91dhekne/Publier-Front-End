import { Checkbox, Switch } from 'antd'
import React, { useState } from 'react'
import PNormalInput from '../../../../../../common/NormalInput'
import CommonDropDown from '../../../../../../common/CommonDropDown'
import TextArea from 'antd/es/input/TextArea'
import ColorPicker from '../../../../../../common/ColorPicker'

const NoticeRules: React.FC = () => {
    const [rulesData, setRulesData] = useState<{
        billingCompleted?: boolean;
        attachment?: string;
        sendAsPDF?: boolean;
        sendAsExcel?: boolean;
        emailIds?: string;
        message?: string;
        gamId?: boolean;
        noticeBackgroundColor?: string;
        fontColor?: string;
        borderColor?: string;
        linkColor?: string;
        linkHoverColor?: string;
        close_Button_Background?: string;
        close_Button_font_color?: string;
        marginTop?: string;
        blurContent?: string;
        BorderWidth?: string;
        allowCloseCheckbox?: boolean;
        showHomapageCheckbox?: boolean;
        signupFormCheckbox?: boolean;
        blurSiteContentBehindNoticeCheckbox?: boolean;
        pageViewsCheckbox?: boolean;
        subscriptionStatusCheckbox?: boolean;
        stripeCheckbox?: boolean;
        applePay_GooglePayCheckbox?: boolean;
    }>({
        billingCompleted: undefined,
        attachment: undefined,
        sendAsPDF: undefined,
        sendAsExcel: undefined,
        emailIds: undefined,
        message: undefined,
        noticeBackgroundColor: undefined,
        fontColor: undefined,
        borderColor: undefined,
        linkColor: undefined,
        linkHoverColor: undefined,
        close_Button_Background: undefined,
        close_Button_font_color: undefined,
        marginTop: undefined,
        blurContent: undefined,
        BorderWidth: undefined,
        allowCloseCheckbox: undefined,
        showHomapageCheckbox: undefined,
        signupFormCheckbox: undefined,
        blurSiteContentBehindNoticeCheckbox: undefined,
        pageViewsCheckbox: undefined,
        subscriptionStatusCheckbox: undefined,
        stripeCheckbox: undefined,
        applePay_GooglePayCheckbox: undefined,
    })

    return (
        <div className=''>
            <div className='absolute rounded-lg -left-[400px] w-[390px] h-[363px] bg-white'>
                <div className="h-[56px] pl-8 rounded-t-lg leading-[56px] bg-green-800 text-[#FFFFFF] text-[18px] font-[600] font-[Roboto]">Preview</div>
            </div>

            <div className='px-8'>
                <div className="mt-8 p-3 bg-[#EFEFEF] rounded w-fit leading-[29px] font-[Roboto] text-[16px] font-[400]">
                    <span className="font-[700]"> Adblock Recovery </span> notice will show up for users with adblocking extension on their browser
                </div>
                <div className="mt-8 pb-10 p-3 bg-[#EFEFEF] rounded  w-fit leading-[29px] font-[Roboto] text-[16px] font-[400]">
                    We have pre-filled the fields with recommended settings, feel free to change them
                    here. Need more control? Click <span className="font-[700]"> Advanced Options </span> or <span className="font-[700]"> Customize Appearance.</span>
                </div>
                <div>
                    <div className='mt-8'>
                        <label className="ml-1 mt-5 font-[Montserrat]">
                            {'Adblock recovery notice deployment location and timing'}
                        </label>
                        <div className='flex gap-4 items-center '>
                            <CommonDropDown filterType='BillingTask' setValue={() => { }} value={'Please Select'} />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <label className="ml-1 mt-5 font-[Montserrat]">
                            {'After'}
                        </label>
                        <div className='flex gap-4 items-center'>
                            <CommonDropDown filterType='BillingTask' setValue={() => { }} value={'Please Select'} />
                        </div>
                    </div>

                    <div className='mt-5'>
                        <label className="ml-1 font-[Montserrat]">
                            {'Message'}
                        </label>
                        <div className='mt-1'>
                            <TextArea
                                placeholder="Please enter text here"
                                autoSize={{ minRows: 5 }}
                                value={rulesData?.message}
                                onChange={(e) => {
                                    setRulesData({
                                        ...rulesData,
                                        message: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className='mt-2 text-right font-[Roboto] font-[400] text-[12px]'>Word Count: 0/250</div>
                </div>
            </div>
            <div>
                <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Advanced Options</div>
                <div className='px-8 mt-8'>
                    <div className='mt-5'>
                        <label className="ml-1 mt-5 font-[Montserrat]">
                            {'Subscription Mode'}
                        </label>
                        <div className='flex gap-4 items-center '>
                            <CommonDropDown filterType='BillingTask' setValue={() => { }} value={'Live'} />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <PNormalInput
                            title="Add a top margin of"
                            name="nick_name"
                            placeholder='0'
                            value={rulesData?.marginTop}
                            onChange={(e) => {
                                setRulesData({
                                    ...rulesData,
                                    marginTop: e.value ? String(e.value) : ''
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className='mt-10 pl-8  pr-8 flex justify-between items-center bg-[#F6F9F7] h-[50px] px-3 mb-4 font-[Roboto] font-[500] text-[16px]'>Stop Showing Notice After* <Switch size='small' defaultChecked={true} /></div>
                <div className='px-8 mt-8 flex gap-4'>
                    <div className='w-1/2'>
                        <label className="ml-1 mt-5 font-[Montserrat]">
                            {'Stop Showing Notice After'}
                        </label>
                        <div className='flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                            <CommonDropDown filterType='BillingTask' setValue={() => { }} value={'First Time'} />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <label className="ml-1 mt-5 font-[Montserrat]">
                            {'For'}
                        </label>
                        <div className='flex gap-4 items-center '>
                            <CommonDropDown filterType='BillingTask' setValue={() => { }} value={'1 Minute'} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='mt-10 pl-8  pr-8 flex justify-between items-center bg-[#F6F9F7] h-[50px] px-3 mb-4 font-[Roboto] font-[500] text-[16px]'>Lock Access After* <Switch size='small' defaultChecked={true} /></div>
                <div className='px-8 mt-8 flex gap-4'>
                    <div className='w-1/2'>
                        <label className="ml-1 mt-5 font-[Montserrat]">
                            {'Lock Access After '}
                        </label>
                        <div className='flex gap-4 items-center '>
                            <CommonDropDown filterType='BillingTask' setValue={() => { }} value={'First Time'} />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <label className="ml-1 mt-5 font-[Montserrat]">
                            {'For'}
                        </label>
                        <div className='flex gap-4 items-center '>
                            <CommonDropDown filterType='BillingTask' setValue={() => { }} value={'1 Minute'} />
                        </div>
                    </div>
                </div>

                <div className='px-8 mt-8 flex flex-col gap-6'>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.allowCloseCheckbox} onChange={(e) => { setRulesData({ ...rulesData, allowCloseCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[500] text-[16px]'>Allow Close</div>
                    </div>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.showHomapageCheckbox} onChange={(e) => { setRulesData({ ...rulesData, showHomapageCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[500] text-[16px]'>Show whitelist Instructions </div>
                    </div>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.signupFormCheckbox} onChange={(e) => { setRulesData({ ...rulesData, signupFormCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[500] text-[16px]'>Show Visits left before user is locked out ( Lock Access must be enabled)</div>
                    </div>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.blurSiteContentBehindNoticeCheckbox} onChange={(e) => { setRulesData({ ...rulesData, blurSiteContentBehindNoticeCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[500] text-[16px]'>Blur Site Content Behind Notice</div>
                    </div>
                </div>
                <div className='px-8 mt-8'>
                    <div className='w-1/2 mt-5 flex gap-4 items-center'>
                        <PNormalInput
                            title="Blur Content Percentage"
                            name="nick_name"
                            placeholder='50'
                            value={rulesData?.blurContent}
                            onChange={(e) => {
                                setRulesData({
                                    ...rulesData,
                                    blurContent: e.value ? String(e.value) : ''
                                })
                            }}
                        />
                    </div>
                </div>
                <div className='px-8 mt-8'>
                    <div className='w-1/2 mt-5 flex gap-4 items-center'>
                        <PNormalInput
                            title="Adblock Location Margin Top"
                            name="nick_name"
                            placeholder='0'
                            value={rulesData?.blurContent}
                            onChange={(e) => {
                                setRulesData({
                                    ...rulesData,
                                    blurContent: e.value ? String(e.value) : ''
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='mb-8'>
                <div className="mt-10 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[12px] font-[400]">Customize Appearance</div>
                <div className='mt-8 px-8'>
                    <PNormalInput
                        title="Notice Background Color"
                        suffix={<ColorPicker
                            color={rulesData?.noticeBackgroundColor}
                            className='w-[150px]'
                            setColor={(color: any) => {
                                setRulesData({
                                    ...rulesData,
                                    noticeBackgroundColor: color,
                                });
                            }}
                        />}
                        name="nick_name"
                        placeholder='#000000'
                        value={rulesData?.noticeBackgroundColor}
                        onChange={(e) => {
                            setRulesData({
                                ...rulesData,
                                attachment: e.value ? String(e.value) : ''
                            })
                        }}
                    />
                </div>
                <div className='mt-5 px-8'>
                    <PNormalInput
                        title="Font Color"
                        suffix={
                            <div>
                                <ColorPicker
                                    color={rulesData?.fontColor}
                                    className='w-[150px]'
                                    setColor={(color: any) => {
                                        setRulesData({
                                            ...rulesData,
                                            fontColor: color,
                                        });
                                    }}
                                />
                            </div>
                        }
                        name="nick_name"
                        placeholder='#000000'
                        value={rulesData?.fontColor}
                        onChange={(e) => {
                            setRulesData({
                                ...rulesData,
                                fontColor: e.value ? String(e.value) : ''
                            })
                        }}
                    />
                </div>

                <div className='mt-5 px-8'>
                    <PNormalInput
                        title="Border Width"
                        name="nick_name"
                        className='h-[61.25px]'
                        placeholder='50'
                        value={rulesData?.BorderWidth}
                        onChange={(e) => {
                            setRulesData({
                                ...rulesData,
                                BorderWidth: e.value ? String(e.value) : ''
                            })
                        }}
                    />
                </div>
                <div className='mt-5 px-8'>
                    <PNormalInput
                        title="Border Color"
                        suffix={
                            <div>
                                <ColorPicker
                                    color={rulesData?.borderColor}
                                    className='w-[150px]'
                                    setColor={(color: any) => {
                                        setRulesData({
                                            ...rulesData,
                                            borderColor: color,
                                        });
                                    }}
                                />
                            </div>
                        }
                        name="nick_name"
                        placeholder='#000000'
                        value={rulesData?.borderColor}
                        onChange={(e) => {
                            setRulesData({
                                ...rulesData,
                                borderColor: e.value ? String(e.value) : ''
                            })
                        }}
                    />
                </div>
                <div className='mt-5 px-8'>
                    <PNormalInput
                        title="Link Color"
                        suffix={
                            <div>
                                <ColorPicker
                                    color={rulesData?.linkColor}
                                    className='w-[150px]'
                                    setColor={(color: any) => {
                                        setRulesData({
                                            ...rulesData,
                                            linkColor: color,
                                        });
                                    }}
                                />
                            </div>
                        }
                        name="nick_name"
                        placeholder='#000000'
                        value={rulesData?.linkColor}
                        onChange={(e) => {
                            setRulesData({
                                ...rulesData,
                                linkColor: e.value ? String(e.value) : ''
                            })
                        }}
                    />
                </div>

                <div className='mt-5 px-8'>
                    <PNormalInput
                        title="Link Hover Color"
                        suffix={
                            <div>
                                <ColorPicker
                                    color={rulesData?.linkHoverColor}
                                    className='w-[150px]'
                                    setColor={(color: any) => {
                                        setRulesData({
                                            ...rulesData,
                                            linkHoverColor: color,
                                        });
                                    }}
                                />
                            </div>
                        }
                        name="nick_name"
                        placeholder='#000000'
                        value={rulesData?.linkHoverColor}
                        onChange={(e) => {
                            setRulesData({
                                ...rulesData,
                                linkHoverColor: e.value ? String(e.value) : ''
                            })
                        }}
                    />
                </div>
                <div className='mt-5 px-8'>
                    <PNormalInput
                        title="Close Button Background"
                        suffix={
                            <div>
                                <ColorPicker
                                    color={rulesData?.close_Button_Background}
                                    className='w-[150px]'
                                    setColor={(color: any) => {
                                        setRulesData({
                                            ...rulesData,
                                            close_Button_Background: color,
                                        });
                                    }}
                                />
                            </div>
                        }
                        name="nick_name"
                        placeholder='#000000'
                        value={rulesData?.close_Button_Background}
                        onChange={(e) => {
                            setRulesData({
                                ...rulesData,
                                close_Button_Background: e.value ? String(e.value) : ''
                            })
                        }}
                    />
                </div>

                <div className='mt-5 px-8'>
                    <PNormalInput
                        title="Close Button font color"
                        suffix={
                            <div>
                                <ColorPicker
                                    color={rulesData?.close_Button_font_color}
                                    className='w-[150px]'
                                    setColor={(color: any) => {
                                        setRulesData({
                                            ...rulesData,
                                            close_Button_font_color: color,
                                        });
                                    }}
                                />
                            </div>
                        }
                        name="nick_name"
                        placeholder='#000000'
                        value={rulesData?.close_Button_font_color}
                        onChange={(e) => {
                            setRulesData({
                                ...rulesData,
                                close_Button_font_color: e.value ? String(e.value) : ''
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default NoticeRules