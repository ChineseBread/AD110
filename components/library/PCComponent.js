import {Fragment, useState} from "react";
import styles from "../../styles/pages/Library/LinkInfo.module.scss";
import {EyeOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import {Divider, message} from "antd";
import OperationRequest from "../../uitls/request/OperationRequest";

function Category({url_id,url_name,url_value,url_hits,iscool_switch,url_info,url_likes}){
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
        }
    }
    const onClick = (url_id) => {
        return () => {
            OperationRequest.clickUrl(url_id)
        }
    }
    return (
        <Fragment>
            <div className={styles.link_info_item}>
                <div className={styles.link_info}>
                    <div><a onClick={onClick(url_id)} target='_blank'  rel="noreferrer" href={"/api/redirect/url?url=" + url_value}>{url_name}</a></div>
                    <div>
                        {iscool_switch === 1 && <span style={{color:'#40a9ff'}}>★</span>}
                        <EyeOutlined/>
                        <span>{url_hits}</span>
                        {isliked ? <LikeFilled/> : <LikeOutlined onClick={likeUrl}/>}
                        <span>{likes}</span>
                    </div>
                </div>
                <div className={styles.link_info_content}>
                    <a onClick={onClick(url_id)} href={"/api/redirect/url?url=" + url_value} target="_blank" rel='noreferrer'>{url_info}</a>
                </div>
            </div>
            <Divider style={{margin:'5px 0',borderBottom:'1px solid #8c8c8c'}}/>
        </Fragment>
    )
}
function PCComponent({UrlList}){
    return(
        <Fragment>
            {UrlList.map(category => {
                return <Category key={category.url_id} {...category}/>
            })}
        </Fragment>
    )
}
export default PCComponent
