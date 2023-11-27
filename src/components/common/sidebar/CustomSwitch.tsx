import React from 'react'
type Props = {
     onChange?: any;
     value?: any;
}
const CustomSwitch: React.FC<Props> = ({ onChange, value }) => {
     return (
          <div className='customSwitch'>
               <label className="switch">
                    <input type="checkbox" onChange={onChange} checked={value} />
                    <span className="slider round"></span>
               </label>
          </div>
     )
}

export default CustomSwitch