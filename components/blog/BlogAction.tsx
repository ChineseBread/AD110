import {EyeFilled, LikeFilled, MessageFilled,} from "@ant-design/icons";
import {message} from "antd";
import styles from '@styles/pages/BlogPreview/BlogPreview.module.scss'
import UserOperation from "@utils/request/UserOperation";
interface Props{
    log_comm_nums:BlogInfoData['log_comm_nums']
    log_view_nums:BlogInfoData['log_view_nums']
    log_like_nums:BlogInfoData['log_like_nums']
    log_id:BlogInfoData['log_id']
}
function BlogAction({log_comm_nums,log_view_nums,log_like_nums,log_id}:Props) {
    const likeBlog = () => {
        UserOperation.likeBlog(log_id).then(result => {
            message[result.Ok ? 'success' : 'warn'](result.Msg)
        })
    }
    return (
        <div className={styles.blog_info_container}>
            <div>
                <div className={styles.blog_statstic}>
                    <span><EyeFilled /> 浏览</span>
                    <span>{log_view_nums}</span>
                </div>
                <div className={styles.blog_statstic}>
                    <span><LikeFilled /> 点赞</span>
                    <span>{log_like_nums}</span>
                </div>
                <div className={styles.blog_statstic}>
                    <span><MessageFilled /> 评论</span>
                    <span>{log_comm_nums}</span>
                </div>
            </div>
            <div className={styles.blog_like} onClick={likeBlog}>
                <span>点赞文章</span>
            </div>
        </div>
    )
}

export default BlogAction;