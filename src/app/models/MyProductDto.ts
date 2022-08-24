import { ImageDto } from "./ImageDto";
import { ProductFeature } from "./ProductFeature";

export interface MyProductDto{ 
    id:number,
    productName:string,
    categoryName:string,
    mold:string,
    material:string,
    stok:number,
    gender:string,
    status:boolean,
    features:ProductFeature[],
    colors:string[],
    sizes:string[],
    image:ImageDto[],
    price:number
}