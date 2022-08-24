import { CartItem } from "./cartıtem"

export class OrderModel{
    id:number
    userId:number
    orderDate:Date
    addressId:number
    soldProducts:CartItem[]
    fee:number
} 