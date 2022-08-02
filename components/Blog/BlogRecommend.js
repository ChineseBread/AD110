import React from 'react';
import {Card} from "antd";
import BlogsList from "../Global/BlogsList";
function BlogRecommend({Recommend}) {
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