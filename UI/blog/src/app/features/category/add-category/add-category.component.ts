import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddCategoryRequest } from '../../models/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  model: AddCategoryRequest = {
    name: '', urlHandle:''
  }
  private addCategorySubscription?: Subscription;
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();    
  }

  onFormSubmit() {
     
    this.addCategorySubscription = this.categoryService.addCategory(this.model).subscribe({
      next:() =>{
        console.log("done");
        this.router.navigate(['/admin/categories'])
      },
      error: err =>{
        console.log(err)
      }
    });



  }

}
