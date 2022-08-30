import {Spin} from "antd";
import Image from "next/image";
import styles from '../../styles/pages/Loading.module.scss'
import logo from '../../public/static/logo.png'
function Loading(props) {
    return (
        <div className={styles.loading_container}>
            <div>
                <Image
                    priority={true}
                    src={logo}
                    layout='fill'
                    objectFit='contain'
                    quality={10}
                />
            </div>
            <Spin size='large'/>
        </div>
    )
}

export default Loading;