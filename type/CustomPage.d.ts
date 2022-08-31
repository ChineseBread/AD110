interface CustomPage{
    page_id:number
    page_title:string
    url_alias:string
}
declare type CustomPageInfo = CustomPage & {
    page_content:string
    page_banner_image:string
}