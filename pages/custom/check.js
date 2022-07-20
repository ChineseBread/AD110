import {Fragment} from 'react';
import CustomDataRequest from "../../uitls/request/CustomDataRequest";
import Head from "next/head";

function CheckCustomPage({CustomPageData:{page_title,page_content}}) {
    return (
        <Fragment>
            <Head>
                <title>{page_title}</title>
            </Head>
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