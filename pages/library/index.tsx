import {Empty} from 'antd'
import HeadTag from "@components/app/HeadTag";
import PageBanner from "@components/global/PageBanner";
import revalidateTime from "@config/revalidate";
import LinkDataRequest from "@utils/request/LinkDataRequest";
import CoverDataRequest from "@utils/request/CoverDataRequest";
import LinkCard from "@components/library/LinkCard";
import LibraryHeader from "@components/library/LibraryHeader";
import RecommendLinkList from "@components/library/RecommendLinkList";
interface Props{
    HotLinkList:HotLink[]
    NewlyIndexLinkList:BlogLink[]
    HotClickLinkList:BlogLink[]
    EditorRecommendLinkList:BlogLink[]
    NewlyIndexLinkBanner:string
    HotClickBanner:string
    RecommendBanner:string
}
function Library({HotLinkList,NewlyIndexLinkList,HotClickLinkList,NewlyIndexLinkBanner,HotClickBanner,EditorRecommendLinkList,RecommendBanner}:Props) {
    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110·资库'/>
            <LibraryHeader HotLinkList={HotLinkList}/>
            <LinkCard title='新录入条目'>
                {NewlyIndexLinkList.length >= 1 ? NewlyIndexLinkList.map(({url_id,url_name,url_value}) => {
                    return <span className='link-item' key={url_id}><a target='_blank'  rel="noreferrer" href={url_value}>{url_name}</a></span>
                }) : <Empty/>}
            </LinkCard>
            <PageBanner url={NewlyIndexLinkBanner}/>
            <RecommendLinkList EditorRecommendLinkList={EditorRecommendLinkList}/>
            <PageBanner url={RecommendBanner}/>
            <LinkCard title='点击排行榜TOP100'>
                {HotClickLinkList.length >= 1 ? HotClickLinkList.map(({url_id,url_name,url_value}) => {
                    return <span className='link-item' key={url_id}><a target='_blank'  rel="noreferrer" href={url_value}>{url_name}</a></span>
                }) : <Empty/>}
            </LinkCard>
            <PageBanner url={HotClickBanner}/>
        </div>
    )
}
export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>> {
    let LibraryData:Props = {
        HotLinkList:[],
        NewlyIndexLinkList:[],
        HotClickLinkList:[],
        EditorRecommendLinkList:[],
        NewlyIndexLinkBanner:'',
        RecommendBanner:'',
        HotClickBanner:''
    }
    const [{HotLinkList},{NewlyIndexLinkList},{EditorRecommendLinkList},{HotClickLinkList},{RecommendBanner},{NewlyIndexLinkBanner},{HotClickBanner}] = await Promise.all([
        LinkDataRequest.getHotLinkList(),
        LinkDataRequest.getNewlyIndexLink(20),
        LinkDataRequest.getEditorRecommendLink(40),
        LinkDataRequest.getHotClickLink(100),
        CoverDataRequest.getRecommendBanner(),
        CoverDataRequest.getNewlyIndexLinkBanner(),
        CoverDataRequest.getHotClickBanner()
    ])

    return {
        props: {
            HotLinkList:HotLinkList || LibraryData.HotLinkList,
            NewlyIndexLinkList:NewlyIndexLinkList || LibraryData.NewlyIndexLinkList,
            EditorRecommendLinkList:EditorRecommendLinkList || LibraryData.EditorRecommendLinkList,
            HotClickLinkList:HotClickLinkList || LibraryData.HotClickLinkList,
            RecommendBanner:RecommendBanner || '',
            NewlyIndexLinkBanner:NewlyIndexLinkBanner || '',
            HotClickBanner:HotClickBanner || ''
        },
        revalidate:revalidateTime
    }
}
export default Library;