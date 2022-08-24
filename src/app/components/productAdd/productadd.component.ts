import { Component, OnInit } from '@angular/core';

import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {

  productAddForm! : FormGroup;
  categories:Category[] = []
  constructor(
    private formBuilder:FormBuilder,
    private readonly productService:ProductService,
    private readonly categoryService:CategoryService,
    private readonly router:Router,
    private readonly toastrService:CustomToastrService
    ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(x=>{
      if(x.success){
        this.categories = x.data
      }
    })

    this.productAddForm = this.formBuilder.group({
      productName:["",Validators.required],
      categoryId:["",Validators.required],
      mold:["",Validators.required],
      material:["",Validators.required],
      stok:["",Validators.required],
      gender:["",Validators.required],
      // status:["",Validators.required],
      price:["",Validators.required]
    })
  }
  
  addProduct(){
    let productModel = this.productAddForm.value;

    console.log(productModel)

    if(this.productAddForm.valid){
    let a = this.productService.productAdd(productModel).subscribe(
      x=>{
        if(x.success){
          this.productService.getLastProduct().subscribe(x => {
            this.toastrService.Message(x.message,"Ürün",{messageType:ToastrMessageType.Success , position : ToastrPosition.TopCenter})
            this.router.navigate(["/product/addfeatures"],{queryParams:{id:+x.data}}) //features'a gidicek routing yapmadıgımız için kaldı
          });
        }
        else{
          this.toastrService.Message(x.message,"Hata",{messageType:ToastrMessageType.Error , position : ToastrPosition.TopRight})
          console.log(x);
        }
    },
    y=>{
      y.forEach((x:any) => {
        this.toastrService.Message(x,"Hata",{messageType:ToastrMessageType.Error , position : ToastrPosition.TopRight})
      });
    })
    
    }
    else{
      this.productAddForm.markAsTouched()
      console.log("Valid olmadı")
      console.log(this.productAddForm.controls)
    }


  }

}
