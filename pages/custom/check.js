import {Fragment, useEffect, useState} from 'react';
import HeadTag from "../../components/app/HeadTag";
import CustomDataRequest from "../../uitls/request/CustomDataRequest";
import {useRouter} from "next/router";
import {Card, message} from "antd";
function CheckCustomPage() {
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const {pageid,alias} = router.query
    const [data,setData] = useState({page_title:'',page_content:''})
    useEffect(() => {
        pageid && CustomDataRequest.getCustomPageByID(pageid).then(result => {
            if (result.Ok){
                const {CustomPageData:{page_title,page_content}} = result
                setData({page_title,page_content})
            }else{
                message.warn('未找到页面数据')
            }
            setLoading(false)
        })
    },[pageid])
    useEffect(() => {
        alias && CustomDataRequest.getCustomPageByAlias(alias).then(result => {
            if (result.Ok){
                const {CustomPageData:{page_title,page_content}} = result
                setData({page_title,page_content})
            }else{
                message.warn('未找到页面数据')
            }
            setLoading(false)
        })
    },[alias])
    return (
        <Fragment>
            {loading ? <Card loading={true} bordered={false} title='加载中'/> :
                <>
                    <HeadTag title={data.page_title}/>
                    <div dangerouslySetInnerHTML={{__html:data.page_content}}/>
                </>
            }
        </Fragment>
    )
}
// export async function getServerSideProps(context){
//     let {query:{alias,pageid}} = context
//     let CustomPageData = {
//         page_title:"",
//         page_content:''
//     }
//     if (pageid){
//         let result = await CustomDataRequest.getCustomPageByID(pageid)
//         if (result.Ok){
//             CustomPageData = result.CustomPageData
//         }
//     }else if (alias) {
//         let result = await CustomDataRequest.getCustomPageByAlias(alias)
//         if (result.Ok){
//             CustomPageData = result.CustomPageData
//         }
//     }
//     return{
//         props:{CustomPageData}
//     }
// }
export default CheckCustomPage;