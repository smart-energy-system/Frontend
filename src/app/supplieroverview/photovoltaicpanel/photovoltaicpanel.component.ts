import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { latLng, tileLayer, marker, icon} from 'leaflet';

@Component({
  selector: 'app-photovoltaicpanel',
  templateUrl: './photovoltaicpanel.component.html',
  styleUrls: ['./photovoltaicpanel.component.css']
})
export class PhotovoltaicpanelComponent implements OnInit {

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
  solarpanelForm: FormGroup;
  submitted = false;
  success = false;
  layers;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpClient) {
    this.solarpanelForm = this.formBuilder.group({
      displayname: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      maximumPowerYield: ['', Validators.required],
      moduleArea: ['', Validators.required],
      tiltAngle: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  onSubmitUpdate(){
    this.submitted = true;
    
    console.log("solarpanel update clicked!");

    if(this.solarpanelForm.invalid){
      return;
    }

    let tempdata = {
      displayname: this.solarpanelForm.get('displayname').value,
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

    this.http.put("http://localhost:8090/supplier/windTurbines", data, httpOptions).subscribe();
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
