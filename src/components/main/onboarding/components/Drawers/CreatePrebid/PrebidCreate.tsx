import { Checkbox, Radio } from 'antd'
import React, { useState } from 'react'
import CommonDropDown from '../../../../../common/CommonDropDown'
import { RoundButton } from '../../../../../common/Button'

type BidderAdapter = {
  title: string;
};

const bidderAdapt: BidderAdapter[] = [
  { title: '33Across' },
  { title: '9 Media Online' },
  { title: 'A4G' },
  { title: 'AAX' },
  { title: 'Acuity Ads' },
  { title: 'adWMG' },
  { title: 'Adasta Media' },
  { title: 'Adbite' },
  { title: 'AdbookPSP' },
  { title: 'AdDefend' },
  { title: '9Dots Media' },
  { title: 'ablida' },
  { title: 'Adagio' },
  { title: 'AdBlender' },
  { title: 'AdformOpenRTB' },
]
type Props = {
  siteDetailRef?: any;
  setOpen?: any;
  open: boolean;
}
const PrebidCreate: React.FC<Props> = ({ siteDetailRef, setOpen, open }) => {
  const [data, setData] = useState<{
    status: string;
    selectedAdapters: string[],
  }>({
    status: "",
    selectedAdapters: [],
  })

  const handleCheckboxChange = (itemTitle: string, checked: boolean) => {
    const selectedAdapters = checked
      ? [...data.selectedAdapters, itemTitle]
      : data.selectedAdapters.filter((adapter) => adapter !== itemTitle);
    setData({ ...data, selectedAdapters });
  };

  return (
    <div >
      <div className='mt-8 px-8 '>
        <Radio.Group value={data?.status} onChange={(e) => {
          setData({
            ...data,
            status: e.target.value
          })
        }}>
          <div className='flex gap-5'>
            <div>
              <Radio className='font-[Roboto] font-[500] text-[16px]' value={'In Progress'}>In Progress</Radio>
            </div>
            <div>
              <Radio className='font-[Roboto] font-[500] text-[16px]' value={'Completed'}>Completed</Radio>
            </div>
          </div>
        </Radio.Group>
      </div>

      <div>
        <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Select Prebid Version</div>
        <div className='mt-5 px-8 w-[300px]'>
          <CommonDropDown title="Select Prebid Version" />
        </div>
      </div>

      <div>
        <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Select Bidder Adapaters</div>
        <div className='grid grid-cols-3 mt-5 px-8 gap-y-6'>
          {bidderAdapt?.map((item, index) => (
            <div key={index} className='flex gap-3 '>
              <Checkbox
                className='customCheckBox2'
                checked={data.selectedAdapters.includes(item.title)}
                onChange={(e) => handleCheckboxChange(item.title, e.target.checked)}
              />
              <div className='font-[Roboto] font-[400] text-[16px]'>{item?.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mt-8 bg-[#EFEFEF] pl-8 h-[29px] leading-[29px] font-[Roboto] text-[16px] font-[400]">Recomended Modules</div>
        <div className='px-8 my-5 font-[Roboto] font-[400] text-[16px]'>Prebid.org highly recommends that publishers utilize the following modules:</div>
        <div className='px-8'>
          <div className='flex gap-3 mb-3'>
            <div>
              <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
            </div>
            <div>
              <span className='font-[Roboto] font-[700] text-[16px] text-[#056433]'>Consent Management - GDPR</span>
              <span className='font-[Roboto] font-[400] text-[14px]'> - If you have users in Europe, this module works with your
                Consent Management Platform to pass consent info to bidders and help align with EU regulations.
                See also the GDPR Enforcement module.</span>
            </div>
          </div>

          <div className='flex gap-3 mb-3'>
            <div>
              <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
            </div>
            <div>
              <span className='font-[Roboto] font-[700] text-[16px] text-[#056433]'>Consent Management - GPP</span>
              <span className='font-[Roboto] font-[400] text-[14px]'> - If you have users in Europe, this module works with your
                Consent Management Platform to pass consent info to bidders and help align with EU regulations.
                See also the GDPR Enforcement module.</span>
            </div>
          </div>

          <div className='flex gap-3 mb-3'>
            <div>
              <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
            </div>
            <div>
              <span className='font-[Roboto] font-[700] text-[16px] text-[#056433]'>Consent Management - US Privacy</span>
              <span className='font-[Roboto] font-[400] text-[14px]'> - If you have users in California, this module works with
                your Consent Management Platform to pass CCPA/US-Privacy data to bidders.</span>
            </div>
          </div>

          <div className='flex gap-3 mb-3'>
            <div>
              <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
            </div>
            <div>
              <span className='font-[Roboto] font-[700] text-[16px] text-[#056433]'>First Party Data Enrichment</span>
              <span className='font-[Roboto] font-[400] text-[14px]'> - Injects additional data into the auction stream, including: domain,
                keywords, and page url.</span>
            </div>
          </div>

          <div className='flex gap-3 mb-3'>
            <div>
              <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
            </div>
            <div>
              <span className='font-[Roboto] font-[700] text-[16px] text-[#056433]'>GDPR Enforcement</span>
              <span className='font-[Roboto] font-[400] text-[14px]'> - If you have users in Europe, you can use this module to enable actions
                for processing under the GDPR and ePrivacy</span>
            </div>
          </div>

          <div className='flex gap-3 mb-3'>
            <div>
              <Checkbox className="customCheckBox2" defaultChecked={false} onChange={(e) => { }}></Checkbox>
            </div>
            <div>
              <span className='font-[Roboto] font-[700] text-[16px] text-[#056433]'>GPT Pre-Auction</span>
              <span className='font-[Roboto] font-[400] text-[14px]'> - If you run GAM, this module generates the 'global placement id' that's
                becoming required for successful auctions.</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex px-8 py-8 gap-4 flex-wrap'>
        <RoundButton title='Publish Prebid.js' />
        <span className='font-[Roboto] font-[400] text-[12px]'> Last Published: Filename_v1. 18th March 2023 at 12:13 PM</span>
        <RoundButton title='Restore Previous Versions' />
      </div>
    </div>
  )
}

export default PrebidCreate