import {Card} from "antd";
import Link from "next/link";
import {useContext} from "react";
import ScreenContext from "../../store/ScreenContext";
function HotLinkHeader({HotLinkCategoryList}) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <div className='link-card link-card-header'>
            <Card title={!isPhone && '资库'} bordered={false} bodyStyle={{
                backgroundColor:'#262626',
                padding:'5px 20px',
                color:'#fff',
                borderRadius:'5px'
            }}>
                {HotLinkCategoryList.map(({id,name}) => {
                    return <span className='hot-link-item' key={id}><Link href={`/library/${id}`}>{name}</Link> | </span>
                })}
                <span>AD110 年度(网站)推荐</span>
            </Card>
        </div>
    )
}

export default HotLinkHeader;