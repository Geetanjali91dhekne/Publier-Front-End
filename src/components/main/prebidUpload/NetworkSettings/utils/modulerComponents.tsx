import { Select } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import PModal from "../../../../common/Modal";
import { RoundButton } from "../../../../common/Button";
import PNormalInput from "../../../../common/NormalInput";
import Apis from "../../../../../api";
import MessageActions from "../../../../message/redux/actions";
import { useDispatch } from "react-redux";
import NetworkSettingAction from "../redux/actions";
type aliasProps = {
     text?: string
     row?: any
     type?: string
     globalSiteId?: any
}
export const RenderAliasData: React.FC<aliasProps> = ({ text, row, type, globalSiteId }) => {
     const dispatch = useDispatch();
     const [hide, setHide] = useState(true);
     const [open, setOpen] = useState(false);
     const [actionType, setActionType] = useState("");
     const [buttonLoader, setButtonLoader] = useState(false);
     const [aliasData, setAliasData] = useState<{
          id?: any,
          network_id?: any,
          site_id?: any,
          alias?: string,
          site_name?: string,
          size_name?: string,
          size_id?: any
     }>({
          id: undefined,
          network_id: undefined,
          site_id: undefined,
          alias: undefined,
          site_name: undefined,
          size_name: undefined,
          size_id: undefined,
     })
     useEffect(() => {
          if (type === 'site') {
               setAliasData({
                    ...aliasData,
                    id: row?.id,
                    network_id: row?.network_id,
                    site_id: row?.site_id,
                    alias: row?.site_alias,
                    site_name: row?.site_name
               })
          }
          if (type === 'size') {
               setAliasData({
                    ...aliasData,
                    id: row?.id,
                    network_id: row?.network_id,
                    size_id: row?.size_id,
                    alias: row?.size_alias,
                    size_name: row?.size_name,
                    site_id: globalSiteId
               })
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [row])

     const handleOnClick = () => {
          if (actionType === 'edit') {
               if (type === 'site' && aliasData?.alias && aliasData?.id && aliasData?.network_id && aliasData?.site_id) {
                    const payload = {
                         "id": aliasData?.id,
                         "network_id": aliasData?.network_id,
                         "site_alias": aliasData?.alias,
                         "site_id": aliasData?.site_id
                    }
                    setButtonLoader(true)
                    Apis.editNetworkSiteAlias(payload)
                         .then(() => {
                              setButtonLoader(false)
                              setOpen(false)
                              dispatch(MessageActions.showMessage({ text: `Site Updated Successfully!`, error: false }));
                              dispatch(NetworkSettingAction.fetchNetworkSettingSiteSizeTable({
                                   id: aliasData?.network_id,
                                   site_id: aliasData?.site_id
                              }))
                         })
                         .catch((err) => {
                              setButtonLoader(false)
                              setOpen(false)
                              dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                         })
               }
               if (type === 'size' && aliasData?.id && aliasData?.network_id && aliasData?.alias && aliasData?.size_id) {
                    const payload = {
                         "id": aliasData?.id,
                         "network_id": aliasData?.network_id,
                         "size_alias": aliasData?.alias,
                         "size_id": aliasData?.size_id
                    }
                    setButtonLoader(true)
                    Apis.editNetworkSizeAlias(payload)
                         .then(() => {
                              setButtonLoader(false)
                              setOpen(false)
                              dispatch(MessageActions.showMessage({ text: `Size Updated Successfully!`, error: false }));
                              dispatch(NetworkSettingAction.fetchNetworkSettingSiteSizeTable({
                                   id: aliasData?.network_id,
                                   site_id: aliasData?.site_id
                              }))
                         })
                         .catch((err) => {
                              setButtonLoader(false)
                              setOpen(false)
                              dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                         })
               }
          } else {
               if (type === 'site' && aliasData?.id && aliasData?.network_id && aliasData?.site_id) {
                    const payload = {
                         "id": aliasData?.id,
                         "network_id": aliasData?.network_id,
                         "site_id": aliasData?.site_id
                    }
                    setButtonLoader(true)
                    Apis.deleteNetworkSiteAlias(payload)
                         .then(() => {
                              setButtonLoader(false)
                              setOpen(false)
                              dispatch(MessageActions.showMessage({ text: `Site Deleted Successfully!`, error: false }));
                              dispatch(NetworkSettingAction.fetchNetworkSettingSiteSizeTable({
                                   id: aliasData?.network_id,
                                   site_id: aliasData?.site_id
                              }))
                         })
                         .catch((err) => {
                              setButtonLoader(false)
                              setOpen(false)
                              dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                         })
               }
               if (type === 'size') {
                    const payload = {
                         "id": aliasData?.id,
                         "network_id": aliasData?.network_id,
                         "size_id": aliasData?.size_id
                    }
                    setButtonLoader(true)
                    Apis.deleteNetworkSizeAlias(payload)
                         .then(() => {
                              setButtonLoader(false)
                              setOpen(false)
                              dispatch(MessageActions.showMessage({ text: `Size Deleted Successfully!`, error: false }));
                              dispatch(NetworkSettingAction.fetchNetworkSettingSiteSizeTable({
                                   id: aliasData?.network_id,
                                   site_id: aliasData?.site_id
                              }))
                         })
                         .catch((err) => {
                              setButtonLoader(false)
                              setOpen(false)
                              dispatch(MessageActions.showMessage({ text: String(err), error: true }));
                         })

               }
          }
     }
     return (
          <div className='flex justify-between gap-5 items-center' onMouseEnter={() => setHide(false)} onMouseLeave={() => setHide(true)}>
               <div className="max-w-[250px] w-[250px] ">
                    {text}
               </div>
               <div className="flex items-center gap-2">
                    <div className={hide ? 'hidden' : 'block'}
                         onClick={() => {
                              setActionType('edit')
                              setOpen(true)
                              console.log('row data = ', JSON.stringify(row, null, 2))

                         }}
                    >
                         <FaRegEdit color='#056433' size={16} />
                    </div>
                    <div className={hide ? 'hidden' : 'block'}
                         onClick={() => {
                              setActionType('delete')
                              setOpen(true)
                         }}
                    >
                         <RiDeleteBin6Line color='#FA5555 ' size={16} />
                    </div>
               </div>
               <PModal
                    title={actionType === 'edit' ? 'Edit' : 'Delete'}
                    open={open}
                    setOpen={setOpen}
                    width="400px"
                    bodyStyle={{ overflowY: 'scroll' }}
                    className="noscrollbar"
                    footer={
                         <div className="flex gap-3 justify-center pb-5 items-center w-full ">
                              <div className="border rounded-3xl border-green-800">
                                   <RoundButton light={true} title="Cancel" className={'w-[120px] text-[14px]'} onClick={() => setOpen(false)} />
                              </div>
                              <div>
                                   <RoundButton
                                        title="Ok"
                                        className="w-[120px]"
                                        onClick={handleOnClick}
                                        loading={buttonLoader}
                                   />
                              </div>
                         </div>
                    }
               >
                    {
                         actionType === 'edit' ?
                              <div>
                                   <PNormalInput
                                        title={type === 'site' ? 'Enter the Site Alias.' : 'Enter the Size Alias.'}
                                        name="alias"
                                        value={aliasData?.alias}
                                        onChange={(e: any) => {
                                             setAliasData({
                                                  ...aliasData,
                                                  alias: e.value
                                             })
                                        }}
                                   />
                              </div>
                              :
                              <div className="font-[600] font-[Roboto] ml-2">Do you want to perform this action?</div>

                    }
               </PModal>
          </div>
     )
}

type selectProps = {
     disable?: boolean
     setValue?: any
     customClass?: any
     loader?: boolean
     dataList: { title: string, value: string }[]
     value?: any
}
export const RenderSelect: React.FC<selectProps> = ({ disable, setValue, customClass, loader, dataList, value }) => {
     return (
         <div>
             {title && (
                 <label className="ml-1">
                     {title}
                     <span className="text-red-500">{isRequired ? '*' : ''}</span>
                 </label>
             )}
             <Select
                 value={value}
                 loading={loader}
                 onChange={setValue}
                 size="large"
                 optionFilterProp="children"
                 disabled={disable}
                 className={`w-full ${customClass}`}
                 showSearch
                 options={dataList.map((d) => {
                     return { value: d.value, label: d.title };
                 })}
                 filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
             />
         </div>
     );
}

type actionProps = {
     action?: string
}

export const prebidActionBoxModel: React.FC<actionProps> = ({ action }) => {
     return (
          <div>

          </div>
     )
}