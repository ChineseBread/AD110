/**
 * @description 获取信息相关咨询
 */
import {doDataRequest, getImageUrl} from "./request";

class NewsDataRequest{

    static getLatestNews(limit = 20,page = 1){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:"/bbs_content/list_by_time",data:{limit,page}})
                if (Array.isArray(result.Data)) {
                    const {Data,Total_Count} = result
                    resolve({Ok:true,NewsData:{News:Data,total:Total_Count}})
                }else{
                    resolve({Ok:false})
                }

            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 根据id获取咨询信息
     */
    static getNewsById(id){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/bbs_content/get_info_by_id',data:{id},method:'GET'})
                if (result?.title){
                    resolve({Ok:true,News:result})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static getNewsCover(url){
       return getImageUrl(url)
    }
}
export default NewsDataRequest