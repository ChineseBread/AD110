import {List} from 'antd'
import Link from "next/link";
import Image from "next/image";
import {getFormatTime} from "../../uitls/present/TimeUtils";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import styles from '../../styles/pages/Search.module.scss'
function BlogItem({log_id,cate_name,log_title,log_cover_image,log_intro_content,log_posttime}) {
    return (
        <List.Item
            extra={log_cover_image &&  <div className={styles.search_item_extra}><Image alt={log_title} src={BlogDataRequest.getBlogCover(log_cover_image)} height={160} width={280} layout='responsive' objectFit='cover'/></div>}
        >
            <List.Item.Meta
                title={<Link href={`/section?articleid=${log_id}`}><span className={styles.search_item_title}>{log_title}</span></Link>}
                description={`${cate_name} | ${getFormatTime(log_posttime,'YYYY-MM-DD')}`}
            />
            <div className={styles.search_item_content}>
                <Link href={`/blog?blogid=${log_id}`}>
                    <div>
                        {log_intro_content}
                    </div>
                </Link>
            </div>
        </List.Item>
    )
}

export default BlogItem;