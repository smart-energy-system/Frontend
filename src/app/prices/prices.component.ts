import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ChartComponent } from './chart/chart.component';
import { DataService } from '../data.service';
import { DateFormatPipe } from '../dateFormatPipe';
@Component({
    selector: 'app-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
    @Input() data: any;
    @Input() dataLabels: string[];
    @Input() xLabels: string[];
    @ViewChild('chart') chart: ChartComponent;
    min: Date;
    max: Date;
    options: FormGroup;
    prices: any[];

    displayedColumns: string[] = ['date', 'price', 'oldValue', 'timeOfRetrieval'];
    dataSource: any = [];

    constructor(private fb: FormBuilder, private dataService: DataService, private _dateFormatPipe: DateFormatPipe) {
        this.options = fb.group({
            floatLabel: 'chart'
        });
    }

    // [TODO] call rest api to get required data
    dataChange() {
        this.dataService.getPrices(this._dateFormatPipe.transform(this.min), this._dateFormatPipe.transform(this.max)).subscribe((prices: any[]) => {
            this.prices = prices;
            const tor: string = new Date().toISOString();
            const tempTable = [];
            const dataList: any[][] = [];
            const tempBarChartPrice = [];
            const tempBarChartTime = [];
            tempBarChartTime.push('x');
            tempBarChartPrice.push('Price per MWh in Euro');
            this.prices.forEach((element: any) => {
                tempTable.push(
                    {
                        date: element.time,
                        price: element.priceInEuroPerMWh,
                        oldValue: element.oldValue,
                        timeOfRetrieval: tor
                    }
                );
                tempBarChartPrice.push(element.priceInEuroPerMWh);
                tempBarChartTime.push(element.time);
            });
            this.dataSource = tempTable;
            dataList.push(tempBarChartTime);
            dataList.push(tempBarChartPrice);
            this.data = dataList;
            this.dataLabels = tempBarChartTime;
            this.xLabels = tempBarChartTime;
            // console.log(this.dataSource);
        });
    }

    ngOnInit() {
    }
}
