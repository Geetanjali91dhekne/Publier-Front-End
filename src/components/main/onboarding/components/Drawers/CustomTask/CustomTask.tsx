import React, { useState } from 'react'
import PlusImage from '../../../../../../assets/icons/onboarding/plus.png';
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

const CustomTask: React.FC = () => {
     const params = useParams();
     const id = params.siteId;
     const dispatch = useDispatch();
     const [open, setOpen] = useState(false);
     const [files, setFiles] = useState<any>([]);
     const [loading, setLoading] = useState(false);
     const [validate, setValidate] = useState(false);
     const [deletedDoc, setDeletedDoc] = useState<string[]>([]);

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
          const createCustomFormData = new FormData();
          createCustomFormData.append('site_id', String(id))
          createCustomFormData.append('complete', data?.markComplete ? 'Y' : 'N')
          createCustomFormData.append('global', data?.global ? 'Y' : 'N')
          createCustomFormData.append('task_name', data?.name)
          createCustomFormData.append('attachment_required', data?.attachmentReq ? 'Y' : 'N')
          createCustomFormData.append('comment', data?.comments)
          files.forEach((file: any, index: number) => {
               createCustomFormData.append(`custom_document[${index}][doc_check]`, file?.doc_check ? '1' : '0');
               createCustomFormData.append(`custom_document[${index}][status]`, file?.status || 'IN');
               createCustomFormData.append(`custom_document[${index}][document]`, file?.document ? file?.document : file);
          });

          Apis.createCustomTaskOnboardApi(createCustomFormData)
               .then(() => {
                    setLoading(false);
                    setOpen(false);
                    dispatch(MessageActions.showMessage({ text: `Custom Task created successfully!`, error: false }));
                    dispatch(OnboardActions.fetchOnboardGetGeneralTabDetails(id));

               })
               .catch((err) => {
                    setLoading(false);
                    dispatch(MessageActions.showMessage({ text: String(err), error: true }));
               })

     }

     return (
          <>
               <div onClick={() => setOpen(true)} className='cursor-pointer flex gap-3 items-center'>
                    <img className='w-[20px] h-[20px]' src={PlusImage} alt='Add Task'></img>
                    <div className='font-[400] text-[13px] font-[montserrat]'>Add Custom Task</div>
               </div>
               <Drawer
                    open={open}
                    width={750}
                    onClose={() => setOpen(false)}
                    closeIcon={null}
                    closable={false}
                    bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
               >
                    <div>
                         <div className='py-8 mx-8 flex justify-between items-center'>
                              <div className='w-[300px] font-[700] font-[Roboto] text-[20px]'>
                                   Create New Task
                              </div>
                              <div className='flex gap-5 items-center'>
                                   <div className="border rounded-3xl border-green-800">
                                        <RoundButton
                                             light={true}
                                             title='Cancel'
                                             className={'w-[100px] text-[14px]'}
                                             onClick={() => setOpen(false)}
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
                              </div>
                              {validate && (!data?.comments || data?.comments.trim() === "") && <span className="common_error ml-1">Please add comments.</span>}
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

export default CustomTask