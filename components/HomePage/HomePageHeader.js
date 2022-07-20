import {Fragment, useContext} from 'react'
import Image from 'next/image'
import {Carousel, Divider} from "antd";
import Link from "next/link";
import styles from '../../styles/pages/HomePage.module.scss'
import banner1 from '../../public/static/banner1.png'
import banner2 from '../../public/static/banner2.png'
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import ScreenContext from "../../store/ScreenContext";
import {CommentOutlined,LikeOutlined} from "@ant-design/icons";
function HomePageHeader({Blogs}) {
    return (
        <div className={styles.home_page_news_container}>
            <NewsCarousel Blogs={Blogs.slice(0,3)}/>
            <DetailedNews Blogs={Blogs.slice(3,6)}/>
            <ConciseNews Blogs={Blogs.slice(6,18)}/>
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
                        <Link key={log_id} href={`/blog?blogid=${log_id}`}>
                            <div className={styles.news_container} >
                                <div className={styles.news_content}>
                                    <span>{log_title}</span>
                                    <span>By {log_author}</span>
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
            {Blogs.map(({log_id,log_from,log_comm_nums,log_title,log_author,log_cover_image,log_like_nums}) => {
                return (
                  <Fragment key={log_id}>
                      <Link  href={`/blog?blogid=${log_id}`}>
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
                                          <span className={styles.from}>{log_from.replace(/AD110·/,'')}</span>
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
function ConciseNews({Blogs}){
    const {isPhone} = useContext(ScreenContext)
    return(
        <div className={styles.concise}>
            {Blogs.map(({log_id,log_title,cate_name},index) => {
                return (
                   <Fragment key={log_id}>
                       <div  className={styles.concise_item}>
                           <Link href={`/blog?blogid=${log_id}`}>{log_title}</Link>
                       </div>
                       {(index === 3 || index === 7) && !isPhone && <div className={styles.concise_divider}><span>{(cate_name || '').substring(0,2)}</span><span/></div>}
                   </Fragment>
                )
            })}
        </div>
    )
}

export default HomePageHeader;