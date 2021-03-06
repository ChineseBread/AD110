import NewsList from "../../components/News/NewsList";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import NewsDataRequest from "../../uitls/request/NewsDataRequest";

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
        revalidate:21600
    }
}
export async function getStaticPaths(){
    let paths = Array.from({length:10}).map((_,index) => ({params:{page:String(index + 1)}}))
    return {paths,fallback:'blocking'}
}