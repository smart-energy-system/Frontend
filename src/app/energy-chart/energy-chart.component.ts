import { Component, OnInit,ElementRef  } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Chart } from 'chart.js';
import { EnergyForecast } from '../energyForecast';
@Component({
  selector: 'app-energy-chart',
  templateUrl: './energy-chart.component.html',
  styleUrls: ['./energy-chart.component.css']
})
export class EnergyChartComponent implements OnInit {

  forecast : EnergyForecast;
  chart : any;
  chartDataSet : any;
  constructor(private forecastService: ForecastService,private elementRef: ElementRef) { }

  ngOnInit() {
    //this.getForecast();
    this.onClickMe();
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

  

  getDatePerType(type:string, entitiytype : string){
    this.forecastService.getAllIds(type,entitiytype).subscribe(entityList => entityList.forEach(entry =>
      {
        //Request for each id
        console.log(entry.id);
        //ids.push(entry.id);
        this.forecastService.getForecast(entry.id,86400000,type,entitiytype).subscribe(forecast =>
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
          this.initOrUpdateChart();
        });
    }));
  }

  onClickMe() {
    console.log("bLub");
    console.log(this.forecast);
    let ids : string[];
    ids = [];
    this.chartDataSet = {
      datasets: []
    };

    this.getDatePerType("supplier","photovoltaicPanels");
    this.getDatePerType("supplier","windTurbines");

    this.getDatePerType("consumer","homes");
    this.getDatePerType("consumer","officeBuildings");
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
            time: {
              unit: 'hour'
          }
        }],
        yAxes: [{
          type: 'linear',
          scaleLabel: {
            display: true,
            labelString: 'Unit: W'
          }
        }]
    }
    }
  });
}
}
