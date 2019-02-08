import { Component, OnInit ,ElementRef,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators,NgForm  } from '@angular/forms';
import * as moment from 'moment';
import { DateFormatPipe } from '../dateFormatPipe';
import { SolverFetchService } from '../solver-fetch.service';
import { Chart } from 'chart.js';
import { SolverSolution } from '../solverSolution';
import { SolutionStep } from '../solverSolution';
import {MatTableModule} from '@angular/material/table';
import { count } from 'rxjs/operators';
import {MatTable} from '@angular/material';

export interface TableElemntSolutionStep {
  step: number;
  variables: SolutionStep;
}


@Component({
  selector: 'app-solver',
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.css']
})
export class SolverComponent implements OnInit {
  
  //startDatePlaceHolderText : string;
  //endDatePlaceHolderText : string;
  solverInput: FormGroup;
  startDate : moment.Moment
  endDate : moment.Moment
  exportPrice:number;
  batteryFillLevel:number;
  calculationBound : number;
  stepCountOverwrite: number;
  timeout : number;

  statusFormFill = true;
  statusWaiting = false;
  statusCharts = false;
  statusText = false;

  chartEnergy : any;
  chartPrice : any;
  chartBattery : any;

  tableElemntSolutionSteps : TableElemntSolutionStep[] = [];

  @ViewChild(MatTable) table: MatTable<any>;

  toggleTextButtonText : string = "Swtich to Table"

  textVisable: boolean = false;
  displayedColumnsText : string[] = ['step', 'text'];
  displayedColumnsWithoutText : string[] = ['step',
  'OfficeBuildings','Homes','TotalDemand',
  'TotalSuppliers','Difference','GridImport',
  'PositivShiftHome','NegativShiftHome',
  'positivShiftOffice','NegativShiftOffice','batteryFillLevel','batteryChargeRate','discargeRate' ,'importCost','exportProfit'];
  displayedColumns : string[] = this.displayedColumnsWithoutText;
/*    displayedColumnsWithoutText: string[] = ['step',
   'OfficeBuildings','Homes','TotalDemand',
   'TotalSuppliers','Difference','GridImport',
   'PositivShiftHome','NegativShiftHome',
   'positivShiftOffice','NegativShiftOffice','batteryFillLevel','batteryChargeRate',discargeRate'importCost','exportProfit']; */

  solverSolution : SolverSolution;

  config = {
    mode: "time"
  };

  constructor(private formBuilder: FormBuilder,private _dateFormatPipe:DateFormatPipe,private solverFetchService: SolverFetchService,private elementRef: ElementRef) {
    this.solverInput = this.formBuilder.group({
      startDate: ['' , Validators.required],
      endDate: ['' , Validators.required],
      exportPrice: ['', Validators.required],
      batteryFillLevel: ['', Validators.required],
      calculationBound: ['', Validators.required],
      stepCountOverwrite: ['',Validators.required],
      timeout: ['',Validators.required]
    });
   }

