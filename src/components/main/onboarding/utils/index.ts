import { onboardingFilterLists } from '../redux/types';

const parsefilterData = (data: onboardingFilterLists[], type: string) => {
    let list: { title?: string; value?: number | string; email?: string; website?: any; id?: any }[] = [];
    if (type === 'site') {
        data?.forEach((l, index) => {
            list.push({
                title: l.site_name,
                value: l.site_id,
            });
        });
    } else if (type === 'publisher') {
        data?.forEach((l, index) => {
            list.push({
                title: l.business_name || l.full_name,
                value: l.publisher_id,
                email: l.email,
                website: l?.publisher_sites?.length,
                id: l.id,
            });
        });
    } else if (type === 'version') {
        data?.forEach((l, index) => {
            list.push({
                title: l.version,
                value: l.version,
            });
        });
        list.sort((a: any, b: any) => b.value - a.value);
    } else if (type === 'account_manager') {
        data?.forEach((l, index) => {
            list.push({
                title: l.full_name,
                value: l.publisher_id,
            });
        });
    }

    return list;
};

const onboardingUtils = {
    parsefilterData,
};

export default onboardingUtils;
