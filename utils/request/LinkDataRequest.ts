import {doDataRequest} from "@utils/request/request";

class LinkDataRequest{
    /**
     * @description 获取热门链接分类
     */
    static getHotLinkList():Promise<Result<{HotLinkList:HotLink[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/web_kind/list_hot',data:{}})
                if (result?.length){
                    resolve({Ok:true,HotLinkList:result})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    /**
     * @description 获取新导入的链接
     * @param limit
     */
    static getNewlyIndexLink(limit:number):Promise<Result<{NewlyIndexLinkList:BlogLink[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/web_urls/newly_index_urls',data:{limit}})
                if (result?.length){
                    resolve({Ok:true,NewlyIndexLinkList:result})
                }else{
                    resolve({Ok:false})
                }
            }catch (e) {
                resolve({Ok:false})
            }
        })
    }
    /**
     * @description 获取热门点击链接
     */
    static getHotClickLink(limit:number):Promise<Result<{HotClickLinkList:BlogLink[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:"/web_urls/list_hot_hits",data:{limit}})
                if (result?.length){
                    resolve({Ok:true,HotClickLinkList:result})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 根据urlid获取链接
     * @param kindid
     * @param page
     * @param limit
     */
    static getUrlListByUrlID(kindid:HotLink['id'],page:number,limit = 20):Promise<Result<{UrlListInfo:{UrlName:string,UrlList:BlogLink[],total:number}}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/web_kind_urls/list_by_time',data:{kindid,page,limit}})
                if (result.hasOwnProperty('Cate_Name')){
                    resolve({Ok:true,UrlListInfo:{UrlName:result.Cate_Name,UrlList: result.Data || [],total:result.Total_Count}})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getUrlListByMode(mode:'list_by_random' | 'list_by_hot' | 'list_by_recommend',kindid:BlogLink['url_id']):Promise<Result<{UrlListInfo:{UrlList:BlogLink[],total:number}}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:`/web_kind_urls/${mode}`,data:{kindid}})
                if (result.Ok){
                    // let kindName = {'list_by_random':'随机','list_by_hots':'热门','list_by_recommend':'推荐'}[mode]
                    resolve({Ok:true,UrlListInfo:{UrlList:result.Data || [],total:100}})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    /**
     * @description 获取编辑推荐分类
     */
    static getEditorRecommendLink(limit:number):Promise<Result<{EditorRecommendLinkList:BlogLink[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/web_urls/list_by_random',data:{limit},method:'GET'})
                if(result.Ok){
                    resolve({Ok:true,EditorRecommendLinkList:result.Data || []})
                }else {
                    resolve({Ok:false})
                }

            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 作者推荐链接
     * @param limit
     */
    static getAuthorRecommendLink(limit:number):Promise<Result<{AuthorRecommendLinkList:BlogLink[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/web_urls/author_recommend',data:{limit}})
                if (Array.isArray(result)){
                    resolve({Ok:true,AuthorRecommendLinkList:result})
                }else {
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description top 100 排行榜
     */
    static getClickRank():Promise<Result<{UrlList:BlogLink[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/web_urls/page_top_100',data:{}})
                resolve({Ok:true,UrlList:result.data || []})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 新导入排行榜
     */
    static getNewlyIndexedRank():Promise<Result<{UrlList:BlogLink[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/web_urls/page_newly_index',data:{}})
                resolve({Ok:true,UrlList:result.data || []})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
}
export default LinkDataRequest