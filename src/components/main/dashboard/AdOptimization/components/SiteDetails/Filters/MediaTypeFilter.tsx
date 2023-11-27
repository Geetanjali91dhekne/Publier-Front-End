import { Select } from 'antd';
import React from 'react'
const { Option } = Select;
type Props = {
  media: any
  setMedia: any
}
function MediaTypeFilter({media,setMedia}:Props) {
  const handleChange = (value: string) => {
    setMedia(value);
  };
  return (
    <div className="flex flex-col" id="mediaFilter">
      <label className="text-[10px]">Media Type</label>
      <Select value={media} size="large" onChange={handleChange} className="w-40">
        <Option value="(All)">(All)</Option>
      </Select>
    </div>
  )
}

export default MediaTypeFilter