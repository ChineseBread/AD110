import {Fragment} from 'react';
import CustomHeadTag from "../../components/App/CustomHeadTag";
import CustomDataRequest from "../../uitls/request/CustomDataRequest";
function CheckCustomPage({CustomPageData:{page_title,page_content}}) {
    return (
        <Fragment>
            <CustomHeadTag title={page_title}/>
            <div dangerouslySetInnerHTML={{__html:page_content}}/>
        </Fragment>
    )
}
export async function getServerSideProps(context){
    let {query:{alias,pageid}} = context
    let CustomPageData = {
        page_title:"",
        page_content:''
    }
    if (pageid){
        let result = await CustomDataRequest.getCustomPageByID(pageid)
        if (result.Ok){
            CustomPageData = result.CustomPageData
        }
    }else if (alias) {
        let result = await CustomDataRequest.getCustomPageByAlias(alias)
        if (result.Ok){
            CustomPageData = result.CustomPageData
        }
    }
    return{
        props:{CustomPageData}
    }
}
export default CheckCustomPage;