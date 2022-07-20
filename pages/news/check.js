// 咨询预览
import {
    EyeOutlined,
    FacebookOutlined,
    GooglePlusOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    TwitterOutlined
} from "@ant-design/icons";
import Image from "next/image";
import styles from '../../styles/pages/NewsOrBlog.module.scss'
import {UbbToHtml} from "../../uitls/present/UBBUtils";
import NewsDataRequest from "../../uitls/request/NewsDataRequest";
import banner from '../../public/static/banner3.png'
import Head from "next/head";
import ContentStyle from "../../styles/pages/NewsOrBlog.module.scss";
function CheckNews({NewsData:{title,cover_image,cate_name,content,author,post_time,view_nums}}) {
    return (
        <div className='page-content font-family'>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={styles.header}>
                <Image
                    src={NewsDataRequest.getNewsCover(cover_image) || banner}
                    layout='fill'
                    objectFit='cover'
                />
                <span className={styles.title}>{title}</span>
            </div>
            <div className={styles.info}>
                <span>{`${author} > ${cate_name}`}</span>
                <span>{`发布于 ${post_time}`}</span>
                <span><EyeOutlined />{view_nums}</span>
            </div>
            <div className={ContentStyle.bread}>
                <TwitterOutlined style={{fontSize:18,margin:'0 10px'}}/>
                <FacebookOutlined style={{fontSize:18,margin:'0 10px'}}/>
                <InstagramOutlined style={{fontSize:18,margin:'0 10px'}}/>
                <LinkedinOutlined style={{fontSize:18,margin:'0 10px'}}/>
                <GooglePlusOutlined style={{fontSize:18,margin:'0 10px'}}/>
            </div>
            <div className={styles.ubb_content} dangerouslySetInnerHTML={{__html:UbbToHtml(content)}}/>
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