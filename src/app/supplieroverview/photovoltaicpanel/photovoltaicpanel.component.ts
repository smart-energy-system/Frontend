import { Input, Component, OnInit } from '@angular/core';
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

  @Input() id: number;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 6,
    center: latLng([ 50, 11 ])
  };

  solarpanel: Object;
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
      this.http.get("http://localhost:8090/supplier/photovoltaicPanels/"+this.id).subscribe(data => {
        this.solarpanel = data;
        this.solarpanelForm.controls['displayname'].setValue(this.solarpanel['displayName']);
        this.solarpanelForm.controls['lat'].setValue(this.solarpanel['latitude']);
        this.solarpanelForm.controls['long'].setValue(this.solarpanel['longitude']);
        this.solarpanelForm.controls['maximumPowerYield'].setValue(this.solarpanel['maximumPowerYield']);
        this.solarpanelForm.controls['moduleArea'].setValue(this.solarpanel['moduleArea']);
        this.solarpanelForm.controls['tiltAngle'].setValue(this.solarpanel['tiltAngle']);
      });
    });
  }

  onSubmitUpdate(){
    this.submitted = true;
    
    console.log("solarpanel update clicked!");

    if(this.solarpanelForm.invalid){
      return;
    }

    let tempdata = {
      displayName: this.solarpanelForm.get('displayname').value,
      latitude: this.solarpanelForm.get('lat').value,
      longitude: this.solarpanelForm.get('long').value,
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

    this.http.put("http://localhost:8090/supplier/photovoltaicPanels/" + this.id, data, httpOptions).subscribe();
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
    this.layers = [marker([this.solarpanelForm.get('lat').value , this.solarpanelForm.get('long').value],{icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
      })
    })];
  }

  onImport(){
    this.solarpanelForm.controls['lat'].setValue(this.layers[0].getLatLng()['lat']);
    this.solarpanelForm.controls['long'].setValue(this.layers[0].getLatLng()['lng']);
  }
}
