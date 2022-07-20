import {FacebookOutlined, InstagramOutlined, TwitterOutlined, WechatOutlined, WeiboOutlined} from '@ant-design/icons'
import styles from "../../styles/app/CustomFooter.module.scss"
export default function CustomFooter(props) {

	return (
		<div className={styles.footer}>
			<span className={styles.footer_icon_link_container}>
				<TwitterOutlined />
				<FacebookOutlined />
				<InstagramOutlined />
				<WeiboOutlined />
				<WechatOutlined />
			</span>
			<span>
				关于 AD110.com | 联系 AD110.com
			</span>
			<span>
				广告投放 | 投稿 | (包括文章、作品或自荐) | 录入网址 | 报错 | 帮助
			</span>
			<span>
				Part of the ooogo.com Family | @2018 AD110.com
			</span>
		</div>
	);
}
