import { ImageDto } from "./ImageDto"
import { ProductFeature } from "./ProductFeature"

export interface ProductDetailDto{ 
    id:number,
    productName:string,
    categoryName:string,
    mold:string,
    material:string,
    stok:number,
    gender:string,
    status:boolean,
    sizes:string[],
    colors:string[],
    features:ProductFeature[],
    image:ImageDto[]
    price:number
}

        //0 = Not known; Bilinmiyor
        //1 = Male; Erkek
        //2 = Female; Kadın 
        //9 = Not applicable => Unisex