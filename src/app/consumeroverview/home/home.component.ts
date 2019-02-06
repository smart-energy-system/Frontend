import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { latLng, tileLayer, marker, icon} from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 6,
    center: latLng([ 50, 11 ])
  };

  id: number;
  home: Object;
  homeForm: FormGroup;
  submitted = false;
  success = false;
  layers;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpClient) {
    this.homeForm = this.formBuilder.group({
      displayname: ['' , Validators.required],
      lat: ['' , Validators.required],
      long: ['', Validators.required],
      averageDailyOccupancy: ['', Validators.required],
      demandFlexibility: ['', Validators.required],
      floorAreaSize:['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.get("http://localhost:8090/consumer/homes/"+this.id).subscribe(data => {
        this.home = data;
        this.homeForm.controls['displayname'].setValue(this.home['displayName']);
        this.homeForm.controls['lat'].setValue(this.home['latitude']);
        this.homeForm.controls['long'].setValue(this.home['longitude']);
        this.homeForm.controls['averageDailyOccupancy'].setValue(this.home['averageDailyOccupancy']);
        this.homeForm.controls['demandFlexibility'].setValue(this.home['demandFlexibility']);
        this.homeForm.controls['floorAreaSize'].setValue(this.home['floorAreaSize']);
      });
    });
  }

  onSubmitUpdate(){
    this.submitted = true;
    
    console.log("windturbine update clicked!");

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

    this.http.put("http://localhost:8090/consumer/homes/" + this.id, data, httpOptions).subscribe();
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
    this.layers = [marker([this.homeForm.get('lat').value , this.homeForm.get('long').value],{icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
      })
    })];
  }

  onImport(){
    this.homeForm.controls['lat'].setValue(this.layers[0].getLatLng()['lat']);
    this.homeForm.controls['long'].setValue(this.layers[0].getLatLng()['lng']);
  }
}
