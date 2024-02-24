import {TemporaryCustomerRequest} from "../dto/Interfaces";

const KEY_TEMPORARY_CUSTOMER: string = "temporary user";
const KEY_JWT_TOKEN: string = "TOKEN";

export const getTemporaryUserInfo = (): TemporaryCustomerRequest | null => {
    const temporaryUser: string | null = sessionStorage.getItem(KEY_TEMPORARY_CUSTOMER);
    return temporaryUser && JSON.parse(temporaryUser);
}

export const setTemporaryUserInfo = (temporaryUser: TemporaryCustomerRequest): void => {
    sessionStorage.setItem(KEY_TEMPORARY_CUSTOMER, JSON.stringify(temporaryUser));
}

export const setJwtToken = (jwtToken: string): void => {
    sessionStorage.setItem(KEY_JWT_TOKEN, jwtToken);
}

export const getJwtToken = (): string | null => {
    const temporaryUser: string | null = sessionStorage.getItem(KEY_JWT_TOKEN);
    return temporaryUser && temporaryUser;
}

export const logOutCustomer = (): void => {
    sessionStorage.removeItem(KEY_JWT_TOKEN);
}