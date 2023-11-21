import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from 'src/app/service/blogpost.service';
import { BlogPost, BlogPostFilter } from '../../models/blogpost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  blogs?:  BlogPost[];
  blogPostSubscription?: Subscription;
  filter: BlogPostFilter = {
    categories:"", pageNumber:1, title:"", visibility: "ALL"
  }
  totlaPageAvailable: number = 1;
  isNext: boolean = false;
  isPrev:boolean = false;
  constructor(private blogPostService: BlogpostService) {

  }
  ngOnDestroy(): void {
      this.blogPostSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.blogPostSubscription = this.blogPostService.getAllBlogPosts(this.filter).subscribe(
      {
        next: res => {
          console.log(res);
          this.blogs = res.data;
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
  searchBlog() {
    this.getAllPosts();
  }

  clearSearch() {
    this.filter = {
      categories:"", pageNumber:1, title:"", visibility: "ALL"
    }

    this.getAllPosts();
  }
}
