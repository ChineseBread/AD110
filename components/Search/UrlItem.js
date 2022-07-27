import {List} from "antd";
import {getFormatTime} from "../../uitls/present/TimeUtils";
import styles from "../../styles/pages/Search.module.scss";

function UrlItem({url_name,url_value,url_info,url_time}) {
    return (
        <List.Item
        >
            <List.Item.Meta
                title={<a target='_blank'  rel="noreferrer" href={url_value}><span className={styles.search_item_title}>{url_name}</span></a>}
                description={`${getFormatTime(url_time,'YYYY-MM-DD')}`}
            />
            <div className={styles.search_item_content}>
                {url_info}
            </div>
        </List.Item>
    )
}

export default UrlItem;