import { Checkbox } from 'antd'
import React, { useState } from 'react'
import { RoundButton } from '../../../../../../common/Button'

const codeString =
     `
<!-- Begin Publir Subs wrapper -->
<script>
if (publir_show_ads === true) {
<!-- Your Ad code: e.g: -->
     var VUUKLE_CONFIG = {
     apiKey: 'f85f9333-42c4-42c5-80b4-a9a1e3d905a1',
     articleId: '1',
     comments: {enabled: false},
     emotes: {'enabled': false},
     powerbar: {'enabled': false},
     ads:{noDefaults: true}
     };
     (function() {
     var d = document,
     s = d.createElement('script');
     s.async = true;
     s.src = 'https://cdn.vuukle.com/platform.js';
     s.setAttribute('data-cfasync', 'false');
     (d.head || d.body).appendChild(s);})
     ();   

}
</script>
<!-- End Publir Subs wrapper -->
                                   `

const AdWrappingCode: React.FC = () => {
     const [data, setData] = useState(false);
     const [copy, setCopy] = useState(false);
     return (
          <div className='px-8'>
               <div className='flex gap-3 '>
                    <Checkbox className="customCheckBox2" checked={data} onChange={(e) => { setData(e.target.checked) }}></Checkbox>
                    <div className='font-[Roboto] font-[400] text-[16px]'>Completed</div>
               </div>

               <div className='bg-[#F2F2F2] mt-10 p-8 rounded-xl font-[Roboto] font-[16px]'>
                    <div className='font-[500]'>
                         If you are not using Publir’s ad system or use additional ads outside our system, please wrap all ad code in ad-hiding scripts which will remove ads for logged in users. Below is an example of the code to use for wrapping non-Publir ads behind our subscriptions:
                    </div>
                    <div className='font-[700] mt-8'>
                         Please wrap all ad code under the publir_show_ads if statement as outlined below

                    </div>

                    <div className='relative bg-[white] mt-8 py-8 px-10 rounded-xl'>
                         <div className='absolute right-5'>
                              <RoundButton
                                   title={copy ? 'Code Copied' : 'Copy Code'}
                                   className='w-[150px]'
                                   onClick={() => {
                                        navigator.clipboard.writeText(codeString);
                                        setCopy(true);
                                        setTimeout(()=>{
                                             setCopy(false)
                                        },2000)
                                   }}
                              />
                         </div>
                         <pre className='font-[500] font-[Roboto] text-[16px]'>
                              <code >
                                   {codeString}
                              </code>
                         </pre>
                    </div>
               </div>
          </div>
     )
}

export default AdWrappingCode