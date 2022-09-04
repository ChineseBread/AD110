import {Fragment, useState, useEffect, useContext} from 'react'
import {Button, Dropdown, Input, Menu} from "antd";
import {SearchOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import Image from "next/image";
import logo from '../../public/static/logo.png'
import logoWhite from '../../public/static/logo_white.png'
import styles from "../../styles/app/CustomHeader.module.scss"
import ScreenContext from "../../store/ScreenContext";
const {Search} = Input
const styleArr = ['/','/section','/news/check']
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
			let scrollTop = document.documentElement.scrollTop
			if ((scrollTop / clientHeight).toFixed(2) > 0.1 || (isPhone && scrollTop >= 150)){
				setFixed(true)
			}
			if ((scrollTop / clientHeight).toFixed(2) <= 0.1 || (isPhone && scrollTop <= 50)) setFixed(false)
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
function HeaderDropDown({style}) {
	const router = useRouter()
	const [visible, setVisible] = useState(false);
	const [text,setText] = useState('')
	const handleMenuClick = ({key}) => {
		if (key !== 'search') {
			if (key === 'homepage') router.push('/')
			else router.push(`/${key}`)
			setVisible(false);
		}
	};

	const handleVisibleChange = flag => {
		setVisible(flag);
		setText('')
	};
	const handleText = ({target}) => {
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
			<Menu.Item key='homepage'>
				首页
			</Menu.Item>
			<Menu.Item key='search'><Search placeholder='回车搜索' onSearch={handleSearch} onPressEnter={handleSearch}  value={text} onChange={handleText}/></Menu.Item>
			<Menu.Item key='library'>
				资库
			</Menu.Item>
			<Menu.Item key='elegant'>
				出色
			</Menu.Item>
			<Menu.Item key='match'>
				竞赛
			</Menu.Item>
			<Menu.Item key='classic'>
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
			<span>
				<Image onClick={() => router.push('/')} src={style ? logoWhite : logo} alt='AD110' priority={true} layout='responsive' width={90} height={30}/>
			</span>
		</Fragment>
	);
}
function HeaderMenu({style}){
	const router = useRouter()
	const [text,setText] = useState('')

	const {menu,menuItem} = style ? HomeHeader : OtherHeader

	const handleText = ({target}) => {
		setText(target.value)
	}
	const handleSearch = () => {
		if (!text) return;
		router.push(`/search?query=${text}`)
		setText('')
	}
	const onClick = ({key}) => {
		// console.log(key)
		if (key === 'homepage') router.push('/')
		else router.push(`/${key}`)
	}
	return (
		<Fragment>
			<Menu
				mode="horizontal"
				disabledOverflow={true}
				style={menu}
				onClick={onClick}
			>
				<Menu.Item key='homepage'>
					<span style={menuItem}>首页</span>
				</Menu.Item>
				<Menu.Item key='library'>
					<span style={menuItem}>资库</span>
				</Menu.Item>
				<Menu.Item key='elegant'>
					<span style={menuItem}>出色</span>
				</Menu.Item>
				<Menu.Item key='match'>
					<span style={menuItem}>竞赛</span>
				</Menu.Item>
				<Menu.Item key='classic'>
					<span style={menuItem}>经典</span>
				</Menu.Item>
			</Menu>
			<Input onPressEnter={handleSearch} className={style ? 'custom-header-white' : 'custom-header-dark'} suffix={<SearchOutlined onClick={handleSearch} style={{color:style? '#fff' : '#141414'}}/>} value={text} onChange={handleText}/>
		</Fragment>
	)
}