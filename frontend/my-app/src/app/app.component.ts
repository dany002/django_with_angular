import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FruitAddEditComponent} from "./fruit-add-edit/fruit-add-edit.component";
import {ServicesApiServiceService} from "./common/services.api.service.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Fruit} from "./features/fruits/components/overview/models/fruits.models";
import {CoreService} from "./core/core.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fruits-app';

  displayedColumns: string[] = ['id', 'name', 'price', 'action'];
  dataSource!: MatTableDataSource<Fruit>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog: MatDialog, private ApiSrv: ServicesApiServiceService, private _coreService: CoreService){}

  ngOnInit() {
    this.getFruitsList();
  }

  openAddEditForm(){
    const dialogRef = this._dialog.open(FruitAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getFruitsList();
        }
      }
    })
  }

  getFruitsList(){
    this.ApiSrv.getFruits().subscribe({
      next: (res) => {
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFruit(fruitId: string){
    this.ApiSrv.deleteFruit(fruitId).subscribe({
      next: (res) => {
        this._coreService.openSnackBar("Fruit deleted!", 'done')
        this.getFruitsList();
      },
      error: console.log,
    });
  }

  openEditForm(data: Fruit){
    const dialogRef = this._dialog.open(FruitAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getFruitsList();
        }
      }
    })
  }

}
