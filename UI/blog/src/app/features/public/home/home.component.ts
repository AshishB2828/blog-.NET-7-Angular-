import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogpostService } from 'src/app/service/blogpost.service';
import { BlogPost } from '../../models/blogpost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>;
  constructor(private blogPostService: BlogpostService) {

  }
  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getAllBlogPosts();
  }

}
