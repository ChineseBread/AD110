import ElegantBlogs from "../../components/elegant/ElegantBlogs";
import HeadTag from "../../components/app/HeadTag";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import revalidateTime from "../../config/revalidate";

function MatchByPage({MatchData}) {
    return (
        <>
            <HeadTag title='AD110·竞赛'/>
            <ElegantBlogs ElegantData={MatchData}/>
        </>
    )
}
export async function getStaticProps(context) {
    const {params:{page}} = context
    let MatchData = {
        BlogsData:{
            category:'',
            Blogs:[],
            total:0,
        },
        currentPage:page
    }
    if (Number.isNaN(parseInt(page))) return {props:{MatchData}}
    let MatchResult = await BlogDataRequest.getBlogsByCateID(11,40,page)
    if (MatchResult.Ok) MatchData.BlogsData = MatchResult.BlogsData
    return {
        props: {MatchData},revalidate:revalidateTime
    }
}
export async function getStaticPaths(){
    let paths = Array.from({length:2}).map((_,index) => ({params:{page:String(index + 1)}}))
    return {
        paths,
        fallback:'blocking'
    }
}
export default MatchByPage;