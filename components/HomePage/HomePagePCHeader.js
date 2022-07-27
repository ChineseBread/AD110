import {Fragment} from 'react'
import {Carousel} from "antd";
import Image from 'next/image'
import {CommentOutlined,LikeOutlined} from "@ant-design/icons";
import Link from "next/link";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import styles from '../../styles/pages/HomePage/PCHeader.module.scss'
import banner2 from '../../public/static/banner2.png'
import banner1 from '../../public/static/banner1.png'
function HomePagePCHeader({News,Articles,Hot,Race,Recruit}) {
    return (
        <div className={styles.home_page_news_container}>
            <NewsCarousel Blogs={Hot}/>
            <DetailedNews Blogs={Articles}/>
            <ConciseNews News={News} Race={Race} Recruit={Recruit}/>
        </div>
    )
}
// 竖直图片滚动图
function NewsCarousel({Blogs}){
    return (
        <div className={styles.vertical}>
            <Carousel autoplay speed={700} autoplaySpeed={2000} pauseOnHover={true}>
                {Blogs.map(({log_id,log_title,log_author,log_cover_image,log_poster}) => {
                    return (
                        <Link key={log_id} href={`/section?articleid=${log_id}`}>
                            <div className={styles.news_container} >
                                <div className={styles.news_content}>
                                    <span>{log_title}</span>
                                    <span>By {log_author    }</span>
                                </div>
                                <Image
                                    src={BlogDataRequest.getBlogCover(log_poster || log_cover_image) || banner1}
                                    priority={true}
                                    alt={log_title}
                                    width={420}
                                    height={600}
                                    layout='responsive'
                                    objectFit='cover'
                                />
                            </div>
                        </Link>
                    )
                })}
            </Carousel>
        </div>
    )
}
// 竖直的详细新闻资讯图
function DetailedNews({Blogs}){
    return(
        <div className={styles.detailed}>
            {Blogs.map(({log_id,cate_name,log_comm_nums,log_title,log_author,log_cover_image,log_like_nums}) => {
                return (
                    <Fragment key={log_id}>
                        <Link href={`/section?articleid=${log_id}`}>
                            <div className={styles.detailed_item}>
                                <div className={styles.detailed_item_img}>
                                    <Image
                                      src={BlogDataRequest.getBlogCover(log_cover_image) || banner2}
                                      priority={true}
                                      alt={log_title}
                                      height={170}
                                      width={250}
                                      layout='responsive'
                                    />
                                </div>
                                <div className={styles.detailed_content}>
                                    <div className={styles.detailed_title}>{log_title}</div>
                                    <div className={styles.detailed_description}>
                                      <div>
                                          <span className={styles.from}>{cate_name.substring(0,2)}</span>
                                          <span className={styles.comment}><CommentOutlined/>{log_comm_nums}</span>
                                          <span className={styles.comment}><LikeOutlined />{log_like_nums}</span>
                                      </div>
                                      <div>
                                          <span className={styles.author}>{`by ${log_author}`}</span>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Fragment>
                )
            })}
        </div>
    )
}
// 简要咨询列表
function ConciseNews({News,Race,Recruit}){
    return(
        <div className={styles.concise}>
            {News.map(({log_id,log_title}) => {
                return (
                   <Fragment key={log_id}>
                       <div className={styles.concise_item}>
                           <Link href={`/section?articleid=${log_id}`}>{log_title}</Link>
                       </div>
                   </Fragment>
                )
            })}
            <div className={styles.concise_divider}><span>竞赛</span><span/></div>
            {Race.map(({log_id,log_title}) => {
                return (
                    <Fragment key={log_id}>
                        <div className={styles.concise_item}>
                            <Link href={`/section?articleid=${log_id}`}>{log_title}</Link>
                        </div>
                    </Fragment>
                )
            })}
            <div className={styles.concise_divider}><span>招聘</span><span/></div>
            {Recruit.map(({log_id,log_title}) => {
                return (
                    <Fragment key={log_id}>
                        <div className={styles.concise_item}>
                            <Link href={`/section?articleid=${log_id}`}>{log_title}</Link>
                        </div>
                    </Fragment>
                )
            })}
        </div>
    )
}

export default HomePagePCHeader;