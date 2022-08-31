interface BlogData{
    log_id:string
    log_cate_id:string
    cate_name:string
    log_title:string
    log_cover_image:string
    log_poster_image:string
    log_author:string
    log_allusion:string
    log_posttime:string
    log_view_nums:number
    log_comm_nums:number
    log_like_nums:number
    has_pic:boolean
    archived:boolean
    has_poster:boolean
    log_cover_id:string
    log_intro_content:string
    log_from:string
}
/**
 * @url /blog_content/get_info_by_id
 * @description 文章浏览界面
 */
declare type BlogInfoData = BlogData & {
    log_modify:string
    log_quote:string
    log_content:string
    log_discomment_switch:1 | 0
}

/**
 * @url /blog_comment/list_by_logid
 */
interface BlogComment{
    comm_id:number
    blog_id:string
    comm_content:string
    comm_author:string
    comm_site:string | null
    comm_email:string
    comm_posttime:string
    comm_postip:string
    comm_avator:string
    comm_hide_switch:string
    updated_at:string
}


/**
 * @description 博文分类
 */
interface BlogCategory{
    cate_id:number
    cate_name:string
    weigh:number
    cate_image:string
    cate_nums:string
    updated_at:string
}

/**
 * @description 博文链接
 */
interface BlogLink {
    url_id:number
    category_id:number
    url_name:string
    url_value:string
    logo_image:string
    url_likes:number
    url_hits:number
    url_time:string
    iscool_switch:1 | 0
    url_hide_switch:1 | 0
    year_into_switch:1 | 0
    url_info:string
    updated_at:string
}
interface HotLink{
    id:number
    name:string
    hot_switch:1 | 0
    hits:number
}
interface NewsData{
    id:string
    title:string
    cate_id:number
    cate_name:string
    // cate_about:string
    content:string
    author:string
    post_time:string
    // poster_image:string
    cover_image:string
    // has_cover:boolean
    // cover_id:string
    // has_poster:string
    // poster_id:string
    view_nums:number
}

// declare type ClassicBlogsData = Array<{Year:string,Data:Array<BlogData>}>
