import HeadTag from "@components/app/HeadTag";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import revalidateTime from "@config/revalidate";
import {getFormatTime} from "@utils/present/TimeUtils";
import YearBlogList from "@components/classic/YearBlogList";

interface Props{
    Year:string
    BlogList:BlogData[]
    total:number
    currentPage:string
}
function YearBlogByPage(YearBlogData:Props) {
    return (
        <>
            <HeadTag title='AD110·经典'/>
            <YearBlogList {...YearBlogData}/>
        </>
    )
}
export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>> {
    const {params:{year,page}} = context
    let YearBlogData:Props = {
        Year:year,
        currentPage:page,
        BlogList:[],
        total:0
    }

    if (Number.isNaN(parseInt(year)) || Number.isNaN(parseInt(page))) return {props:{...YearBlogData}}

    let result = await BlogDataRequest.getBlogsByYear(year,32,page)
    if (result.Ok) {
        YearBlogData = Object.assign(YearBlogData,result)
    }
    return {
        props: {...YearBlogData},revalidate:revalidateTime
    }
}
export async function getStaticPaths():Promise<NextStaticPaths<{year:string,page:string}>>{
    const currentYear = Number(getFormatTime(new Date().getTime() / 1000,'YYYY'))
    let paths = Array.from({length:currentYear - 2005 + 1}).map((_,index) => {
        return {params:{year:String(currentYear - index),page:'1'}}
    })
    return {paths,fallback:'blocking'}
}
export default YearBlogByPage;