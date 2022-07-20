import {Button, Card, Dropdown, Empty, Menu, Pagination} from "antd";
import {useRouter} from "next/router";
import {UnorderedListOutlined} from "@ant-design/icons";
import Head from "next/head";
import {Fragment} from "react";
import BlogsList from "../App/BlogsList";
/**
 * @description 博文列表
 */
function ElegantBlogs({ElegantData:{BlogsData:{Blogs,total,category},BlogCategory = [],currentPage = "1"}}) {
    const router = useRouter()
    const onPageChange = page => {
        const cateID = router.query.cateid
        router.push(`/elegant/${page}${cateID ? `?cateid=${cateID}` : ''}`)
    }
    const changeCategory = ({key}) => {
        if (key === 'news') router.push(`/news`)
        else router.push(`/elegant/1?cateid=${key}`)
    }
    const menu = () => {
        let items = BlogCategory.map(({cate_id,cate_name,cate_nums}) => ({key:cate_id,label:<span>{`${cate_name} | ${cate_nums}`}</span>}))
        items = [{key:'news',label:'咨讯'}].concat(items)
        return <Menu onClick={changeCategory} style={{maxHeight:320,overflow:'auto'}} items={items}/>
    }
    return (
        <div className='page-content font-family'>
            <Head>
                <title>AD110博文</title>
            </Head>
            <Card title={<Fragment>
                <span>{category || '出色'}</span> <span>{BlogCategory.length >= 1 && <Dropdown trigger={['click']} placement='bottomLeft' overlay={menu()}><Button type='text' icon={<UnorderedListOutlined style={{fontSize:20}}/>}/></Dropdown>}</span>
            </Fragment>}
                bordered={false}
                headStyle={{
                    color:'#595959',
                    fontSize:'20px',
                    fontWeight:600,
                    letterSpacing:1
                }}
                className='blog-card'
            >

                {Blogs.length >= 1 ? <>
                    <BlogsList Blogs={Blogs}/>
                    <Pagination
                        style={{display:'flex',justifyContent:'space-between'}}
                        onChange={onPageChange}
                        pageSize={40}
                        current={parseInt(currentPage)}
                        showSizeChanger={false}
                        responsive={true}
                        total={total}
                        showQuickJumper
                        showTotal={total => `总共${total}个条目 | 当前页共${Blogs.length}条`}
                    />
                </> : <Empty />}
            </Card>
        </div>
    )
}
export default ElegantBlogs;