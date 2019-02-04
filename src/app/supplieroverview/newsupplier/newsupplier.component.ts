import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { latLng, tileLayer, marker, icon } from 'leaflet';

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
    zoom: 6,
    center: latLng([ 50, 11 ])
  };

  windturbineForm: FormGroup;
  solarpanelForm: FormGroup;
  show:string;
  submitted = false;
  success = false;
  layers;

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

    let tempdata = {
      displayName: this.windturbineForm.get('displayname').value,
      bladeRadius: this.windturbineForm.get('bladeRadius').value,
      efficiency: this.windturbineForm.get('efficiency').value,
      latitude: this.windturbineForm.get('lat').value,
      longitude: this.windturbineForm.get('long').value
    };
    let data = JSON.stringify(tempdata);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post("http://localhost:8090/supplier/windTurbines", data, httpOptions).subscribe();
    this.success = true;
  }

  onSubmitSolarpanel(){
    this.submitted = true;

    console.log("solarpanel clicked!");

    if(this.solarpanelForm.invalid){
      return;
    }

    let tempdata = {
      displayName: this.solarpanelForm.get('displayname').value,
      lat: this.solarpanelForm.get('lat').value,
      long: this.solarpanelForm.get('long').value,
      maximumPowerYield: this.solarpanelForm.get('maximumPowerYield').value,
      moduleArea: this.solarpanelForm.get('moduleArea').value,
      tiltAngle: this.solarpanelForm.get('tiltAngle').value
    };
    let data = JSON.stringify(tempdata);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post("http://localhost:8090/supplier/photovoltaicPanels", data, httpOptions).subscribe();
    this.success = true;
  }

  onLeafletClick(event){
    this.layers = [marker(event.latlng,{icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    })];
  }

  onExport(){
    if(this.show == 'wind'){
      this.layers = [marker([this.windturbineForm.get('lat').value , this.windturbineForm.get('long').value],{icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
        })
      })];
    }else{
      this.layers = [marker([this.solarpanelForm.get('lat').value , this.solarpanelForm.get('long').value],{icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
        })
      })];
    }
  }

  onImport(){
    if(this.show == 'wind'){
      this.windturbineForm.controls['lat'].setValue(this.layers[0].getLatLng()['lat']);
      this.windturbineForm.controls['long'].setValue(this.layers[0].getLatLng()['lng']);
    }else{
      this.solarpanelForm.controls['lat'].setValue(this.layers[0].getLatLng()['lat']);
      this.solarpanelForm.controls['long'].setValue(this.layers[0].getLatLng()['lng']);
    }
  }

  ngOnInit() {
    this.show = "wind";
  }

}
