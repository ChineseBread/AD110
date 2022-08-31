import Image from "next/image";
import CoverDataRequest from "@utils/request/CoverDataRequest";

function PageBanner({url}:{url:string}) {
    return <div className='page-banner'><a href={`/api/banner/redirect_by_image?url=${url}`} target='_blank'><Image quality={10} alt='AD110' src={CoverDataRequest.getCoverByUrl(url)} objectFit='cover' width={900} height={100} layout='responsive'/></a></div>
}

export default PageBanner;
