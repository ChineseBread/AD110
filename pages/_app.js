import {useEffect, Fragment, useState} from "react";
import {BackTop, Button,ConfigProvider} from "antd";
import {ArrowUpOutlined} from "@ant-design/icons";
import zhCN from 'antd/lib/locale/zh_CN';
import CustomHeader from "../components/App/CustomHeader";
import CustomFooter from "../components/App/CustomFooter";
import {ScreenContextProvider} from "../store/ScreenContext";
import Loading from "../components/Global/Loading";
import AdjustScale from "../components/App/AdjustScale";
import '../styles/global/globals.css'
import '../styles/app/header.scss'
import '../styles/pages/BlogPreview/BlogPreviewImg.scss'
import '../styles/pages/Library/LinkCard.scss'
import '../styles/pages/Classic/BlogCardHeader.scss'
import 'antd/dist/antd.compact.min.css'
import {useRouter} from "next/router";
function MyApp({ Component, pageProps }) {
    const [width,setWidth] = useState(1500)
    const [waiting,setWaiting] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const clientWidth = document.documentElement.clientWidth
        const scale = clientWidth / 1500
        if (scale >= 0.9){
            document.documentElement.style.fontSize = (scale * 20).toFixed(3) + 'px'
        }
        setWidth(clientWidth)
        setTimeout(() => {
            setWaiting(false)
        },1500)
    },[])

    useEffect(() => {
        if (router.pathname === '/' &&　!waiting) document.body.className = `${width <= 900 ? 'background-phone' : 'background-pc'}`
        else document.body.className = ''
    },[waiting,router])
  return (
     <ScreenContextProvider clientWidth={width}>
         <ConfigProvider locale={zhCN}>
             {
                 waiting ?  <Loading/> :
                 <Fragment>
                     <div className='page-header'>
                        <CustomHeader/>
                     </div>
                     <div className='page-content-container'>
                        <Component {...pageProps} />
                     </div>
                     <div className='page-footer font-family'>
                        <CustomFooter/>
                     </div>
                     <BackTop>
                        <Button type='circle' size='large' icon={<ArrowUpOutlined />}/>
                     </BackTop>
                     {width >= 1000 && <AdjustScale/>}
                 </Fragment>

             }
         </ConfigProvider>
     </ScreenContextProvider>
    )
}

export default MyApp
