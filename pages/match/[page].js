import ElegantBlogs from "../../components/Elegant/ElegantBlogs";
import CustomHeadTag from "../../components/App/CustomHeadTag";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";

function MatchByPage({MatchData}) {
    return (
        <>
            <CustomHeadTag title='AD110·竞赛'/>
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
    console.log(MatchData)
    return {
        props: {MatchData},revalidate:21600
    }
}
export async function getStaticPaths(){
    let paths = Array.from({length:10}).map((_,index) => ({params:{page:String(index + 1)}}))
    return {
        paths,
        fallback:'blocking'
    }
}
export default MatchByPage;