import NewsList from "../../components/news/NewsList";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import NewsDataRequest from "../../uitls/request/NewsDataRequest";
import revalidateTime from "../../config/revalidate";

function NewsByPage({NewsDataObj}) {
    return <NewsList {...NewsDataObj}/>
}

export default NewsByPage;
export async function getStaticProps(context) {
    const {params:{page}} = context;
    let NewsDataObj = {
        NewsData:{News:[],total:0},
        BlogCategory:[],
        currentPage:page
    }
    if (Number.isNaN(parseInt(page))) return NewsDataObj
    let NewsResult = await Promise.all([
        BlogDataRequest.getBlogCategory(),
        NewsDataRequest.getLatestNews(20,page)
    ])
    NewsResult.forEach(result => {
        if (result.Ok){
            delete result.Ok
            NewsDataObj = {...NewsDataObj,...result}
        }
    })
    return {
        props: {NewsDataObj},
        revalidate:revalidateTime
    }
}
export function getStaticPaths(){
    let paths = Array.from({length:2}).map((_,index) => ({params:{page:String(index + 1)}}))
    return {paths,fallback:'blocking'}
}