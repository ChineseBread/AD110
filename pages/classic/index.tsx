import {Button, Card, Input, message, Result} from "antd";
import {SearchOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import HeadTag from "@components/app/HeadTag";
import BlogDataRequest from "@utils/request/BlogDataRequest";
import CoverDataRequest from "@utils/request/CoverDataRequest";
import {getFormatTime} from '@utils/present/TimeUtils'
import revalidateTime from '@config/revalidate'
import PageBanner from "@components/global/PageBanner";
import BlogList from "@components/classic/BlogList";
interface Props{
    YearBlogList:Array<{Year:string,Data:BlogData[]}>
    HomePageFooterBanner:string
}
//历年经典博文
function Classic({YearBlogList,HomePageFooterBanner}:Props) {
    const router = useRouter()
    const checkYearBlog = ({target}:any) => {
        const year = target.value
        if (year < 2005 || year > getFormatTime(new Date().getTime() / 1000,'YYYY')) {
            message.warn("您输入的年份不在合法范围内")
        }else {
            router.push(`/classic/${year}`)
        }
    }
    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110·经典'/>
            <Card
                title='经典'
                className='blog-card'
                bordered={false}
                extra={<Input type='number' onPressEnter={checkYearBlog} prefix={<SearchOutlined/>} placeholder='在此输入你想浏览的年份'/>}
            />
            {YearBlogList.length >= 1 ?
                YearBlogList.map(({Year,Data:Blogs}) =>　{
                    return(
                        Blogs.length >= 1 ? <Card className='blog-card' title={Year} key={Year} type='inner' bordered={false} extra={<Button onClick={() => router.push(`/classic/${Year}`)} icon={<UnorderedListOutlined />} type='ghost'>更多</Button>}>
                            <BlogList Blogs={Blogs}/>
                        </Card> : <></>
                    )
                }) : <Result status='404' extra={<Button onClick={() => router.replace('/')}>返回首页</Button>} title='暂无数据'/>}
            <PageBanner url={HomePageFooterBanner}/>
        </div>
    )
}
export async function getStaticProps():Promise<NextStaticPropsValue<Props>>{
    let ClassicData:Props = {YearBlogList:[],HomePageFooterBanner:''}
    let [{YearBlogList},{HomePageFooterBanner}] = await Promise.all([
        BlogDataRequest.getYearsBlogs<Props['YearBlogList']>(),
        CoverDataRequest.getHomePageFooterBanner()
    ])
    return {
        props:{
            YearBlogList:YearBlogList || ClassicData.YearBlogList,
            HomePageFooterBanner:HomePageFooterBanner || ClassicData.HomePageFooterBanner
        },
        revalidate:revalidateTime
    }
}
export default Classic;