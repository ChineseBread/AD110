import {useState} from 'react';
import {Button, Card, Empty, message} from "antd";
import Link from "next/link";
import HeadTag from "@components/app/HeadTag";
import CustomPageDataRequest from "@utils/request/CustomPageDataRequest";
import styles from '@styles/pages/CustomPage.module.scss'
function CustomPageList() {
    const [list,setList] = useState<CustomPage[]>([])
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(false)
    const getMoreCustomPage = () => {
        CustomPageDataRequest.getCustomPage(page + 1, 20).then(result => {
          if (result.Ok){
              const {CustomPageData:{CustomPageList,total}}:any = result
              setList(list => [...list,...CustomPageList])
              setPage(page => page + 1)
              setHasMore(list.length + CustomPageList.length < total)
          }else{
              message.warn('获取失败')
          }
      })
    }
    return (
        <div className='page-content font-family'>
            <HeadTag title='AD110'/>
            <Card title='自定义页面'>
                <div className={styles.custom_page_container}>
                    {list.length >= 1 ? list.map(({page_id,page_title}) => {
                        return(
                           <Link href={`/custom/check?pageid=${page_id}`} key={page_id}>
                               <div className={styles.custom_page_item}>
                                   {page_title}
                               </div>
                           </Link>
                        )
                    }):<Empty/>}
                    <Button onClick={getMoreCustomPage} block type='text' disabled={!hasMore}>更多</Button>
                </div>
            </Card>
        </div>
    )
}

export default CustomPageList;