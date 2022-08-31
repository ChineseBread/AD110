import {doDataRequest} from "@utils/request/request";

class CustomPageDataRequest{
    static getCustomPage(page = 1,limit = 20):Promise<Result<{CustomPageData:{CustomPageList:CustomPage[],total:number}}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/custom_page/list_all',data:{limit,page}})
                if (Array.isArray(result.data)){
                    resolve({Ok:true,CustomPageData:{CustomPageList: result.data,total:result.total}})
                }else {
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getCustomPageByID(pageid:CustomPage['page_id']):Promise<Result<{CustomPage:CustomPageInfo}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/custom_page/get_info_by_id',data:{pageid}})
                if (result.Ok){
                    resolve({Ok:true,CustomPage:result.Data})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getCustomPageByAlias(alias:CustomPage['url_alias']):Promise<Result<{CustomPage:CustomPageInfo}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'custom_page/get_info_by_alias',data:{alias}})
                if (result.Ok){
                    resolve({Ok:true,CustomPage:result.Data})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })

    }
}
export default CustomPageDataRequest