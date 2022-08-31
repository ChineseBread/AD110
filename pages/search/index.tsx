import {useCallback, useEffect, useState} from 'react';
import {Card, Divider, Empty, List} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import UserOperation from "@utils/request/UserOperation";
import HeadTag from "@components/app/HeadTag";
import {useRouter} from "next/router";
import BlogItem from "@components/search/BlogItem";
import UrlItem from "@components/search/UrlItem";

function Search() {
    const router = useRouter()
    const [BlogList,setBlogList] = useState<BlogData[]>([])
    const [UrlList,setUrlList] = useState<BlogLink[]>([])
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(false)
    const [loading,setLoading] = useState(true)
    const {query}:any = router.query

    useEffect(() => {
        setLoading(true)
        UserOperation.getSearchData(query,1).then(result => {
            if (result.Ok){
                const {SearchData = {BlogList,UrlList,total:0}} = result
                setBlogList(SearchData.BlogList)
                setUrlList(SearchData.UrlList)
                setPage(2)
                setHasMore(SearchData.UrlList.length + SearchData.BlogList.length < SearchData.total)
            }
            setLoading(false)
        })
    },[query])

    const getSearchList = () => {
        UserOperation.getSearchData(query,page + 1).then(result => {
            if (result.Ok){
                const {SearchData = {BlogList,UrlList,total:0}} = result
                setBlogList(list => [...list,...SearchData.BlogList])
                setUrlList(list => [...list,...SearchData.UrlList])
                setPage(page => page + 1)
                setHasMore(BlogList.length + UrlList.length + SearchData.UrlList.length + SearchData.BlogList.length < SearchData.total)
            }
        })
    }

    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110'/>
            {loading ? <Card loading={true} title='加载中' bordered={false}/> : BlogList.length >= 1 || UrlList.length >=1 ? <InfiniteScroll
                dataLength={UrlList.length + BlogList.length}
                next={getSearchList}
                hasMore={hasMore}
                loader={<Divider plain>加载中</Divider>}
                endMessage={ <Divider style={{border:0,margin:'0.7rem 0'}} plain/>}
            >
                <List
                    itemLayout="vertical"
                    size="large"
                >
                    {BlogList.map((item) => <BlogItem key={item.log_id} {...item}/>)}
                    {UrlList.map((item) => <UrlItem key={item.url_id} {...item}/>)}
                </List>
            </InfiniteScroll> : <Empty/>}
        </div>
    )
}

export default Search;