import {useContext} from 'react';
import {PageHeader} from "antd";
import ScreenContext from "@store/ScreenContext";
import HeadTag from "@components/app/HeadTag";
import LinkDataRequest from "@utils/request/LinkDataRequest";
import CoverDataRequest from "@utils/request/CoverDataRequest";
import PhoneComponent from "@components/library/PhoneComponent";
import PCComponent from "@components/library/PCComponent";
import LibraryHeader from "@components/library/LibraryHeader";
import PageBanner from "@components/global/PageBanner";
import revalidateTime from "@config/revalidate";
interface Props{
    HotLinkList:HotLink[]
    UrlList:BlogLink[]
    HomePageFooterBanner:string
}
function LinkInfo({HotLinkList,UrlList,HomePageFooterBanner}:Props) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110·资库'/>
            <LibraryHeader HotLinkList={HotLinkList}/>
            <div>
                <PageHeader
                    title='AD110·资库点击排行 TOP100'
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
        LinkDataRequest.getClickRank(),
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