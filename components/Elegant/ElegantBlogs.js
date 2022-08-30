import {Fragment, useState} from "react";
import {Button, Card, Dropdown, Empty, Pagination} from "antd";
import {useRouter} from "next/router";
import {UnorderedListOutlined} from "@ant-design/icons";
import Menu from "./Menu";
import BlogsList from "../Global/BlogsList";
/**
 * @description 博文列表
 */
function ElegantBlogs({ElegantData:{BlogsData:{Blogs,total,category},BlogCategory = [],currentPage = "1",cateid}}) {
    const router = useRouter()
    const [visible,setVisible] = useState(false)
    const onPageChange = page => {
        router.push(`/elegant/${cateid ? `${cateid}/${page}` : page}`)
    }
    const changeCategory = ({key}) => {
        if (key === 14) router.push(`/news`)
        else router.push(`/elegant/${key}/1`).then(() => setVisible(false))
        // else router.push(`/elegant/1?cateid=${key}`).then(() => setVisible(false))
    }
    const menu = () => {
        let items = BlogCategory.map(({cate_id,cate_name,cate_nums}) => ({key:cate_id,label:<span>{`${cate_name} | (${cate_nums})`}</span>}))
        // items = [{key:'news',label:'咨讯'}].concat(items)
        return <Menu onClick={changeCategory} items={items}/>
    }
    return (
        <div className='page-content font-family'>
            <Card title={<Fragment>
                <span>{category || '出色'}</span>
                {BlogCategory.length >= 1 && <Dropdown visible={visible} onVisibleChange={visible => setVisible(visible)} overlayClassName='blog-drop-down' overlayStyle={{zIndex:500}} trigger={['click']} overlay={menu()}><Button type='text' icon={<UnorderedListOutlined/>}/></Dropdown>}
            </Fragment>}
                bordered={false}
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
                        hideOnSinglePage
                    />
                </> : <Empty />}
            </Card>
        </div>
    )
}
export default ElegantBlogs;