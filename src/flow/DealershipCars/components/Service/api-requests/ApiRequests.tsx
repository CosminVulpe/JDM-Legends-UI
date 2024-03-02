import axios from "axios";
import {
    Customer, HistoryBid,
    HistoryBidTemporaryCustomerRequest,
    ReviewInterface
} from "../dto/Interfaces";
import {getJwtToken} from "../session-storage/SessionStorage";

export const ApiGetCar = async (endPoint?: string) => {
    if (getJwtToken() === null) {
        return await axios.get(process.env.REACT_APP_BACKEND_API_CAR + (endPoint || ""));
    }

    return await axios.get(process.env.REACT_APP_BACKEND_API_CAR + (endPoint || ""), {
        headers: {'Authorization': getJwtToken()}
    });
}


export const getCancelToken = (): any => {
    return axios.CancelToken.source();
}

export const ApiGetCarPictures = async (carName: String | undefined) =>
    await axios.get(`https://api.unsplash.com/search/photos?query=${carName as String}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}&page=1&orientation=landscape`);

export const ApiPostReview = async (data: ReviewInterface, endPoint?: string) => {
    return await axios.post(process.env.REACT_APP_BACKEND_API_REVIEW + (endPoint || "")
        , JSON.stringify(data)
        , {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
    );
}

export const ApiGetReview = async (endPoint?: string) =>
    await axios.get(process.env.REACT_APP_BACKEND_API_REVIEW + (endPoint || ""));


export const ApiPostHistoryBid = async (endPoint: string, data: HistoryBidTemporaryCustomerRequest) => {
    return await axios.post(process.env.REACT_APP_BACKEND_API_HISTORY_BID + endPoint
        ,
        JSON.stringify({
            ...data,
            historyBidRequest: {
                ...data.historyBidRequest,
                bidValue: data.historyBidRequest.bidValue.toString()
            }
        })
        , {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        });
}


export const ApiPostHistoryBidCustomer = async (endPoint: string, data: HistoryBid) => {
    return await axios.post(process.env.REACT_APP_BACKEND_API_HISTORY_BID + endPoint
        ,
        JSON.stringify({
            ...data,
            bidValue: data.bidValue.toString()
        })
        , {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        });
}

export const ApiPostRegisterCustomer = async (data: Customer | string, endPoint?: string,) => {
    return await axios.post(process.env.REACT_APP_USERS_BACKEND_API_REGISTER + (endPoint || "")
        , JSON.stringify(data)
        , {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
    );
}

export const ApiPostCustomerValidateEmail = async (email?: string) => {
    return await axios.post(process.env.REACT_APP_USERS_BACKEND_API_CUSTOMER + "/checkEmail"
        , email, {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        })
}

export const ApiGetTemporaryUser = async (endPoint?: string) =>
    await axios.get(process.env.REACT_APP_USERS_BACKEND_API_TEMPORARY_CUSTOMER + (endPoint || ""));


export const ApiGetSignedCustomerName = async (data: { emailAddress: string, pwd: string }, endPoint?: string) =>
    await axios.get(process.env.REACT_APP_USERS_BACKEND_API_SIGN + (endPoint || "")
        , {
            headers: {
                'Authorization': 'Basic ' + btoa(data.emailAddress + ':' + data.pwd)
            }
        }
    );
