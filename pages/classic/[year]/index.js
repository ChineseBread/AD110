import BlogDataRequest from "../../../uitls/request/BlogDataRequest";
import {getFormatTime} from "../../../uitls/present/TimeUtils";
import YearBlogsList from "../../../components/Classic/YearBlogsList";

function YearBlog({YearBlogsData}) {
    return <YearBlogsList YearBlogsData={YearBlogsData}/>
}
export async function getStaticProps(context){
    const {params:{year}} = context
    let YearBlogsData = {BlogsData:{Blogs:[],total:0,Year:year}}

    if (Number.isNaN(parseInt(year))) return {props:{YearBlogsData}}

    const BlogsResult = await BlogDataRequest.getBlogsByYear(year,32,1)
    if (BlogsResult.Ok){
        YearBlogsData.BlogsData = BlogsResult.BlogsData
    }
    return {
        props: {YearBlogsData},revalidate:21600
    }
}
export async function getStaticPaths(){
    const currentYear = getFormatTime(new Date() / 1000,'YYYY')
    let paths = Array.from({length:10}).map((_,index) => {
        return {params:{year:String(currentYear - index)}}
    })
    return {paths,fallback:'blocking'}
}
export default YearBlog;