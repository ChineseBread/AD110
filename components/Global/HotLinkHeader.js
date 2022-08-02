import {Card} from "antd";
import Link from "next/link";
import {Fragment, useContext} from "react";
import ScreenContext from "../../store/ScreenContext";
function HotLinkHeader({HotLinkCategoryList}) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <div className='link-card link-card-header'>
            <Card title={!isPhone && '资库'} bordered={false}>
                {HotLinkCategoryList.map(({id,name}) => {
                    return (
                        <Fragment key={id}>
                            <span className='hot-link-item' key={id}><Link href={`/library/${id}`}>{name}</Link></span>
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
                <Link href='/library/clickRank'>
                    <span className='hot-link-item'>AD110·资库点击排行 TOP100</span>
                </Link>
                <span>|</span>
                <Link href='/library/newlyIndexedRank'>
                    <span className='hot-link-item'>新录入条目 New TOP50</span>
                </Link>
                <span>|</span>
                <Link href='/#recommend'>
                    <span className='hot-link-item'>AD110 年度 (网站) 推荐</span>
                </Link>
            </Card>
        </div>
    )
}

export default HotLinkHeader;