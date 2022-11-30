import { HttpService } from './../../../shared/services/http.service';
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
  constructor(private httpService:HttpService) { }

  ngOnInit() {
  }


  fileChange(element: any){
    this.uploadedFile = element.target.files[0];
  }

  onSubmit(value?:string){
    if(value){
      this.httpService.uploadfile(this.uploadedFile).subscribe(res =>{
        console.log(res);

      })
    }
  }
}

