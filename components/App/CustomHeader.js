import {Fragment, useEffect} from 'react'
import {Button, Dropdown, Input, Menu} from "antd";
import {SearchOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import logo from '../../public/static/logo.png'
import logoWhite from '../../public/static/logo_white.png'
import styles from "../../styles/app/CustomHeader.module.scss"
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

export default function CustomHeader() {
	const router = useRouter()
	const [style,setStyle] = useState(styleArr.some(e => e === router.pathname))
	const [isFixed,setFixed] = useState(false)
	useEffect(() => {
		setStyle(styleArr.some(e => e === router.pathname))
	},[router.pathname])
	useEffect(() => {
		let clientHeight = document.documentElement.clientHeight
		const listener = () => {
			let scrollTop = document.documentElement.scrollTop
			if ((scrollTop / clientHeight).toFixed(2) > 0.1){
				setFixed(true)
			}
			if ((scrollTop / clientHeight).toFixed(2) <= 0.1) setFixed(false)
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
				<Link href='/'>
					首页
				</Link>
			</Menu.Item>
			<Menu.Item key='search'><Search placeholder='回车搜索' onSearch={handleSearch} onPressEnter={handleSearch}  value={text} onChange={handleText}/></Menu.Item>
			<Menu.Item key='library'>
				<Link href='/library'>
					资库
				</Link>
			</Menu.Item>
			<Menu.Item key='elegant'>
				<Link href='/elegant'>
					出色
				</Link>
			</Menu.Item>
			<Menu.Item key='match'>
				<Link href='/match'>
					竞赛
				</Link>
			</Menu.Item>
			<Menu.Item key='classic'>
				<Link href='/classic'>
					经典
				</Link>
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
					<Image src={style ? logoWhite : logo} alt='AD110' priority={true} layout='responsive' width={90} height={30}/>
				</span>
			</Link>
		</Fragment>
	);
}
function HeaderMenu({style}){
	const router = useRouter()
	const [text,setText] = useState('')
	const handleText = ({target}) => {
		setText(target.value)
	}
	const handleSearch = () => {
		if (!text) return;
		router.push(`/search?query=${text}`)
		setText('')
	}
	const {menu,menuItem} = style ? HomeHeader : OtherHeader
	return (
		<Fragment>
			<Menu
				mode="horizontal"
				disabledOverflow={true}
				style={menu}
			>
				<Menu.Item key='homepage'>
					<Link href='/'>
						<span style={menuItem}>首页</span>
					</Link>
				</Menu.Item>
				<Menu.Item key='library'>
					<Link href='/library'>
						<span style={menuItem}>资库</span>
					</Link>
				</Menu.Item>
				<Menu.Item key='elegant'>
					<Link href='/elegant'>
						<span style={menuItem}>出色</span>
					</Link>
				</Menu.Item>
				<Menu.Item key='match'>
					<Link href='/match'>
						<span style={menuItem}>竞赛</span>
					</Link>
				</Menu.Item>
				<Menu.Item key='classic'>
					<Link href='/classic'>
						<span style={menuItem}>经典</span>
					</Link>
				</Menu.Item>
			</Menu>
			<Input onPressEnter={handleSearch} className={style ? 'custom-header-white' : 'custom-header-dark'} suffix={<SearchOutlined onClick={handleSearch} style={{color:style? '#fff' : '#141414'}}/>} value={text} onChange={handleText}/>
		</Fragment>
	)
}
