import BlogDataRequest from "../../../uitls/request/BlogDataRequest";
import ElegantBlogs from "../../../components/Elegant/ElegantBlogs";
import CustomHeadTag from "../../../components/App/CustomHeadTag";
import revalidateTime from "../../../config/revalidate";
/**
 * @description 博文列表 根据页数获取
 */
function BlogsByPage({ElegantData}) {
    return(
        <>
            <CustomHeadTag title='AD110·出色'/>
            <ElegantBlogs ElegantData={ElegantData}/>
        </>
    )
}
export async function getStaticProps(context) {
    
    const {params:{page,cateid}} = context
    
    let ElegantData = {
        BlogsData:{
            category:'',
            Blogs:[],
            total:0,
        },
        BlogCategory:[],
        currentPage:page,
        cateid
    }
    // 如果出现页码错误直接给空
    if (Number.isNaN(parseInt(page))) return {props:{ElegantData}}

    let ElegantResult = await Promise.all([
        // cateid ? BlogDataRequest.getBlogsByCateID(cateid,40,page) : BlogDataRequest.getNewestBlogs(40, page),
        BlogDataRequest.getBlogsByCateID(cateid,40,page),
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
    let paths = []
    BlogDataRequest.getBlogCategory().then(result => {
        if (result.Ok) paths = result.BlogCategory.map(({cate_id}) => ({cateid:cate_id,page:1}))
    })
    return {
        paths,
        fallback:'blocking'
    }
}
export default BlogsByPage;
