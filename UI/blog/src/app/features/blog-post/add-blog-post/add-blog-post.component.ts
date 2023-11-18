import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddBlogPost } from '../../models/blogpost.model';
import { BlogpostService } from 'src/app/service/blogpost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css']
})
export class AddBlogPostComponent implements OnInit, OnDestroy {


  model: AddBlogPost= {
    title: '',
    shortDescription: '',
    urlHandle: '',
    content: '',
    featuredImageUrl: '',
    author: '',
    isVisible: true,
    publishedDate: new Date()
  }

  constructor(private blogPostService: BlogpostService, private router: Router) { }

  ngOnInit() {
  }


  onFormSubmit(): void {
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

  ngOnDestroy(): void {
      
  }

}
