import React, {useContext} from 'react';
import Head from "next/head";
import ScreenContext from "../../store/ScreenContext";
//防止屏幕放大
function HeadTag({title}) {
    const {isPhone} = useContext(ScreenContext)
    return (
        <Head>
            <title>{title}</title>
            {isPhone &&　<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"/>}
	    <meta name="Description" content="AD110 是设计、建筑、广告、插画、摄影、艺术和创意人群最受推崇的中文互联网品牌之一，拥有全球最丰富的专业资源。2013年AGI（国际平面设计联盟）在伦敦召开全球会员大会期间，向全球会员介绍 AD110 是了解 AGI 的十大窗口之一；同年受邀担任AIGA（美国图形艺术设计研究院）策展人，The New York Times《纽约时报》等国际媒体曾专题报道，2017年AGI Open Paris巴黎年会 AD110 再次上榜..." key="description" />	        
        </Head>

    )
}

export default HeadTag;