import React from 'react';
import {Card} from "antd";
import BlogsList from "../Global/BlogsList";
function BlogRandom({RandomBlogs}) {
    return (
        <Card
            title='与本文内容较为相似的项目'
            bordered={false}
            className='blog-card'
        >
            <BlogsList Blogs={RandomBlogs}/>
        </Card>
    )
}

export default BlogRandom;