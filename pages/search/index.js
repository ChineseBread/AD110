import {useEffect, useState} from 'react';
import {Divider, Empty, List} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogItem from "../../components/Search/BlogItem";
import UrlItem from "../../components/Search/UrlItem";
import CustomHeadTag from "../../components/App/CustomHeadTag";
import SearchDataRequest from "../../uitls/request/SearchDataRequest";

function Search({SearchData:{SearchList,total},query}) {
    const [list,setList] = useState(SearchList)
    const [page,setPage] = useState(1)

    useEffect(() => {
        setList(SearchList)
        setPage(1)
    },[query])

    const getSearchList = () => {
        SearchDataRequest.getSearchData(query,page + 1).then(result => {
            if (result.Ok){
                setList(list => [...list,...result.SearchData.SearchList])
                setPage(page => page + 1)
            }
        })
    }
    return (
        <div className='page-content font-family'>
            <CustomHeadTag title='AD110'/>
            {list.length >= 1 ?
            <InfiniteScroll
                dataLength={list.length}
                next={getSearchList}
                hasMore={list.length < total}
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
export async function getServerSideProps(context){
    let{query:{query}} = context;
    let SearchData = {SearchList: [],total:0}
    let result = await SearchDataRequest.getSearchData(query)
    if (result.Ok) SearchData = result.SearchData
    return {
        props:{SearchData,query}
    }
}
export default Search;