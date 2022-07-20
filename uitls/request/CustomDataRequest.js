import {doDataRequest} from "./request";

class CustomDataRequest{

    static getCustomPage(page = 1,limit = 20){
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
    static getCustomPageByID(pageid){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/custom_page/get_info_by_id',data:{pageid}})
                if (result.Ok){
                    resolve({Ok:true,CustomPageData:result.Data})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getCustomPageByAlias(alias){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'custom_page/get_info_by_alias',data:{alias}})
                if (result.Ok){
                    resolve({Ok:true,CustomPageData:result.Data})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })

    }
}
export default CustomDataRequest