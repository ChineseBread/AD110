import {doDataRequest, getImageUrl} from "@utils/request/request";

class CoverDataRequest{
    private static getBannerByUrl(url:string):Promise<Result<{Banner:string}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:`/banner/${url}`,data:{}})
                if (result.Ok) resolve({Ok:true,Banner:result.Data.banner_image})
                else resolve({Ok:false})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getHomePageFooterBanner():Promise<Result<{HomePageFooterBanner:string}>>{
        return new Promise(async (resolve,reject) => {
            let result = await this.getBannerByUrl('home_footer_banner')
            resolve({Ok:result.Ok,HomePageFooterBanner:result.Banner})
        })
    }
    static getHotClickBanner():Promise<Result<{HotClickBanner:string}>>{
        return new Promise(async (resolve,reject) => {
            let result = await this.getBannerByUrl('hot_hits_banner')
            resolve({Ok:result.Ok,HotClickBanner:result.Banner})
        })
    }
    static getRecommendBanner():Promise<Result<{RecommendBanner:string}>>{
        return new Promise(async (resolve,reject) => {
            let result = await this.getBannerByUrl('url_recommend_banner')
            resolve({Ok:result.Ok,RecommendBanner:result.Banner})
        })
    }
    static getNewlyIndexLinkBanner():Promise<Result<{NewlyIndexLinkBanner:string}>>{
        return new Promise(async (resolve,reject) => {
            let result = await this.getBannerByUrl('url_newly_index_banner')
            resolve({Ok:result.Ok,NewlyIndexLinkBanner:result.Banner})
        })
    }

    static getCoverByUrl(url:string):string{
        return getImageUrl(url)
    }
}
export default CoverDataRequest