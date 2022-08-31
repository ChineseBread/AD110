/**
 * @description 博文列表
 */
import HeadTag from "@components/app/HeadTag";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import revalidateTime from "@config/revalidate";
import ElegantBlogs from "@components/elegant/ElegantBlogs";

interface Props{
    BlogsData:{
        BlogList:BlogData[],
        category:string
        total:number
    }
    CategoryList:BlogCategory[]
}
function Elegant(ElegantData:Props) {
    return (
        <>
            <HeadTag title='AD110·出色'/>
            <ElegantBlogs {...ElegantData}/>
        </>
    )
}
export async function getStaticProps():Promise<NextStaticPropsValue<Props>> {
    let ElegantData:Props = {
        BlogsData:{
            category:'',
            BlogList:[],
            total:0,
        },
        CategoryList:[]
    }
    let [{BlogsData},{CategoryList}] = await Promise.all([
        BlogDataRequest.getNewestBlogs(),
        BlogDataRequest.getBlogCategory()
    ])
    return {
        props: {
            BlogsData:BlogsData || ElegantData.BlogsData,
            CategoryList:CategoryList || ElegantData.CategoryList
        },
        revalidate:revalidateTime
    }
}
export default Elegant;