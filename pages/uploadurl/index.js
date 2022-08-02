//网址录入
import {Button, Form, Input, message} from "antd";
import styles from '../../styles/pages/UrlUpload.module.scss'
import OperationRequest from "../../uitls/request/OperationRequest";
const {TextArea} = Input
function UrlUpload(props) {
    const [form] = Form.useForm()
    const onFinish = ({name,url,info}) => {
        OperationRequest.uploadUrl(name,url,info).then(result => {
            message[result.Ok ? 'success' : 'warn'](result.Msg).then(() => {
                form.resetFields()
            })
        })
    }
    return (
        <div className={styles.url_upload_container}>
            <div>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input maxLength={64}/>
                    </Form.Item>
                    <Form.Item
                        label="网址"
                        name="url"
                        rules={[() => ({
                            validator(_, value) {
                                if (!value) return Promise.reject(new Error('请您输入网址'))
                                if (!/^(http|https):\/\//.test(value)){
                                    return Promise.reject(new Error('您的网址格式有误'));
                                }
                                return Promise.resolve()
                            },
                        })]}
                    >
                        <Input placeholder='格式需以https://或http://开头'/>
                    </Form.Item>

                    <Form.Item
                        label="介绍"
                        name="info"
                        rules={[() => ({
                            validator(_, value) {
                                if (!value) return Promise.reject(new Error('请您填写网址介绍'))
                                if (value.length < 20) return Promise.reject('网址介绍需大于20字')
                                return Promise.resolve()
                            },
                        })]}
                    >
                        <TextArea autoSize rows={8} maxLength={2000} showCount/>
                    </Form.Item>

                    <Form.Item>
                        <Button style={{marginTop:50}} block type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default UrlUpload;