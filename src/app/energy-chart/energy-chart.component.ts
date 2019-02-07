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
  toggleStackedtButtonText = "Stacked Mode";
  toggleLogModeButtonText = "Linear";
  forecastMode = true;
  chart : any;
  chartDataSet : any;
  stillMissingData = true;
  supplierSummed : any;
  consumerSummed : any;
  difference: any;

  constructor(private forecastService: ForecastService,private elementRef: ElementRef) { }


  ngOnInit() {
    //this.getForecast();
    var today = moment();
    var tomorrow = moment(today).add(1,'days');
    this.requestData(today,tomorrow);
  }

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
    this.chartDataSet = {
      datasets: []
    };

    this.getDatePerType("supplier","photovoltaicPanels",startDate,endDate);
    this.getDatePerType("supplier","windTurbines",startDate,endDate);

    this.getDatePerType("consumer","homes",startDate,endDate);
    this.getDatePerType("consumer","officeBuildings",startDate,endDate);
  }

  toogleLogScale(){
    if(this.chart.options.scales.yAxes[0].type ==='linear'){
      this.chart.options.scales.yAxes[0].type = "logarithmic";
      this.toggleLogModeButtonText = "Logarithmic";
    }else{
      this.chart.options.scales.yAxes[0].type = "linear";
      this.toggleLogModeButtonText = "Linear";
    }
    this.chart.update();
  }

  toogleStacked(){
    console.log(this.chart)
    console.log(this.chart.data)
    if(this.chart.options.scales.yAxes[0].stacked){
      this.chart.options.scales.yAxes[0].stacked = false;
      this.chart.data.datasets.forEach(dataset => dataset.fill = false );
      this.toggleStackedtButtonText = "Stacked Mode";
    }else{
      this.chart.options.scales.yAxes[0].stacked = true;
      this.chart.data.datasets.forEach(dataset => dataset.fill = undefined );
      this.toggleStackedtButtonText = "Normal Mode";
    }
    this.initOrUpdateChart();
    console.log(this.chart.options.scales.yAxes[0].stacked);//.options.scales.yAxes[0])
  }

  initChart(){
  let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
  this.chart = new Chart(htmlRef, {
    type: 'line',
    data: this.chartDataSet,
    options: {
      title: {
        display: true,
        text: 'Supplier vs Consumer',
        fontSize: 20
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
            scaleLabel: {
              fontSize: 14
            },
            ticks: {
              fontSize: 14
          }
          //    time: {
          //      unit: 'hour'
          //  }
        }],
        yAxes: [{
          type: 'linear',
          stacked: false, // if enabeld than remove fill form data sets
           scaleLabel: {
             display: true,
             labelString: 'Unit: W',
             fontSize: 14
           },
           ticks: {
            fontSize: 14
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


}
