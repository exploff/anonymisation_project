import { HttpService } from './../../../shared/services/http.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private httpService:HttpService,private router:Router) { }

  ngOnInit() {
  }


  fileChange(element: any){
    this.uploadedFile = element.target.files[0];
  }

  onSubmit(value?:string){
    // if(value){
    //   this.httpService.uploadfile(this.uploadedFile).subscribe(res =>{
    //     if(res.success){
    //       console.log(value);
    //       this.router.navigateByUrl(`/${value}`)
    //     }
    //   })
    // }
    if (value) {
      this.router.navigateByUrl(`/${value}`)
    }
  }
}