  ngOnInit() {
    var now = moment();
    var inFourHours = moment(now).add(4,'hour');

    this.solverInput.patchValue({
      stepCountOverwrite: 4,
      startDate : now,
      endDate : inFourHours,
      exportPrice : 5,
      batteryFillLevel : 0,
      calculationBound : 1000,
      timeout: 10
    })
    //this.table.h
    //this.initCharts();
    //this.startDatePlaceHolderText = this._dateFormatPipe.transform(now);
    //this.endDatePlaceHolderText = this._dateFormatPipe.transform(inFourHours);
    //let htmlRef = this.elementRef.nativeElement.querySelector(`#canvaschartEnergy`);
    //console.log(htmlRef);

    //this.tableElemntSolutionSteps.push({step:1,text:"jjgffffffffffffffffghfghfghfghfghghfghg<b>fdfddf</b>hfhfghfghfghgfhfghfghfghfghgfhfkjl",variables: "jhkjhjk"});
    //this.tableElemntSolutionSteps.push({step:2,text:"jjkjl",variables: "jhkjhjk"});
    //this.tableElemntSolutionSteps.push({step:3,text:"jjkjl",variables: "jhkjhjk"});
    //this.tableElemntSolutionSteps.push({step:4,text:"jjkjl",variables: "jhkjhjk"});
  }
  randomColor(){
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

  toggleTextView(){
    if(this.statusCharts && !this.statusText){
      this.statusCharts = false;
      this.statusText = true;
      this.toggleTextButtonText = "Switch to Charts";
    }else{
      this.statusCharts = true;
      this.statusText = false;
      this.toggleTextButtonText = "Switch to Table";
    }
  }

  toggleTextInTable(){
    if(this.textVisable){
      this.textVisable = false;
      this.displayedColumns = this.displayedColumnsWithoutText;
    }else{
      this.textVisable = true;
      this.displayedColumns = this.displayedColumnsText;
    }
  }

  onSubmit(form:any){
    console.log(form);
    this.statusFormFill = false;
    this.statusWaiting = true;
    console.log("StartDate:"+ form.startDate + " EndDate:"+ form.endDate);
    this.solverFetchService.getSolution(form.startDate,form.endDate,form.calculationBound, form.exportPrice,form.stepCountOverwrite,form.timeout,form.batteryFillLevel).subscribe(solverSolution => {
      this.solverSolution = (solverSolution as SolverSolution);
      console.log(solverSolution);
      this.statusWaiting = false;
      this.statusCharts = true;
      this.initCharts();
      solverSolution = (solverSolution as SolverSolution); 
      let summedDemand = { 
        data: [],
        label: "All Consumer",
        borderColor: this.randomColor(),
        fill: false
        };

      let supplyData = { 
        data: [],
        label: "Supply",
        borderColor: this.randomColor(),
        fill: false
        };
      let homeConsumer = { 
        data: [],
        label: "Home Demand",
        borderColor: this.randomColor(),
        fill: false
      };
      let officeConsumer = { 
        data: [],
        label: "Office Demand",
        borderColor: this.randomColor(),
        fill: false
      };
      let gridImport = { 
              data: [],
              label: "Grid Import",
              borderColor: this.randomColor(),
              fill: false
      };
      let positivShiftHome = { 
                data: [],
                label: "Postiv Demand Shift Home",
                borderColor: this.randomColor(),
                fill: false
      };
      let positivShiftOffice = { 
        data: [],
        label: "Positiv Demand Shift Office",
        borderColor: this.randomColor(),
        fill: false
      };
      let negShiftHome = { 
        data: [],
        label: "Negativ Demand Shift Home",
        borderColor: this.randomColor(),
        fill: false
      };
      let negShiftOffice = { 
        data: [],
        label: "Negativ Demand Shift Office",
        borderColor: this.randomColor(),
        fill: false
      };
      let batteryDisChargeRate = { 
        data: [],
        label: "Battery Discharge Rate",
        borderColor: this.randomColor(),
        fill: false
      };
      let batteryChargeRate = { 
        data: [],
        label: "Battery Charge Rate",
        borderColor: this.randomColor(),
        fill: false
      };

      // Battery Fill level
      let batteryFillLevel = { 
        data: [],
        label: "Battery Level",
        borderColor: this.randomColor(),
        fill: false
      };

      //Preise
      let importCost = { 
        data: [],
        label: "Import Cost",
        borderColor: this.randomColor(),
        fill: false
      };

      let exportProfit = { 
        data: [],
        label: "Export Profit",
        borderColor: this.randomColor(),
        fill: false
      };
      let counter = 0;
      solverSolution.solutionSteps.forEach(solverSolutionStep => {
        summedDemand.data.push({x:counter, y:solverSolutionStep.pd[0]+solverSolutionStep.pd[1]})
        supplyData.data.push({x:counter, y:solverSolutionStep.ps})
        homeConsumer.data.push({x:counter, y:solverSolutionStep.pd[0]});
        officeConsumer.data.push({x:counter, y:solverSolutionStep.pd[1]});
        gridImport.data.push({x:counter, y:solverSolutionStep.pg})
        positivShiftHome.data.push({x:counter, y:solverSolutionStep.pposShift[0]});
        positivShiftOffice.data.push({x:counter, y:solverSolutionStep.pposShift[1]});
        negShiftHome.data.push({x:counter, y:solverSolutionStep.pnegShift[0]});
        negShiftOffice.data.push({x:counter, y:solverSolutionStep.pnegShift[1]});
        batteryChargeRate.data.push({x:counter, y:solverSolutionStep.chargeRate});
        batteryFillLevel.data.push({x:counter, y:solverSolutionStep.batteryFillLevel});
        importCost.data.push({x:counter, y:solverSolutionStep.importCost});
        exportProfit.data.push({x:counter, y:solverSolutionStep.exportProfit});
        batteryDisChargeRate.data.push({x:counter,y:solverSolutionStep.discargeRate})

        this.chartEnergy.data.labels.push(counter);
        this.chartPrice.data.labels.push(counter);
        this.chartBattery.data.labels.push(counter);
        counter++;
        console.log("Fore each:"+ counter);
        this.tableElemntSolutionSteps.push({step: counter, variables: solverSolutionStep});
        this.table.renderRows();
      })
      this.chartEnergy.data.datasets.push(supplyData);
      this.chartEnergy.data.datasets.push(homeConsumer);
      this.chartEnergy.data.datasets.push(officeConsumer);
      this.chartEnergy.data.datasets.push(positivShiftHome);
      this.chartEnergy.data.datasets.push(positivShiftOffice);
      this.chartEnergy.data.datasets.push(negShiftHome);
      this.chartEnergy.data.datasets.push(negShiftOffice);
      this.chartEnergy.data.datasets.push(batteryChargeRate);
      this.chartEnergy.data.datasets.push(batteryDisChargeRate);
      this.chartEnergy.data.datasets.push(summedDemand)

      this.chartPrice.data.datasets.push(importCost);
      this.chartPrice.data.datasets.push(exportProfit);
      this.chartBattery.data.datasets.push(batteryFillLevel);

      this.chartEnergy.update();
      this.chartPrice.update();
      this.chartBattery.update();
      console.log(this.chartEnergy);
      console.log(this.chartPrice);
      console.log(this.chartBattery);
    });
  }

  initCharts(){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvaschartEnergy`);
    console.log(htmlRef);
    this.chartEnergy = this.getChart(htmlRef, "Import Export","kW");
    let htmlRef2 = this.elementRef.nativeElement.querySelector(`#canvaschartPrice`);
    console.log(htmlRef2);
    this.chartPrice = this.getChart(htmlRef2, "Cost vs Profit", "Cent");
    let htmlRef3 = this.elementRef.nativeElement.querySelector(`#canvaschartBattery`);
    console.log(htmlRef3);
    this.chartBattery = this.getChart(htmlRef3, "Battery", "kWh");
  }

/*   ngAfterViewInit() {
    if(this.statusWaiting){
      this.initCharts();
    }

  } */


  private getChart(htmlRef: any,text: string, unit : string) : Chart {
    return new Chart(htmlRef, {
      type: 'line',
      data: {
        //labels: ["Red", "Blue", "Yellow"],
        datasets: []},
      options: {
        title: {
          display: true,
          text: text,
          fontSize: 20
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        legend: {
          position: 'right',
          labels: {
            fontSize: 20
          }
        },
        scales: {
          yAxes: [{
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Unit: ' + unit,
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Timestep",
            }
        }]
        }
      }
    });
  }
}
