import {Button, Card, Input, message, Result} from "antd";
import {useRouter} from "next/router";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import BlogsList from "../../components/Classic/BlogsList";
import {SearchOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {getFormatTime} from "../../uitls/present/TimeUtils";
import Head from "next/head";
//历年经典博文
function Classic({ClassicData}) {
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
            <Head>
                <title>AD110经典</title>
            </Head>
            <Card
                title='经典'
                bordered={false}
                headStyle={{
                    color:'#595959',
                    fontSize:'20px',
                    fontWeight:600,
                    letterSpacing:1
                }}
                extra={<Input type='number' onPressEnter={checkYearBlog} prefix={<SearchOutlined/>} placeholder='在此输入你想浏览的年份'/>}
            >

            </Card>
            {ClassicData.length >= 1 ?
                ClassicData.map(({Year,Data:Blogs}) =>　{
                    return(
                        Blogs.length >= 1 ? <Card className='blog-card' title={Year} key={Year} type='inner' bordered={false} extra={<Button onClick={() => router.push(`/classic/${Year}`)} icon={<UnorderedListOutlined />} type='ghost'>更多</Button>}>
                            <BlogsList Blogs={Blogs}/>
                        </Card> : <></>
                    )
                }) :
                <Result status='404' extra={<Button onClick={() => router.replace('/')}>返回首页</Button>} title='暂无数据'/>
            }
        </div>
    )
}
export async function getStaticProps(){
    let ClassicData = []
    let ClassicResult = await BlogDataRequest.getYearsBlogs()
    if (ClassicResult.Ok) ClassicData = ClassicResult.BlogsData
    return {props:{ClassicData},revalidate:21600}
}
export default Classic;