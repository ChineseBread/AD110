import React from 'react';
import {Card} from "antd";
import BlogsList from "../App/BlogsList";
function BlogRandom({RandomBlogs}) {
    return (
        <Card
            title='与本文内容较为详细的项目'
            bordered={false}
        >
            <BlogsList Blogs={RandomBlogs}/>
        </Card>
    )
}

export default BlogRandom;