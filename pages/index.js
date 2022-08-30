import {Fragment, useContext} from "react";
import {Empty} from "antd";
import Link from "next/link";
import ScreenContext from "../store/ScreenContext";
import EditorRecommend from "../components/Global/EditorRecommend";
import PageBanner from "../components/Global/PageBanner";
import LinkCard from "../components/Global/LinkCard";
import Image from "next/image";
import HomePagePCHeader from "../components/HomePage/HomePagePCHeader";
import HomePagePhoneHeader from "../components/HomePage/HomePagePhoneHeader";
import CustomHeadTag from "../components/App/CustomHeadTag";
import styles from '../styles/pages/HomePage/HomePage.module.scss'
import CoverDataRequest from "../uitls/request/CoverDataRequest";
import DataRequest from "../uitls/request/DataRequest";
import UrlBanner from '../public/static/logo.png'
import revalidateTime from "../config/revalidate";
function Homepage({HomePageData: {HotClickLinkList,EditorRecommendLink,HomePageBlogs:{Top,News,Articles,Hot,Race,Recruit},AuthorRecommend,RecommendCover,HotClickCover,HomePageFooterCover}}) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <Fragment>
            <CustomHeadTag title='AD110'/>
            <div className={styles.home_page_title}>
                <Link href={`/section?articleid=${Top.log_id}`}>
                    <span className={styles.title_span}>{Top.log_title}</span>
                </Link>
            </div>
            <div className='page-content font-family'>
                {isPhone ?
                <HomePagePhoneHeader
                    Hot={Hot}
                    Articles={Articles.slice(0,2)}
                    News={News}
                    Recruit={Recruit}
                /> : <HomePagePCHeader
                    News={News}
                    Articles={Articles}
                    Hot={Hot}
                    Race={Race}
                    Recruit={Recruit}
                />}
                <EditorRecommend EditorRecommendLink={EditorRecommendLink}/>
                <PageBanner url={RecommendCover}/>
                <LinkCard title='点击排行榜TOP100'>
                    {HotClickLinkList.length >= 1 ? HotClickLinkList.map(({url_id,url_name,url_value}) => {
                        return <span className='link-item' key={url_id}><a target='_blank'  rel="noreferrer" href={url_value}>{url_name}</a></span>
                    }) : <Empty/>}
                </LinkCard>
                <PageBanner url={HotClickCover}/>
                <div className={styles.home_page_url_container} id='recommend'>
                    {AuthorRecommend.map(({url_name,url_value,logo_image,url_info,url_id}) => {
                        return (
                            <div className={styles.home_page_url_item} key={url_id}>
                                <a href={url_value} target='_blank' rel='noreferrer'>
                                    <div className={styles.logo_container}>
                                        <Image
                                            src={CoverDataRequest.getCoverByUrl(logo_image) || UrlBanner}
                                            priority={false}
                                            layout='fill'
                                            quality={10}
                                        />
                                    </div>
                                    <div className={styles.url_info_container}>
                                        <div>{url_name}</div>
                                        <div>
                                            <span style={{fontStyle:'italic',textDecoration:'underline'}}>推荐理由: </span>
                                            <span>{url_info}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )

                    })}
                </div>
                <PageBanner url={HomePageFooterCover}/>
            </div>
        </Fragment>
    )
}
export async function getStaticProps() {
    let HomePageResult = await DataRequest.getHomePageData()
    let HomePageData = {
        HomePageBlogs:{Top:{log_title:'',log_id:''},Hot:[],Articles:[],News:[],Race:[],Recruit:[]},
        EditorRecommendLink:{kindList:[],kindUrls:{}},
        HotClickLinkList:[],
        AuthorRecommend:[],
        RecommendCover:'',
        HotClickCover:'',
        HomePageFooterCover:''
    }
    HomePageResult.forEach(result => {
        if (result.Ok){
            delete result.Ok
            HomePageData = {...HomePageData,...result}
        }
    })
    return {
        props: {HomePageData},
        revalidate:revalidateTime,
    }
}
export default Homepage;
