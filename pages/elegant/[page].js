import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import ElegantBlogs from "../../components/Elegant/ElegantBlogs";
/**
 * @description 博文列表 根据页数获取
 */
function BlogsByPage({ElegantData}) {
    return <ElegantBlogs ElegantData={ElegantData}/>
}
export async function getServerSideProps(context) {
    const {params:{page},query:{cateid}} = context
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
        cateid ? BlogDataRequest.getBlogsByCateID(cateid,40,page) : BlogDataRequest.getNewestBlogs(40, page),
        BlogDataRequest.getBlogCategory()
    ])
    ElegantResult.forEach(result => {
        if (result.Ok){
            delete result.Ok
            ElegantData = {...ElegantData,...result}
        }
    })
    return {
        props: {ElegantData}
    }
}
export default BlogsByPage;