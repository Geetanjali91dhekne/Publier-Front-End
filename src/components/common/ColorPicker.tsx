import React from 'react'


type Props = {
     color?: any;
     setColor?: any;
     className?: any;
}
const ColorPicker: React.FC<Props> = ({ color, setColor, className }) => {

     function handleColor(e:any){
          setColor(e.target.value)
     }

     return (
          <div>
               <input type='color' value={color} className={className} onChange={handleColor}/>
          </div>
     )
}

export default ColorPicker