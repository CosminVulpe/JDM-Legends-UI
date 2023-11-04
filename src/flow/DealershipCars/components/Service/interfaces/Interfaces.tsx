export interface ReviewInterface {
    id?: number,
    title: String,
    description: String,
    starRating: number
}

export interface Car {
    carColor: String,
    carCompany: String,
    carFuelType: String,
    carName: String,
    carTransmissionType: String,
    damaged: boolean,
    hp: number,
    id: number,
    km: number,
    initialPrice: number,
    productionYear: number,
    quantityInStock: number
}

export interface HistoryBid {
    id?: number,
    bidValue: BigInt,
    timeOfTheBid: Date,
    userName?: string,
    role?: string,
    checkInformationStoredTemporarily?: boolean,
}

export interface TemporaryUser {
    id?: number,
    fullName: string,
    userName: string,
    emailAddress: string,
    role?: string,
    checkInformationStoredTemporarily?: boolean
}

export interface HistoryBidTemporaryUser {
    historyBid: HistoryBid,
    temporaryUser: TemporaryUser
}

export interface WinnerUser {
    userName?: string,
    bidValue?: BigInt
}