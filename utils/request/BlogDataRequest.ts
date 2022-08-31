import {doDataRequest, getImageUrl} from "@utils/request/request";

class BlogDataRequest {

    private static getBlogs(url:string,data:any):Promise<Result<{BlogsData:{BlogList:BlogData[],total:number,category:string}}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url,data})
                if (Array.isArray(result.Data) || result.Cate_Name) {
                    const {Data,Total_Count,Cate_Name} = result
                    resolve({Ok:true,BlogsData:{BlogList:Data,total:Total_Count,category:Cate_Name || '经典'}})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    /**
     * @description 获取最新博文
     * @param limit
     * @param page
     * @returns {Promise<unknown>}
     */
    static getNewestBlogs(limit = 40,page = 1):Promise<Result<{BlogsData:{BlogList:BlogData[],total:number,category:string}}>>{
        return this.getBlogs('/blog_content/list_by_time',{limit,page})
    }
    /**
     * @description 根据分类获取博文
     */
    static getBlogsByCateID(cateid:BlogCategory['cate_id'],limit = 40,page = 1):Promise<Result<{BlogsData:{BlogList:BlogData[],total:number,category:string}}>>{
        return this.getBlogs('/blog_category/list_by_cateid',{cateid,limit,page})
    }
    /**
     * @description 首页的博文数据
     */
    static getHomePageBlogs<T>():Promise<Result<{HomePageBlogs:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/blog_content/blog_overview',data:{}})
                resolve({Ok:true,HomePageBlogs:result})
            }catch (e) {
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 博文分类
     */
    static getBlogCategory():Promise<Result<{CategoryList:BlogCategory[]}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/blog_category/list_all',data:{},method:'GET'})
                if (Array.isArray(result)){
                    resolve({Ok:true,CategoryList:result})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 经典界面根据年份获取
     */
    static getBlogsByYear(year:string,limit = 4,page = 1):Promise<Result<{Year:string,BlogList:BlogData[],total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/blog_content/list_by_year',data:{year,limit,page}})
                if (Array.isArray(result.Data)) {
                    const {Data,TotalCount} = result
                    resolve({Ok: true,Year:year,BlogList:Data,total:TotalCount})
                }else{
                    resolve({Ok:false})
                }
            }catch (e) {
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 经典界面每年8个
     */
    static getYearsBlogs<T>():Promise<Result<{YearBlogList:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/blog_content/classic_overview',data:{}})
                if (Array.isArray(result.Data)){
                    resolve({Ok:true,YearBlogList:result.Data})
                }else{
                    resolve({Ok:false})
                }
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 根据文章id获取信息
     * @param logid
     */
    static getBlogPreviewDataByBlogID(logid:BlogData["log_id"]):Promise<Result<{ PreviewData:BlogInfoData,Recommend:BlogData[] }>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/blog_content/get_info_by_id',data:{logid}})
                resolve({Ok:result.Ok,PreviewData:result.Data || {},Recommend:result.Recommend || []})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 获取文章评论
     * @param logid
     * @param limit
     * @param page
     */
    static getBlogCommentsByBlogID(logid:BlogInfoData['log_id'],limit = 5,page = 1):Promise<Result<{CommentsData:{CommentsList:BlogComment[],total:number}}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/blog_comment/list_by_logid',data:{logid,limit,page}})
                if (Array.isArray(result.data)){
                    resolve({Ok:true,CommentsData:{CommentsList:result.data,total:result.total}})
                }else {
                    resolve({Ok:false})
                }
            }catch (e) {
                resolve({Ok:false})
            }
        })
    }
    static getBlogCover(url:string):string{
        return getImageUrl(url)
    }
}
export default BlogDataRequest