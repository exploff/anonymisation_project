import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AnonymisationAutomatique } from 'src/app/shared/models/AnonymisationAutomatique';
import { Table } from 'src/app/shared/models/Table';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-form-anonymisation',
  templateUrl: './form-anonymisation.component.html',
  styleUrls: ['./form-anonymisation.component.scss']
})
export class FormAnonymisationComponent implements OnInit {

  typeAnonymisationSelected!: string;
  typeAnonymisation: string[] = ['Suppression', 'Character Masking', 'Randomisation'];
  @Input()columnSelected: Array<string> = [];
  @Input()table!: Table | null;

  typeRandomisationSelected!: string;
  typeRandomisation: string[] = ['Nom', 'Nom et Prenom', 'Adresse email', 'Adresse complète', 'Ville', 'Code postal', 'Pays', 'Nombre', 'Texte'];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  showTypeRandomisation() {
    return this.typeAnonymisationSelected == 'Randomisation';
  }

  disableForm() {
    if (this.typeAnonymisationSelected == 'Randomisation' && this.typeRandomisationSelected == undefined) {
      console.log(this.typeRandomisationSelected)
      return true;
    }
    return this.typeAnonymisationSelected == undefined ||
          this.columnSelected == undefined ||
          this.columnSelected.length === 0
  }


  submit() {
    console.log("Soumission du formulaire");
    console.log(this.typeAnonymisationSelected);
    console.log("column selected", this.columnSelected);

    let form:AnonymisationAutomatique = {
      table: this.table!.table,
      columns: this.columnSelected,
      typeAnonymisation: this.typeAnonymisationSelected,
      typeRandomisation: this.typeRandomisationSelected
    };


    this.httpService.formAnonymisationAutomatique(form).subscribe(res =>{
      if(res.success){
        console.log(res.success);
      } else {
        console.log(res.error);
      }
    })
  }
}
