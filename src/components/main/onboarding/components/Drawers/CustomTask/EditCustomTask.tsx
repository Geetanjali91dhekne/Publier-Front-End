import React, { useEffect, useState } from 'react'
import { RoundButton } from '../../../../../common/Button';
import { Checkbox, Drawer, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import PNormalInput from '../../../../../common/NormalInput';
import FileDragAndDrop from '../../OnBoardingSiteDetails/FileDragAndDrop';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Apis from '../../../../../../api';
import MessageActions from '../../../../../message/redux/actions';
import OnboardActions from '../../../redux/actions';

type Props = {
     customTaskData?: any;
     setCustomOpen?: any;
     customOpen?: any
}

const EditCustomTask: React.FC<Props> = ({ customTaskData, setCustomOpen, customOpen }) => {
     const params = useParams();
     const siteId = params.siteId;
     const dispatch = useDispatch();
     const [files, setFiles] = useState<any>([]);
     const [loading, setLoading] = useState(false);
     const [deletedDoc, setDeletedDoc] = useState<string[]>([]);
     const [validate, setValidate] = useState(false);
     const [data, setData] = useState<{
          name: string;
          global: boolean;
          markComplete: boolean;
          attachmentReq: boolean;
          comments: string;
     }>({
          name: '',
          global: false,
          markComplete: false,
          attachmentReq: false,
          comments: ""
     })

     useEffect(() => {
          if (customTaskData) {
               setData({
                    name: customTaskData?.task_name,
                    global: customTaskData?.global === 'Y' ? true : false,
                    markComplete: customTaskData?.complete === 'Y' ? true : false,
                    attachmentReq: customTaskData?.attachment_required === 'Y' ? true : false,
                    comments: customTaskData?.comment
               })
               setFiles(customTaskData?.custom_documents)
          }

     }, [customTaskData, siteId])

     const fileValidation = () => {
          let count = 0;
          if (data?.attachmentReq && files?.length === 0) {
               return true
          }
          if (data?.attachmentReq && files?.length > 0) {
               files?.forEach((item: any) => {
                    if (item?.status === 'IN' || item?.status === 'AP') {
                         count++;
                    }
               })
               if (count === 0) {
                    return true;
               }
          }
          return false;
     }

     const handleCustomSave = () => {
          setValidate(true)
          if (
               !data?.name || data?.name.trim() === ""
               || !data?.comments || data?.comments.trim() === ""
               || fileValidation()
          ) {
               return;
          }
          setValidate(false)
          setLoading(true)
          const editCustomFormData = new FormData();
          editCustomFormData.append('site_id', String(siteId))
          editCustomFormData.append('complete', data?.markComplete ? 'Y' : 'N')
          editCustomFormData.append('global', data?.global ? 'Y' : 'N')
          editCustomFormData.append('task_name', data?.name)
          editCustomFormData.append('attachment_required', data?.attachmentReq ? 'Y' : 'N')
          editCustomFormData.append('comment', data?.comments)
          editCustomFormData.append('deleted_documents', deletedDoc?.join(','))
          files.forEach((file: any, index: number) => {
               editCustomFormData.append(`custom_document[${index}][id]`, file?.id ? file?.id : '');
               editCustomFormData.append(`custom_document[${index}][doc_check]`, file?.doc_check ? '1' : '0');
               editCustomFormData.append(`custom_document[${index}][status]`, file?.status || 'IN');
               editCustomFormData.append(`custom_document[${index}][document]`, file?.document ? file?.document : file);
          });

          Apis.editCustomTaskOnboardApi(editCustomFormData, customTaskData?.id)
               .then(() => {
                    setLoading(false);
                    setCustomOpen(false);
                    dispatch(MessageActions.showMessage({ text: `Custom Task updated successfully!`, error: false }));
                    dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(siteId));

               })
               .catch((err) => {
                    setLoading(false);
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));
               })

     }


     return (
          <>
               <Drawer
                    open={customOpen}
                    width={750}
                    onClose={() => setCustomOpen(false)}
                    closeIcon={null}
                    closable={false}
                    bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
               >
                    <div>
                         <div className='py-8 mx-8 flex justify-between items-center'>
                              <div className='w-[300px] font-[700] font-[Roboto] text-[20px]'>
                                   Edit Task
                              </div>
                              <div className='flex gap-5 items-center'>
                                   <div className="border rounded-3xl border-green-800">
                                        <RoundButton
                                             light={true}
                                             title='Cancel'
                                             className={'w-[100px] text-[14px]'}
                                             onClick={() => setCustomOpen(false)}
                                        />
                                   </div>
                                   <div>
                                        <RoundButton
                                             title='Save'
                                             className='w-[100px]'
                                             onClick={handleCustomSave}
                                        />
                                   </div>
                              </div>
                         </div>

                         <div className='px-8'>
                              <div className='flex gap-8 items-end '>
                                   <div>
                                        <PNormalInput
                                             title={<div>Task Name <span className='common_error font-[800]'>*</span></div>}
                                             name='taskname'
                                             value={data?.name}
                                             onChange={(e: any) => setData({ ...data, name: e.value })}
                                        />
                                   </div>
                                   <div className='flex gap-3'>
                                        <Checkbox className='customCheckBox2' checked={data?.global} onChange={(e) => setData({ ...data, global: e.target.checked })} />
                                        <div className='font-[Roboto] font-[400] text-[16px]'>Global</div>
                                   </div>
                              </div>
                              {validate && (!data?.name || data?.name.trim() === "") && <span className="common_error ml-1">Please enter task name.</span>}

                              <div className='mt-5'>
                                   <div className='flex gap-3'>
                                        <Checkbox className='customCheckBox2' checked={data?.markComplete} onChange={(e) => setData({ ...data, markComplete: e.target.checked })} />
                                        <div className='font-[Roboto] font-[400] text-[16px]'>Mark as complete</div>
                                   </div>
                                   <div className='flex gap-3 mt-5'>
                                        <Checkbox className='customCheckBox2' checked={data?.attachmentReq} onChange={(e) => setData({ ...data, attachmentReq: e.target.checked })} />
                                        <div className='font-[Roboto] font-[400] text-[16px]'>Attachment Required</div>
                                   </div>
                              </div>
                         </div>

                         {/* file input */}
                         {data?.attachmentReq &&
                              <div>
                                   <FileDragAndDrop files={files} setFiles={setFiles} deletedDoc={deletedDoc} setDeletedDoc={setDeletedDoc} type='custom'/>
                                   {validate && fileValidation() && <span className="common_error ml-8">Please add atleast one attachment with non rejected status</span>}
                              </div>
                         }

                         <div className='mt-5 px-8'>
                              <label className="ml-1 font-[Montserrat]">
                                   <div>Comments <span className='common_error font-[800]'>*</span></div>
                              </label>
                              <div className='mt-1'>
                                   <TextArea
                                        placeholder="Enter the message"
                                        autoSize={{ minRows: 5 }}
                                        value={data?.comments}
                                        onChange={(e) => setData({ ...data, comments: e.target.value })}
                                   />
                                   {validate && (!data?.comments || data?.comments.trim() === "") && <span className="common_error ml-1">Please add comments.</span>}

                              </div>

                         </div>
                         <div className=' mx-8 mt-8'>
                              <RoundButton disabled={true} title={'Add Task'} />
                         </div>

                         {
                              (loading) && <div className='absolute w-full top-0'>
                                   <div className='flex h-[70vh] justify-center items-center '><Spin /></div>
                              </div>
                         }
                    </div>
               </Drawer>
          </>
     )
}

export default EditCustomTask