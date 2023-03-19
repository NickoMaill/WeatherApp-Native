import { ResultStatusEnum, ServerResponse } from '~/core/types/serverTypes';
import { AppError, ErrorTypeEnum } from '~/core/appError';

class ServiceBase {
    protected appError: AppError;

    protected async asServicePromise<T>(request: Promise<T>) {
        return await request.then(
            (apiResponse) => Promise.resolve<T>(apiResponse),
            (error) => this.reject<T>(error as unknown)
        );
    }

    protected reject<TResult>(error: any = null): Promise<TResult> {
        if (error && error.type) {
            return Promise.reject(error);
        }

        if (!error.status) {
            return Promise.reject(new AppError(ErrorTypeEnum.Undefined, error.message));
        }

        let type = ErrorTypeEnum.Undefined;

        switch (error.status) {
            case ResultStatusEnum.Forbidden:
                type = ErrorTypeEnum.NotAllowed;
                break;
            case ResultStatusEnum.UnAuthorized:
                type = ErrorTypeEnum.SessionRequired;
                break;
            case ResultStatusEnum.NotAcceptable:
                type = ErrorTypeEnum.Maintenance;
                break;
            case ResultStatusEnum.BadRequest || ResultStatusEnum.Fatal || ResultStatusEnum.NotFound:
                type = ErrorTypeEnum.Technical;
                break;
            default:
                type = ErrorTypeEnum.Undefined;
                break;
        }

        const apiError = error.result;
        console.log('error', apiError);
        return Promise.reject(new AppError(type, apiError.message, apiError.errorCode, apiError.data));
    }
}

export default ServiceBase;
