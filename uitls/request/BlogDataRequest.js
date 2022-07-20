import {doDataRequest, getImageUrl} from "./request";

class BlogDataRequest{

	static getBlogs(requestObj){
		return new Promise(async (resolve,reject) => {
			try {
				let result = await doDataRequest(requestObj)
				if (Array.isArray(result.Data) || result.Cate_Name){
					const {Data,Total_Count,Cate_Name} = result
					const BlogsData = {Blogs:Data || [],total:Total_Count,category:Cate_Name || ''}
					resolve({Ok:true,BlogsData})
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
	static getNewestBlogs(limit = 40,page = 1){
		return this.getBlogs({url:'/blog_content/list_by_time',data:{limit,page}})
	}
	static getHomePageBlogs(){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/blog_content/blog_overview'})
				if (Array.isArray(result)){
					resolve({Ok:true,Blogs:result})
				}else{
					resolve({Ok:false})
				}
			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	static getRandomBlogs(limit = 4){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/blog_content/get_random',data:{limit}})
				if (Array.isArray(result.Data)){
					resolve({Ok:true,RandomBlogs:result.Data})
				}else{
					resolve({Ok:false})
				}
			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	/**
	 * @description 根据分类获取博文
	 */
	static getBlogsByCateID(cateid,limit = 40,page = 1){
		return this.getBlogs({url:'/blog_category/list_by_cateid',data:{cateid,limit,page}})
	}

	static getBlogCategory(){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/blog_category/list_all',data:{},method:'GET'})
				if (Array.isArray(result)){
					resolve({Ok:true,BlogCategory:result})
				}else{
					resolve({Ok:false})
				}
			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	//经典页面
	static getBlogsByYear(year,limit = 4,page = 1){
		return new Promise(async (resolve,reject) => {
			try {
				let result = await doDataRequest({url:'/blog_content/list_by_year',data:{year,limit,page}})
				if (Array.isArray(result.Data)) {
					const {Data,TotalCount} = result
					resolve({Ok: true,BlogsData:{Year:year,Blogs:Data,total:TotalCount}})
				}else{
					resolve({Ok:false})
				}
			}catch (e) {
				resolve({Ok:false})
			}
		})
	}
	//经典界面每年四个博文
	static getYearsBlogs(){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/blog_content/classic_overview',data:{}})
				if (Array.isArray(result.Data)){
					resolve({Ok:true,BlogsData:result.Data})
				}else{
					resolve({Ok:false})
				}
			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	static getBlogPreviewDataByBlogID(logid){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/blog_content/get_info_by_id',data:{logid}})
				resolve({Ok:result.Ok,BlogData:result.Data || {}})
			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	static getBlogCommentsByBlogID(logid,limit = 5,page = 1){
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
	static sendBlogComment(logid,nickname,comment){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/blog_comment/write_comment',data:{logid,nickname,comment}})
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
			let result = await doDataRequest({url:'/blog_content/like_blog',data:{logid}})
			resolve({Ok:result.Ok,Msg:result.Msg || '服务器异常请稍后'})
		})
	}
	static getBlogCover(url){
		return getImageUrl(url)
	}
}
export default BlogDataRequest