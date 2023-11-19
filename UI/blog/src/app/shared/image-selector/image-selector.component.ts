import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from 'src/app/features/models/blogImage.model';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit, OnDestroy {
  
  private file?: File;
  fileName: string = '';
  title:string = '';
  imageSelectorSubscription?: Subscription;
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', {static: false}) imageUploadForm?: NgForm

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages() {
    this.images$ = this.imageService.getAllImages();
  }
  onFileUploadChange(event: Event):void {

      const element = event.currentTarget as HTMLInputElement
      this. file = element.files?.[0];


  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.getAllImages();
        }
      });
    }
  }

  selectImage(image: BlogImage) {
    this.imageService.selectImage(image);
  }

  ngOnDestroy(): void {
      
  }
}
