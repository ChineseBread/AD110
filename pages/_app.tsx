import {useEffect, Fragment, useState} from "react";
import {BackTop, Button,ConfigProvider} from "antd";
import {ArrowUpOutlined} from "@ant-design/icons";
import zhCN from 'antd/lib/locale/zh_CN';
import {useRouter} from "next/router";
import Header from "@components/app/Header";
import Footer from "@components/app/Footer";
import Loading from "@components/global/Loading";
import AdjustScale from "@components/app/AdjustScale";
import {ScreenContextProvider} from "@store/ScreenContext";
import '@styles/global/globals.css'
import '@styles/app/header.scss'
import '@styles/pages/BlogPreview/BlogPreviewImg.scss'
import '@styles/pages/Library/LinkCard.scss'
import '@styles/pages/Classic/BlogCardHeader.scss'
// import 'antd/dist/antd.min.css';
import 'antd/dist/antd.compact.min.css'
function MyApp({ Component, pageProps }:any) {

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
          {waiting ?  <Loading/> : <Fragment>
                <div className='page-header'>
                  <Header/>
                </div>
                <div className='page-content-container'>
                  <Component {...pageProps} />
                </div>
                <div className='page-footer font-family'>
                  <Footer/>
                </div>
                <BackTop>
                  <Button shape='circle' size='large' icon={<ArrowUpOutlined />}/>
                </BackTop>
                {width >= 1000 && <AdjustScale/>}
              </Fragment>}
        </ConfigProvider>
      </ScreenContextProvider>
  )
}

export default MyApp
