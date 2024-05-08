import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectedFiles: File[] = [];

  constructor() { }

  ngOnInit() {}

  onRemove(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  // File Upload
  imageURL: any;

  onSelect(event: any) {
    this.selectedFiles.push(...event.addedFiles);
    // Handle file reading/display logic here if necessary
  }

  selectImage() {
    const inputElement = document.getElementById('project-image-input') as HTMLInputElement;
    inputElement.click();
  }

  displayImage(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      };
  
      reader.readAsDataURL(inputElement.files[0]);
    }
  }
}
