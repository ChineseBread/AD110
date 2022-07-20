import {Empty} from 'antd'
import HotLinkHeader from "../../components/Global/HotLinkHeader";
import DataRequest from "../../uitls/request/DataRequest";
import Head from "next/head";
import PageBanner from "../../components/App/PageBanner";
import LinkCard from "../../components/App/LinkCard";
function Library({LibraryData:{HotLinkCategoryList,NewIndexLinkList,HotClickLinkList,NewlyIndexLinkCover,HotClickCover}}) {
    return (
        <div className='page-content font-family'>
            <Head>
                <title>AD110资库</title>
            </Head>
            <HotLinkHeader HotLinkCategoryList={HotLinkCategoryList}/>
            <LinkCard title='新导入条目'>
                {NewIndexLinkList.length >= 1 ? NewIndexLinkList.map(({url_id,url_name,url_value}) => {
                    return <span className='link-item' key={url_id}><a target='_blank' href={url_value}>{url_name}</a></span>
                }) : <Empty/>}
            </LinkCard>
            <PageBanner url={NewlyIndexLinkCover}/>
            {/*<EditorRecommend EditorRecommendLink={EditorRecommendLink}/>*/}
            {/*<PageBanner url={RecommendCover}/>*/}
            <LinkCard title='点击排行榜TOP100'>
                {HotClickLinkList.length >= 1 ? HotClickLinkList.map(({url_id,url_name,url_value}) => {
                    return <span className='link-item' key={url_id}><a target='_blank' href={url_value}>{url_name}</a></span>
                }) : <Empty/>}
            </LinkCard>
            <PageBanner url={HotClickCover}/>
        </div>
    )
}
export async function getStaticProps(context) {
    const LibraryDataResult = await DataRequest.getLibraryLinkData()
    let LibraryData = {
        HotLinkCategoryList:[],
        NewIndexLinkList:[],
        HotClickLinkList:[],
        // EditorRecommendLink:{kindList:[],kindUrls:{}},
        NewlyIndexLinkCover:'',
        // RecommendCover:'',
        HotClickCover:''
    }
    LibraryDataResult.forEach(result => {
        if (result.Ok){
            delete result.Ok
            LibraryData = {...LibraryData,...result}
        }
    })
    return {
        props: {LibraryData},
        revalidate:1800
    }
}
export default Library;