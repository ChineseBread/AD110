import {Card} from "antd";
import {Fragment, useContext} from "react";
import ScreenContext from "../../store/ScreenContext";
import {useRouter} from "next/router";
function HotLinkHeader({HotLinkCategoryList}) {
    const router = useRouter()
    const onClick = key => {
        return () => {
            router.push(key)
        }
    }
    const {isPhone} = useContext(ScreenContext)
    return (
        <div className='link-card link-card-header'>
            <Card title={!isPhone && '资库'} bordered={false}>
                {HotLinkCategoryList.map(({id,name}) => {
                    return (
                        <Fragment key={id}>
                            <span className='hot-link-item' key={id} onClick={onClick(`/library/${id}`)}>{name}</span>
                            <span>|</span>
                        </Fragment>
                    )
                })}
                <br/>
                <span className='hot-link-item' onClick={onClick('/custom/check?pageid=7')}>网天下 (大众网址)</span>
                <span>|</span>
                <span className='hot-link-item' onClick={onClick('/custom/check?pageid=14')}>社交群</span>
                <span>|</span>
                <span className='hot-link-item' onClick={onClick('/library/ClickRank')}>AD110·资库点击排行 TOP100</span>
                <span>|</span>
                <span className='hot-link-item' onClick={onClick('/library/NewlyIndexdRank')}>新录入条目 New TOP50</span>
                <span>|</span>
                <span className='hot-link-item' onClick={onClick(`/#recommend`)}>AD110 年度 (网站) 推荐</span>
            </Card>
        </div>
    )
}

export default HotLinkHeader;