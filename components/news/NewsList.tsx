import {useMemo} from 'react';
import {Button, Card, Divider, Dropdown, Pagination, Result} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import Menu from "@components/elegant/Menu";
import HeadTag from "@components/app/HeadTag";
import styles from '@styles/pages/News.module.scss'
import NewsDataRequest from "@utils/request/NewsDataRequest";
import NewsCardBanner from '@public/static/banner2.png'
import {getTimeFromNow} from "@utils/present/TimeUtils";
const {Meta} = Card
interface Props{
    NewsData:{
        NewsList:NewsData[]
        total:number
    }
    CategoryList:BlogCategory[]
    currentPage?:string
}
function NewsList({NewsData:{NewsList,total},CategoryList,currentPage = '1'}:Props) {
    const router = useRouter()
    const onPageChange = (page:number) => {
        router.push(`/news/${page}`)
    }
    const changeCategory = ({key}:any) => {
        if (key === 'elegant') router.push('/elegant')
        else router.push(`/elegant/1/${key}`)
    }
    const menu = () => {
        let items = CategoryList.map(({cate_id,cate_name,cate_nums}) => ({key:String(cate_id),label:<span>{`${cate_name} | ${cate_nums}`}</span>})).filter(ele => ele.key !== '14')
        items = [{key:'elegant',label:<span>出色</span>}].concat(items)
        return <Menu onClick={changeCategory} items={items}/>
    }
    return (
        <div className='page-content font-family'>
            <HeadTag title='alife(原)'/>
            <Card
                className='blog-card'
                bordered={false}
                title={<>
                    <span>资讯</span>
                    <Dropdown trigger={['click']} overlayClassName='blog-drop-down' placement='bottomLeft' overlay={menu()}><Button type='text' icon={<UnorderedListOutlined/>}/></Dropdown>
                </>}
            >
                {useMemo(() => {
                    return <>
                        {NewsList.length >= 1 ? <>
                            <div className={styles.news_container}>
                                {NewsList.map(({id,title,content,post_time,author,cover_image},index) => {
                                    return (
                                        <Link href={`/news/check?newsid=${id}`} key={id}>
                                            <div className={styles.news_item} >
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <Image
                                                            src={NewsDataRequest.getNewsCover(cover_image) || NewsCardBanner}
                                                            priority={index <= 7}
                                                            width={225}
                                                            height={150}
                                                            layout='responsive'
                                                            alt={title}
                                                            quality={5}
                                                        />
                                                    }
                                                >
                                                    <Meta title={<span className={styles.news_title}>{title}</span>} description={
                                                        <div className={styles.news_description_container}>
                                                            <div className={styles.news_content}>{content}</div>
                                                            <Divider style={{margin:'4px 0'}}/>
                                                            <div className={styles.news_info}>{`${getTimeFromNow(post_time)} | By ${author}`}</div>
                                                        </div>
                                                    }/>
                                                </Card>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                            <Pagination
                                style={{display:'flex',justifyContent:'space-between'}}
                                onChange={onPageChange}
                                pageSize={20}
                                current={parseInt(currentPage)}
                                showSizeChanger={false}
                                responsive={true}
                                total={total}
                                showQuickJumper
                                showTotal={total => `总共${total}个条目 | 当前页共${NewsList.length}条`}
                                hideOnSinglePage
                            />
                        </> : <Result status='404' title='暂无数据' extra={<Button onClick={() => router.replace('/news')} type='default'>返回咨询</Button>}/>}
                    </>
                },[currentPage])}
            </Card>
        </div>
    )
}

export default NewsList;
