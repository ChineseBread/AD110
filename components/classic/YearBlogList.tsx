import {Fragment} from 'react';
import {useRouter} from "next/router";
import Head from "next/head";
import {Button, Card, Pagination, Result} from "antd";
import BlogsList from "@components/classic/BlogList";
import {ArrowLeftOutlined} from "@ant-design/icons";
interface Props{
    Year:string
    BlogList:BlogData[],
    total:number
    currentPage?:string
}
function YearBlogList({Year,BlogList:Blogs,total,currentPage = "1"}:Props) {
    const router = useRouter()
    const onPageChange = (page:number) => {
        router.push(`/classic/${Year}/${page}`)
    }
    return(
        <div className='page-content font-family'>
            <Head>
                <title>AD110经典</title>
            </Head>
            <Card
                className='blog-card'
                headStyle={{
                    color:'#595959',
                    fontSize:'20px',
                    fontWeight:600,
                    letterSpacing:1
                }}
                bordered={false}
                title={Year}
                extra={<Button type='ghost' icon={<ArrowLeftOutlined />} onClick={() => router.push('/classic')}>返回</Button>}
            >
                {Blogs.length >= 1 ?
                    <Fragment>
                        <BlogsList Blogs={Blogs}/>
                        <Pagination
                            style={{display:'flex',justifyContent:'space-between'}}
                            onChange={onPageChange}
                            pageSize={32}
                            current={parseInt(currentPage)}
                            showSizeChanger={false}
                            responsive={true}
                            total={total}
                            showQuickJumper
                            showTotal={total => `总共${total}个条目 | 当前页共${Blogs.length}条`}
                            hideOnSinglePage
                        />
                    </Fragment>
                    : <Result title='当前年份暂无数据' status='404' extra={<Button onClick={() => router.replace('/classic')}>返回出色</Button>}/>}
            </Card>

        </div>
    )
}

export default YearBlogList;