import { IErrorResponse } from "./Response";

export interface ILoginSuccessResponse {
  token: string;
}
export type ILoginErrorResponse = IErrorResponse;

export interface ICheckTokenResponse {
  isValid: boolean;
}
