import ElegantBlogs from "../../components/elegant/ElegantBlogs";
import HeadTag from "../../components/app/HeadTag";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
/**
 * @description 博文列表
 */
function Elegant({ElegantData}) {
    return (
        <>
            <HeadTag title='AD110·出色'/>
            <ElegantBlogs ElegantData={ElegantData}/>
        </>
    )
}
export async function getStaticProps(context) {
    //如果出现根据分类id查询且使用服务器渲染
    // const {query:{cateid}} = context
    let ElegantData = {
        BlogsData:{
            category:'',
            Blogs:[],
            total:0,
        },
        BlogCategory:[]
    }
    let ElegantResult = await Promise.all([
        BlogDataRequest.getNewestBlogs(),
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
export default Elegant;