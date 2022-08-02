import NewsList from "../../components/News/NewsList";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import NewsDataRequest from "../../uitls/request/NewsDataRequest";
import revalidateTime from "../../config/revalidate";

function News({NewsDataObj}) {
    return <NewsList {...NewsDataObj}/>
}
export async function getStaticProps(context) {
    let NewsDataObj = {
        NewsData:{News:[],total:0},
        BlogCategory:[],
    }
    let NewsResult = await Promise.all([
        BlogDataRequest.getBlogCategory(),
        NewsDataRequest.getLatestNews()
    ])
    NewsResult.forEach(result => {
        if (result.Ok){
            delete result.Ok
            NewsDataObj = {...NewsDataObj,...result}
        }
    })
    return {
        props: {NewsDataObj},revalidate:revalidateTime
    }
}
export default News;