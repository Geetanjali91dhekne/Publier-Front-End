import { Select } from 'antd'
import React from 'react'
const { Option } = Select;
type Props = {
  device: any
  setDevice: any
}
function DeviceTypeFilter({ device, setDevice }: Props) {

  const handleChange = (value: string) => {
    setDevice(value);
  };
  return (
    <div className="flex flex-col" id="deviceFilter">
      <label className="text-[10px]">Device Type</label>
      <Select value={device} size="large" onChange={handleChange} className="w-40">
        <Option value="(All)">(All)</Option>
      </Select>
    </div>
  )


}

export default DeviceTypeFilter