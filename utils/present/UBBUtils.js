import {getImageUrl} from "../request/request";
import * as ReactDOMServer from "react-dom/server";
import UBBStyle from '../../styles/pages/BlogPreview/NewsOrBlog.module.scss'
function UbbToHtml(str = ''){
    str = str.replace(/</ig,'&lt;');
    str = str.replace(/>/ig,'&gt;');
    str = str.replace(/\n/ig,'<br/>');
    //str = str.replace(/\[code\](.+?)\[\/code\]/ig, function($1, $2) {return phpCode($2);});

    str = str.replace(/\[hr\]/ig,'<hr />');
    str = str.replace(/\[\/(size|color|font|backcolor)\]/ig,'</font>');
    str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'<$1>');
    str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'</$1>');
    str = str.replace(/\[\/align\]/ig,'</p>');
    str = str.replace(/\[(\/)?h([1-6])\]/ig,'<$1h$2>');

    str = str.replace(/\[align=(left|center|right|justify)\]/ig,'<p align="$1">');
    str = str.replace(/\[size=(\d+?)\]/ig,'<font size="$1">');
    str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
    str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
    str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');
    str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig,'<ol type="$1">$2</ol>');
    str = str.replace(/\[(\/)?list\]/ig,'<$1ul>');


    str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig,function ($1,$2){
        let imgUrl = $2
        imgUrl = imgUrl.replace(/^\.+/,"")
        if (!imgUrl.startsWith('/hi/')) imgUrl = '/hi/' + imgUrl
        return ReactDOMServer.renderToStaticMarkup(<div className={UBBStyle.ubb_img_container}><img src={getImageUrl(imgUrl)}/></div>)
    });
    str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '<a href="$1">'+'$2'+'</a>');
    str = str.replace(/\[url\]([^\[]+)\[\/url\]/ig, '<a href="$1">'+'$1'+'</a>');
    return str;
}
function UBBToIntro(str = ''){
    str = str.replace(/</ig,'');
    str = str.replace(/>/ig,'');
    str = str.replace(/\n/ig,'');
    //str = str.replace(/\[code\](.+?)\[\/code\]/ig, function($1, $2) {return phpCode($2);});

    str = str.replace(/\[hr\]/ig,'');
    str = str.replace(/\[\/(size|color|font|backcolor)\]/ig,'');
    str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'');
    str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'');
    str = str.replace(/\[\/align\]/ig,'</p>');
    str = str.replace(/\[(\/)?h([1-6])\]/ig,'');

    str = str.replace(/\[align=(left|center|right|justify)\]/ig,'');
    str = str.replace(/\[size=(\d+?)\]/ig,'');
    str = str.replace(/\[color=([^\[\<]+?)\]/ig, '');
    str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '');
    str = str.replace(/\[font=([^\[\<]+?)\]/ig, '');
    str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig,'');
    str = str.replace(/\[(\/)?list\]/ig,'');


    str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig,'');
    str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '');
    str = str.replace(/\[url\]([^\[]+)\[\/url\]/ig, '');
    return str;
}

export  {UbbToHtml,UBBToIntro}