/**
 * @description 博文列表
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
}

function Elegant(ElegantData:Props) {
    return (
        <>
            <HeadTag title='AD110·出色'/>
            <ElegantBlogs {...ElegantData}/>
        </>
    )
}
export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>> {
    const {params:{page}} = context
    let ElegantData:Props = {
        BlogsData:{
            category:'',
            BlogList:[],
            total:0,
        },
        CategoryList:[],
        currentPage:page
    }
    // 如果出现页码错误直接给空
    if (Number.isNaN(parseInt(page))) return {props:{...ElegantData}}

    let [{BlogsData},{CategoryList}] = await Promise.all([
        BlogDataRequest.getNewestBlogs(40,page),
        BlogDataRequest.getBlogCategory()
    ])

    return {
        props: {
            BlogsData:BlogsData || ElegantData.BlogsData,
            CategoryList:CategoryList || ElegantData.CategoryList,
            currentPage:page
        },
        revalidate:revalidateTime
    }
}
export async function getStaticPaths():Promise<NextStaticPaths<{page:string}>>{
    let paths = Array.from({length:3}).map((_,index) => ({params:{page:String(index + 1)}}))
    return {
        paths,
        fallback:'blocking'
    }
}
export default Elegant;