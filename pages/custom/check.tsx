import {Fragment} from 'react';
import HeadTag from "@components/app/HeadTag";
import CustomPageDataRequest from "@utils/request/CustomPageDataRequest";

function CheckCustomPage({page_title,page_content}:CustomPageInfo) {
    return (
        <Fragment>
            <HeadTag title={page_title}/>
            <div dangerouslySetInnerHTML={{__html:page_content}}/>
        </Fragment>
    )
}
export async function getServerSideProps(context:any):Promise<NextStaticPropsValue<CustomPageInfo | undefined>>{
    let {query:{alias,pageid}} = context
    let CustomPageData:CustomPageInfo = {
        page_title:'',
        page_id:0,
        page_content:'',
        page_banner_image:'',
        url_alias:'',
    }
    if (pageid){
        let result = await CustomPageDataRequest.getCustomPageByID(pageid)
        if (result.Ok){
            CustomPageData = (result.CustomPage || CustomPageData)
        }
    }else if (alias) {
        let result = await CustomPageDataRequest.getCustomPageByAlias(alias)
        if (result.Ok){
            CustomPageData = (result.CustomPage || CustomPageData)
        }
    }
    return{
        props:{...CustomPageData}
    }
}
export default CheckCustomPage;