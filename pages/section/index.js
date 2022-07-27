import {Divider} from "antd";
import Image from "next/image";
import Link from "next/link";
import BlogCommentsList from "../../components/Blog/BlogCommentsList";
import BlogAction from "../../components/Blog/BlogAction";
import BlogRandom from "../../components/Blog/BlogRandom";
import {getFormatTime} from "../../uitls/present/TimeUtils";
import CustomHeadTag from "../../components/App/CustomHeadTag";
import DataRequest from "../../uitls/request/DataRequest";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import banner from '../../public/static/banner3.png'
import ContentStyle from '../../styles/pages/BlogPreview/NewsOrBlog.module.scss'

//博客预览界面
function BlogPreview({BlogPreviewData:{BlogData:{log_cate_id,log_id,log_title,cate_name,log_cover_image,log_author,log_content,log_posttime,log_from,log_intro_content,log_comm_nums,log_view_nums,log_like_nums},CommentsData,RandomBlogs}}) {
    return (
        <div className='page-content'>
            <CustomHeadTag title={log_title}/>
            <div className={ContentStyle.header}>
                <Image
                    src={BlogDataRequest.getBlogCover(log_cover_image) || banner}
                    layout='fill'
                    objectFit='cover'
                    alt={log_title}
                />
                <div className={ContentStyle.title_container}>
                    <span className={`${ContentStyle.title} font-family`}>{log_title}</span>
                </div>
            </div>
            <div className={ContentStyle.info}>
                <Link href='/'><span>AD110</span></Link> {'>'} <Link href={`/elegant?cateid=${log_cate_id}`}><span>{cate_name}</span></Link>
            </div>
            <div className={ContentStyle.intro} dangerouslySetInnerHTML={{__html:log_intro_content}}/>
            <div className={ContentStyle.bread}>
                <span>文: {log_from || 'AD110'}</span>
                <span>{`发布于 ${log_posttime || getFormatTime(new Date() / 1000,'YYYY-MM-DD HH:mm:ss')}`}</span>
            </div>
            <div className={`${ContentStyle.ubb_content} ubb-img`} dangerouslySetInnerHTML={{__html:log_content}}/>
            <Divider style={{margin:'20px 0 5px 0'}}/>
            <BlogAction {...{log_comm_nums,log_view_nums,log_like_nums,log_id}}/>
            <Divider style={{margin:'5px 0'}}/>
            <BlogCommentsList {...{log_id,...CommentsData}}/>
            <BlogRandom RandomBlogs={RandomBlogs}/>
        </div>
    )
}
export async function getServerSideProps(context){
    const {query:{articleid}} = context
    let BlogPreviewData = {
        BlogData:{
            log_id:'',
            log_title:'',
            cate_name:'',
            log_cover_image:'',
            log_author:'',
            log_from:'',
            log_content:'',
            log_posttime:'',
            log_view_nums:'',
            log_like_nums:'',
            log_comm_nums:''
        },
        CommentsData:{
            CommentsList: [],
            total:0
        },
        RandomBlogs:[]
    }
    let BlogPreviewResult = await DataRequest.getBlogsPreviewData(articleid)
    BlogPreviewResult.forEach(result => {
        if (result.Ok){
            delete result.Ok
            BlogPreviewData = {...BlogPreviewData,...result}
        }
    })
    return{
        props:{BlogPreviewData}
    }
}
export default BlogPreview;