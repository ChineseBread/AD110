import {useEffect, useState} from 'react';
import {Divider, Empty, List, message, Skeleton} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogItem from "../../components/search/BlogItem";
import UrlItem from "../../components/search/UrlItem";
import HeadTag from "../../components/app/HeadTag";
import SearchDataRequest from "../../uitls/request/SearchDataRequest";
import {useRouter} from "next/router";

function Search() {
    const router = useRouter()
    const {query} = router.query
    const [list,setList] = useState([])
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(true)
    const [hasMore,setHasMore] = useState(false)
    useEffect(() => {
        query && SearchDataRequest.getSearchData(query,1).then(result => {
            if (result.Ok){
                const {SearchData:{SearchList,total}} = result
                setList(SearchList)
                setHasMore(SearchList.length < total)
                setPage(1)
            }else {
                message.warn('查询失败')
            }
            setLoading(false)
        })
    },[query])

    const getSearchList = () => {
        SearchDataRequest.getSearchData(query,page + 1).then(result => {
            if (result.Ok){
                const {SearchData:{SearchList,total}} = result
                setList(list => [...list,...SearchList])
                setPage(page => page + 1)
                setHasMore(list.length + SearchList.length < total)
            }else {
                message.warn('查询失败')
            }
        })
    }
    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110'/>
            {loading ? <Skeleton active/> :  list.length >= 1 ?
                <InfiniteScroll
                    dataLength={list.length}
                    next={getSearchList}
                    hasMore={hasMore}
                    loader={<Divider plain>加载中</Divider>}
                    endMessage={ <Divider style={{border:0,margin:'0.7rem 0'}} plain/>}
                >
                    <List
                        itemLayout="vertical"
                        size="large"
                    >
                        {list.map((item,index) => {
                            return item.hasOwnProperty('log_id') ?  <BlogItem key={index} {...item}/> : <UrlItem key={index} {...item}/>
                        })}
                    </List>
                </InfiniteScroll> : <Empty/>}
        </div>
    )
}
// export async function getServerSideProps(context){
//     let{query:{query}} = context;
//     let SearchData = {SearchList: [],total:0}
//     let result = await SearchDataRequest.getSearchData(query)
//     if (result.Ok) SearchData = result.SearchData
//     return {
//         props:{SearchData,query}
//     }
// }
export default Search;