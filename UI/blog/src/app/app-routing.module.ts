import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogPostComponent } from './features/blog-post/add-blog-post/add-blog-post.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './features/auth/register/register.component';

const routes: Routes = [
  {
    path:"", component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'admin/categories', component: CategoryListComponent, canActivate: [authGuard]
  },
  {
    path:'admin/categories/add', component: AddCategoryComponent, canActivate: [authGuard]
  },
  {
    path:'admin/categories/edit/:id', component: EditCategoryComponent, canActivate: [authGuard]
  },
  {
    path:'admin/blogpost/add', component: AddBlogPostComponent, canActivate: [authGuard]
  },
  {
    path:'admin/blogposts', component: BlogpostListComponent, canActivate: [authGuard]
  },
  {
    path:'admin/blogpost/edit/:id', component: EditBlogpostComponent, canActivate: [authGuard]
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
