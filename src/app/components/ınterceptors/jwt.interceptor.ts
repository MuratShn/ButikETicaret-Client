import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, delay, filter, finalize, observable, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly authService:AuthService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("_T");
    
    let newRequest:HttpRequest<any> = request.clone(  //gelen requesti kolonla
      {headers: request.headers.set("Authorization",`Bearer ${token}`)} //kolonladıgın requestın ıcıne headers ekle
    );
    
    return next.handle(newRequest)
  }

}


// console.log("refresh gelicek")
// let refreshToken = (localStorage.getItem("_R")!)

// this.authService.refreshTokenLogin(refreshToken).subscribe(x=>{
//   localStorage.setItem("_T",x.data.token)
//   localStorage.setItem("_E",x.data.expiration)
//   localStorage.setItem("_R",x.data.refreshToken)
//   token = x.data.token
// });
// newRequest = request.clone({headers:request.headers.set("Authorization",`Bearer ${token}`)})
// }

// else{
// newRequest = request.clone({headers:request.headers.set("Authorization",`Bearer ${token}`)}) 
// }

//--------------------------------------------------------------------------------


// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpResponse,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { BehaviorSubject, catchError, filter, finalize, observable, Observable, switchMap, take, tap, throwError } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {

//   constructor(private readonly authService:AuthService) {}
  
//   private isTokenRefreshin:boolean=false;

//   tokenSubject:BehaviorSubject<string> = new BehaviorSubject<string>("");

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

//     return next.handle(this.attachTokenToRequest(request)).pipe(tap((event:HttpEvent<any>)=>{
//       if(event instanceof HttpResponse)
//       {
//         console.log("başarılı")
//       }
//     }),catchError((err):Observable<any> => {
//       if(err instanceof HttpErrorResponse)
//       {
//         switch((<HttpErrorResponse>err).status)
//         {
//           case 401:
//             console.log("token yenilendi")
//             return this.handleHttpResponseError(request,next);
//           // case 400:
//           //   console.log("Çıkış yapılması lazım")
//         }
//         console.log("---------")
//         return throwError(err)
//       }
//       else
//       {
//         return throwError(err)
//       }
//     })
//     )
//   }
//   private handleHttpResponseError(request:HttpRequest<any>,next:HttpHandler){
//     if(this.isTokenRefreshin){
//       this.isTokenRefreshin=true;
//       this.tokenSubject.next("")

      
//       return this.authService.refreshTokenLogin(localStorage.getItem("_R")?.toString()!).pipe(switchMap((x:any)=>{
//         this.tokenSubject.next(x.token)
//         localStorage.setItem("_T",x.data.token)
//         localStorage.setItem("_E",x.data.expiration)
//         localStorage.setItem("_R",x.data.refreshToken)
//         console.log("token yenılendı")
//         return next.handle(this.attachTokenToRequest(request))
//       }),catchError(err=>{
//         console.log("çıkış yapılacak")
//         return this.handleError(err);
//       }),finalize(()=>{
//         this.isTokenRefreshin = false
//       }))
//     }
//     else{
//       this.isTokenRefreshin = false;
//       return this.tokenSubject.pipe(filter(token=>token != null),
//       take(1),
//       switchMap(token=>{
//         return next.handle(this.attachTokenToRequest(request))
//       })
//       );
//     }
//   }
//   private handleError(errorResponse:HttpErrorResponse){
//     return throwError("error")
//   }
  
//   attachTokenToRequest(request:HttpRequest<any>){
//     let token = localStorage.getItem("_T");
//     return request.clone({headers: request.headers.set("Authorization",`Bearer ${token}`)}
//   );
// }
// }


// // console.log("refresh gelicek")
// // let refreshToken = (localStorage.getItem("_R")!)

// // this.authService.refreshTokenLogin(refreshToken).subscribe(x=>{
// //   localStorage.setItem("_T",x.data.token)
// //   localStorage.setItem("_E",x.data.expiration)
// //   localStorage.setItem("_R",x.data.refreshToken)
// //   token = x.data.token
// // });
// // newRequest = request.clone({headers:request.headers.set("Authorization",`Bearer ${token}`)})
// // }

// // else{
// // newRequest = request.clone({headers:request.headers.set("Authorization",`Bearer ${token}`)}) 
// // }
