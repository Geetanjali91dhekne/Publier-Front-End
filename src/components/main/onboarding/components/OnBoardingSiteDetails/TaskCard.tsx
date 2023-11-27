import React from 'react'
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import CustomTaskImage from '../../../../../assets/icons/onboarding/customtask.png';

type Props = {
     image?: any;
     status?: boolean;
     title?: string;
}
const TaskCard: React.FC<Props> = ({ image, status, title }) => {
     return (
          <div className='relative w-[150px] h-[100px]  flex flex-col rounded-lg  items-center justify-center gap-2 shadow-lg cursor-pointer'>
               <div className='absolute top-3 right-3'>
                    {
                         status ? <FaCheckCircle color='#056433' size={16} /> : <RiCheckboxBlankCircleFill color='#E2E2E2' size={20} />
                    }
               </div>
               <img className='w-[34px] h-[30px]' src={image ? image : CustomTaskImage} alt='icon'></img>
               <div className='font-[400] font-[Roboto] text-[14px]  w-full text-center px-3'>{title}</div>
          </div>
     )
}

export default TaskCard