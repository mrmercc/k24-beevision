import { Component, OnInit } from '@angular/core';

import { BaseResult, Result } from '../Models/ResultModel';
import { ResultService } from '../Services/result.service';

import { BulkUpdate } from '../Models/ShipmentModel';
import { ShipmentService } from '../Services/shipments.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  result: BaseResult | undefined;
  results: Result[] = [];

  bulkUpdateResult: BulkUpdate[] = []

  constructor(
    private resultService: ResultService,
    private shipmentService: ShipmentService
  ) {}
  ngOnInit(): void {

    const todayDate = this.formatDate(new Date());
    this.getResults(todayDate);

  }

  getResults(date: string | Date){
    this.resultService.getResults(date).subscribe((result)=>{
      console.log('bee vision res', result);
      this.result = result;
      this.results = this.result.results;
    })
  }

  formatDate(date: Date) {
    if (!(date instanceof Date)) {
      throw new Error('Invalid "date" argument. You must pass a date instance')
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  prepareResultsToBulkUpdate():void {
    this.results.map((result, index)=>{
      this.bulkUpdateResult.push({
        dimensions: {
          width: Number.parseFloat(result.Width).toFixed(2).toString(),
          length: Number.parseFloat(result.Length).toFixed(2).toString(),
          height: Number.parseFloat(result.Height).toFixed(2).toString(),
          dimWt: Number.parseFloat(result.DimWt).toFixed(2).toString(),
          weight: Number.parseFloat(result.Weight).toFixed(2).toString()
        },
        barcode: result.Barcode
      })
    })

    console.log('BULK', this.bulkUpdateResult);

    this.shipmentService.bulkUpdateShipments(this.bulkUpdateResult).subscribe((result)=>{
      console.log('BULK UPDATE RESULT', result);
    })

  }

}
