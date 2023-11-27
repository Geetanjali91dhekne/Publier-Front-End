import { PrebidSitelist } from '../redux/types';
const parsePrebidSitesAndSizes = (data: any) => {
    let sites: { title: string; value: number | string }[] = [];
    let sizes: { title: string; value: number | string }[] = [];

    data?.sites?.forEach((item: any) => {
        sites.push({ title: item?.site_alias, value: item?.site_alias });
    });

    data?.sizes?.forEach((item: any) => {
        sizes.push({ title: item?.size_alias, value: item?.size_alias });
    });

    return { sites: sites, sizes: sizes };
};

const parsefilterData = (data: PrebidSitelist[], type: string) => {
    let list: { title?: string; value?: number | string; email?: string; website?: any; id?: any }[] = [];
    if (type === 'site') {
        data?.forEach((l, index) => {
            list.push({
                title: l.site_name,
                value: l.id,
            });
        });
    }
    // else if (type === 'publisher') {
    //     data?.forEach((l, index) => {
    //         list.push({
    //             title: l.business_name || l.full_name,
    //             value: l.publisher_id,
    //             email: l.email,
    //             website: l?.publisher_sites?.length,
    //             id: l.id,
    //         });
    //     });
    // } else if (type === 'version') {
    //     data?.forEach((l, index) => {
    //         list.push({
    //             title: l.version,
    //             value: l.version,
    //         });
    //     });
    //     list.sort((a: any, b: any) => b.value - a.value);
    // } else if (type === 'account_manager') {
    //     data?.forEach((l, index) => {
    //         list.push({
    //             title: l.full_name,
    //             value: l.publisher_id,
    //         });
    //     });
    // }

    return list;
};

const prebidUploadUtils = {
    parsePrebidSitesAndSizes,
    parsefilterData,
};

export default prebidUploadUtils;
