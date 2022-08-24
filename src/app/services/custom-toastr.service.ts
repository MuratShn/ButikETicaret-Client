import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private readonly toastrService:ToastrService) { }
  Message( message:string, title:string, toastrOptions: Partial<ToastrOptions>){
    this.toastrService[toastrOptions.messageType!](message,title,{
      positionClass : toastrOptions.position,
      timeOut : 5000
    })
  }
}

export class ToastrOptions {
  messageType: ToastrMessageType;
  position: ToastrPosition
}

export enum ToastrMessageType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}

export enum ToastrPosition {
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"
}
