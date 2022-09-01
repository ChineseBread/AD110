import {Fragment, useContext} from "react";
import {Empty} from "antd";
import Link from "next/link";
import Image from 'next/image'
import ScreenContext from "@store/ScreenContext";
import HeadTag from "@components/app/HeadTag";
import styles from '@styles/pages/HomePage/HomePage.module.scss'
import PageBanner from "@components/global/PageBanner";
import RecommendLinkList from "@components/library/RecommendLinkList";
import LinkCard from "@components/library/LinkCard";
import CoverDataRequest from "@utils/request/CoverDataRequest";
import UrlBanner from '@public/static/logo.png'
import revalidateTime from "@config/revalidate";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import LinkDataRequest from "@utils/request/LinkDataRequest";
import PhoneHeader from "@components/homepage/PhoneHeader";
import PCHeader from "@components/homepage/PCHeader";
declare type BlogDomain = 'Top' | 'News' | 'Articles' | 'Hot' | 'Race' | 'Recruit'
interface Props{
    HotClickLinkList:BlogLink[]
    EditorRecommendLinkList:BlogLink[]
    BlogList:{
        Top:BlogData
        News:BlogData[]
        Articles:BlogData[]
        Hot:BlogData[]
        Race:BlogData[]
        Recruit:BlogData[]
    }
    AuthorRecommendLinkList:BlogLink[]
    RecommendBanner:string
    HotClickBanner:string
    HomePageFooterBanner:string
}
function Homepage({HotClickLinkList,EditorRecommendLinkList,BlogList:{Top,News,Articles,Hot,Race,Recruit},AuthorRecommendLinkList,RecommendBanner,HotClickBanner,HomePageFooterBanner}:Props) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <Fragment>
            <HeadTag title='AD110'/>
            <div className={styles.home_page_title}>
                <Link href={`/section?articleid=${Top.log_id}`}>
                    <span className={styles.title_span}>{Top.log_title}</span>
                </Link>
            </div>
            <div className='page-content font-family'>
                {isPhone ?
                <PhoneHeader
                    Hot={Hot}
                    Articles={Articles.slice(0,2)}
                    News={News}
                    Recruit={Recruit}
                /> : <PCHeader
                    News={News}
                    Articles={Articles}
                    Hot={Hot}
                    Race={Race}
                    Recruit={Recruit}
                />}
                <RecommendLinkList EditorRecommendLinkList={EditorRecommendLinkList}/>
                <PageBanner url={RecommendBanner}/>
                <LinkCard title='点击排行榜TOP100'>
                    {HotClickLinkList.length >= 1 ? HotClickLinkList.map(({url_id,url_name,url_value}) => {
                        return <span className='link-item' key={url_id}><a target='_blank'  rel="noreferrer" href={url_value}>{url_name}</a></span>
                    }) : <Empty/>}
                </LinkCard>
                <PageBanner url={HotClickBanner}/>
                <div className={styles.home_page_url_container} id='recommend'>
                    {AuthorRecommendLinkList.map(({url_name,url_value,logo_image,url_info,url_id}) => {
                        return (
                            <div className={styles.home_page_url_item} key={url_id}>
                                <a href={url_value} target='_blank' rel='noreferrer'>
                                    <div className={styles.logo_container}>
                                        <Image
                                            src={CoverDataRequest.getCoverByUrl(logo_image) || UrlBanner}
                                            priority={false}
                                            layout='fill'
                                            quality={5}
                                            alt={url_name}
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
                <PageBanner url={HomePageFooterBanner}/>
            </div>
        </Fragment>
    )
}
export async function getStaticProps():Promise<NextStaticPropsValue<Props>>{
    let [{HomePageBlogs:BlogList},{EditorRecommendLinkList},{AuthorRecommendLinkList},{HotClickLinkList},{RecommendBanner},{HotClickBanner},{HomePageFooterBanner}] = await Promise.all([
        BlogDataRequest.getHomePageBlogs<Props['BlogList']>(),
        LinkDataRequest.getEditorRecommendLink(40),
        LinkDataRequest.getAuthorRecommendLink(20),
        LinkDataRequest.getHotClickLink(100),
        CoverDataRequest.getRecommendBanner(),
        CoverDataRequest.getHotClickBanner(),
        CoverDataRequest.getHomePageFooterBanner()
    ])
    let initial:any = {}
    return {
        props: {
            BlogList:BlogList || initial,
            EditorRecommendLinkList:EditorRecommendLinkList || [],
            AuthorRecommendLinkList:AuthorRecommendLinkList || [],
            HotClickLinkList:HotClickLinkList || [],
            RecommendBanner:RecommendBanner || '',
            HotClickBanner:HotClickBanner || '',
            HomePageFooterBanner:HomePageFooterBanner || ''
        },
        revalidate:revalidateTime,
    }
}
export default Homepage;
