import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private readonly router:Router) { }
  currentCategory:any

  ngOnInit(): void {
    
    if(!this.currentCategory)
    {
      document.querySelectorAll("li").forEach(x=>{
        if(x.attributes.getNamedItem("routerlink")?.value  == this.router.url)
        {
          x.className = "list-group-item px-3 mb-2 border-0 active"
        }
      })
    }
    else{
      this.currentCategory.target.className = "list-group-item px-3 mb-2 border-0 active"
    }

  }
  
  setClass(item:any){
    this.currentCategory = item
    document.querySelectorAll(".col-md-2 li").forEach(x=>x.className = "list-group-item px-3 mb-2 border-0 ")
    item.target.className = "list-group-item px-3 mb-2 border-0 active"
    console.log(item.target.attributes.routerlink.value)
  }
}
