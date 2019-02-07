import { Component, Input, OnChanges } from '@angular/core';

import * as c3 from 'c3';

@Component({
    selector: 'prices-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {
    @Input() data: (string | number | boolean)[][];
    @Input() xLabels: string[];
    @Input() format: string;
    chart: c3.ChartAPI;

    constructor() {}

    ngOnChanges() {
        console.log(this.data, this.format)
        
        this.chart = c3.generate({
            data: {
                x: 'x',
                xFormat: this.format,
                columns: this.data,
                type: 'bar',
            },
            bar: {
                width: {
                    ratio: 0.7 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d %H:%M'
                    }
                },
            }
        });
    }
    showData(label: string) {
        this.chart.show(label);
    }
    hideData(label: string) {
        this.chart.hide(label);
    }
}
