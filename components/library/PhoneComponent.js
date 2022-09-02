import {Collapse, message} from "antd";
import {useState} from "react";
import {EyeOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import OperationRequest from "../../uitls/request/OperationRequest";
const {Panel} = Collapse
function PhoneComponent({UrlList}){
    const onClick = (url_id) => {
        return () => {
            OperationRequest.clickUrl(url_id)
        }
    }
    return(
        <Collapse ghost>
            {UrlList.map(category => {
                const {url_id,url_value,url_name,url_info} = category
                return(
                    <Panel key={url_id} style={{borderBottom:'1px solid #bfbfbf',fontSize:14}} header={
                        <a onClick={onClick(url_id)} target='_blank' rel='noreferrer' href={"/api/redirect/url?url=" + url_value}>
                            <span style={{
                                color:'#262626',
                                display:'inline-block',
                                maxWidth:200,
                                overflow:'hidden',
                                letterSpacing:0.5,
                                whiteSpace:'nowrap',
                                textOverflow:'ellipsis',
                            }}>{url_name}</span>
                        </a>
                    } extra={<Extra {...category}/>}>
                        <a onClick={onClick(url_id)} target='_blank'  rel="noreferrer" href={"/api/redirect/url?url=" + url_value}><span style={{color:'#8c8c8c'}}>{url_info}</span></a>
                    </Panel>
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
            OperationRequest.likeUrl(url_id).then(result => {
                if (result.Ok){
                    message.success(result.Msg)
                    setLiked(true)
                    setLikes(likes => likes + 1)
                }else{
                    message.warn(result.Msg)
                }
            })
        }else{
            message.success('您已点赞过')
        }
    }
    return(
        <span style={{color:'#8c8c8c'}}>
            {iscool_switch === 1 && <span style={{color:'#40a9ff'}}>★</span>}
            <EyeOutlined style={{margin:'0 5px'}}/>
            <span style={{margin:'0 5px'}}>{url_hits}</span>
            {isliked ? <LikeFilled onClick={likeUrl} style={{margin:'0 5px'}}/> : <LikeOutlined onClick={likeUrl} style={{margin:'0 5px'}}/>}
            <span style={{margin:'0 5px'}}>{likes}</span>
        </span>
    )
}
export default PhoneComponent
