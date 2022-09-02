//竞赛页面
import ElegantBlogs from "../../components/elegant/ElegantBlogs";
import HeadTag from "../../components/app/HeadTag";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import revalidateTime from "../../config/revalidate";

function Match({MatchData}) {
    return(
        <>
            <HeadTag title='AD110·竞赛'/>
            <ElegantBlogs ElegantData={MatchData}/>
        </>
    )

}
//博文分类中的竞赛分类id 11 根据分类获取博文即可
export async function getStaticProps(context) {
    let MatchData = {
        BlogsData:{
            category:'',
            Blogs:[],
            total:0,
        }
    }
    let MatchResult = await BlogDataRequest.getBlogsByCateID(11)
    if (MatchResult.Ok) MatchData.BlogsData = MatchResult.BlogsData
    return {
        props: {MatchData},revalidate:revalidateTime
    }
}
export default Match;