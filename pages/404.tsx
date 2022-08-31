import {Result,Button} from 'antd'
import {useRouter} from "next/router";
export default function Custom404() {
    const router = useRouter()
    return  <Result
        status="404"
        title="404"
        subTitle="页面走丢了,一会儿...回来"
        extra={<Button type="default" onClick={() => router.replace('/')}>返回首页</Button>}
    />
}