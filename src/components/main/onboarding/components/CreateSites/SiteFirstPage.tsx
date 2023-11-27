import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PNormalInput from '../../../../common/NormalInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/RootReducer';

type Props = {
     firstPageRef?: any;
     current?: any;
     setCurrent?: any;
     firstPageData?: any;
     setfirstPageData?: any;
}

const SiteFirstPage: React.FC<Props> = ({ firstPageRef, current, setCurrent, firstPageData, setfirstPageData }) => {
     const [validate, setValidate] = useState(false);
     const [currentList, setCurrentList] = useState([]);


     const publisherList = useSelector((state: RootState) => state?.onboarding?.onboardPublisherList);

     const onClickListSearch = () => {
          let list: any = [];
          publisherList?.forEach((item: any) => {
               const title = item?.title;
               if (title.toLowerCase().includes(firstPageData?.searchData?.toLowerCase())) {
                    list.push(item);
               }
          })
          setCurrentList(list);
     }

     useEffect(() => {
          if (publisherList) {
               setCurrentList(publisherList);
          }
     }, [publisherList])

     useEffect(() => {
          if (firstPageData?.searchData) {
               onClickListSearch();
          } else {
               setCurrentList(publisherList);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [firstPageData?.searchData, publisherList])


     useImperativeHandle(
          firstPageRef,
          () => ({
               onClickNext() {
                    if (firstPageData?.publisherID !== undefined) {
                         setCurrent(current + 1);
                    } else {
                         setValidate(true);
                    }
               },
          })
     )
     return (
          <div className="w-full">
               <Radio.Group className="w-full" value={firstPageData?.publisherID} onChange={(e) => {
                    setfirstPageData({
                         ...firstPageData,
                         publisherID: e.target.value
                    })
               }}
               >
                    <div className=" ">
                         {validate && firstPageData?.publisherID === undefined && <span className="common_error ml-1">Please Select Publisher or Create New Publisher</span>}
                         <div className="mt-4 p-4 h-[90px] flex items-center bg-[#F6F9F7]">
                              <Radio className='font-[Roboto] font-[400] text-[16px]' value={''}>
                                   Create New Publisher
                              </Radio>
                         </div>
                         <div>
                              <p className="mt-10 font-[400] roboto text-[16px] flex justify-center">(or)</p>
                         </div>
                         <div className="mt-2">
                              <PNormalInput
                                   title=""
                                   name="nick_name"
                                   placeholder='Search for Publishers'
                                   value={firstPageData?.searchData}
                                   onChange={(e) => {
                                        setfirstPageData({
                                             ...firstPageData,
                                             searchData: e.value ? String(e.value) : ''
                                        })
                                   }}
                                   prefix={< SearchOutlined />}
                                   className='text-[16px] h-[39px] shadow-lg'
                              />
                         </div>

                         <div>
                              {
                                   currentList?.map((item: any, index: any) => (
                                        <div key={index} className="mt-4 p-4 h-[90px] flex flex-col items-start" style={{ backgroundColor: "#F6F9F7" }}>
                                             <Radio value={item?.id}>
                                                  <p className='font-normal roboto text-[16px]'>{item?.title}</p>
                                             </Radio>
                                             <p className='ml-6 font-normal roboto text-[16px] ' style={{ color: "#056433" }}>{item?.website} Sites - {item?.email}</p>
                                        </div>
                                   ))
                              }
                         </div>
                    </div>
               </Radio.Group>
          </div>

     )
}

export default SiteFirstPage
