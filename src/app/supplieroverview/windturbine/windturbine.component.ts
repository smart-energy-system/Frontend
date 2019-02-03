import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { latLng, tileLayer, marker, icon} from 'leaflet';

@Component({
  selector: 'app-windturbine',
  templateUrl: './windturbine.component.html',
  styleUrls: ['./windturbine.component.css']
})
export class WindturbineComponent implements OnInit {

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
  windturbineForm: FormGroup;
  submitted = false;
  success = false;
  layers;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpClient) {
    this.windturbineForm = this.formBuilder.group({
      displayname: ['' , Validators.required],
      lat: ['' , Validators.required],
      long: ['', Validators.required],
      bladeRadius: ['', Validators.required],
      efficiency: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  onSubmitUpdate(){
    this.submitted = true;
    
    console.log("windturbine update clicked!");

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

    this.http.put("http://localhost:8090/supplier/windTurbines/" + this.id, data, httpOptions).subscribe();
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
}
