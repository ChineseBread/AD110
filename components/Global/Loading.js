import {useContext} from 'react';
import {Spin} from "antd";
import styles from '../../styles/global/Loading.module.scss'
import logo from '../../public/static/logo.png'
import Image from "next/image";
import ScreenContext from "../../store/ScreenContext";
function Loading(props) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <div className={styles.loading_container}>
            <div>
                <Image
                    src={logo}
                    layout='fill'
                    objectFit='contain'
                />
            </div>
            <Spin size="large" />
        </div>
    )
}

export default Loading;