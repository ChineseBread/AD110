import HeadTag from "@components/app/HeadTag";
import ElegantBlogs from "@components/elegant/ElegantBlogs";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import revalidateTime from "@config/revalidate";

interface Props{
    BlogsData:{
        BlogList:BlogData[]
        category:string
        total:number
    }
    currentPage:string
}
function MatchByPage(MatchData:Props) {
    return (
        <>
            <HeadTag title='AD110·竞赛'/>
            <ElegantBlogs {...MatchData}/>
        </>
    )
}
export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>> {
    const {params:{page}} = context
    let MatchData:Props = {
        BlogsData:{
            category:'',
            BlogList:[],
            total:0,
        },
        currentPage:page
    }
    if (Number.isNaN(parseInt(page))) return {props:{...MatchData}}
    let result = await BlogDataRequest.getBlogsByCateID(11,40,page)
    if (result.Ok) MatchData.BlogsData = (result.BlogsData || MatchData.BlogsData)
    return {
        props: {...MatchData},revalidate:revalidateTime
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