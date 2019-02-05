import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { latLng, tileLayer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-newconsumer',
  templateUrl: './newconsumer.component.html',
  styleUrls: ['./newconsumer.component.css']
})
export class NewconsumerComponent implements OnInit {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 6,
    center: latLng([ 50, 11 ])
  };

  homeForm: FormGroup;
  officebuildingForm: FormGroup;
  show:string;
  submitted = false;
  success = false;
  layers;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.homeForm = this.formBuilder.group({
      displayname: ['' , Validators.required],
      lat: ['' , Validators.required],
      long: ['', Validators.required],
      averageDailyOccupancy: ['', Validators.required],
      demandFlexibility: ['', Validators.required],
      floorAreaSize:['', Validators.required]
    });
    this.officebuildingForm = this.formBuilder.group({
      displayname: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      averageDailyOccupancy: ['', Validators.required],
      demandFlexibility: ['', Validators.required],
      floorAreaSize: ['', Validators.required]
    });
  }

  onSubmitHome(){
    this.submitted = true;

    console.log("home clicked!");

    if(this.homeForm.invalid){
      return;
    }

    let tempdata = {
      displayName: this.homeForm.get('displayname').value,
      latitude: this.homeForm.get('lat').value,
      longitude: this.homeForm.get('long').value,
      averageDailyOccupancy: this.homeForm.get('averageDailyOccupancy').value,
      demandFlexibility: this.homeForm.get('demandFlexibility').value,
      floorAreaSize: this.homeForm.get('floorAreaSize').value
    };
    let data = JSON.stringify(tempdata);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post("http://localhost:8090/consumer/homes", data, httpOptions).subscribe();
    this.success = true;
  }

  onSubmitOffice(){
    this.submitted = true;

    console.log("office clicked!");

    if(this.officebuildingForm.invalid){
      return;
    }

    let tempdata = {
      displayName: this.officebuildingForm.get('displayname').value,
      latitude: this.officebuildingForm.get('lat').value,
      longitude: this.officebuildingForm.get('long').value,
      averageDailyOccupancy: this.officebuildingForm.get('averageDailyOccupancy').value,
      demandFlexibility: this.officebuildingForm.get('demandFlexibility').value,
      floorAreaSize: this.officebuildingForm.get('floorAreaSize').value
    };
    let data = JSON.stringify(tempdata);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post("http://localhost:8090/consumer/officeBuildings", data, httpOptions).subscribe();
    this.success = true;
  }

  onLeafletClick(event){
    console.log(event.latlng);
    this.layers = [marker(event.latlng,{icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    })];
  }

  onExport(){

  }

  onImport(){

  }

  ngOnInit() {
    this.show = "home";
  }

}
