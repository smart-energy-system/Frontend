import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { latLng, tileLayer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-batterie',
  templateUrl: './batterie.component.html',
  styleUrls: ['./batterie.component.css']
})
export class BatterieComponent implements OnInit {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 6,
    center: latLng([ 50, 11 ])
  };

  id: Object;
  batterieForm: FormGroup;
  submitted = false;
  success = false;
  layers;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
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

  onUpdate(){
    this.submitted = true;

    console.log("batterie update clicked!");

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

    this.http.put("http://localhost:8090/supplier/batteries/"+this.id, data, httpOptions).subscribe();
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
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }
  
}
