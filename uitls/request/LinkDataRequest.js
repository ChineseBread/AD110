import {doDataRequest} from "./request";
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
	/**
	 * @description 根据urlid获取链接信息
	 * @param urlid
	 * @returns {Promise<unknown>}
	 */
	static getLinkInfoByLinkID(urlid){
		return new Promise(async (resolve,reject) => {
			try {
				let result = await doDataRequest({url:"/web_urls/get_info_by_id",data:{urlid},method:'GET'})
				if (result?.Ok){
					resolve({Ok:true,LinkInfoList:result.Data || {}})
				}else{
					resolve({Ok:false})
				}
			}catch (e){
				resolve({Ok:false})
			}
		})
	}
	static getCategoryListByKindID(kindid,page){
		return new Promise(async (resolve,reject) => {
			try {
				let result = await doDataRequest({url:'/web_kind/list_by_kindid',data:{kindid,page},method:'GET'})
				if (result.hasOwnProperty('Cate_Name')){
					resolve({Ok:true,CategoryListInfo:{kindName:result.Cate_Name,CategoryList: result.Data || [],total:result.Total_Count}})
				}else{
					resolve({Ok:false})
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
				let result = await doDataRequest({url:'/web_urls/recommend_urls',data:{limit},method:'GET'})
				if(result?.length){
					const kindList = result.map(({kind_name,kind_id}) => ({key:kind_id,tab:kind_name}))
					const kindUrls = {}
					result.forEach(({kind_id,kind_urls}) => {
						kindUrls[kind_id] = kind_urls
					})
					resolve({Ok:true,EditorRecommendLink:{kindList,kindUrls}})
				}else {
					resolve({Ok:false})
				}

			}catch (e){
				resolve({Ok:false})
			}
		})
	}
}
export default LinkDataRequest