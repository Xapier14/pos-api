import { IErrorResponse } from "./Response";

export interface ILoginSuccessResponse {
  token: string;
}
export type ILoginErrorResponse = IErrorResponse;
