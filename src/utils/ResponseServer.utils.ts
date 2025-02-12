import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseServerService {
  success(status: number, message: string, data?: any) {
    return { success: true, status: status, message: message, data: data };
  }

  error(status: number, message: string, data?: any) {
    return {
      success: false,
      status: status,
      message: message,
      data: data,
    };
  }
}
