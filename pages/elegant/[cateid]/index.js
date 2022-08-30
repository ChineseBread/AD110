import ElegantBlogs from "../../../components/Elegant/ElegantBlogs";
import CustomHeadTag from "../../../components/App/CustomHeadTag";
import BlogDataRequest from "../../../uitls/request/BlogDataRequest";
import revalidateTime from "../../../config/revalidate";
/**
 * @description 博文列表
 */
function Elegant({ElegantData}) {
    return (
        <>
            <CustomHeadTag title='AD110·出色'/>
            <ElegantBlogs ElegantData={ElegantData}/>
        </>
    )
}
export async function getStaticProps(context) {
    const {params:{cateid}} = context
    //如果出现根据分类id查询且使用服务器渲染
    // const {query:{cateid}} = context
    let ElegantData = {
        BlogsData:{
            category:'',
            Blogs:[],
            total:0,
        },
        BlogCategory:[],
        cateid
    }
    let ElegantResult = await Promise.all([
        BlogDataRequest.getBlogsByCateID(cateid),
        // BlogDataRequest.getNewestBlogs(),
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
        if (result.Ok) paths = result.BlogCategory.map(({cate_id}) => ({params:{cateid:cate_id}}))
    })
    // let paths = Array.from({length:10}).map((_,index) => ({params:{page:String(index + 1)}}))
    return {
        paths,
        fallback:'blocking'
    }
}
export default Elegant;