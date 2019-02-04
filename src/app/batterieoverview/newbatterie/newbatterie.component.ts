import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-newbatterie',
  templateUrl: './newbatterie.component.html',
  styleUrls: ['./newbatterie.component.css']
})
export class NewbatterieComponent implements OnInit {

  batterieForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.batterieForm = this.formBuilder.group({
      displayname: ['' , Validators.required],
      capacity: ['' , Validators.required],
      chargingRate: ['', Validators.required],
      dischargingRate: ['', Validators.required],
      efficiency: ['', Validators.required],
      storedEnergy: ['', Validators.required]
    });
  }

  onSubmitWindturbine(){
    this.submitted = true;

    console.log("windturbine clicked!");

    if(this.batterieForm.invalid){
      return;
    }

    let tempdata = {
      displayName: this.batterieForm.get('displayname').value,
      bladeRadius: this.batterieForm.get('capacity').value,
      efficiency: this.batterieForm.get('efficiency').value,
      latitude: this.batterieForm.get('chargingRate').value,
      longitude: this.batterieForm.get('dischargingRate').value
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

  ngOnInit() {
  }

}
