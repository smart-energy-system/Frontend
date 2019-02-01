import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { latLng, tileLayer } from 'leaflet';

export function numberValidator(control: AbstractControl): { [key:string]: any } | null {
  const valid = /^\d+$/.test(control.value);
  return valid ? null : { invalidNumber: { valid: false, value: control.value}};
}

@Component({
  selector: 'app-newsupplier',
  templateUrl: './newsupplier.component.html',
  styleUrls: ['./newsupplier.component.css']
})
export class NewsupplierComponent implements OnInit {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 7,
    center: latLng([ 46.879966, -121.726909 ])
  };

  windturbineForm: FormGroup;
  solarpanelForm: FormGroup;
  show:string;
  submitted = false;
  succes = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.windturbineForm = this.formBuilder.group({
      displayname: ['' , Validators.required],
      lat: ['' , Validators.required],
      long: ['', Validators.required],
      bladeRadius: ['', Validators.required],
      efficiency: ['', Validators.required]
    });
    this.solarpanelForm = this.formBuilder.group({
      displayname: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      maximumPowerYield: ['', Validators.required],
      moduleArea: ['', Validators.required],
      tiltAngle: ['', Validators.required]
    });
  }
  onSubmitWindturbine(){
    this.submitted = true;
    
    console.log("windturbine clicked!");

    if(this.windturbineForm.invalid){
      return;
    }

    console.log(this.windturbineForm.get('efficiency').value);

    let tempdata = {
      bladeRadius: this.windturbineForm.get('bladeRadius').value,
      efficiency: this.windturbineForm.get('efficiency').value,
      latitude: this.windturbineForm.get('lat').value,
      longitude: this.windturbineForm.get('long').value
    };

    let data = JSON.stringify(tempdata);

    this.http.post("http://localhost:8090/supplier/windTurbines", data).subscribe();
    //"displayname": this.windturbineForm.get('displayname').value,

    this.succes = true;
  }

  onSubmitSolarpanel(){
    this.submitted = true;

    console.log("solarpanel clicked!");

    if(this.solarpanelForm.invalid){
      return;
    }

    this.succes = true;
  }

  ngOnInit() {
    this.show = "wind";
  }

}
