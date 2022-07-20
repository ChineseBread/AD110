/**
 * @description 网站图片横幅
 */
import {doDataRequest, getImageUrl} from "./request";

class CoverDataRequest{
    static getCover(url){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:`/banner/${url}`,data:{},method:'GET'})
                if (result?.Ok){
                    resolve({Ok:true,Cover:result.Data.banner_image})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){

            }
        })
    }
    /**
     * @description 主页底部横幅
     * @returns {Promise<unknown>}
     */
    static getHomePageFooterCover(){
        return new Promise(async (resolve,reject) => {
            let result = await this.getCover('home_footer_banner')
            resolve({Ok:result.Ok,HomePageFooterCover:result.Cover})
        })
    }

    /**
     * @description 获取热门点击链接横幅
     * @returns {Promise<unknown>}
     */
    static getHotClickCover(){
        return new Promise(async (resolve,reject) => {
            let result = await this.getCover('hot_hits_banner')
            resolve({Ok:result.Ok,HotClickCover:result.Cover})
        })
    }

    /**
     * @description 获取网址推荐横幅
     */
    static getRecommendCover(){
        return new Promise(async (resolve,reject) => {
            let result = await this.getCover('url_recommend_banner')
            resolve({Ok:result.Ok,RecommendCover:result.Cover})
        })
    }

    /**
     * @description 新录入词条横幅
     * @returns {Promise<unknown>}
     */
    static getNewlyIndexLinkCover(){
        return new Promise(async (resolve,reject) => {
            let result = await this.getCover('url_newly_index_banner')
            resolve({Ok:result.Ok,NewlyIndexLinkCover:result.Cover})
        })
    }
    static getRandomCover(){
        return new Promise(async (resolve,reject) => {
            let result = await this.getCover('random_banner')
            resolve({Ok:result.Ok,RandomCover:result.Cover})
        })
    }
    static getCoverByUrl(url){
        return getImageUrl(url)
    }
}
export default CoverDataRequest