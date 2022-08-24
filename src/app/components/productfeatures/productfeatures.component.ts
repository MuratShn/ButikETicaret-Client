import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductFeature } from 'src/app/models/ProductFeature';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductfeatureService } from 'src/app/services/productfeature.service';

@Component({
  selector: 'app-productfeatures',
  templateUrl: './productfeatures.component.html',
  styleUrls: ['./productfeatures.component.css']
})
export class ProductfeaturesComponent implements OnInit {
  
  //Ekleme için kullanılıyor productAdd'in devamı
  productId:Number
  product:Product;
  varyantarr:string[]=[];
 

  constructor(
    private productService:ProductService,
    private featureService:ProductfeatureService,
    private activeRoute:ActivatedRoute,
    private readonly router:Router,
    private readonly toastrService:CustomToastrService
    ) { }

  ngOnInit(): void {
    this.productId = Number(this.activeRoute.snapshot.queryParamMap.get("id")); //urlden idyi aluıyoz
    if(!(this.productId == 0 || this.productId == NaN)){
      this.getProduct();
    }
    console.log(this.varyantarr)
  }

  getProduct(){
    this.productService.getById(+this.productId).subscribe(x=>{
      if(x.success){
        this.product = x.data;
      }
      else{
        console.log(x.message);
      }
      
    })
  }
  addVaryant(){
    this.varyantarr.push("");
  }
  Finish(){
    let result = [];
    let toplam = 0;
    let formelement = document.querySelectorAll("tr");
    for (let x = 0; x < formelement.length; x++) {
      
      let features = {} as ProductFeature
      let arr = new Array();

      if(x != 0){
        let selectvalue = formelement[x].querySelector("select");
        let inputs = formelement[x].querySelectorAll("input");
        
        arr.push(this.productId)
        arr.push(selectvalue?.value!)

        features.productId = +this.productId;
        features.size = selectvalue?.value!;
        features.ımageId=NaN,

        inputs.forEach(y => {
              arr.push(y.value)
              if(+y.value){
                toplam += +y.value;
                features.stock = +y.value;
              }
              else{
                features.color = y.value
              }
             });
      }
      // result.push(arr);

      result.push(features)
    }
    result.splice(0,1);
    
    if(toplam > this.product.stok){
      console.log("hata"); //stok olması gerenkenden fazla
    }
    else{
      this.addFeatures(result);
    }
  }

  addFeatures(result:ProductFeature[]){
    let model = Object.assign({},result);

    console.log(result)
    this.featureService.addFeatures(result).subscribe(x=>{
      console.log(x)
      if(x.success){
      this.toastrService.Message(x.message,"Başarılı",{messageType:ToastrMessageType.Success , position : ToastrPosition.TopRight})
        this.router.navigate(["/myproducts"])
      }
      else{
        this.toastrService.Message(x.message,"Hata",{messageType:ToastrMessageType.Warning , position : ToastrPosition.TopRight})

      }
    })
  }
  dellVaryant(i:number){
    document.getElementById(i.toString())?.remove();
  }

}

