import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,NgForm  } from '@angular/forms';
import * as moment from 'moment';
import { DateFormatPipe } from '../dateFormatPipe';

@Component({
  selector: 'app-solver',
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.css']
})
export class SolverComponent implements OnInit {
  startDatePlaceHolderText : string;
  endDatePlaceHolderText : string;
  solverInput: FormGroup;
  startDate: Date;
  endDate: string;
  exportPrice:number;
  batteryFillLevel:number;

  statusFormFill = true;
  statusWaiting = false;

  constructor(private formBuilder: FormBuilder,private _dateFormatPipe:DateFormatPipe) {
    this.solverInput = this.formBuilder.group({
      startDate: ['' , Validators.required],
      endDate: ['' , Validators.required],
      exportPrice: ['', Validators.required],
      batteryFillLevel: ['', Validators.required]
    });
   }

  ngOnInit() {
    var now = moment();
    var inFourHours = moment(now).add(4,'hour');
    this.startDatePlaceHolderText = this._dateFormatPipe.transform(now);
    this.endDatePlaceHolderText = this._dateFormatPipe.transform(inFourHours);
  }

  onSubmit(form:NgForm){
    console.log(form);
    this.statusFormFill = false; 
  }

}
