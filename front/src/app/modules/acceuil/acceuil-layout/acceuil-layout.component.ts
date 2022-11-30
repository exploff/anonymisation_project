import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-acceuil_layout',
  templateUrl: './acceuil-layout.component.html',
  styleUrls: ['./acceuil-layout.component.scss']
})
export class AcceuilLayoutComponent implements OnInit {

  sqlfile!:string
  @ViewChild('fileInput')fileInput!:ElementRef;
  uploadedFile!: File;

  fileFormGroup = new FormGroup({
   fileFormControl: new FormControl('', [Validators.required])
  })
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }


  fileChange(element: any){
    this.uploadedFile = element.target.files[0];
  }

  onSubmit(value?:string){
    if(value){
      let formData = new FormData();
      formData.append("file", this.uploadedFile, this.uploadedFile.name);

      this.httpClient.post("http://localhost:3000/upload/file",formData).subscribe((reponse)=>{
        console.log(reponse);
      })
    }
  }
}

