import {Fragment} from 'react';
import {Card, Empty} from "antd";

function EditorRecommend({EditorRecommendLink}) {
    return (
        <div className='link-card link-card-body'>
            <Card
                title={<Fragment>
                    <span>编辑推荐</span>
                    <span></span>
                </Fragment>}
                bordered={false}
            >
                {EditorRecommendLink.length >= 1 ? EditorRecommendLink.map(({url_id,url_name,url_value}) => {
                    return <span className='link-item' key={url_id}><a target='_blank'  rel="noreferrer" href={url_value}>{url_name}</a></span>
                }): <Empty/>}
            </Card>
        </div>
    )
}

export default EditorRecommend;