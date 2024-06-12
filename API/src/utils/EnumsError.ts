import { Response } from "express"

  export enum httpStatus {
    OK = 200,
    BAD_REQUEST_ERROR = 400,
    INVALID_TYPE_ERROR = 400,
    DATA_BASE_ERROR = 500,
    ROUTING_ERROR = 500,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    CONFLICT_ERROR = 409,
    UNPROCESSABLE_ENTITY = 422,
  }

  
  export class httpResponse  {
    OK (res: Response, data:any):Response {
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        statusMsg: 'Success',
        data: data
      });
    };

    BAD_REQUEST_ERROR(res: Response, data: any): Response {
      return res.status(httpStatus.BAD_REQUEST_ERROR).json({
        status: httpStatus.BAD_REQUEST_ERROR,
        statusMsg: 'Bad Request',
        error: data,
      });
    }

    NotFound (res: Response, data:any):Response {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        statusMsg: 'Not Found',
        error: data
      });
    };

    UNAUTHORIZED (res: Response, data:any):Response {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: httpStatus.UNAUTHORIZED,
        statusMsg: 'Unauthorized',
        error: data
      });
    };
    

    DATA_BASE_ERROR (res: Response, data:any):Response {
      return res.status(httpStatus.DATA_BASE_ERROR).json({
        status: httpStatus.DATA_BASE_ERROR,
        statusMsg: 'DATA_BASE_ERROR',
        error: data
      });
    };

    FORBIDDEN (res: Response, data:any):Response {
      return res.status(httpStatus.FORBIDDEN).json({
        status: httpStatus.FORBIDDEN,
        statusMsg: 'Forbidden',
        error: data
      });
    };

    Error (res: Response, data:any):Response {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        statusMsg: 'Internal server error',
        error: data
      });
    };
  }