import {useContext, useEffect, useState} from 'react';
import {Button, Divider, Empty, PageHeader} from "antd";
import {useRouter} from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import HeadTag from "@components/app/HeadTag";
import LibraryHeader from "@components/library/LibraryHeader";
import PageBanner from "@components/global/PageBanner";
import PCComponent from "@components/library/PCComponent";
import PhoneComponent from "@components/library/PhoneComponent";
import LinkDataRequest from "@utils/request/LinkDataRequest";
import CoverDataRequest from "@utils/request/CoverDataRequest";
import ScreenContext from "@store/ScreenContext";
import revalidateTime from "@config/revalidate";
interface Props{
    HotLinkList:HotLink[]
    UrlListInfo:{UrlName:string,UrlList:BlogLink[],total:number}
    UrlID:BlogLink['url_id']
    HomePageFooterBanner:string
}
function LinkInfo({HotLinkList,UrlListInfo:{UrlName,UrlList,total},UrlID,HomePageFooterBanner}:Props) {
    const {isPhone} = useContext(ScreenContext)
    const router = useRouter()
    const [list,setList] = useState<BlogLink[]>(UrlList)
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(UrlList.length < total)

    useEffect(() =>{
        setPage(1)
        setList(UrlList)
        setHasMore(UrlList.length < total)
    },[UrlID])

    const getMoreUrlList = () => {
        LinkDataRequest.getUrlListByUrlID(UrlID,page + 1).then(result =>{
            if (result.Ok){
                const {UrlListInfo:{UrlList} = {UrlList:[]}} = result
                setList(list => [...list,...UrlList])
                setPage(page => page + 1)
                setHasMore(list.length + UrlList.length < total)
            }
        })
    }
    const onQueryModeChange = (mode:'list_by_random' | 'list_by_hot' | 'list_by_recommend') => {
        return () => {
            LinkDataRequest.getUrlListByMode(mode,UrlID).then(result => {
                if (result.Ok){
                    setPage(1)
                    setList(result.UrlListInfo?.UrlList || [])
                    setHasMore(false)
                }
            })
        }
    }
    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110·资库'/>
            <LibraryHeader HotLinkList={HotLinkList}/>
            <div>
                <PageHeader
                    title={UrlName}
                    subTitle={<>本类目共有{total}个条目 | <span style={{color:'#40a9ff'}}>★</span>为编辑推荐</>}
                    style={!isPhone ? {padding:'4px 0',borderBottom:'1px solid #8c8c8c'} : {}}
                    extra={!isPhone &&
                        <div>
                            可选列表查询方式:
                            <Button style={{padding:'0 0.3rem'}} onClick={onQueryModeChange('list_by_random')} type='text'>随机</Button>
                            <Button style={{padding:'0 0.3rem'}} onClick={onQueryModeChange('list_by_hot')} type='text'>热门</Button>
                            <Button style={{padding:'0 0.3rem'}} onClick={onQueryModeChange('list_by_recommend')} type='text'>推荐</Button>
                        </div>
                    }
                />
            </div>
            {UrlList.length >= 1 ?
                <InfiniteScroll
                    dataLength={list.length}
                    next={getMoreUrlList}
                    hasMore={hasMore}
                    loader={<Divider plain>加载中</Divider>}
                    endMessage={!isPhone && <Divider style={{border:0,margin:'0.7rem 0'}} plain/>}
                >
                    {isPhone ? <PhoneComponent UrlList={UrlList}/> : <PCComponent UrlList={UrlList}/>}
                </InfiniteScroll> : <div style={{height:'500px',display:'flex',justifyContent:'space-around',flexDirection:'column'}}><Empty><Button type='default' onClick={() => router.replace('/library')}>返回资库</Button></Empty></div>}
            <PageBanner url={HomePageFooterBanner}/>
        </div>
    )
}
export async function getStaticProps(context:any):Promise<NextStaticPropsValue<Props>> {
    const {params:{kindid}} = context
    let LibraryData:Props = {
        HotLinkList:[],
        UrlListInfo:{UrlName:'',UrlList:[],total:0},
        UrlID:kindid,
        HomePageFooterBanner:''
    }
    if (Number.isNaN(parseInt(kindid))) return {props:{...LibraryData}}

    let [{HotLinkList},{UrlListInfo},{HomePageFooterBanner}] = await Promise.all([
        LinkDataRequest.getHotLinkList(),
        LinkDataRequest.getUrlListByUrlID(kindid,1),
        CoverDataRequest.getHomePageFooterBanner()
    ])
    return {
        props: {
            HotLinkList:HotLinkList || [],
            UrlListInfo:UrlListInfo || LibraryData.UrlListInfo,
            UrlID:kindid,
            HomePageFooterBanner:HomePageFooterBanner || ''
        },
        revalidate:revalidateTime
    }
}
export async function getStaticPaths():Promise<NextStaticPaths<{kindid:string}>> {
    let paths:Array<{params:{kindid:string}}> = []
    let result = await LinkDataRequest.getHotLinkList()
    if (result.Ok) paths = (result.HotLinkList || []).map(({id}) => ({params:{kindid:String(id)}}))
    return { paths, fallback: 'blocking' }
}

export default LinkInfo;