
const parsePrebidSitesAndSizes = (data: any) => {
     let sites: { title: string, value: number | string }[] = [];
     let sizes: { title: string, value: number | string }[] = [];

     data?.sites?.forEach((item: any) => {
          sites.push({ title: item?.site_alias, value: item?.site_alias })
     })

     data?.sizes?.forEach((item: any) => {
          sizes.push({ title: item?.size_alias, value: item?.size_alias })
     })

     return { sites: sites, sizes: sizes }
}



const prebidUploadUtils = {
     parsePrebidSitesAndSizes,
}

export default prebidUploadUtils;