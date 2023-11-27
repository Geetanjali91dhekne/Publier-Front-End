import React from 'react'
import AddEditNetwork from './AddEditNetwork'
import Bidder from './Bidder'

const bidderData = [
     {
          title: 'Rubicon Project Bidder',
          banners: [
               { name: 'Leader Banner', status: true },
               { name: 'Mobile BTF Banner', status: true },
               { name: 'Primary Banner', status: true },
               { name: 'Secondary Banner', status: true },
          ],
          status: true
     },
     {
          title: 'ONE',
          banners: [
               { name: 'Leader Banner', status: true },
               { name: 'Mobile BTF Banner', status: true },
               { name: 'Primary Banner', status: true },
               { name: 'Secondary Banner', status: true },
          ],
          status: true
     },
     {
          title: 'Appnexus Bidder',
          banners: [
               { name: 'Leader Banner', status: true },
               { name: 'Mobile BTF Banner', status: true },
               { name: 'Primary Banner', status: true },
               { name: 'Secondary Banner', status: true },
          ],
          status: true
     }
]

const Partner: React.FC = () => {
     return (
          <div>
               <AddEditNetwork />
               <div className='mt-5'>
                    {bidderData?.map((item, index) => (
                         <Bidder key={index} title={item?.title} banners={item?.banners} status={item?.status}/>
                    ))}
               </div>
          </div>
     )
}

export default Partner