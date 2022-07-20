import {getFormatTime} from "../../../uitls/present/TimeUtils";
import BlogDataRequest from "../../../uitls/request/BlogDataRequest";
import YearBlogsList from "../../../components/Classic/YearBlogsList";

function YearBlogByPage({YearBlogsData}) {
    return <YearBlogsList YearBlogsData={YearBlogsData}/>
}
export async function getStaticProps(context) {
    const {params:{year,page}} = context
    let YearBlogsData = {
        BlogsData:{Blogs:[],total:0,Year:year},
        currentPage: page
    }

    if (Number.isNaN(parseInt(year)) || Number.isNaN(parseInt(page))) return {props:{YearBlogsData}}

    let YearBlogsResult = await BlogDataRequest.getBlogsByYear(year,32,page)
    if (YearBlogsResult.Ok) {
        YearBlogsData.BlogsData = YearBlogsResult.BlogsData
    }
    return {
        props: {YearBlogsData},revalidate:21600
    }
}
export async function getStaticPaths(){
    const currentYear = getFormatTime(new Date() / 1000,'YYYY')
    let paths = Array.from({length:currentYear - 2005 + 1}).map((_,index) => {
        return {params:{year:String(currentYear - index),page:'1'}}
    })
    return {paths,fallback:'blocking'}
}
export default YearBlogByPage;