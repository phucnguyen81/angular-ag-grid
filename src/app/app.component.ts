import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'ag-grid-enterprise';
import { ColDef, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';

import { IOlympicData } from './interfaces';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private gridApi!: GridApi<IOlympicData>;

  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'athlete', minWidth: 180 },
    { field: 'age' },
    { field: 'year' },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public groupDefaultExpanded = 1;
  public rowData!: IOlympicData[];

  constructor(private http: HttpClient) {}

  onBtForEachNode() {
    console.log('### api.forEachNode() ###');
    this.gridApi.forEachNode(printNode);
  }

  onBtForEachNodeAfterFilter() {
    console.log('### api.forEachNodeAfterFilter() ###');
    this.gridApi.forEachNodeAfterFilter(printNode);
  }

  onBtForEachNodeAfterFilterAndSort() {
    console.log('### api.forEachNodeAfterFilterAndSort() ###');
    this.gridApi.forEachNodeAfterFilterAndSort(printNode);
  }

  onBtForEachLeafNode() {
    console.log('### api.forEachLeafNode() ###');
    this.gridApi.forEachLeafNode(printNode);
  }

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.gridApi = params.api;
    console.log('Fetching data');
    const data = [
      {
        athlete: 'Michael Phelps',
        age: 23,
        country: 'United States',
        year: 2008,
        date: '24/08/2008',
        sport: 'Swimming',
        gold: 8,
        silver: 0,
        bronze: 0,
        total: 8,
      },
      {
        athlete: 'Michael Phelps',
        age: 19,
        country: 'United States',
        year: 2004,
        date: '29/08/2004',
        sport: 'Swimming',
        gold: 6,
        silver: 0,
        bronze: 2,
        total: 8,
      },
      {
        athlete: 'Michael Phelps',
        age: 27,
        country: 'United States',
        year: 2012,
        date: '12/08/2012',
        sport: 'Swimming',
        gold: 4,
        silver: 2,
        bronze: 0,
        total: 6,
      },
      {
        athlete: 'Natalie Coughlin',
        age: 25,
        country: 'United States',
        year: 2008,
        date: '24/08/2008',
        sport: 'Swimming',
        gold: 1,
        silver: 2,
        bronze: 3,
        total: 6,
      },
      {
        athlete: 'Aleksey Nemov',
        age: 24,
        country: 'Russia',
        year: 2000,
        date: '01/10/2000',
        sport: 'Gymnastics',
        gold: 2,
        silver: 1,
        bronze: 3,
        total: 6,
      },
    ];
    params.api!.setRowData(data);
    // this.http
    //   .get<IOlympicData[]>(
    //     'https://www.ag-grid.com/example-assets/olympic-winners.json'
    //   )
    //   .subscribe(
    //     (data) => params.api!.setRowData(data.slice(0, 50)),
    //     (error) => console.log(error)
    //   );
  }
}

const printNode = (node: RowNode<IOlympicData>, index?: number) => {
  if (node.group) {
    console.log(index + ' -> group: ' + node.key);
  } else {
    console.log(
      index + ' -> data: ' + node.data!.country + ', ' + node.data!.athlete
    );
  }
};
