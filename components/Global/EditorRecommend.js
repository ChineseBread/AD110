import {Fragment, useState} from 'react';
import {Card, Empty} from "antd";

function EditorRecommend({EditorRecommendLink:{kindList,kindUrls}}) {
    const [activeTabKey,setActiveKey] = useState(kindList[0]?.key)
    const onTabChange = (key) => {
      setActiveKey(key)
    }
    return (
        <div className='link-card link-card-body'>
            <Card
                title={<Fragment>
                    <span>编辑推荐</span>
                    <span></span>
                </Fragment>}
                bordered={false}
                tabList={kindList}
                activeTabKey={activeTabKey}
                onTabChange={onTabChange}
            >
                {kindUrls[activeTabKey]?.length >= 1 ? kindUrls[activeTabKey].map(({url_id,url_name,url_value}) => {
                    return <span className='link-item' key={url_id}><a href={url_value}>{url_name}</a></span>
                }): <Empty/>}
            </Card>
        </div>
    )
}

export default EditorRecommend;