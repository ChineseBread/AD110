import {Empty} from 'antd'
import HotLinkHeader from "../../components/library/HotLinkHeader";
import LinkCard from "../../components/library/LinkCard";
import EditorRecommend from "../../components/library/EditorRecommend";
import HeadTag from "../../components/app/HeadTag";
import PageBanner from "../../components/global/PageBanner";
import DataRequest from "../../uitls/request/DataRequest";
import revalidateTime from "../../config/revalidate";
function Library({LibraryData:{HotLinkCategoryList,NewIndexLinkList,HotClickLinkList,NewlyIndexLinkCover,HotClickCover,EditorRecommendLink,RecommendCover}}) {
    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110·资库'/>
            <HotLinkHeader HotLinkCategoryList={HotLinkCategoryList}/>
            <LinkCard title='新录入条目'>
                {NewIndexLinkList.length >= 1 ? NewIndexLinkList.map(({url_id,url_name,url_value}) => {
                    return <span className='link-item' key={url_id}><a target='_blank'  rel="noreferrer" href={"/api/redirect/url?url=" + url_value}>{url_name}</a></span>
                }) : <Empty/>}
            </LinkCard>
            <PageBanner url={NewlyIndexLinkCover}/>
            <EditorRecommend EditorRecommendLink={EditorRecommendLink}/>
            <PageBanner url={RecommendCover}/>
            <LinkCard title='点击排行榜TOP100'>
                {HotClickLinkList.length >= 1 ? HotClickLinkList.map(({url_id,url_name,url_value}) => {
                    return <span className='link-item' key={url_id}><a target='_blank'  rel="noreferrer" href={"/api/redirect/url?url=" + url_value}>{url_name}</a></span>
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
        EditorRecommendLink:[],
        NewlyIndexLinkCover:'',
        RecommendCover:'',
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
        revalidate:revalidateTime
    }
}
export default Library;
