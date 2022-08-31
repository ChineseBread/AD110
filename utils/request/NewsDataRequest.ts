import {doDataRequest, getImageUrl} from "@utils/request/request";

class NewsDataRequest{
    static getLatestNews(limit:number = 20,page:number = 1):Promise<Result<{NewsData:{NewsList:NewsData[],total:number}}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:"/bbs_content/list_by_time",data:{limit,page}})
                if (Array.isArray(result.Data)) {
                    const {Data,Total_Count} = result
                    resolve({Ok:true,NewsData:{NewsList:Data,total:Total_Count}})
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
    static getNewsById(id:NewsData['id']):Promise<Result<{ News:NewsData}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/bbs_content/get_info_by_id',data:{id}})
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
    static getNewsCover(url:string):string {
        return getImageUrl(url)
    }
}
export default NewsDataRequest