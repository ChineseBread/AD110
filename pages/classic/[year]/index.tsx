import {getFormatTime} from "@utils/present/TimeUtils";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import revalidateTime from "@config/revalidate";
import HeadTag from "@components/app/HeadTag";
import YearBlogList from "@components/classic/YearBlogList";
interface Props{
    Year:string
    BlogList:BlogData[]
    total:number
}
function YearBlog(YearBlogData:Props) {
    return(
        <>
            <HeadTag title='AD110·经典'/>
            <YearBlogList {...YearBlogData}/>
        </>
    )
}
export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>>{
    const {params:{year}} = context
    let YearBlogData:Props = {Year:year,BlogList:[],total:0}

    if (Number.isNaN(parseInt(year))) return {props:{...YearBlogData}}

    const result = await BlogDataRequest.getBlogsByYear(year,32,1)
    if (result.Ok){
        YearBlogData = Object.assign(YearBlogData,result)
    }
    return {
        props: {...YearBlogData},revalidate:revalidateTime
    }
}
export async function getStaticPaths():Promise<NextStaticPaths<{year:string}>>{
    const currentYear = Number(getFormatTime(new Date().getTime() / 1000,'YYYY'))
    let paths = Array.from({length:10}).map((_,index) => {
        return {params:{year:String(currentYear - index)}}
    })
    return {paths,fallback:'blocking'}
}
export default YearBlog;