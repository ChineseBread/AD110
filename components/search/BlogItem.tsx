import {List} from 'antd'
import styles from '@styles/pages/Search.module.scss'
import {getFormatTime} from "@utils/present/TimeUtils";
function BlogItem({log_id,cate_name,log_title,log_cover_image,log_intro_content,log_posttime}:BlogData) {
    return (
        <List.Item
            // extra={log_cover_image &&  <div className={styles.search_item_extra}><Image alt={log_title} src={BlogDataRequest.getBlogCover(log_cover_image)} layout='fill' objectFit='cover'/></div>}
        >
            <List.Item.Meta
                title={<a target='_blank' rel='noreferrer' href={`/section?articleid=${log_id}`}><span className={styles.search_item_title}>{log_title}</span></a>}
                description={`${cate_name} | ${getFormatTime(log_posttime,'YYYY-MM-DD')}`}
            />
            <div className={styles.search_item_content}>
                <a target='_blank' rel='noreferrer' href={`/section?articleid=${log_id}`}>
                    <span>
                        {log_intro_content}
                    </span>
                </a>
            </div>
        </List.Item>
    )
}

export default BlogItem;