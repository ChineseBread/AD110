import {doDataRequest} from "./request";

class SearchDataRequest{
    static getSearchData(keyword,page = 1){
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/search/search_all',data:{keyword,page}})
                if (result.Ok){
                    const {Data:{Blog,Urls}} = result
                    resolve({Ok:true,SearchData:{SearchList:[...Blog.data,...Urls.data],total:Blog.total + Urls.total}})
                }else{
                    resolve({Ok:false})
                }
            }catch (e) {
                resolve({Ok:false})
            }
        })
    }
}
export default SearchDataRequest