import {Collapse, message} from "antd";
import {Fragment, useState} from "react";
import {EyeOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import LinkDataRequest from "../../uitls/request/LinkDataRequest";
const {Panel} = Collapse
function PhoneComponent({UrlList}){
    return(
        <Collapse ghost>
            {UrlList.map(category => {
                const {url_id,url_value,url_name,url_info} = category
                return(
                    <Fragment key={url_id}>
                        <Panel style={{borderBottom:'1px solid #bfbfbf',fontSize:14}} header={
                        <a target='_blank' rel='noreferrer' href={url_value}>
                            <span style={{
                                color:'#262626',
                                display:'inline-block',
                                maxWidth:200,
                                overflow:'hidden',
                                fontWeight:700,
                                letterSpacing:0.5,
                                whiteSpace:'nowrap',
                                textOverflow:'ellipsis',
                            }}>{url_name}</span>
                        </a>} extra={<Extra key={url_id} {...category}/>}>
                            <a target='_blank'  rel="noreferrer" href={url_value}><span style={{color:'#8c8c8c'}}>{url_info}</span></a>
                        </Panel>
                    </Fragment>
                )
            })}
        </Collapse>
    )
}
function Extra({url_likes,url_id,url_hits,iscool_switch}){
    const [isliked,setLiked] = useState(false)
    const [likes,setLikes] = useState(url_likes)
    const likeUrl = () => {
        if (!isliked){
            LinkDataRequest.likeUrl(url_id).then(result => {
                if (result.Ok){
                    message.success(result.Msg)
                    setLiked(true)
                    result.Msg === '您已点赞过' && setLikes(likes => likes + 1)
                }else{
                    message.warn(result.Msg)
                }
            })
        }else{
            message.success('您已点赞过')
        }
    }
    return(
        <span style={{color:'#8c8c8c',fontWeight:700}}>
            {iscool_switch === 1 && <span style={{color:'#40a9ff'}}>★</span>}
            <EyeOutlined style={{margin:'0 5px'}}/>
            <span style={{margin:'0 5px'}}>{url_hits}</span>
            {isliked ? <LikeFilled onClick={likeUrl} style={{margin:'0 5px'}}/> : <LikeOutlined onClick={likeUrl} style={{margin:'0 5px'}}/>}
            <span style={{margin:'0 5px'}}>{likes}</span>
        </span>
    )
}
export default PhoneComponent