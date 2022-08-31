/**
 * @description 博文列表 根据页数获取
 */
import HeadTag from "@components/app/HeadTag";
import ElegantBlogs from "@components/elegant/ElegantBlogs";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import revalidateTime from "@config/revalidate";

interface Props{
    BlogsData:{
        BlogList:BlogData[],
        category:string
        total:number
    }
    CategoryList:BlogCategory[]
    currentPage:string
    cateid:BlogCategory["cate_id"]
}
function BlogsByPage(ElegantData:Props) {
    return(
        <>
            <HeadTag title='AD110·出色'/>
            <ElegantBlogs {...ElegantData}/>
        </>
    )
}
export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>> {
    const {params:{page,cateid}} = context
    let ElegantData:Props = {
        BlogsData:{
            category:'',
            BlogList:[],
            total:0,
        },
        CategoryList:[],
        currentPage:page,
        cateid
    }
    // 如果出现页码错误直接给空
    if (Number.isNaN(parseInt(page))) return {props:{...ElegantData}}

    let [{BlogsData},{CategoryList}] = await Promise.all([
        BlogDataRequest.getBlogsByCateID(cateid,40,page),
        BlogDataRequest.getBlogCategory()
    ])
    return {
        props: {
            BlogsData:BlogsData|| ElegantData.BlogsData,
            CategoryList:CategoryList || [],
            currentPage:page,
            cateid
        },
        revalidate:revalidateTime
    }
}
export async function getStaticPaths():Promise<NextStaticPaths<{cateid:string,page:'1'}>>{
    let paths:Array<{ params: { cateid: string, page: '1' } }> = []
    BlogDataRequest.getBlogCategory().then((result:any) => {
        if (result.Ok) paths = result.CategoryList.map(({cate_id}:BlogCategory) => ({params:{cateid:cate_id,page:'1'}}))
    })
    return {
        paths,
        fallback:'blocking'
    }
}
export default BlogsByPage;