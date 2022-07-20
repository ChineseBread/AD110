import {useState} from 'react';
import CustomDataRequest from "../../uitls/request/CustomDataRequest";
import {Button, Card, Empty, message} from "antd";
import styles from '../../styles/pages/CustomPage.module.scss'
import Link from "next/link";
import Head from "next/head";
function CustomPageList({CustomPageData:{total,CustomPageList}}) {
    const [list,setList] = useState(CustomPageList)
    const [page,setPage] = useState(1)
    const getMoreCustomPage = () => {
      CustomDataRequest.getCustomPage(page + 1, 20).then(result => {
          if (result.Ok){
              setList(list => [...list,...result.CustomPageData.CustomPageList])
              setPage(page => page + 1)
          }else{
              message.warn('获取失败')
          }
      })
    }
    return (
        <div className='page-content font-family'>
            <Head>
                <title>AD110自定义</title>
            </Head>
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
                    <Button onClick={getMoreCustomPage} block type='text' disabled={list.length >= total}>更多</Button>
                </div>
            </Card>
        </div>
    )
}
export async function getStaticProps(context) {
    let CustomPageData = {CustomPageList:[],total:0}
    let result = await CustomDataRequest.getCustomPage()
    if (result.Ok){
        CustomPageData = result.CustomPageData
    }
    return {
        props: {CustomPageData},revalidate:21600
    }
}
export default CustomPageList;