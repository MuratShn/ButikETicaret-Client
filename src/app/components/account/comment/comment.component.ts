import { Component, OnInit } from '@angular/core';
import { MyCommentDto } from 'src/app/models/MyCommentDto';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private readonly commentService:AccountService) { }

  comments:MyCommentDto[]

  ngOnInit(): void {
    this.commentService.getMyComments().subscribe(x=>{
      if(x.success){
        this.comments = x.data
      }
      this.comments.forEach(x => {
        x.date =  new Date(x.date).toLocaleDateString("tr-TR")
      });
      this.comments.sort(x=>x.date).reverse();
    })
  }

}
