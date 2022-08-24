import { OrderDetailDto } from "./OrderDetailDto";

export interface MyOrderDto{ 
   id:number,
   orderDate:any,
   orderPrice:number,
   orderDetail:OrderDetailDto[]
}
// public int Id { get; set; }
// public DateTime OrderDate { get; set; }
// public int OrderPrice { get; set; }
// public List<OrderDetailDto> OrderDetail { get; set; }