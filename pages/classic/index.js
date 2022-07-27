import {Button, Card, Input, message, Result} from "antd";
import {SearchOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import BlogsList from "../../components/Classic/BlogsList";
import {getFormatTime} from "../../uitls/present/TimeUtils";
import PageBanner from "../../components/Global/PageBanner";
import CustomHeadTag from "../../components/App/CustomHeadTag";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import CoverDataRequest from "../../uitls/request/CoverDataRequest";
//历年经典博文
function Classic({ClassicData:{BlogsData,HomePageFooterCover}}) {
    const router = useRouter()
    const checkYearBlog = ({target}) => {
        const year = target.value
        if (year < 2005 || year > getFormatTime(new Date() / 1000,'YYYY')) {
            message.warn("您输入的年份不在合法范围内")
        }else {
            router.push(`/classic/${year}`)
        }
    }
    return (
        <div className='page-content font-family'>
            <CustomHeadTag title='AD110·经典'/>
            <Card
                title='经典'
                className='blog-card'
                bordered={false}
                extra={<Input type='number' onPressEnter={checkYearBlog} prefix={<SearchOutlined/>} placeholder='在此输入你想浏览的年份'/>}
            >

            </Card>
            {BlogsData.length >= 1 ?
                BlogsData.map(({Year,Data:Blogs}) =>　{
                    return(
                        Blogs.length >= 1 ? <Card className='blog-card' title={Year} key={Year} type='inner' bordered={false} extra={<Button onClick={() => router.push(`/classic/${Year}`)} icon={<UnorderedListOutlined />} type='ghost'>更多</Button>}>
                            <BlogsList Blogs={Blogs}/>
                        </Card> : <></>
                    )
                }) :
                <Result status='404' extra={<Button onClick={() => router.replace('/')}>返回首页</Button>} title='暂无数据'/>
            }
            <PageBanner url={HomePageFooterCover}/>
        </div>
    )
}
export async function getStaticProps(){
    let ClassicData = {BlogsData:[],HomePageFooterCover:''}
    let ClassicResult = await Promise.all([
        BlogDataRequest.getYearsBlogs(),
        CoverDataRequest.getHomePageFooterCover()
    ])
    ClassicResult.forEach(result => {
        if (result.Ok){
            delete result.Ok
            ClassicData = {...ClassicData,...result}
        }
    })
    if (ClassicResult.Ok) ClassicData = ClassicResult.BlogsData
    return {props:{ClassicData},revalidate:21600}
}
export default Classic;