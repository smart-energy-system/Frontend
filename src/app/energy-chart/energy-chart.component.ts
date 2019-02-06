import { Component, OnInit,ElementRef  } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Chart } from 'chart.js';
import { EnergyForecast } from '../energyForecast';
import * as moment from 'moment';
@Component({
  selector: 'app-energy-chart',
  templateUrl: './energy-chart.component.html',
  styleUrls: ['./energy-chart.component.css']
})
export class EnergyChartComponent implements OnInit {

  toggleForecastButtonText = "5 Day History";
  forecastMode = true;
  //forecast : EnergyForecast;
  chart : any;
  chartDataSet : any;
  stillMissingData = true;
  supplierSummed : any;
  consumerSummed : any;
  difference: any;

  chart2 : any;

  constructor(private forecastService: ForecastService,private elementRef: ElementRef) { }


  ngOnInit() {
    //this.getForecast();
    var today = moment();
    var tomorrow = moment(today).add(1,'days');
    this.requestData(today,tomorrow);
    this.initChart2();
  }

  // getForecast() : void{
  //   this.forecastService.getForecast(1,86400000)
  //   .subscribe(forecast => this.forecast = forecast);
  // }

  onInit(){
    this.initChart();
  }

  initOrUpdateChart(){
    if(this.chart == null){
      this.initChart();
    }else{
      this.chart.update();
    }
  }

  randomColor(){
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
  }

  

  getDatePerType(type:string, entitiytype : string, startDate : moment.Moment, endDate : moment.Moment){
    this.forecastService.getAllIds(type,entitiytype).subscribe(entityList => entityList.forEach(entry =>
      {
        console.log("Requesting id");
        //Request for each id
        console.log(entry.id);
        //ids.push(entry.id);
        this.stillMissingData = false;
        this.forecastService.getForecast(entry.id,type,entitiytype,startDate,endDate).subscribe(forecast =>
          {
          //Add data to chart
          console.log("Get data for:"+ entry.id)
          let data = { 
            data: [],
            label: entitiytype + entry.id,
            borderColor: this.randomColor(),
            fill: false
            };
          forecast.forecast.forEach(forecastEntity => data.data.push({ x: forecastEntity.timestamp, y: forecastEntity.value}));
          this.chartDataSet.datasets.push(data);

           //Summ type 
           let label: string;
          if (type === "supplier") {
            label = "All Supplier";
            this.supplierSummed = this.updateSumm(type, forecast,this.supplierSummed, label);
          }
          else {
            label = "Consumer";
            this.consumerSummed = this.updateSumm(type, forecast,this.consumerSummed, label);
          }
          this.updateDifference();
          this.initOrUpdateChart();
        });
    }));
  }

  private updateSumm(type: string, forecast: any, summedData : any, label : string) {
    // let summedData: any;
    // let label: string;
    // if (type === "supplier") {
    //   label = "All Supplier";
    //   summedData = this.supplierSummed;
    // }
    // else {
    //   label = "Consumer";
    //   summedData = this.consumerSummed;
    // }
    if (summedData == null) {
      summedData = {
        data: [],
        label: label,
        borderColor: this.randomColor(),
        fill: false
      };
      forecast.forecast.forEach(forecastEntity => summedData.data.push({ x: forecastEntity.timestamp, y: forecastEntity.value }));
      this.chartDataSet.datasets.push(summedData);
      console.log(summedData.data);
    }
    else {
      let counter = 0;
      forecast.forecast.forEach(forecastEntity => {
        summedData.data[counter].y = summedData.data[counter].y + forecastEntity.value;
        counter++;
      });
    }
    return summedData;
  }

  private updateDifference(){
    if(this.supplierSummed != null && this.consumerSummed != null){
      if(this.difference == null){
        console.log("init diff");
        this.difference = {
          data: [],
          label: "Difference",
          borderColor: this.randomColor(),
          fill: false
        };
        this.chartDataSet.datasets.push(this.difference);
      }
      console.log(this.supplierSummed);
      console.log(this.consumerSummed);
      this.difference.data = [];
      for (let i in this.supplierSummed.data) { //over keys
        console.log(i);
        let timestamp = this.supplierSummed.data[i].x;
        console.log(timestamp);
        let diff = this.supplierSummed.data[i].y - this.consumerSummed.data[i].y;
        console.log(diff);
        this.difference.data.push({x: timestamp, y:diff});
        console.log(this.difference);
     }
     console.log(this.difference);
     this.initOrUpdateChart();
    }
  }

