import { Component, OnInit,NgZone } from '@angular/core';
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

  id: number;
  batterie: Object;
  batterieForm: FormGroup;
  submitted = false;
  success = false;
  layers;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute,private zone: NgZone) {
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

    this.http.put("http://localhost:8090/supplier/batteries/"+this.id, data, httpOptions).subscribe(()=>{
      this.zone.runOutsideAngular<any>(()=>{
        location.reload();
      });
      this.success = true;
    });
    //this.success = true;
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
      this.http.get("http://localhost:8090/supplier/batteries/"+this.id).subscribe(data => {
        this.batterie = data;
        this.batterieForm.controls['displayname'].setValue(this.batterie['displayName']);
        this.batterieForm.controls['lat'].setValue(this.batterie['latitude']);
        this.batterieForm.controls['long'].setValue(this.batterie['longitude']);
        this.batterieForm.controls['chargingEfficiency'].setValue(this.batterie['chargingEfficiency']);
        this.batterieForm.controls['maximumChargingRate'].setValue(this.batterie['maximumChargingRate']);
        this.batterieForm.controls['maximumDischargingRate'].setValue(this.batterie['maximumDischargingRate']);
        this.batterieForm.controls['maximumStoredEnergy'].setValue(this.batterie['maximumStoredEnergy']);
        this.batterieForm.controls['storedEnergy'].setValue(this.batterie['storedEnergy']);
      });
    });
  }
  
}
