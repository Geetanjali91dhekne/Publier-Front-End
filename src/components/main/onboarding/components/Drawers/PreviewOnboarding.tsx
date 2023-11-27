import React from 'react'
type Props = {
     values: any;
}
const PreviewOnboarding: React.FC<Props> = ({ values }) => {
     console.log(JSON.stringify(values,null,2))
     const titleColor = `px-3 text-[${values?.titleColor}]`
     console.log('printing titlcolor = ',titleColor)

     const titleStyle = {
          color: values?.titleColor,
          fontSize:values?.titleSize
     }
     return (
          <div className={values?.orientation === 'vertical'?' w-[390px] min-h-[363px] ':'w-[510px] min-h-[170px] '}>
               <div className="h-[56px] pl-5  rounded-t-lg leading-[56px] bg-green-800 text-[#FFFFFF] text-[18px] font-[600] font-[Roboto]">Preview</div>
               <div style={titleStyle} className='px-3'>{values?.widgetTitle}</div>
          </div>
     )
}

export default PreviewOnboarding