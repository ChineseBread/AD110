import React, {useState} from 'react';
import {Button} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

function AdjustScale() {
    const [size,setSize] = useState(20)
    const [scale,] = useState(() => {
        const scale = document.documentElement.clientWidth / 1500
        return scale >= 0.9 ? scale : 1
    })

    const adjustSize = (size:number) => {
        return () => {
            document.documentElement.style.fontSize = scale * size + 'px'
            setSize(size)
        }
    }
    return (
        <div className='adjust-container'>
            <Button type='text' onClick={adjustSize(size + 1)} icon={<PlusOutlined />}/>
            <span>{size}</span>
            <Button type='text' onClick={adjustSize(size >= 17 ? size - 1 : 16)} icon={<MinusOutlined />}/>
        </div>
    )
}

export default AdjustScale;