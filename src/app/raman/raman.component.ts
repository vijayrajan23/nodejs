import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AppServiceService } from '../app-service.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface State {
  name: string;
}

@Component({
  selector: 'app-raman',
  templateUrl: './raman.component.html',
  styleUrls: ['./raman.component.css']
})
export class RamanComponent {



  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  states: State[] = [{name: 'Andaman and Nicobar Islands'},
        {name: 'Andhra Pradesh'},{name: 'Arunachal Pradesh'},{name: 'Assam'},
        {name: 'Bihar'},{name: 'Chandigarh'},{name: 'Chattisgarh'},
        {name: 'Dadra Nagar Haveli'},{name: 'Daman and Diu'},{name: 'Delhi'},
        {name: 'Goa'},{name: 'Gujarat'},{name: 'Haryana'},{name: 'Himachal Pradesh'},
        {name: 'Jammu and Kashmir'},{name: 'Jharkand'},{name: 'Karnataka'},
        {name: 'Kerala'},{name: 'Lakshadweep'},{name: 'Madhya Pradesh'},
        {name: 'Maharastra'},{name: 'Manipur'},{name: 'Mizoram'},
        {name: 'Nagaland'},{name: 'Orissa'},{name: 'Pondicherry'},
        {name: 'Punjab'},{name: 'Sikkim'},{name: 'Tamilnadu'},
        {name: 'Telangana'},{name: 'Tripura'},{name: 'Uttar Pradesh'},
        {name: 'Uttarakhand'},{name: 'West Bengal'},
  ];

  datas:any=[];

  displayedColumns = ['loc_id', 'state', 'district','location'];
  dataSource: MatTableDataSource<datas>;

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
 
  constructor(private _service : AppServiceService) {
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(){
    this._service.location_data().subscribe((x)=>{
      this.datas =x;
      this.dataSource = new MatTableDataSource(this.datas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  stateSearch(ss){
    ss = ss.trim(); // Remove whitespace
    ss = ss.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = ss;
  }

}
export interface datas {
  loc_id: any;
  state: any;
  district: any;
  location: any;
}
