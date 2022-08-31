//竞赛页面
import ElegantBlogs from "@components/elegant/ElegantBlogs";
import HeadTag from "@components/app/HeadTag";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import revalidateTime from "@config/revalidate";
interface Props{
    BlogsData:{
        BlogList:BlogData[]
        category:string
        total:number
    }
}
function Match(MatchData:Props) {
    return(
        <>
            <HeadTag title='AD110·竞赛'/>
            <ElegantBlogs {...MatchData}/>
        </>
    )

}
//博文分类中的竞赛分类id 11 根据分类获取博文即可
export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>> {
    let MatchData:Props = {
       BlogsData:{
           category:'',
           BlogList:[],
           total:0,
       }
    }
    let result = await BlogDataRequest.getBlogsByCateID(11)
    if (result.Ok) MatchData.BlogsData = (result.BlogsData || MatchData.BlogsData)
    return {
        props: {...MatchData},revalidate:revalidateTime
    }
}
export default Match;