import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { BlogPost, BlogPostFilter } from '../../models/blogpost.model';
import { BlogpostService } from 'src/app/service/blogpost.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit, OnDestroy {
  blogPostSubscription?: Subscription;
  filter: BlogPostFilter = {
    categories:"", pageNumber:1, title:"", visibility: "ALL"
  }
  totlaPageAvailable: number = 1;
  isNext: boolean = false;
  isPrev:boolean = false;
  blogPosts: BlogPost[] = []

  constructor(private blogPostService: BlogpostService) {

  }
  ngOnDestroy(): void {
    this.blogPostSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    // get all blog posts from API
    this.getAllPosts();
  }
  searchBlog() {
    this.getAllPosts();
  }

  clearSearch() {
    this.filter = {
      categories:"", pageNumber:1, title:"", visibility: "ALL"
    }

    this.getAllPosts();
  }
  getAllPosts() {
    this.blogPostSubscription = this.blogPostService.getAllBlogPosts(this.filter).subscribe(
      {
        next: res => {
          console.log(res);
          this.blogPosts = res.data;
          this.totlaPageAvailable = res.noOfPages;
          this.isNext = res.isNextAvailable;
          this.isPrev = res.isPrevAvailable;
        }
      }
     );
  }

  goToPrevious() {
    if(this.filter.pageNumber!=1){
    this.filter.pageNumber -=1;
      this.getAllPosts();
    }
  }
  
  goToNext() {
    console.log(this.totlaPageAvailable)
    if(this.totlaPageAvailable == this.filter.pageNumber) return;
    
    this.filter.pageNumber+=1;
    this.getAllPosts();
    
  }

}
