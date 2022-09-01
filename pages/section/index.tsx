import {Divider} from "antd";
import Image from "next/image";
import banner from '@public/static/banner3.jpg'
import ContentStyle from '@styles/pages/BlogPreview/NewsOrBlog.module.scss'
import {getFormatTime} from "@utils/present/TimeUtils";
import HeadTag from "@components/app/HeadTag";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import BlogCommentsList from "@components/blog/BlogCommentsList";
import BlogRecommend from "@components/blog/BlogRecommend";
import BlogAction from "@components/blog/BlogAction";
import {useRouter} from "next/router";
interface Props{
    BlogData:Omit<BlogInfoData,'has_pic' | 'archived' | 'has_poster' | 'log_allusion' | 'log_modify' | 'log_quote' | 'log_from' | 'log_cover_id' | 'log_poster_image'>
    CommentsData:{
        CommentsList:BlogComment[]
        total:number
    }
    Recommend:BlogData[]
}
//博客预览界面
function BlogPreview({BlogData:{log_cate_id,log_id,log_title,cate_name,log_cover_image,log_author,log_content,log_posttime,log_intro_content,log_comm_nums,log_view_nums,log_like_nums,log_discomment_switch},CommentsData,Recommend}:Props) {
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
                    quality={1}
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
                <span>{`发布于 ${log_posttime || getFormatTime(new Date().getTime() / 1000,'YYYY-MM-DD HH:mm:ss')}`}</span>
            </div>
            <div className={`${ContentStyle.ubb_content} ubb-img`} dangerouslySetInnerHTML={{__html:log_content}}/>
            <Divider style={{margin:'20px 0 5px 0'}}/>
            <BlogAction {...{log_comm_nums,log_view_nums,log_like_nums,log_id}}/>
            <Divider style={{margin:'5px 0'}}/>
            {!log_discomment_switch && <BlogCommentsList {...{log_id, ...CommentsData}}/>}
            <BlogRecommend Recommend={Recommend}/>
        </div>
    )
}
export async function getServerSideProps(context:any):Promise<NextStaticPropsValue<Props>>{
    const {query:{articleid},req,res} = context
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=5'
    )
    let BlogPreviewData:Props = {
        BlogData:{
            log_cate_id:'',
            log_id:'',
            log_title:'',
            cate_name:'',
            log_cover_image:'',
            log_author:'',
            log_content:'',
            log_posttime:'',
            log_intro_content:'',
            log_comm_nums:0,
            log_view_nums:0,
            log_like_nums:0,
            log_discomment_switch:0
        },
        Recommend:[],
        CommentsData:{
            CommentsList: [],
            total:0
        },
    }
    if(isNaN(parseInt(articleid))) return {notFound:true}
    let [result,{CommentsData}] = await Promise.all([
        BlogDataRequest.getBlogPreviewDataByBlogID(articleid),
        BlogDataRequest.getBlogCommentsByBlogID(articleid)
    ])
    if (!result.Ok) return {notFound:true}
    const {PreviewData,Recommend} = result
    return{
        props:{
            BlogData:PreviewData || BlogPreviewData.BlogData,
            Recommend:Recommend || [],
            CommentsData:CommentsData || BlogPreviewData.CommentsData
        }
    }
}
export default BlogPreview;