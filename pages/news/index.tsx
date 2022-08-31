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
}
function News(NewsData:Props) {
    return <NewsList {...NewsData}/>
}
export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>> {
    let InitialData:Props = {
       NewsData:{
           NewsList:[],
           total:0
       },
        CategoryList:[],
    }
    let [{CategoryList},{NewsData}] = await Promise.all([
        BlogDataRequest.getBlogCategory(),
        NewsDataRequest.getLatestNews()
    ])
    return {
        props: {
            NewsData:NewsData || InitialData.NewsData,
            CategoryList: CategoryList || []
        },
        revalidate:revalidateTime
    }
}
export default News;