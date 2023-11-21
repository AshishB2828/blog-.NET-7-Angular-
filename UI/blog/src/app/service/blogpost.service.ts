import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment.development';
import { AddBlogPost, BlogPost, BlogPostFilter, UpdateBlogPost } from '../features/models/blogpost.model';
import { PagedResult } from '../features/models/utils.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }

  getAllBlogPosts(filter?: BlogPostFilter) : Observable<PagedResult<BlogPost>> {
     let httpParams:HttpParams = new HttpParams();
    
    return this.http.get<PagedResult<BlogPost>>(
      `${environment.apiBaseUrl}/api/blogposts?title=${filter?.title}&pageNumber=${filter?.pageNumber}&visibility=${filter?.visibility}&categories=${filter?.categories}`, {
      params: httpParams
    });
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }

  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}?addAuth=true`);
  }

  
  createBlogPost(data: AddBlogPost) : Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts?addAuth=true`, data);
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`, updatedBlogPost);
  }
  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }
  
}
