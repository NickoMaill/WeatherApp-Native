export interface ServerResponse<T extends any = any> {
    status: number;
    result: T;
    success?: boolean;
}

export enum ResultStatusEnum {
    Undefined = 0,
    Ok = 200,
    BadRequest = 400,
    UnAuthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    NotAcceptable = 406,
    Fatal = 500,
}

export type ServiceResponse = {
    success: boolean;
    message: string;
    data?: any | any[];
};
