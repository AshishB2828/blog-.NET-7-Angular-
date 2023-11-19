import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs';

import { AddBlogPost } from '../../models/blogpost.model';
import { BlogpostService } from 'src/app/service/blogpost.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../../models/category.model';

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
    publishedDate: new Date(),
    categories:[]
  }
  categories$?: Observable<Category[]>;
  constructor(private blogPostService: BlogpostService, 
    private router: Router, 
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();
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
