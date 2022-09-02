import {useContext} from 'react';
import {PageHeader} from "antd";
import HotLinkHeader from "../../components/library/HotLinkHeader";
import PageBanner from "../../components/global/PageBanner";
import PhoneComponent from "../../components/library/PhoneComponent";
import PCComponent from "../../components/library/PCComponent";
import HeadTag from "../../components/app/HeadTag";
import ScreenContext from "../../store/ScreenContext";
import LinkDataRequest from "../../uitls/request/LinkDataRequest";
import CoverDataRequest from "../../uitls/request/CoverDataRequest";
import revalidateTime from "../../config/revalidate";
function LinkInfo({LibraryData:{HotLinkCategoryList,UrlList,HomePageFooterCover}}) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110·资库'/>
            <HotLinkHeader HotLinkCategoryList={HotLinkCategoryList}/>
            <div>
                <PageHeader
                    // className="link-info-page-header"
                    title='新录入条目 New TOP50'
                    style={!isPhone ? {padding:'4px 0',borderBottom:'1px solid #8c8c8c'} : {}}
                />
            </div>
            {isPhone ? <PhoneComponent UrlList={UrlList}/> : <PCComponent UrlList={UrlList}/>}
            <PageBanner url={HomePageFooterCover}/>
        </div>
    )
}
export async function getStaticProps() {
    let LibraryData = {HotLinkCategoryList:[],UrlList:[],HomePageFooterCover:''}

    let libraryResult = await Promise.all([
        LinkDataRequest.getHotLinkCateGory(),
        LinkDataRequest.getNewlyIndexedRank(),
        CoverDataRequest.getHomePageFooterCover()
    ])
    libraryResult.forEach(result => {
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
export default LinkInfo;