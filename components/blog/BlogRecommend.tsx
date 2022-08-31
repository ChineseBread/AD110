import React from 'react';
import {Card} from "antd";
import BlogsList from "@components/global/BlogList";
function BlogRecommend({Recommend}:{Recommend:BlogData[]}) {
    return (
        <Card
            title='与本文内容较为相似的项目'
            bordered={false}
            className='blog-card'
        >
            <BlogsList Blogs={Recommend}/>
        </Card>
    )
}

export default BlogRecommend;