import {doDataRequest, doRequest} from "./request";
class LinkDataRequest{
	/**
	 * @description 获取热门链接分类
	 * @returns {Promise<unknown>}
	 */
	static getHotLinkCateGory(){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/web_kind/list_hot',data:{},method:'GET'})
				if (result?.length){
					resolve({Ok:true,HotLinkCategoryList:result})
				}else{
					resolve({Ok:false})
				}
			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	static getLinkCategory(){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/web_kind/list_all',data:{},method:'GET'})
				if (result?.length){
					resolve({Ok:true,LinkCategoryList:result})
				}else{
					resolve({Ok:false})
				}
			}catch (e){
				resolve({Ok:false})
			}
		})
	}

	/**
	 * @description 获取各分类及链接
	 * @param limit
	 */
	static getLinkCategoryAndLink(limit){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/web_urls/get_overview',data:{limit},method:'GET'})
				if (result?.length){
					resolve({Ok:true,LinkCategoryAndLinkList:result})
				}else{
					resolve({Ok:false})
				}
			}catch (e) {
				resolve({Ok:false})
			}
		})
	}

	/**
	 * @description 获取新导入的链接
	 * @param limit
	 * @returns {Promise<unknown>}
	 */
	static getNewIndexLink(limit){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/web_urls/newly_index_urls',data:{limit},method:'GET'})
				if (result?.length){
					resolve({Ok:true,NewIndexLinkList:result})
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
	 * @returns {Promise<unknown>}
	 */
	static getHotClickLink(limit){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:"/web_urls/list_hot_hits",data:{limit},method:'GET'})
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
	// static getUrlInfoByUrlID(urlid){
	// 	return new Promise(async (resolve,reject) => {
	// 		try {
	// 			let result = await doDataRequest({url:"/web_urls/get_info_by_id",data:{urlid},method:'GET'})
	// 			if (result?.Ok){
	// 				resolve({Ok:true,LinkInfoList:result.Data || {}})
	// 			}else{
	// 				resolve({Ok:false})
	// 			}
	// 		}catch (e){
	// 			resolve({Ok:false})
	// 		}
	// 	})
	// }
	static getUrlListByKindID(kindid,page){
		return new Promise(async (resolve,reject) => {
			try {
				let result = await doDataRequest({url:'/web_kind/list_by_kindid',data:{kindid,page},method:'GET'})
				if (result.hasOwnProperty('Cate_Name')){
					resolve({Ok:true,UrlListInfo:{kindName:result.Cate_Name,UrlList: result.Data || [],total:result.Total_Count}})
				}else{
					resolve({Ok:false})
				}
			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	static getUrlListByMode(mode){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:`/web_urls/${mode}`,data:{limit:20}})
				if (result.Ok){
					let kindName = {'list_by_random':'随机','list_by_hots':'热门','list_by_recommend':'推荐'}[mode]
					resolve({Ok:true,UrlListInfo:{kindName,UrlList:result.Data || [],total:20}})
				}
			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	/**
	 * @description 获取编辑推荐分类
	 */
	static getEditorRecommend(limit){
		return new Promise(async (resolve,reject) => {
			try {
				let result = await doDataRequest({url:'/web_urls/list_by_random',data:{limit},method:'GET'})
				if(result.Ok){
					resolve({Ok:true,EditorRecommendLink:result.Data || []})
				}else {
					resolve({Ok:false})
				}

			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	static getAuthorRecommend(limit){
		return new Promise(async (resolve,reject) => {
		    try {
				let result = await doDataRequest({url:'/web_urls/author_recommend',data:{limit}})
				if (Array.isArray(result)){
					resolve({Ok:true,AuthorRecommend:result})
				}else {
					resolve({Ok:false})
				}
			}catch (e){
				resolve({Ok:false})
			}
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

}
export default LinkDataRequest