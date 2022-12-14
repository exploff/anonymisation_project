import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-anonymisation',
  templateUrl: './form-anonymisation.component.html',
  styleUrls: ['./form-anonymisation.component.scss']
})
export class FormAnonymisationComponent implements OnInit {

  typeAnonymisationSelected!: string;
  typeAnonymisation: string[] = ['Suppression', 'Character Masking', 'Randomisation'];
  @Input()columnSelected!: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }


  submit() {
    console.log("Soumission du formulaire");
    console.log("column selected", this.columnSelected);
  }

}
