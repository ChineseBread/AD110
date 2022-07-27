import {Card} from "antd";
import Link from "next/link";
import {Fragment, useContext} from "react";
import ScreenContext from "../../store/ScreenContext";
const LinkArr = [
    {
        title:'AD110 资库点击排行TOP100',
        pageid:16
    },
    {
        title:'新录入条目New TOP50',
        pageid:7
    },
    {
        title:'新录入条目New TOP50网天下(大众网址)',
        pageid:8
    },
    {
        title:'专业竞赛资讯',
        pageid:9
    },
    {
        title:'声音(评论)',
        pageid:10
    },
    {
        title:'读库-经典-史记',
        pageid:11
    },
    {
        title:'读书-好书推介',
        pageid:12
    },
    {
        title:'微信群',
        pageid:14
    },
    {
        title:'AD110年度(网站)推荐',
        pageid:15
    },
]
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
                {LinkArr.map(({title,pageid},index) => {
                    return (
                        <Fragment key={pageid}>
                            <Link href={`/custom/check?pageid=${pageid}`}>
                                <span className='hot-link-item'>{title}</span>
                            </Link>
                            {index <= 7 && <span>|</span>}
                        </Fragment>
                    )
                })}
            </Card>
        </div>
    )
}
function Category(){

}
export default HotLinkHeader;