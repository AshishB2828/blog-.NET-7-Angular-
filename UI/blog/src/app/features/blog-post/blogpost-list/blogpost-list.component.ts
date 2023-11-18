import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { BlogPost } from '../../models/blogpost.model';
import { BlogpostService } from 'src/app/service/blogpost.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  blogPosts$?: Observable<BlogPost[]>;
  
  constructor(private blogPostService: BlogpostService) {

  }

  ngOnInit(): void {
    // get all blog posts from API
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }

}
