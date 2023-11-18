import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  categories: Category[]|undefined ;
  private categorySubscription?: Subscription;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories()
  }

  ngOnDestroy(): void {
      this.categorySubscription?.unsubscribe();
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      {
        next: res =>{
          this.categories = res;
        },
        error: err =>{
            console.log(err);
        }
      }
    )
  }

}
