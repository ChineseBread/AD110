import React, {useContext} from 'react';
import Head from "next/head";
import ScreenContext from "@store/ScreenContext";
//防止屏幕放大
function HeadTag({title}:any) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <Head>
            <title>{title}</title>
            {isPhone &&　<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"/>}
        </Head>
    )
}

export default HeadTag;