  requestData(startDate : moment.Moment, endDate : moment.Moment) {
    console.log("bLub");
    //console.log(this.forecast);
    // let ids : string[];
    // ids = [];
    this.chartDataSet = {
      datasets: []
    };
    //let myDate = this._dateFormatPipe.transform(today);
    //console.log(myDate);


    this.getDatePerType("supplier","photovoltaicPanels",startDate,endDate);
    this.getDatePerType("supplier","windTurbines",startDate,endDate);

    this.getDatePerType("consumer","homes",startDate,endDate);
    this.getDatePerType("consumer","officeBuildings",startDate,endDate);

/*     let data = {
      label: 'My First dataset',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [{ x: 1546819200000, y: 6 },{ x: 1546873200000, y: 8 }
      ],
    };
    let dataSet1 = { x: 1546819200000, y: 6 };
    let dataSet2 = { x: 1546873200000, y: 8 };
    data.data.push(dataSet1);
    data.data.push(dataSet2);
    this.chartDataSet.datasets.push(data);

    this.chartDataSet.datasets.push({
      label: 'My First dataset2',
      borderColor: 'rgb(255, 99, 32)',
      backgroundColor: 'rgb(255, 99, 32)',
      data: [{ x: 1546819200000, y: 3},{ x: 1546873200000, y: 9 }
      ],
    });
  
    this.initOrUpdateChart(); */


    // this.chartDataSet.datasets.push({ 
    //   data: [86,114,106,106,107,111,133,221,783,2478],
    //   label: "Africa",
    //   borderColor: "#3e95cd",
    //   fill: false
    // });


    // let data = { 
    //   data: [],
    //   label: "Panel 1",
    //   fill: false
    // };
    // this.forecast.forecast.forEach(forecastEntity => data.data.push({ x: forecastEntity.timestamp, y: forecastEntity.value}))
    // this.chartDataSet.datasets.push(data);
  }

  toogleLogScale(){
    if(this.chart.options.scales.yAxes[0].type ==='linear'){
      this.chart.options.scales.yAxes[0] = {
        type: 'logarithmic',
        scaleLabel: {
          display: true,
          labelString: 'Unit: W'
        }
      }
    }else{
      this.chart.options.scales.yAxes[0] = {
        type: 'linear',
        scaleLabel: {
          display: true,
          labelString: 'Unit: W'
        }
      }
    }
  this.chart.update();
  }

  toogleStacked(){
    console.log(this.chart);//.options.scales.yAxes[0])
  }

  initChart(){
  let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
  this.chart = new Chart(htmlRef, {
    type: 'line',
    data: this.chartDataSet,
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)'
      },
      responsive: true,
      maintainAspectRatio : false,
      animation: { duration: 0 },
      legend:{
        position : 'right',
        labels: {
          fontSize: 20
      }
      },
      scales: {
        xAxes: [{
            type: 'time',
          //    time: {
          //      unit: 'hour'
          //  }
        }],
        yAxes: [{
          type: 'linear',
          //stacked: true, // if enabeld than remove fill form data sets
           scaleLabel: {
             display: true,
             labelString: 'Unit: W'
           }
        }]
    }
    }
  });
}

toogleForecastOrHistory(){
  this.stillMissingData = true;
  this.supplierSummed = null;
  this.consumerSummed = null;
  this.chart = null;
  this.chartDataSet = null;
  this.difference = null;
  if(this.forecastMode){
    this.forecastMode = false;
    this.toggleForecastButtonText = "5 Day History";
    var today = moment();
    var fiveDaysBefore = moment(today).subtract(5,'days');
    this.requestData(fiveDaysBefore,today);
  }else{
    this.forecastMode = true;
    this.toggleForecastButtonText = "24h Forecast";
    var today = moment();
    var tomorrow = moment(today).add(1,'days');
    this.requestData(today,tomorrow);
  }
}

initChart2(){
  let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas2`);
  this.chart2 = new Chart(htmlRef,{
    type: 'line',
    data: {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First dataset',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
        data: [{ x: 1, y: 6 },{ x: 3, y: 8 }
        ],
      }, {
        label: 'My Second dataset',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgb(54, 162, 235)',
        data: [
          9,
          3,
          4,
          8,
          7,
          6,
          5
        ],
      }, {
        label: 'My Third dataset',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        data: [
          6,
          1,
          4,
          8,
          1,
          2,
          3
        ],
      }, {
        label: 'My Third dataset',
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgb(255, 205, 86)',
        data: [
          5,
          8,
          9,
          4,
          4,
          3,
          9
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart - Stacked Area'
      },
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index'
      },
      scales: {
        xAxes: [{
          type: 'time',
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  });




}
}
