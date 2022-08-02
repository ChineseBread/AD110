import Image from "next/image";
import CoverDataRequest from "../../uitls/request/CoverDataRequest";

function PageBanner({url}) {
    return url && <div className='page-banner'><a href={`/api/banner/redirect_by_image?url=${url}`} target='_blank'><Image alt='AD110' src={CoverDataRequest.getCoverByUrl(url)} objectFit='cover' width={900} height={100} layout='responsive'/></a></div>
}

export default PageBanner;