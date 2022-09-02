import React from 'react';
import {Card} from "antd";
import BlogsList from "../elegant/BlogsList";
function BlogRecommend({Recommend}) {
    return (
        <Card
            title='延伸阅读'
            bordered={false}
            className='blog-card'
        >
            <BlogsList Blogs={Recommend}/>
        </Card>
    )
}

export default BlogRecommend;