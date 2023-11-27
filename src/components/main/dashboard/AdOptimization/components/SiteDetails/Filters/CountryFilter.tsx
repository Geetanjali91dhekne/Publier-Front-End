import { Select } from 'antd';
import React from 'react'
const { Option } = Select;
type Props={
  country:any
  setCountry:any
}
function CountryFilter({country,setCountry}:Props) {
  const handleChange = (value: string) => {
    setCountry(value);
};

return (
    <div className="flex flex-col" id="countryFilter">
        <label className="text-[10px]">Country</label>
        <Select value={country} size="large" onChange={handleChange} className="w-40">
            <Option value="US">US</Option>
            <Option value="India">India</Option>
        </Select>
    </div>
);
}

export default CountryFilter