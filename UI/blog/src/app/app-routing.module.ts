import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogPostComponent } from './features/blog-post/add-blog-post/add-blog-post.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';

const routes: Routes = [
  {
    path:'admin/categories', component: CategoryListComponent
  },
  {
    path:'admin/categories/add', component: AddCategoryComponent
  },
  {
    path:'admin/categories/edit/:id', component: EditCategoryComponent
  },
  {
    path:'admin/blogpost/add', component: AddBlogPostComponent
  },
  {
    path:'admin/blogposts', component: BlogpostListComponent
  },
  {
    path:'admin/blogpost/edit/:id', component: EditBlogpostComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
