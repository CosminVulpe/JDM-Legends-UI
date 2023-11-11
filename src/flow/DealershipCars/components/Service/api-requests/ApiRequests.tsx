import axios from "axios";
import {HistoryBidTemporaryCustomerRequest, ReviewInterface, TemporaryCustomerRequest} from "../interfaces/Interfaces";

export const ApiGetCar = async (endPoint?: string) =>
    await axios.get(process.env.REACT_APP_BACKEND_API_CAR + (endPoint || ""));


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
    console.log(data)
    return await axios.post(process.env.REACT_APP_BACKEND_API_HISTORY_BID + endPoint
        , JSON.stringify({
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

export const ApiPostTemporaryUser = async (data: TemporaryCustomerRequest | string, endPoint?: string,) => {
    return await axios.post(process.env.REACT_APP_USERS_BACKEND_API_USERS + (endPoint || "")
        , JSON.stringify(data)
        , {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
    );
}


export const ApiGetTemporaryUser = async (endPoint?: string) =>
    await axios.get(process.env.REACT_APP_USERS_BACKEND_API_USERS + (endPoint || ""));

