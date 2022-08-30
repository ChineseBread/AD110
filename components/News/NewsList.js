import {useMemo} from 'react';
import {Button, Card, Divider, Dropdown, Pagination, Result} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import Menu from "../Elegant/Menu";
import CustomHeadTag from "../App/CustomHeadTag";
import {getTimeFromNow} from "../../uitls/present/TimeUtils";
import NewsDataRequest from "../../uitls/request/NewsDataRequest";
import styles from '../../styles/pages/Classic/News.module.scss'
import banner from '../../public/static/banner2.png'
const {Meta} = Card
function NewsList({NewsData:{News,total},BlogCategory,currentPage = '1'}) {
    const router = useRouter()
    const onPageChange = page => {
        router.push(`/news/${page}`)
    }
    const changeCategory = ({key}) => {
        if (key === 'elegant') router.push('/elegant')
        // else router.push(`/elegant/1?cateid=${key}`)
        else router.push(`/elegant/1/${key}`)
    }
    const menu = () => {
        let items = BlogCategory.map(({cate_id,cate_name,cate_nums}) => ({key:cate_id,label:<span>{`${cate_name} | ${cate_nums}`}</span>})).filter(ele => ele.key !== 14)
        items = [{key:'elegant',label:<span>出色</span>}].concat(items)
        return <Menu onClick={changeCategory}  items={items}/>
    }
    return (
        <div className='page-content font-family'>
            <CustomHeadTag title='alife(原)'/>
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
                        {News.length >= 1 ? <>
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
                                                            quality={5}
                                                        />
                                                    }
                                                    // className='section-card'
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
                                showTotal={total => `总共${total}个条目 | 当前页共${News.length}条`}
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
