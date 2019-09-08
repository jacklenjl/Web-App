export class ApiResponse{
    public static successResponse(resdata: any, msg: string) {
        return {
            success: true,
            message: msg,
            data: resdata,
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