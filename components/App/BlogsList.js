import React from 'react';
import styles from "../../styles/components/BlogsList.module.scss";
import Link from "next/link";
import {Card} from "antd";
import Image from "next/image";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import banner2 from "../../public/static/banner2.png";
import {CommentOutlined, LikeOutlined} from "@ant-design/icons";
import {getTimeFromNow} from "../../uitls/present/TimeUtils";
const {Meta} = Card
function BlogsList({Blogs}) {
    return (
        <div className={styles.blogs_container}>
            {Blogs.map(({log_id,log_title,log_from,log_posttime,cate_name,log_cover_image,log_comm_nums,log_like_nums},index) => {
                return (
                    <Link href={`/blog?blogid=${log_id}`} key={log_id}>
                        <div className={styles.blog_item}>
                            <Card
                                hoverable
                                cover={
                                    <Image
                                        src={BlogDataRequest.getBlogCover(log_cover_image) || banner2}
                                        priority={index <= 11}
                                        width={225}
                                        height={150}
                                        layout='responsive'
                                        alt={log_title}
                                    />
                                }
                            >
                                <Meta title={<span className={styles.blog_title}>{log_title}</span>} description={
                                    <div className={styles.blog_description}>
                                        <div>
                                            <span>{(log_from || '').replace(/AD110·|ad110.com·/,'') || (cate_name || '').substring(0,2)}</span>
                                            <span><CommentOutlined/>{log_comm_nums}</span>
                                            <span><LikeOutlined/>{log_like_nums}</span>
                                        </div>
                                        <div>
                                            <span>{getTimeFromNow(log_posttime)}</span>
                                        </div>
                                    </div>
                                } />
                            </Card>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default BlogsList;