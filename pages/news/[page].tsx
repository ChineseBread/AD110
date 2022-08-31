import NewsList from "@components/news/NewsList";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import NewsDataRequest from "@utils/request/NewsDataRequest";
import revalidateTime from "@config/revalidate";

interface Props {
    NewsData:{
        NewsList:NewsData[]
        total:number
    }
    CategoryList:BlogCategory[]
    currentPage:string
}
function NewsByPage(NewsData:Props) {
    return <NewsList {...NewsData}/>
}
export default NewsByPage;

export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>> {
    const {params:{page}} = context;
    let InitialData:Props = {
        NewsData:{NewsList:[],total:0},
        CategoryList:[],
        currentPage:page
    }
    if (Number.isNaN(parseInt(page))) return {props:InitialData}
    let [{CategoryList},{NewsData}] = await Promise.all([
        BlogDataRequest.getBlogCategory(),
        NewsDataRequest.getLatestNews(20,page)
    ])
    
    return {
        props: {
            NewsData:NewsData || InitialData.NewsData,
            CategoryList:CategoryList || [],
            currentPage:page
        },
        revalidate:revalidateTime
    }
}
export async function getStaticPaths():Promise<NextStaticPaths<{page:string}>>{
    let paths = Array.from({length:3}).map((_,index) => ({params:{page:String(index + 1)}}))
    return {paths,fallback:'blocking'}
}