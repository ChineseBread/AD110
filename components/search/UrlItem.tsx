import {List} from "antd";
import styles from "@styles/pages/Search.module.scss";
import {getFormatTime} from "@utils/present/TimeUtils";

function UrlItem({url_name,url_value,url_info,url_time}:BlogLink) {
    return (
        <List.Item
        >
            <List.Item.Meta
                title={<a target='_blank' rel="noreferrer" href={url_value}><span className={styles.search_item_title}>{url_name}</span></a>}
                description={`${getFormatTime(url_time,'YYYY-MM-DD')}`}
            />
            <div className={styles.search_item_content}>
                <a href={url_value} target='_blank' rel='noreferrer'>
                    <span>{url_info}</span>
                </a>
            </div>
        </List.Item>
    )
}

export default UrlItem;