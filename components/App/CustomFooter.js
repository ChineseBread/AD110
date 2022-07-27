import {FacebookOutlined, InstagramOutlined, TwitterOutlined, WechatOutlined, WeiboOutlined} from '@ant-design/icons'
import Link from "next/link";
import styles from "../../styles/app/CustomFooter.module.scss"
export default function CustomFooter(props) {

	return (
		<div className={styles.footer}>
			<span className={styles.footer_icon_link_container}>
				<Link href='/custom/check?pageid=2'><TwitterOutlined /></Link>
				<Link href='/custom/check?pageid=2'><FacebookOutlined /></Link>
				<Link href='/custom/check?pageid=2'><InstagramOutlined /></Link>
				<Link href='/custom/check?pageid=2'><WeiboOutlined /></Link>
				<Link href='/custom/check?pageid=2'><WechatOutlined /></Link>
			</span>
			<span>
				<Link href='/custom/check?pageid=5'>关于 AD110.com</Link> | <Link href='/custom/check?pageid=5'>联系 AD110.com</Link>
			</span>
			<span>
				<Link href='/custom/check?pageid=3'>广告投放</Link> | <Link href='/custom/check?pageid=4'>投稿</Link>  (包括文章、作品或自荐) | <Link href='/custom/check?pageid=3'>录入网址</Link> | <Link href='/custom/check?pageid=5'>报错</Link> | <Link href='/custom/check?pageid=5'>帮助</Link>
			</span>
			<span>
				<Link href='/custom/check?pageid=5'>Part of the ooogo.com Family</Link> | <Link href='/custom/check?pageid=5'>@2018 AD110.com</Link>
			</span>
		</div>
	);
}
