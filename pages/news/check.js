// 咨询预览
import {EyeOutlined} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import {UbbToHtml} from "../../uitls/present/UBBUtils";
import CustomHeadTag from "../../components/App/CustomHeadTag";
import NewsDataRequest from "../../uitls/request/NewsDataRequest";
import ContentStyle from "../../styles/pages/BlogPreview/NewsOrBlog.module.scss";
import banner from '../../public/static/banner3.png'
function CheckNews({NewsData:{title,cover_image,cate_name,content,author,post_time,view_nums,cate_id}}) {
    return (
        <div className='page-content font-family'>
            <CustomHeadTag title={title}/>
            <div className={ContentStyle.header}>
                <Image
                    src={NewsDataRequest.getNewsCover(cover_image) || banner}
                    layout='fill'
                    objectFit='cover'
                />
                <div className={ContentStyle.title_container}>
                    <span className={ContentStyle.title}>{title}</span>
                </div>
            </div>
            <div className={ContentStyle.info}>
                <Link href='/'><span>AD110</span></Link> {'>'} <Link href={`/elegant?cateid=${cate_id}`}><span>{cate_name}</span></Link>
            </div>
            <div className={ContentStyle.bread}>
                <span>{`发布于 ${post_time}`}</span>
                <span><EyeOutlined />{view_nums}</span>
            </div>
            <div className={`${ContentStyle.ubb_content} ubb-img`} dangerouslySetInnerHTML={{__html:UbbToHtml(content)}}/>
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