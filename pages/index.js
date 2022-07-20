import {Card, Empty} from "antd";
import EditorRecommend from "../components/Global/EditorRecommend";
import HomePageHeader from "../components/HomePage/HomePageHeader";
import DataRequest from "../uitls/request/DataRequest";
import styles from '../styles/pages/HomePage.module.scss'
import Head from "next/head";
import PageBanner from "../components/App/PageBanner";
import LinkCard from "../components/App/LinkCard";
function Homepage({HomePageData: {HotClickLinkList,EditorRecommendLink,Blogs,RecommendCover,HotClickCover}}) {
    return (
        <div className='page-content font-family'>
            <Head>
                <title>AD110</title>
            </Head>
            <div className={styles.home_page_title}>
               <span className={styles.title_span}>Apple Park 内部</span>
               <span className={styles.title_span}> 先看看塑造科技未来的设计团队</span>
            </div>
            <HomePageHeader Blogs={Blogs}/>
            <EditorRecommend EditorRecommendLink={EditorRecommendLink}/>
            <PageBanner url={RecommendCover}/>
            <LinkCard title='点击排行榜TOP100'>
                {HotClickLinkList.length >= 1 ? HotClickLinkList.map(({url_id,url_name,url_value}) => {
                    return <span className='link-item' key={url_id}><a target='_blank' href={url_value}>{url_name}</a></span>
                }) : <Empty/>}
            </LinkCard>
            <PageBanner url={HotClickCover}/>
        </div>
    )
}
export async function getStaticProps() {
    let HomePageResult = await DataRequest.getHomePageData()
    let HomePageData = {Blogs:[],EditorRecommendLink:{kindList:[],kindUrls:{}},HotClickLinkList:[],RecommendCover:'',HotClickCover:''}
    HomePageResult.forEach(result => {
        if (result.Ok){
            delete result.Ok
            HomePageData = {...HomePageData,...result}
        }
    })
    return {
        props: {HomePageData},
        revalidate:1800
    }
}
export default Homepage;