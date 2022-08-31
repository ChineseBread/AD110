import {Fragment, useMemo, useState} from "react";
import {Button, Card, Dropdown, Empty, Pagination} from "antd";
import {useRouter} from "next/router";
import {UnorderedListOutlined} from "@ant-design/icons";
import Menu from "@components/elegant/Menu";
import BlogList from "@components/global/BlogList";
/**
 * @description 博文列表
 */
interface Props{
    BlogsData:{
        BlogList:BlogData[]
        total:number
        category:string
    }
    CategoryList?:BlogCategory[]
    currentPage?:string
    cateid?:BlogCategory['cate_id']
}
function ElegantBlogs({BlogsData:{BlogList:Blogs,total,category},CategoryList,cateid,currentPage = '1'}:Props) {
    const router = useRouter()
    const [visible,setVisible] = useState(false)
    const onPageChange = (page:number) => {
        router.push(`/elegant/${cateid ? `${page}/${cateid}` : page}`)
    }
    const changeCategory = ({key}:any) => {
        if (key === 14) router.push(`/news`)
        else router.push(`/elegant/1/${key}`).then(() => setVisible(false))
    }
    const menu = () => {
        let items = (CategoryList || []).map(({cate_id,cate_name,cate_nums}) => ({key:cate_id,label:<span>{`${cate_name} | (${cate_nums})`}</span>}))
        return <Menu onClick={changeCategory} items={items}/>
    }
    return (
        <div className='page-content font-family'>
            <Card title={<Fragment>
                <span>{category || '出色'}</span>
                {(CategoryList || []).length >= 1 && <Dropdown visible={visible} onVisibleChange={visible => setVisible(visible)} overlayClassName='blog-drop-down' overlayStyle={{zIndex:500}} trigger={['click']} overlay={menu()}><Button type='text' icon={<UnorderedListOutlined/>}/></Dropdown>}
            </Fragment>}
                  bordered={false}
                  className='blog-card'
            >

                {useMemo(() => {
                    return <>
                        {
                            Blogs.length >= 1 ? <>
                                <BlogList Blogs={Blogs}/>
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
                            </> : <Empty />
                        }
                    </>
                },[cateid,currentPage])}
            </Card>
        </div>
    )
}
export default ElegantBlogs;