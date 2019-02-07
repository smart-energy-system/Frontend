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
        
        this.chart = c3.generate({
            data: {
                x: 'x',
                columns: [
                    [
                        'x',
                        '2018-11-29',
                        '2018-11-30',
                        '2018-12-01',
                        '2018-12-02',
                        '2018-12-03',
                        '2018-12-04',
                        '2018-12-05',
                        '2018-12-06',
                        '2018-12-07',
                        '2018-12-08',
                        '2018-12-09',
                        '2018-12-10',
                        '2018-12-11',
                        '2018-12-12',
                        '2018-12-13',
                        '2018-12-14',
                        '2018-12-15',
                        '2018-12-16',
                        '2018-12-17',
                        '2018-12-18',
                        '2018-12-19',
                        '2018-12-20',
                        '2018-12-21',
                        '2018-12-22',
                    ],
                    ['data1', 30, 40, 60, 20, 15, 35, 30, 40, 60, 20, 15, 35, 30, 40, 60, 20, 15, 35, 30, 40, 60, 20, 15, 35],
                ],
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
                        format: this.format
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
