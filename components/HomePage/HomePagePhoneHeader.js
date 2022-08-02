import React, {Fragment} from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../../styles/pages/HomePage/PhoneHeader.module.scss'
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import VerticalBanner from "../../public/static/banner1.png";
import banner from '../../public/static/banner2.png'
import {Carousel} from "antd";
function HomePagePhoneHeader({Hot,Articles,News,Recruit}) {
    return (
        <div className={styles.home_page_news_container}>
            <ConciseNews News={News} Recruit={Recruit}/>
            <div className={styles.vertical}>
                <NewsCarousel Hot={Hot}/>
                <NewsVertical Articles={Articles}/>
            </div>
        </div>
    )
}
function NewsCarousel({Hot}){
    return(
        <Carousel dots={false} autoplay speed={700} autoplaySpeed={2000} pauseOnHover={true}>
            {Hot.map(({log_id,log_title,log_author,log_cover_image,log_poster_image}) => {
                return (
                    <Link key={log_id} href={`/section?articleid=${log_id}`}>
                        <div className={styles.left_item}>
                            <div className={styles.news_content}>
                                <span>{log_title}</span>
                                <span>By {log_author}</span>
                            </div>
                            <Image
                                src={BlogDataRequest.getBlogCover(log_poster_image || log_cover_image) || VerticalBanner}
                                priority={true}
                                alt={log_title}
                                objectFit='cover'
                                layout='fill'
                            />
                        </div>
                    </Link>
                )
            })}
        </Carousel>
    )
}
function NewsVertical({Articles}){
    return (
        <div className={styles.right_container}>
            {Articles.map(({log_id,log_title,log_cover_image,log_poster}) => {
                return (
                    <Link key={log_id} href={`/section?articleid=${log_id}`}>
                        <div className={styles.right_item}>
                            <div className={styles.news_content}>
                                <span>{log_title}</span>
                            </div>
                            <Image
                                src={BlogDataRequest.getBlogCover(log_poster || log_cover_image) || banner}
                                priority={true}
                                alt={log_title}
                                objectFit='cover'
                                layout='fill'
                            />
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
function ConciseNews({News,Recruit}){
    return(
        <div className={styles.concise}>
            {News.map(({log_id,log_title}) => {
                return (
                    <div key={log_id} className={styles.concise_item}>
                        <Link href={`/section?articleid=${log_id}`}>{log_title}</Link>
                    </div>
                )
            })}
            {Recruit.map(({log_id,log_title}) => {
                return (
                    <div key={log_id} className={styles.concise_item}>
                        <Link href={`/section?articleid=${log_id}`}>{log_title}</Link>
                    </div>
                )
            })}
        </div>
    )
}
export default HomePagePhoneHeader;