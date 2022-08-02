import {doRequest} from "./request";

class OperationRequest{
    static sendBlogComment(logid,nickname,comment,website,email){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'/blog_comment/write_comment',data:{logid,nickname,comment,website,email}})
                if (result.Ok){
                    resolve({Ok:true,comm_id:result.Data.commid,comm_postip:result.Data.ip})
                }else{
                    resolve({Okf:false})
                }
            }catch (e) {
                resolve({Ok:false})
            }
        })
    }
    static likeBlog(logid){
        return new Promise(async (resolve,reject) => {
            let result = await doRequest({url:'/blog_content/like_blog',data:{logid}})
            resolve({Ok:result.Ok,Msg:result.Msg || '服务器异常请稍后'})
        })
    }
    // 点赞资料库下分类的url
    static likeUrl(urlid){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'/web_urls/like_url',data:{urlid}})
                resolve({Ok:result.Ok,Msg:result.Msg || '服务器异常请稍后'})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static uploadUrl(name,url,info){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'/submit/submit_url',data:{name,url,info},method:'POST'})
                resolve({Ok:result?.Ok,Msg:result.Msg || '请求超时'})
            }catch (e){
                resolve({Ok:false,Msg:'请求超时'})
            }
        })
    }
    //点击url 增加浏览量
    static clickUrl(urlid){
        return new Promise(async (resolve,reject) => {
            await doRequest({url:'/web_urls/hit_url',data:{urlid}})
        })
    }
}
export default OperationRequest