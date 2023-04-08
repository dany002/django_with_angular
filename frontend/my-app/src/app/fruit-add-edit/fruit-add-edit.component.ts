import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ServicesApiServiceService} from "../common/services.api.service.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Fruit} from "../features/fruits/components/overview/models/fruits.models";
import {CoreService} from "../core/core.service";

@Component({
  selector: 'app-fruit-add-edit',
  templateUrl: './fruit-add-edit.component.html',
  styleUrls: ['./fruit-add-edit.component.css']
})
export class FruitAddEditComponent implements OnInit{
  fruitForm: FormGroup;

  constructor(
    private form_builder: FormBuilder,
    private apiSrv: ServicesApiServiceService,
    private dialogRef: MatDialogRef<FruitAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fruit,
    private _coreService: CoreService
  ) {
    this.fruitForm = this.form_builder.group({
      name: '',
      price: '',
    });
  }

  ngOnInit() {
    this.fruitForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.fruitForm.valid){
      if(this.data){
        this.apiSrv.updateFruit(this.data.id, this.fruitForm.value).subscribe({
          next:(any) =>{
            this._coreService.openSnackBar('Fruit detail updated!', 'done');
            this.dialogRef.close(true);
          },
          error: (err) =>{
            console.error(err);
          }
        })
      }
      else{


      this.apiSrv.addFruit(this.fruitForm.value).subscribe({
        next:(any) =>{
          this._coreService.openSnackBar('Fruit added!', 'done');
          this.dialogRef.close(true);
          },
        error: (err) =>{
          console.error(err);
        }
      })
      }
    }
  }

}
