export class AppResponse{
    public static successResponse(respdata: any, msg: string) {
        return {
            success: true,
            message: msg,
            data: respdata,
        };
    }

    public static errorResponse(msg: string) {
        return {
            success: false,
            message: msg,
            data: {},
        };
    }
}