// 咨询预览
import {EyeOutlined} from "@ant-design/icons";
import Image from "next/image";
import ContentStyle from "@styles/pages/BlogPreview/NewsOrBlog.module.scss";
import banner from '@public/static/banner3.jpg'
import HeadTag from "@components/app/HeadTag";
import NewsDataRequest from "@utils/request/NewsDataRequest";
import {useRouter} from "next/router";
// declare type Props = Pick<NewsData, 'title' | 'cate_name' | 'content' | 'view_nums' | 'cate_id' | 'post_time' | 'cover_image'>
function CheckNews({title,cover_image,cate_name,content,post_time,view_nums,cate_id}:NewsData) {
    const router = useRouter()
    return (
        <div className='page-content font-family'>
            <HeadTag title={title}/>
            <div className={ContentStyle.header}>
                <Image
                    src={NewsDataRequest.getNewsCover(cover_image) || banner}
                    layout='fill'
                    objectFit='cover'
                    quality={1}
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
export async function getServerSideProps(context:any):Promise<NextStaticPropsValue<NewsData>>{
    const {query:{newsid},res,req} = context
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=21600, stale-while-revalidate=5'
    )
    let NewsData:NewsData = {
        id:'',
        author:'',
        title:'',
        cover_image:'',
        cate_name:'',
        content:'',
        post_time:'',
        view_nums:0,
        cate_id:0,
    }
    let result = await NewsDataRequest.getNewsById(newsid)
    if (result.Ok) NewsData = (result.News || NewsData)
    return {
        props:{...NewsData}
    }
}
