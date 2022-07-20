import {useEffect, Fragment, useState} from "react";
import {BackTop, Button,ConfigProvider} from "antd";
import {ArrowUpOutlined} from "@ant-design/icons";
import zhCN from 'antd/lib/locale/zh_CN';
import CustomHeader from "../components/App/CustomHeader";
import CustomFooter from "../components/App/CustomFooter";
import {ScreenContextProvider} from "../store/ScreenContext";
import Loading from "../components/Global/Loading";
import '../styles/global/globals.css'
import '../styles/global/header.scss'
import '../styles/components/LinkCard.scss'
import '../styles/components/BlogCard.scss'
import 'antd/dist/antd.compact.min.css'
import {useRouter} from "next/router";
function MyApp({ Component, pageProps }) {
    const [width,setWidth] = useState(1500)
    const [waiting,setWating] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const clientWidth = document.documentElement.clientWidth
        const scale = clientWidth / 1500
        if (scale >= 0.9){
            document.documentElement.style.fontSize = (scale * 16).toFixed(3) + 'px'
        }
        setWidth(clientWidth)
        setTimeout(() => {
            setWating(false)
        },1500)
    },[])

    useEffect(() => {
        if (router.pathname === '/' &&　!waiting) document.body.className = 'background'
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
                         <div className='page-footer'>
                             <CustomFooter/>
                         </div>
                         <BackTop>
                             <Button type='circle' size='large' icon={<ArrowUpOutlined />}/>
                         </BackTop>
                     </Fragment>
             }
         </ConfigProvider>
     </ScreenContextProvider>
    )
}

export default MyApp
