import {TemporaryCustomerRequest} from "../dto/Interfaces";

const keySession: string = "temporary user";

export const getTemporaryUserInfo = (): TemporaryCustomerRequest | null => {
    const temporaryUser: string | null = sessionStorage.getItem(keySession);
    return temporaryUser && JSON.parse(temporaryUser);
}

export const setTemporaryUserInfo = (temporaryUser: TemporaryCustomerRequest): void => {
    sessionStorage.setItem(keySession, JSON.stringify(temporaryUser));
}


export const clearSessionStorage = (): void => {
    sessionStorage.clear();
}

export const isTempUserActive: boolean = getTemporaryUserInfo() === null;
