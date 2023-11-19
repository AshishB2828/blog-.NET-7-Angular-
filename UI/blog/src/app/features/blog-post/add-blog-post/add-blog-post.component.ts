import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import { AddBlogPost } from '../../models/blogpost.model';
import { BlogpostService } from 'src/app/service/blogpost.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../../models/category.model';
import { ImageService } from 'src/app/service/image.service';

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
  isImageSelectorVisible : boolean = false;
  imageSelectorSubscription?: Subscription;

  constructor(private blogPostService: BlogpostService, 
    private router: Router, 
    private categoryService: CategoryService,
    private imageService: ImageService
    ) { }

    ngOnInit(): void {
      this.categories$ = this.categoryService.getAllCategories();
 
      this.imageSelectorSubscription = this.imageService.onSelectImage()
      .subscribe({
       next: (selectedImage) => {
         this.model.featuredImageUrl = selectedImage.url;
         this.closeImageSelector();
       }
      })
 
   }

  onFormSubmit(): void {
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }

}
