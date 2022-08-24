import { ImageDto } from "./ImageDto";

export interface CartDto{
    productId:number,
    featuresId:number,
    productName:string,
    productPrice:number,
    size:string,
    color:string,
    quantity:number,
    image:ImageDto
}