import BlogDataRequest from "../../../uitls/request/BlogDataRequest";
import HeadTag from "../../../components/app/HeadTag";
import ElegantBlogs from "../../../components/elegant/ElegantBlogs";
import revalidateTime from "../../../config/revalidate";

export default function BlogsByCateID(ElegantData) {
    return(
        <>
            <HeadTag title='AD110·出色'/>
            <ElegantBlogs {...ElegantData}/>
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
        revalidate:revalidateTime,
    }
}
export async function getStaticPaths(){
    let paths = []
    let result = await BlogDataRequest.getBlogCategory()
    if (result.Ok) paths = result.BlogCategory.map(({cate_id}) => ({params:{cateid:String(cate_id),page:'1'}}))
    return {
        paths,
        fallback:'blocking'
    }
}