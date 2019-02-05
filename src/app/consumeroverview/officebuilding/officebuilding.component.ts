import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { latLng, tileLayer, marker, icon} from 'leaflet';

@Component({
  selector: 'app-officebuilding',
  templateUrl: './officebuilding.component.html',
  styleUrls: ['./officebuilding.component.css']
})
export class OfficebuildingComponent implements OnInit {

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
  office: Object;
  officeForm: FormGroup;
  submitted = false;
  success = false;
  layers;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpClient) {
    this.officeForm = this.formBuilder.group({
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
      this.http.get("http://localhost:8090/consumer/officeBuildings/"+this.id).subscribe(data => {
        this.office = data;
        this.officeForm.controls['displayname'].setValue(this.office['displayName']);
        this.officeForm.controls['lat'].setValue(this.office['latitude']);
        this.officeForm.controls['long'].setValue(this.office['longitude']);
        this.officeForm.controls['averageDailyOccupancy'].setValue(this.office['averageDailyOccupancy']);
        this.officeForm.controls['demandFlexibility'].setValue(this.office['demandFlexibility']);
        this.officeForm.controls['floorAreaSize'].setValue(this.office['floorAreaSize']);
      });
    });
  }

  onSubmitUpdate(){
    this.submitted = true;
    
    console.log("windturbine update clicked!");

    if(this.officeForm.invalid){
      return;
    }

    let tempdata = {
      displayName: this.officeForm.get('displayname').value,
      latitude: this.officeForm.get('lat').value,
      longitude: this.officeForm.get('long').value,
      averageDailyOccupancy: this.officeForm.get('averageDailyOccupancy').value,
      demandFlexibility: this.officeForm.get('demandFlexibility').value,
      floorAreaSize: this.officeForm.get('floorAreaSize').value
    };
    let data = JSON.stringify(tempdata);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.put("http://localhost:8090/consumer/officeBuildings/" + this.id, data, httpOptions).subscribe();
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
