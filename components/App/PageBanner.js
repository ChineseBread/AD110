import Image from "next/image";
import CoverDataRequest from "../../uitls/request/CoverDataRequest";

function PageBanner({url}) {
    return url && <Image alt='AD110' src={CoverDataRequest.getCoverByUrl(url)} width={900} height={140} layout='responsive'/>
}

export default PageBanner;