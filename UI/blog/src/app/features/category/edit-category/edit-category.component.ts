import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, UpdateCategoryRequest } from '../../models/category.model';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null='';
  paramSubscription?: Subscription;
  categorySubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;

  constructor(private route:ActivatedRoute, private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit() {

    this.paramSubscription = this.route.paramMap.subscribe({
      next: params =>{
         this.id = params.get('id');
         if(this.id) {
            this.categorySubscription = this.categoryService.getCategoryById(this.id)
            .subscribe({
              next: res =>{
                this.category = res;
              },error: err =>{
                console.log(err);
              }
            })
         }
      }
    })

  }

  ngOnDestroy(): void {
      this.paramSubscription?.unsubscribe();
      this.categorySubscription?.unsubscribe();
  }


  onFormSubmit() {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };

    // pass this object to service
    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
        error: error =>{
          console.log(error)
        }
      });
    }
  }
//
  onDelete(): void {
    if (this.id) {
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
        error: error =>{
          console.log(error)
        }
      })
    }
  }
  //

}
