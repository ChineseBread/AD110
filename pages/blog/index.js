import {Divider} from "antd";
import Image from "next/image";
import {
    FacebookOutlined,
    GooglePlusOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    TwitterOutlined
} from "@ant-design/icons";
import {UbbToHtml,UBBToIntro} from "../../uitls/present/UBBUtils";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import ContentStyle from '../../styles/pages/NewsOrBlog.module.scss'
import banner from '../../public/static/banner3.png'
import BlogCommentsList from "../../components/Blog/BlogCommentsList";
import Head from "next/head";
import BlogAction from "../../components/Blog/BlogAction";
import DataRequest from "../../uitls/request/DataRequest";
import BlogRandom from "../../components/Blog/BlogRandom";

//博客预览界面
function BlogPreview({BlogPreviewData:{BlogData:{log_id,log_title,cate_name,log_cover_image,log_author,log_content,log_posttime,log_from,log_intro_content,log_comm_nums,log_view_nums,log_like_nums,archived},CommentsData,RandomBlogs}}) {
    return (
        <div className='page-content font-family'>
            <Head>
                <title>{log_title}</title>
            </Head>
            <div className={ContentStyle.header}>
                <Image
                    src={BlogDataRequest.getBlogCover(log_cover_image) || banner}
                    layout='fill'
                    objectFit='cover'
                    alt={log_title}
                    quality={10}
                />
                <span className={ContentStyle.title}>{log_title}</span>
            </div>
            <div className={ContentStyle.info}>
                <span>{`${log_author} > ${cate_name}`}</span>
            </div>
            <div className={ContentStyle.intro} dangerouslySetInnerHTML={{__html:UBBToIntro(log_intro_content)}}/>
            <div className={ContentStyle.bread}>
                <span>文: {log_from}</span>
                <span>{`发布于 ${log_posttime}`}</span>
            </div>
            <div className={ContentStyle.bread}>
                <TwitterOutlined style={{fontSize:18,margin:'0 10px'}}/>
                <FacebookOutlined style={{fontSize:18,margin:'0 10px'}}/>
                <InstagramOutlined style={{fontSize:18,margin:'0 10px'}}/>
                <LinkedinOutlined style={{fontSize:18,margin:'0 10px'}}/>
                <GooglePlusOutlined style={{fontSize:18,margin:'0 10px'}}/>
            </div>
            <div className={ContentStyle.ubb_content} dangerouslySetInnerHTML={{__html:!archived ?log_content : UbbToHtml(log_content)}}/>
            <Divider style={{margin:'20px 0 5px 0'}}/>
            <BlogAction {...{log_comm_nums,log_view_nums,log_like_nums,log_id}}/>
            <Divider style={{margin:'5px 0'}}/>
            <BlogCommentsList {...{log_id,...CommentsData}}/>
            <BlogRandom RandomBlogs={RandomBlogs}/>
        </div>
    )
}
export async function getServerSideProps(context){
    const {query:{blogid}} = context
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
    let BlogPreviewResult = await DataRequest.getBlogsPreviewData(blogid)
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
