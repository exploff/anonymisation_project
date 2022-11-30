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

  fileFormGroup = new FormGroup({
   fileFormControl: new FormControl('', [Validators.required])
  })
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onSubmit(value?:string){
    if(value){
      console.log(this.fileInput.nativeElement.files);
      if(this.fileInput.nativeElement.files){
        let file:Blob = this.fileInput.nativeElement.files[0]

        this.changeFile(file).then((base64)=> {
            let fileBlob = new Blob([base64],{type:'text/plain'});
            //post request
            let formData = new FormData();
            formData.append("file", fileBlob);
            this.httpClient.post("http://localhost:3000/upload/file",formData).subscribe((reponse)=>{
              console.log(reponse);
            })

            console.log(fileBlob)
        });
      }
    }

  }

  changeFile(file:Blob): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = error => reject(error);
    });
}

}
