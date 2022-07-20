import LinkDataRequest from "./LinkDataRequest";
import BlogDataRequest from "./BlogDataRequest";
import CoverDataRequest from "./CoverDataRequest";

class DataRequest{
    static getLibraryLinkData(){
        return Promise.all([
            LinkDataRequest.getHotLinkCateGory(),
            LinkDataRequest.getNewIndexLink(20),
            // LinkDataRequest.getEditorRecommend(20),
            // LinkDataRequest.getLinkCategory(40),
            LinkDataRequest.getHotClickLink(100),
            // LinkDataRequest.getLinkCategoryAndLink(10),
            // CoverDataRequest.getRecommendCover(),
            CoverDataRequest.getNewlyIndexLinkCover(),
            CoverDataRequest.getHotClickCover()
        ])
    }
    static getHomePageData(){
        return Promise.all([
            BlogDataRequest.getHomePageBlogs(),
            LinkDataRequest.getEditorRecommend(20),
            LinkDataRequest.getHotClickLink(100),
            CoverDataRequest.getRecommendCover(),
            CoverDataRequest.getHotClickCover(),

        ])
    }
    static getBlogsPreviewData(blogid){
        return Promise.all([
            BlogDataRequest.getBlogPreviewDataByBlogID(blogid),
            BlogDataRequest.getBlogCommentsByBlogID(blogid),
            BlogDataRequest.getRandomBlogs()
        ])
    }
}
export default DataRequest