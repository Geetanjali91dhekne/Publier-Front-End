import { networkSettingGetData } from "../redux/types";

const parseNetworkSettingGetData = (data?: networkSettingGetData[], listType?: string) => {
     let list: { title: string, value: any }[] = [];
     if (listType === 'site') {
          data?.forEach((item: any) => {
               list.push({ title: item?.site_name, value: item?.id })
          })
     }else{
          data?.forEach((item: any) => {
               list.push({ title: item?.dimensions, value: item?.id })
          })
     }
     return list;
}

const networkSettingUtils = {
     parseNetworkSettingGetData,
}

export default networkSettingUtils;