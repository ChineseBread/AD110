import {Fragment, useContext, useEffect, useState} from 'react';
import {Button, Divider, PageHeader, Collapse, Result} from "antd";
import {useRouter} from "next/router";
import {EyeOutlined, ArrowLeftOutlined} from "@ant-design/icons";
import HotLinkHeader from "../../components/Global/HotLinkHeader";
import LinkDataRequest from "../../uitls/request/LinkDataRequest";
import styles from '../../styles/pages/LinkInfo.module.scss'
import ScreenContext from "../../store/ScreenContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import CoverDataRequest from "../../uitls/request/CoverDataRequest";
import PageBanner from "../../components/App/PageBanner";
const { Panel } = Collapse;
function LinkInfo({LibraryData:{HotLinkCategoryList,CategoryListInfo:{kindName,CategoryList,total},kindid,HomePageFooterCover}}) {
    const {isPhone} = useContext(ScreenContext)
    const router = useRouter()
    const [CategoryListInfo,setCategoryListInfo] = useState({CategoryList,hasMore:CategoryList.length < total})
    const [page,setPage] = useState(1)
    useEffect(() =>{
        setPage(1)
        setCategoryListInfo({CategoryList,hasMore: CategoryList.length < total})
    },[kindid])
    const getMoreCategoryList = () => {
        LinkDataRequest.getCategoryListByKindID(kindid,page + 1).then(result =>{
            if (result.Ok){
                const {CategoryList} = result.CategoryListInfo
                setCategoryListInfo(CategoryListInfo => {
                    return{
                        CategoryList: [...CategoryListInfo.CategoryList,...CategoryList],
                        hasMore:CategoryListInfo.CategoryList.length + CategoryList.length < total
                    }
                })
                setPage(page => page + 1)
            }
        })
    }
    return (
        <div className={`page-content ${!isPhone ? 'font-family' : ''}`}>
            <Head>
                <title>AD110资库</title>
            </Head>
            <HotLinkHeader HotLinkCategoryList={HotLinkCategoryList}/>
            <div>
                <PageHeader
                    className="link-info-page-header"
                    title={kindName}
                    subTitle={`本类目共有${total}个条目 | ★为编辑推荐`}
                    extra={
                        <Button type='icon' onClick={() => router.back()} icon={<ArrowLeftOutlined />}/>
                    }
                />
            </div>
            {CategoryList.length >= 1 ?
                <InfiniteScroll
                    dataLength={CategoryListInfo.CategoryList.length}
                    next={getMoreCategoryList}
                    hasMore={CategoryListInfo.hasMore}
                    loader={<Divider plain>🧐 加载中</Divider>}
                    endMessage={<Divider plain/>}
                >
                    {isPhone ? <PhoneComponent CategoryList={CategoryListInfo.CategoryList}/> : <PCComponent CategoryList={CategoryListInfo.CategoryList}/>}
                </InfiniteScroll> : <Result status='404' title='暂无数据' extra={<Button type='default' onClick={() => router.replace('/library')}>返回资库</Button>}/>}
            <PageBanner url={HomePageFooterCover}/>
        </div>
    )
}
function PhoneComponent({CategoryList}){
    return(
        <Collapse ghost>
            {CategoryList.map(({url_id,url_name,url_hits,cool,url_info}) => {
                return(
                    <Fragment key={url_id}>
                        <Panel style={{borderBottom:'1px solid #bfbfbf'}} header={<span style={{fontWeight:700,letterSpacing:0.5}}>{url_name}</span>} extra={
                            <span style={{color:'#8c8c8c',fontWeight:700}}>
                                {cool === 1 && "★"}
                                <EyeOutlined style={{margin:'0 5px 0 10px'}}/>
                                {url_hits}
                            </span>
                        }>
                            {url_info}
                        </Panel>
                    </Fragment>
                )
            })}
        </Collapse>
    )
}

function PCComponent({CategoryList}){
    return(
        <Fragment>
            {CategoryList.map(({url_id,url_name,urlvalue,url_hits,iscool_switch,url_info}) => {
                return (
                    <Fragment key={url_id}>
                        <div className={styles.link_info_item}>
                            <div className={styles.link_info}>
                                <div><a target='_blank' href={urlvalue}>{url_name}</a></div>
                                <div>
                                    {iscool_switch === 1 && "★"}
                                    <EyeOutlined style={{margin:'0 5px 0 5px'}}/>
                                    <span>{url_hits}</span>
                                </div>
                            </div>
                            <div className={styles.link_info_content}>
                                {url_info}
                            </div>
                        </div>
                        <Divider style={{margin:'5px 0',borderBottom:'1px solid #8c8c8c'}}/>
                    </Fragment>
                )
            })}
        </Fragment>
    )
}
export async function getStaticProps(context) {
    const {params:{kindid}} = context
    let LibraryData = {HotLinkCategoryList:[],CategoryListInfo:{kindName: '',CategoryList: [],total:0},kindid,HomePageFooterCover:''}
    if (Number.isNaN(parseInt(kindid))) return {props:{LibraryData}}
    let libraryResult = await Promise.all([
        LinkDataRequest.getHotLinkCateGory(),
        LinkDataRequest.getCategoryListByKindID(kindid,1),
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
        revalidate:1800
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