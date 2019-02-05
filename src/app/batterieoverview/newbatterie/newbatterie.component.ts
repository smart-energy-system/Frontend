import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { latLng, tileLayer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-newbatterie',
  templateUrl: './newbatterie.component.html',
  styleUrls: ['./newbatterie.component.css']
})
export class NewbatterieComponent implements OnInit {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 6,
    center: latLng([ 50, 11 ])
  };

  batterieForm: FormGroup;
  submitted = false;
  success = false;
  layers;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.batterieForm = this.formBuilder.group({
      displayname: ['' , Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      maximumStoredEnergy: ['' , Validators.required],
      maximumChargingRate: ['', Validators.required],
      maximumDischargingRate: ['', Validators.required],
      chargingEfficiency: ['', Validators.required],
      storedEnergy: ['', Validators.required]
    });
  }

  onSubmitBatterie(){
    this.submitted = true;

    console.log("windturbine clicked!");

    if(this.batterieForm.invalid){
      return;
    }

    let tempdata = {
      displayName: this.batterieForm.get('displayname').value,
      latitude: this.batterieForm.get('lat').value,
      longitude: this.batterieForm.get('long').value,
      chargingEfficiency: this.batterieForm.get('chargingEfficiency').value,
      maximumChargingRate: this.batterieForm.get('maximumChargingRate').value,
      maximumDischargingRate: this.batterieForm.get('maximumDischargingRate').value,
      maximumStoredEnergy: this.batterieForm.get('maximumStoredEnergy').value,
      storedEnergy: this.batterieForm.get('storedEnergy').value
    };
    let data = JSON.stringify(tempdata);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post("http://localhost:8090/supplier/batteries", data, httpOptions).subscribe();
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
    this.layers = [marker([this.batterieForm.get('lat').value , this.batterieForm.get('long').value],{icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
      })
    })];
  }

  onImport(){
    this.batterieForm.controls['lat'].setValue(this.layers[0].getLatLng()['lat']);
    this.batterieForm.controls['long'].setValue(this.layers[0].getLatLng()['lng']);
  }

  ngOnInit() {
  }

}
