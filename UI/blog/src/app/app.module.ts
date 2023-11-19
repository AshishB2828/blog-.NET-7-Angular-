import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { AddBlogPostComponent } from './features/blog-post/add-blog-post/add-blog-post.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { MarkdownModule } from "ngx-markdown";
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from './shared/image-selector/image-selector.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,

    AddBlogPostComponent,
    BlogpostListComponent,
    EditBlogpostComponent,

    HomeComponent,
    BlogDetailsComponent,

    LoginComponent,
    RegisterComponent,

    ImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
