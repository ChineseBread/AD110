import {useContext} from 'react';
import {PageHeader} from "antd";
import ScreenContext from "@store/ScreenContext";
import HeadTag from "@components/app/HeadTag";
import LibraryHeader from "@components/library/LibraryHeader";
import PageBanner from "@components/global/PageBanner";
import revalidateTime from "@config/revalidate";
import CoverDataRequest from "@utils/request/CoverDataRequest";
import PCComponent from "@components/library/PCComponent";
import LinkDataRequest from "@utils/request/LinkDataRequest";
import PhoneComponent from "@components/library/PhoneComponent";
interface Props{
    HotLinkList:HotLink[]
    HomePageFooterBanner:string
    UrlList:BlogLink[]
}
function LinkInfo({HotLinkList,HomePageFooterBanner,UrlList}:Props) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110·资库'/>
            <LibraryHeader HotLinkList={HotLinkList}/>
            <div>
                <PageHeader
                    title='新录入条目 New TOP50'
                    style={!isPhone ? {padding:'4px 0',borderBottom:'1px solid #8c8c8c'} : {}}
                />
            </div>
            {isPhone ? <PhoneComponent UrlList={UrlList}/> : <PCComponent UrlList={UrlList}/>}
            <PageBanner url={HomePageFooterBanner}/>
        </div>
    )
}
export async function getStaticProps():Promise<NextStaticPropsValue<Props>> {

    let [{HotLinkList},{UrlList},{HomePageFooterBanner}] = await Promise.all([
        LinkDataRequest.getHotLinkList(),
        LinkDataRequest.getNewlyIndexedRank(),
        CoverDataRequest.getHomePageFooterBanner()
    ])
    return {
        props: {
            HotLinkList:HotLinkList || [],
            UrlList:UrlList || [],
            HomePageFooterBanner:HomePageFooterBanner || ''
        },
        revalidate:revalidateTime
    }
}
export default LinkInfo;