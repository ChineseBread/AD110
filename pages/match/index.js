//竞赛页面
import ElegantBlogs from "../../components/Elegant/ElegantBlogs";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";

function Match({MatchData}) {
    return <ElegantBlogs ElegantData={MatchData}/>
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
        props: {MatchData},revalidate:21600
    }
}
export default Match;