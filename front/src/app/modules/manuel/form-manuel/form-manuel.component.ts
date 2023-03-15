import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnonymisationManuel, ColumnAnonymisationManuel } from 'src/app/shared/models/AnonymisationManuel';
import { LigneTableau } from 'src/app/shared/models/LigneTableau';
import { Table } from 'src/app/shared/models/Table';
import { HttpService } from 'src/app/shared/services/http.service';


@Component({
  selector: 'app-form-manuel',
  templateUrl: './form-manuel.component.html',
  styleUrls: ['./form-manuel.component.scss']
})
export class FormManuelComponent implements OnInit {


  typeAnonymisationSelected!: string;
  typeAnonymisation: string[] = ['Suppression', 'Character Masking', 'Randomisation'];
  @Input()columnSelected: Array<LigneTableau> = [];
  @Input()table!: Table | null;
  @Output() messageEvent = new EventEmitter<string>();

  typeRandomisationSelected!: string;
  typeRandomisation: string[] = ['name', 'fullname', 'email', 'fulladdress', 'city', 'zip', 'country', 'number', 'text'];

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
    console.log(this.columnSelected);

    let columns:ColumnAnonymisationManuel[] = [];

    this.columnSelected.forEach((line) => {
      columns.push(
        {
          column: line.Column,
          containData: line.Donnee
        }
      )
    });

    let form:AnonymisationManuel = {
      table: this.table!.table,
      columns: columns,
      typeAnonymisation: this.typeAnonymisationSelected,
      typeRandomisation: this.typeRandomisationSelected
    };


    this.httpService.formAnonymisationManuel(form).subscribe(res =>{
      console.log(res)
      if(res.success){
        console.log(res.success);
        this.messageEvent.emit("done");
      } else {
        console.log(res.error);
      }
    })
  }
}
