import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment.development';
import { AddBlogPost, BlogPost, UpdateBlogPost } from '../features/models/blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }

  getAllBlogPosts() : Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
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
