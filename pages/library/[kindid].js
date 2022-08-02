import {useContext, useEffect, useState} from 'react';
import {Button, Divider, Empty, PageHeader} from "antd";
import {useRouter} from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import HotLinkHeader from "../../components/Global/HotLinkHeader";
import PageBanner from "../../components/Global/PageBanner";
import PhoneComponent from "../../components/Library/PhoneComponent";
import PCComponent from "../../components/Library/PCComponent";
import CustomHeadTag from "../../components/App/CustomHeadTag";
import ScreenContext from "../../store/ScreenContext";
import LinkDataRequest from "../../uitls/request/LinkDataRequest";
import CoverDataRequest from "../../uitls/request/CoverDataRequest";
import revalidateTime from "../../config/revalidate";
function LinkInfo({LibraryData:{HotLinkCategoryList,UrlListInfo:{kindName,UrlList,total},kindid,HomePageFooterCover}}) {
    const {isPhone} = useContext(ScreenContext)
    const router = useRouter()
    const [UrlListInfo,setUrlListInfo] = useState({UrlList,hasMore:UrlList.length < total})
    const [page,setPage] = useState(1)
    useEffect(() =>{
        setPage(1)
        setUrlListInfo({UrlList,hasMore: UrlList.length < total})
    },[kindid])
    const getMoreUrlList = () => {
        LinkDataRequest.getUrlListByKindID(kindid,page + 1).then(result =>{
            if (result.Ok){
                const {UrlList} = result.UrlListInfo
                setUrlListInfo(UrlListInfo => {
                    return{
                        UrlList: [...UrlListInfo.UrlList,...UrlList],
                        hasMore:UrlListInfo.UrlList.length + UrlList.length < total
                    }
                })
                setPage(page => page + 1)
            }
        })
    }
    const onQueryModeChange = mode => {
        return () => {
            LinkDataRequest.getUrlListByMode(mode,kindid).then(result => {
                if (result.Ok){
                    setPage(1)
                    setUrlListInfo({UrlList: result.UrlListInfo.UrlList,hasMore: false})
                }
            })
        }
    }
    return (
        <div className='page-content font-family'>
            <CustomHeadTag title='AD110·资库'/>
            <HotLinkHeader HotLinkCategoryList={HotLinkCategoryList}/>
            <div>
                <PageHeader
                    // className="link-info-page-header"
                    title={kindName}
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
                    dataLength={UrlListInfo.UrlList.length}
                    next={getMoreUrlList}
                    hasMore={UrlListInfo.hasMore}
                    loader={<Divider plain>加载中</Divider>}
                    endMessage={!isPhone && <Divider style={{border:0,margin:'0.7rem 0'}} plain/>}
                >
                    {isPhone ? <PhoneComponent UrlList={UrlListInfo.UrlList}/> : <PCComponent UrlList={UrlListInfo.UrlList}/>}
                </InfiniteScroll> : <div style={{height:'500px',display:'flex',justifyContent:'space-around',flexDirection:'column'}}><Empty title='暂无数据'><Button type='default' onClick={() => router.replace('/library')}>返回资库</Button></Empty></div>}
            <PageBanner url={HomePageFooterCover}/>
        </div>
    )
}
export async function getStaticProps(context) {
    const {params:{kindid}} = context
    let LibraryData = {HotLinkCategoryList:[],UrlListInfo:{kindName: '',UrlList: [],total:0},kindid,HomePageFooterCover:''}
    if (Number.isNaN(parseInt(kindid))) return {props:{LibraryData}}

    let libraryResult = await Promise.all([
        LinkDataRequest.getHotLinkCateGory(),
        LinkDataRequest.getUrlListByKindID(kindid,1),
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
export async function getStaticPaths() {
    let result = await LinkDataRequest.getHotLinkCateGory()
    let paths = []
    if (result.Ok){
        paths = result.HotLinkCategoryList.map(({id}) => ({params:{kindid:String(id)}}))
    }
    return { paths, fallback: 'blocking' }
}

export default LinkInfo;