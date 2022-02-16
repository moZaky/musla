export interface ResponseModel<T>{
    error: boolean;
    code?: any;
    message?: any;
    details?: ErrorDetails[] |ErrorDetails ;
    data: T[];
    _l: boolean;
}
 
 

export interface ErrorDetails {
  errors: ErrorInfo[]|ErrorInfo;
  _message: string;
  name: string;
  message: string;
}

 

export interface ErrorInfo {
  name: string;
  message: string;
 
}

 