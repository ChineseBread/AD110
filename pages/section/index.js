import {Divider} from "antd";
import Image from "next/image";
import BlogCommentsList from "../../components/blog/BlogCommentsList";
import BlogAction from "../../components/blog/BlogAction";
import BlogRecommend from "../../components/blog/BlogRecommend";
import {getFormatTime} from "../../uitls/present/TimeUtils";
import HeadTag from "../../components/app/HeadTag";
import DataRequest from "../../uitls/request/DataRequest";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import banner from '../../public/static/banner3.jpg'
import ContentStyle from '../../styles/pages/BlogPreview/NewsOrBlog.module.scss'
import {useRouter} from "next/router";

//博客预览界面
function BlogPreview({BlogPreviewData:{BlogData:{log_cate_id,log_id,log_title,cate_name,log_cover_image,log_author,log_content,log_posttime,log_intro_content,log_comm_nums,log_view_nums,log_like_nums,comm_hide_switch},CommentsData,Recommend}}) {
    const router = useRouter()
    return (
        <div className='page-content'>
            <HeadTag title={log_title}/>
            <div className={ContentStyle.header}>
                <Image
                    src={BlogDataRequest.getBlogCover(log_cover_image) || banner}
                    layout='fill'
                    objectFit='cover'
                    alt={log_title}
                    unoptimized={true}
                />
                <div className={ContentStyle.title_container}>
                    <span className={`${ContentStyle.title} font-family`}>{log_title}</span>
                </div>
            </div>
            <div className={ContentStyle.info}>
                <span onClick={() => router.push('/elegant')}>AD110·出色</span> {'>'} <span onClick={() => router.push(`/elegant/1/${log_cate_id}`)}>{cate_name}</span>
            </div>
            <div className={ContentStyle.intro} dangerouslySetInnerHTML={{__html:log_intro_content}}/>
            <div className={ContentStyle.bread}>
                <span>文: {log_author || 'AD110'}</span>
                <span>{`发布于 ${log_posttime || getFormatTime(new Date() / 1000,'YYYY-MM-DD HH:mm:ss')}`}</span>
            </div>
            <div className={`${ContentStyle.ubb_content} ubb-img`} dangerouslySetInnerHTML={{__html:log_content}}/>
            <Divider style={{margin:'20px 0 5px 0'}}/>
            <BlogAction {...{log_comm_nums,log_view_nums,log_like_nums,log_id}}/>
            <Divider style={{margin:'5px 0'}}/>
            {!comm_hide_switch && <BlogCommentsList {...{log_id, ...CommentsData}}/>}
            <BlogRecommend Recommend={Recommend}/>
        </div>
    )
}
export async function getServerSideProps(context){
    const {query:{articleid},res} = context
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=5'
    )
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
            log_comm_nums:'',
            Recommend:[]
        },
        CommentsData:{
            CommentsList: [],
            total:0
        },
    }
    if(isNaN(parseInt(articleid))) return {notFound:true}
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