import OperationRequest from "../../uitls/request/OperationRequest";

export default function (urlid){
    return () => {
        OperationRequest.clickUrl(urlid)
    }
}