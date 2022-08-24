import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MyProductDto } from 'src/app/models/MyProductDto';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { ImageService } from 'src/app/services/ımage.service';
import { ProductImageVM } from 'src/app/viewmodel/ProductImageVM';


@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  
  selectedFile:any[]=[];
  @Input() product:MyProductDto
  @Input() color:string;

  constructor(
    private readonly imageService:ImageService,
    private readonly toastrService:CustomToastrService
    ) { }

  ngOnInit(): void {
    console.log("test")
  }

  onSelectFile(fileInput: any) {
    this.selectedFile = <File[]>fileInput.target.files
  }

  onSubmit(){
    console.log(this.selectedFile)
    let formdata = new FormData();

    for (let i = 0; i < this.selectedFile.length; i++) {
      formdata.append("Image",this.selectedFile[i])
    }
    formdata.append("productId",this.product.id.toString())
    formdata.append("Color",this.color)

    let imageinput = (<HTMLInputElement>document.getElementById("formFileMultiple"))
    imageinput.value = "";

    this.imageService.addProductImage(formdata).subscribe(x=>{
      if(x.success){
        this.toastrService.Message("Başarılı",x.message,{messageType:ToastrMessageType.Success , position : ToastrPosition.TopRight})
      }
      else{
        this.toastrService.Message(x.message,"Hata",{messageType:ToastrMessageType.Error , position : ToastrPosition.TopRight})
      }
      console.log(x)
    })

    
  }
}
