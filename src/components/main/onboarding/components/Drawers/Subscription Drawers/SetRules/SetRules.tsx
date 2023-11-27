import { Checkbox, Switch } from 'antd'
import React, { useState } from 'react'
import PNormalInput from '../../../../../../common/NormalInput'
import CommonDropDown from '../../../../../../common/CommonDropDown'
import TextArea from 'antd/es/input/TextArea'
import ColorPicker from '../../../../../../common/ColorPicker'

const SetRules: React.FC = () => {
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
                <div className="mt-8 p-3 bg-[#EFEFEF] rounded w-fit leading-[29px] font-[Roboto] text-[16px] font-[400]">Configure settings for a Subscription sign up notice, and choose whether to lock site
                    content for unsubscribed users.
                </div>
                <div className="mt-8 p-3 bg-[#EFEFEF] rounded  w-fit leading-[29px] font-[Roboto] text-[16px] font-[400]">We have pre-populated the fields with recommended settings. You can feel free to
                    change them here. Looking for more control? Click <span className="font-[700]"> Advanced Options </span> or  <span className="font-[700]"> Customize Appearance.</span>
                </div>
                <div>
                    <div className='mt-8'>                        
                        <div className='flex gap-4 items-center '>
                            <CommonDropDown title='Signup Notice Deployment location and timing *' filterType='BillingTask' setValue={() => { }} value={'Please Select'} />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div className='flex gap-4 items-center '>
                            <CommonDropDown title='After' filterType='BillingTask' setValue={() => { }} value={'Please Select'} />
                        </div>
                    </div>

                    <div className='mt-5'>
                        <label className="ml-1 font-[Montserrat] font-[400] ">
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
                <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Send Email</div>
                <div className='px-8 mt-8'>
                    <div className='mt-5'>
                        <div className='flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                            <CommonDropDown title='Subscription Mode' filterType='BillingTask' setValue={() => { }} value={'Live'} />
                        </div>
                    </div>
                    <div className='mt-5 text-[12px]'>
                        <PNormalInput
                            title="Add a top margin of"
                            name="nick_name"
                            placeholder='50'
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
                        <div className='flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                            <CommonDropDown title='Stop Showing Notice After' filterType='BillingTask' setValue={() => { }} value={'First Time'} />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                            <CommonDropDown title='For' filterType='BillingTask' setValue={() => { }} value={'1 Minute'} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='mt-10 pl-8  pr-8 flex justify-between items-center bg-[#F6F9F7] h-[50px] px-3 mb-4 font-[Roboto] font-[500] text-[16px]'>Lock Access After* <Switch size='small' defaultChecked={true} /></div>
                <div className='px-8 mt-8 flex gap-4'>
                    <div className='w-1/2'>
                        <div className='flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                            <CommonDropDown title='Lock Access After' filterType='BillingTask' setValue={() => { }} value={'First Time'} />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
                            <CommonDropDown title='For' filterType='BillingTask' setValue={() => { }} value={'1 Minute'} />
                        </div>
                    </div>
                </div>

                <div className='px-8 mt-8 flex flex-col gap-6'>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.allowCloseCheckbox} onChange={(e) => { setRulesData({ ...rulesData, allowCloseCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[400] text-[16px]'>Allow Close</div>
                    </div>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.showHomapageCheckbox} onChange={(e) => { setRulesData({ ...rulesData, showHomapageCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[400] text-[16px]'>Do Not Show on Homepage</div>
                    </div>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.signupFormCheckbox} onChange={(e) => { setRulesData({ ...rulesData, signupFormCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[400] text-[16px]'>Include Signup Form on Notice</div>
                    </div>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.blurSiteContentBehindNoticeCheckbox} onChange={(e) => { setRulesData({ ...rulesData, blurSiteContentBehindNoticeCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[400] text-[16px]'>Blur Site Content Behind Notice</div>
                    </div>
                </div>
                <div className='px-8 mt-8'>
                    <div className='w-1/2 mt-5 flex gap-4 items-center font-[Roboto] font-[500] text-[12px]'>
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
                <div className='px-8 mt-8 flex flex-col gap-6'>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.pageViewsCheckbox} onChange={(e) => { setRulesData({ ...rulesData, pageViewsCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[400] text-[16px]'>Show Page Views Left Before User is Locked Out (Lock access must be enabled)</div>
                    </div>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.subscriptionStatusCheckbox} onChange={(e) => { setRulesData({ ...rulesData, subscriptionStatusCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[400] text-[16px]'>Show subscription status (Indicates when a user is logged in and shows up on all pages)</div>
                    </div>
                </div>

            </div>

            <div>
                <div className="mt-10 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Payments</div>
                <div className='px-8 mt-8 flex flex-col gap-6'>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.stripeCheckbox} onChange={(e) => { setRulesData({ ...rulesData, stripeCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[400] text-[16px]'>Stripe</div>
                    </div>
                    <div className='flex gap-3 '>
                        <Checkbox className="customCheckBox2" checked={rulesData?.applePay_GooglePayCheckbox} onChange={(e) => { setRulesData({ ...rulesData, applePay_GooglePayCheckbox: e.target.checked }) }}></Checkbox>
                        <div className='font-[Roboto] font-[400] text-[16px]'>Apple Pay/Google Pay</div>
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

            </div>
        </div>
    )
}

export default SetRules