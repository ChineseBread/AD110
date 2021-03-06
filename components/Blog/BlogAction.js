import {EyeFilled, LikeFilled, MessageFilled,} from "@ant-design/icons";
import styles from '../../styles/pages/BlogPreview/BlogPreview.module.scss'
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import {message} from "antd";
function BlogAction({log_comm_nums,log_view_nums,log_like_nums,log_id}) {
    const likeBlog = () => {
        BlogDataRequest.likeBlog(log_id).then(result => {
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