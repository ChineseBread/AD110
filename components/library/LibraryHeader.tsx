import {Card} from "antd";
import Link from "next/link";
import {Fragment, useContext} from "react";
import ScreenContext from "@store/ScreenContext";
import {useRouter} from "next/router";
interface Props{
    HotLinkList:HotLink[]
}
function LibraryHeader({HotLinkList}:Props) {
    const {isPhone} = useContext(ScreenContext)
    const router = useRouter()
    const onClick = (url:string) => {
        return () => {
            router.push(url)
        }
    }
    return (
        <div className='link-card link-card-header'>
            <Card title={!isPhone && '资库'} bordered={false}>
                {HotLinkList.map(({id,name}) => {
                    return (
                        <Fragment key={id}>
                            <span className='hot-link-item' key={id} onClick={onClick(`/library/${id}`)}>{name}</span>
                            <span>|</span>
                        </Fragment>
                    )
                })}
                <br/>
                <Link href='/custom/check?pageid=7'>
                    <span className='hot-link-item'>网天下 (大众网址)</span>
                </Link>
                <span>|</span>
                <Link href='/custom/check?pageid=14'>
                    <span className='hot-link-item'>社交群</span>
                </Link>
                <span>|</span>
                <span className='hot-link-item' onClick={onClick('/library/ClickRank')}>AD110·资库点击排行 TOP100</span>
                <span>|</span>
                <span className='hot-link-item' onClick={onClick('/library/NewlyIndexedRank')}>新录入条目 New TOP50</span>
                <span>|</span>
                <span className='hot-link-item' onClick={onClick('/#recommend')}>AD110 年度 (网站) 推荐</span>
            </Card>
        </div>
    )
}

export default LibraryHeader;