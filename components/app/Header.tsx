import {Fragment, useState, useEffect, useContext} from 'react'
import {Button, Dropdown, Input, Menu} from "antd";
import {SearchOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";
import logo from '@public/static/logo.png'
import logoWhite from '@public/static/logo_white.png'
import styles from "@styles/app/CustomHeader.module.scss"
import ScreenContext from "@store/ScreenContext";
const {Search} = Input
const styleArr = ['/','/blog','/news/check']
const HomeHeader = {
    menu:{
        border:'none',
        background:"transparent"
    },
    menuItem:{
        color:'#fff'
    }
}
const OtherHeader = {
    menu:{
        border:'none',
        background:"transparent"
    },
    menuItem: {
        color:"#141414"
    }
}

export default function Header() {
    const router = useRouter()
    const [style,setStyle] = useState(styleArr.some(e => e === router.pathname))
    const [isFixed,setFixed] = useState(false)
    const {isPhone} = useContext(ScreenContext)
    useEffect(() => {
        setStyle(styleArr.some(e => e === router.pathname))
    },[router.pathname])
    useEffect(() => {
        let clientHeight = document.documentElement.clientHeight
        const listener = () => {
            let scrollTop:number = document.documentElement.scrollTop
            if (Number((scrollTop / clientHeight).toFixed(2)) > 0.1 || (isPhone && scrollTop >= 150)){
                setFixed(true)
            }
            if (Number((scrollTop / clientHeight).toFixed(2)) <= 0.1 || (isPhone && scrollTop <= 50)) setFixed(false)
        }
        document.addEventListener('scroll',listener)
        return () => document.removeEventListener('scroll',listener)
    },[])
    return (
        <div className={`${styles.header} font-family`} style={isFixed ? {background:'#fff',boxShadow:'0px 1px 4px -2px #595959'} : {}}>
            <div>
                <HeaderDropDown style={isFixed ? false : style}/>
            </div>
            <div className='header-menu'>
                <HeaderMenu style={isFixed ? false : style}/>
            </div>
        </div>
    );
}
function HeaderDropDown({style}:any) {
    const router = useRouter()
    const [visible, setVisible] = useState(false);
    const [text,setText] = useState('')
    const handleMenuClick = ({key}:any) => {
        if (key !== 'search') {
            router.push(`${key}`)
            setVisible(false);
        }
    };

    const handleVisibleChange = (flag:boolean) => {
        setVisible(flag);
        setText('')
    };
    const handleText = ({target}:any) => {
        setText(target.value)
    }
    const handleSearch = () => {
        if (!text) return;
        router.push(`/search?query=${text}`)
        setText('')
        setVisible(false)
    }
    const menu = (
        <Menu
            onClick={handleMenuClick}
        >
            <Menu.Item key='/'>
                首页
            </Menu.Item>
            <Menu.Item key='/search'><Search placeholder='回车搜索' onSearch={handleSearch} onPressEnter={handleSearch}  value={text} onChange={handleText}/></Menu.Item>
            <Menu.Item key='/library'>
                资库
            </Menu.Item>
            <Menu.Item key='/elegant'>
                出色
            </Menu.Item>
            <Menu.Item key='/match'>
                竞赛
            </Menu.Item>
            <Menu.Item key='/classic'>
                经典
            </Menu.Item>
        </Menu>
    );
    return (
        <Fragment>
			<span>
				<Dropdown overlayClassName='header-drop-down font-family' overlayStyle={{position:'fixed',top:20}} overlay={menu} onVisibleChange={handleVisibleChange} trigger={['click']} visible={visible}>
					<Button size='large' type='text' icon={<UnorderedListOutlined style={{color:style ? "#fff" : '#141414'}}/>}/>
				</Dropdown>
			</span>
            <Link href='/'>
				<span>
					<Image quality={70} src={style ? logoWhite : logo} alt='AD110' priority={true} layout='responsive' width={90} height={30}/>
				</span>
            </Link>
        </Fragment>
    );
}
function HeaderMenu({style}:any){
    const router = useRouter()
    const [text,setText] = useState('')
    const handleText = ({target}:any) => {
        setText(target.value)
    }
    const handleSearch = () => {
        if (!text) return;
        router.push(`/search?query=${text}`)
        setText('')
    }
    const onClick = ({key}:any) => {
        router.push(`${key}`)
    }
    const {menu,menuItem} = style ? HomeHeader : OtherHeader
    return (
        <Fragment>
            <Menu
                mode="horizontal"
                disabledOverflow={true}
                style={menu}
                onClick={onClick}
            >
                <Menu.Item key='/'>
                    <span style={menuItem}>首页</span>
                </Menu.Item>
                <Menu.Item key='/library'>
                    <span style={menuItem}>资库</span>
                </Menu.Item>
                <Menu.Item key='/elegant'>
                    <span style={menuItem}>出色</span>
                </Menu.Item>
                <Menu.Item key='/match'>
                    <span style={menuItem}>竞赛</span>
                </Menu.Item>
                <Menu.Item key='/classic'>
                    <span style={menuItem}>经典</span>
                </Menu.Item>
            </Menu>
            <Input onPressEnter={handleSearch} className={style ? 'custom-header-white' : 'custom-header-dark'} suffix={<SearchOutlined onClick={handleSearch} style={{color:style? '#fff' : '#141414'}}/>} value={text} onChange={handleText}/>
        </Fragment>
    )
}
