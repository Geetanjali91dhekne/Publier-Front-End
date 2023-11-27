import React from 'react'
import CreateNewWidget from '../CreateNewWidget'

const AllWidgets = () => {

  const data = [
    {
      id: 1,
      name: "Widget 1",
      status: true,
      type: 'Ongoing Widget',
      title: 'Article Page Widget 1 Right Rail',
      createdOn: '12 May 2023'
    },
    {
      id: 2,
      name: "Widget 2",
      status: true,
      type: 'Ongoing Widget',
      title: 'HomePage Lower Right Rail',
      createdOn: '12 May 2023'
    },
    {
      id: 3,
      name: "Widget 3",
      status: false,
      type: 'Goal-Based Widget',
      title: 'Article Page Widget 2 Right Rail',
      createdOn: '12 May 2023'
    },
  ]
  return (
    <div className='px-2 mt-5 grid grid-cols-2 gap-5'>
      <CreateNewWidget values={null} />
      {
        data?.map((item,index)=>(
          <CreateNewWidget key={index} values={item} />
        ))
      }
    </div>
  )
}

export default AllWidgets