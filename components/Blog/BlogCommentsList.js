import React, {Fragment, useEffect, useState} from 'react';
import {Avatar, Button, Checkbox, Comment, Divider, Form, Input, message} from "antd";
import {getImageUrl} from "../../uitls/request/request";
import {getTimeFromNow} from "../../uitls/present/TimeUtils";
import BlogDataRequest from "../../uitls/request/BlogDataRequest";
import BlogStyle from "../../styles/pages/BlogPreview/BlogPreview.module.scss";
const {TextArea} = Input

function BlogCommentsList({log_id,CommentsList,total}) {
    const [form] = Form.useForm()
    const [Comments,setComments] = useState(CommentsList)
    const [page,setPage] = useState(1)
    useEffect(() => {
        form.resetFields()
        setComments(CommentsList)
    },[log_id])
    const onFinish = ({name,comment,website,email}) => {
        BlogDataRequest.sendBlogComment(log_id,name,comment,website,email).then(result => {
            if (result.Ok){
                message.success('评论成功,请等待审核')
            }else{
                message.warn('评论失败')
            }
            form.resetFields()
        })
    }
    const getMoreComments = () => {
        BlogDataRequest.getBlogCommentsByBlogID(log_id,5,page + 1).then(result => {
            if (result.Ok){
                setComments(CommentsList => [...CommentsList,...result.CommentsData.CommentsList])
                setPage(page => page + 1)
            }
        })
    }
    return (
       <Fragment>
           <div className={BlogStyle.custom_comment}>
               <div>发表评论</div>
               <Form
                   form={form}
                   layout='vertical'
                   labelAlign='right'
                   onFinish={onFinish}
               >
                   <Form.Item name='name' label='昵称' rules={[{required:true,message:'请输入名称'}]}>
                       <Input/>
                   </Form.Item>
                   <Form.Item name='email' label='邮箱(必选)' rules={[({ getFieldValue }) => ({
                       validator(_, value) {
                           if (!value) return Promise.reject(new Error('请输入邮箱'))
                           if (!/^[A-Za-z\d\u4e00-\u9fa5]+@[a-zA-Z\d_-]+(\.[a-zA-Z\d_-]+)+$/.test(getFieldValue('email'))){
                               return Promise.reject(new Error('您的邮箱格式有误'));
                           }
                           return Promise.resolve()
                       },
                   }),]}>
                       <Input/>
                   </Form.Item>
                   <Form.Item name='website' label='网址(可选)'>
                       <Input/>
                   </Form.Item>
                   <Form.Item name='comment' rules={[{required:true,message:'评论不能为空'}]}>
                       <TextArea rows={5} style={{resize:'none'}}/>
                   </Form.Item>
                   <Form.Item name='rule' rules={[() => ({
                       validator(_,value) {
                           if (value[0] !== 'follow') return Promise.reject(new Error('请您遵守以上守则后发表评论'))
                           return Promise.resolve()
                       },
                   })]}>
                       <Checkbox.Group>
                           <Checkbox value='follow'>
                               <span>AD110不会基于评论和不同观点而删改评论。但所有评论请遵循以下准则:1.以个人身份就AD110的咨讯内容及报道所涉及的话题发表评论。2.不得在评论区散发纯属推销或宣传的讯息。3.不得大量转抄他人言论和文章。4.不得使用任何肮脏和亵渎的措辞。5.不得进行人身攻击,及不允许使用侮辱任何种族和民族的言论。6.不但煽动暴力和议论政治</span>
                           </Checkbox>
                       </Checkbox.Group>
                   </Form.Item>
                   <Button htmlType='submit' type='ghost'>发送</Button>
               </Form>
           </div>
           <Divider style={{margin:'5px 0'}}/>
           <div className={BlogStyle.comment_list}>
               {Comments.map(({comm_author,comm_posttime,comm_avator,comm_id,comm_content,comm_postip}) => {
                   return (
                       <Fragment key={comm_id}>
                           <Comment
                               author={`${comm_author} | ${comm_postip}`}
                               avatar={<Avatar src={getImageUrl(comm_avator) || 'https://joeschmoe.io/api/v1/random'}/>}
                               content={<p>{comm_content}</p>}
                               datetime={<span>{getTimeFromNow(comm_posttime)}</span>}
                           />
                       </Fragment>
                   )
               })}
               <Button onClick={getMoreComments} block disabled={Comments.length >= total} type='text'>{Comments.length < total ? '更多评论' : '没有更多评论'}</Button>
           </div>
       </Fragment>
    )
}

export default BlogCommentsList;