import {Fragment} from 'react';
import {Button, Card, Divider, Dropdown, Menu, Pagination, Result} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import Image from "next/image";
import NewsDataRequest from "../../uitls/request/NewsDataRequest";
import banner from '../../public/static/banner2.png'
import styles from '../../styles/pages/News.module.scss'
import {getTimeFromNow} from "../../uitls/present/TimeUtils";
import Link from "next/link";
import Head from "next/head";
const {Meta} = Card
function NewsList({NewsData:{News,total},BlogCategory,currentPage = '1'}) {
    const router = useRouter()
    const onPageChange = page => {
        router.push(`/news/${page}`)
    }
    const changeCategory = ({key}) => {
        if (key === 'elegant') router.push('/elegant')
        else router.push(`/elegant/1?cateid=${key}`)
    }
    const menu = () => {
        let items = BlogCategory.map(({cate_id,cate_name,cate_nums}) => ({key:cate_id,label:<span>{`${cate_name} | ${cate_nums}`}</span>}))
        items = [{key:'elegant',label:<span>出色</span>}].concat(items)
        return <Menu onClick={changeCategory} style={{maxHeight:320,overflow:'auto'}} items={items}/>
    }
    return (
        <div className='page-content font-family'>
            <Head>
                <title>AD110咨讯</title>
            </Head>
            <Card
                headStyle={{
                    color:'#595959',
                    fontSize:'20px',
                    fontWeight:600,
                    letterSpacing:1
                }}
                bordered={false}
                title={<Fragment>
                    <span>资讯</span>
                    <span><Dropdown trigger={['click']} placement='bottomLeft' overlay={menu()}><Button type='text' icon={<UnorderedListOutlined  style={{fontSize:20}}/>}/></Dropdown></span>
                </Fragment>}
            >
                {News.length >= 1 ? <Fragment>
                    <div className={styles.news_container}>
                        {News.map(({id,title,content,post_time,author,cover_image},index) => {
                            return (
                                <Link href={`/news/check?newsid=${id}`} key={id}>
                                    <div className={styles.news_item} >
                                        <Card
                                            hoverable
                                            cover={
                                                <Image
                                                    src={NewsDataRequest.getNewsCover(cover_image) || banner}
                                                    priority={index <= 7}
                                                    width={225}
                                                    height={150}
                                                    layout='responsive'
                                                    alt={title}
                                                />
                                            }
                                            className='blog-card'
                                        >
                                            <Meta title={title} description={
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
                        showTotal={total => `总共${total}个条目 | 当前页共${News.length}条`}
                    />
                </Fragment> : <Result status='404' title='暂无数据' extra={<Button onClick={() => router.replace('/news')} type='default'>返回咨询</Button>}/>}

            </Card>
        </div>
    )
}

export default NewsList;