import Link from "next/link";
import {Card, Divider, Empty} from "antd";
import Image from "next/image";
import styles from '@styles/pages/Classic/Classic.module.scss'
import BlogDataRequest from "@utils/request/BlogDataRequest";
import BlogCardBanner from '@public/static/banner2.png'
const {Meta} = Card
function BlogsList({Blogs}:{Blogs:BlogData[]}) {
    return (
        <div className={styles.year_blogs_container}>
            {Blogs.length >= 1 ? Blogs.map(({log_id,log_title,log_cover_image,log_intro_content,log_allusion}) => {
                return (
                    <Link href={`/section?articleid=${log_id}`} key={log_id}>
                        <div className={styles.year_blog_item}>
                            <Card
                                hoverable
                                cover={<Image
                                    width={225}
                                    height={150}
                                    layout='responsive'
                                    alt={log_title}
                                    src={BlogDataRequest.getBlogCover(log_cover_image) || BlogCardBanner}
                                    quality={5}
                                />}
                            >
                                <Meta title={<span className={styles.year_blog_item_title}>{log_title}</span>} description={
                                    <div className={styles.year_blog_description_container}>
                                        <div className={styles.year_blog_description}>{log_intro_content}</div>
                                        <Divider style={{margin:'5px 0'}}/>
                                        <div className={styles.year_blog_info}>{`典故:${log_allusion || '暂无分类'}`}</div>
                                    </div>
                                }/>
                            </Card>
                        </div>
                    </Link>
                )
            }) : <Empty/>}
        </div>
    )
}

export default BlogsList;
