import BlogDataRequest from "../../../uitls/request/BlogDataRequest";
import ElegantBlogs from "../../../components/elegant/ElegantBlogs";
import HeadTag from "../../../components/app/HeadTag";
import revalidateTime from "../../../config/revalidate";
/**
 * @description 博文列表 根据页数获取
 */
function BlogsByPage({ElegantData}) {
    return(
        <>
            <HeadTag title='AD110·出色'/>
            <ElegantBlogs ElegantData={ElegantData}/>
        </>
    )
}
export async function getStaticProps(context) {
    const {params:{page}} = context
    let ElegantData = {
        BlogsData:{
            category:'',
            Blogs:[],
            total:0,
        },
        BlogCategory:[],
        currentPage:page
    }
    // 如果出现页码错误直接给空
    if (Number.isNaN(parseInt(page))) return {props:{ElegantData}}

    let ElegantResult = await Promise.all([
        BlogDataRequest.getNewestBlogs(40,page),
        BlogDataRequest.getBlogCategory()
    ])
    ElegantResult.forEach(result => {
        if (result.Ok){
            delete result.Ok
            ElegantData = {...ElegantData,...result}
        }
    })
    return {
        props: {ElegantData},
        revalidate:revalidateTime
    }
}
export async function getStaticPaths(){
    let paths = Array.from({length:3}).map((_,index) => ({params:{page:String(index + 1)}}))
    return {
        paths,
        fallback:'blocking'
    }
}
export default BlogsByPage;