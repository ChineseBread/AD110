import {Fragment} from 'react';
import {Card} from "antd";
interface Props{
    title:string
    children:any
}
function LinkCard({title,children}:Props) {
    return (
        <div className='link-card link-card-body'>
            <Card title={<Fragment>
                <span>{title}</span>
                <span/>
            </Fragment>} bordered={false}>
                {children}
            </Card>
        </div>
    )
}

export default LinkCard;