import { ResponseModel } from "./ResponseModel";

export interface singleResponseModel<T> extends ResponseModel{
    data:T;
} 