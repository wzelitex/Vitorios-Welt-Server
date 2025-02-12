export interface CommonResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  success: boolean;
}
