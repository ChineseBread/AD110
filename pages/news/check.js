// 咨询预览
import {EyeOutlined} from "@ant-design/icons";
import Image from "next/image";
import HeadTag from "../../components/app/HeadTag";
import NewsDataRequest from "../../uitls/request/NewsDataRequest";
import ContentStyle from "../../styles/pages/BlogPreview/NewsOrBlog.module.scss";
import banner from '../../public/static/banner3.jpg'
import {useRouter} from "next/router";
function CheckNews({NewsData:{title,cover_image,cate_name,content,post_time,view_nums,cate_id}}) {
    const router = useRouter()
    return (
        <div className='page-content font-family'>
            <HeadTag title={title}/>
            <div className={ContentStyle.header}>
                <Image
                    src={NewsDataRequest.getNewsCover(cover_image) || banner}
                    layout='fill'
                    objectFit='cover'
                    unoptimized={true}
                />
                <div className={ContentStyle.title_container}>
                    <span className={ContentStyle.title}>{title}</span>
                </div>
            </div>
            <div className={ContentStyle.info}>
                <span onClick={() => router.push('/news')}>AD110·资讯</span> {'>'} <span onClick={() => router.push(`/elegant/1/${cate_id}`)}>{cate_name}</span>
            </div>
            <div className={ContentStyle.bread}>
                <span>{`发布于 ${post_time}`}</span>
                <span><EyeOutlined />{view_nums}</span>
            </div>
            <div className={`${ContentStyle.ubb_content} ubb-img`} dangerouslySetInnerHTML={{__html:content}}/>
        </div>
    )
}

export default CheckNews;
export async function getServerSideProps(context){
    const {query:{newsid}} = context
    let NewsData = {
        title:'',
        cover_image:'',
        cate_name:'',
        content:'',
        author:'',
        post_time:'',
        view_nums:'',
    }
    let NewsResult = await NewsDataRequest.getNewsById(newsid)
    if (NewsResult.Ok){
        NewsData = NewsResult.News
    }
    return {
        props:{NewsData}
    }
}