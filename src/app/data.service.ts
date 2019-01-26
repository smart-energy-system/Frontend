import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getAllWindturbines(){
    return this.http.get("http://localhost:8090/supplier/windTurbines");
  }

  getAllPhotovoltaicPanels(){
    return this.http.get("http://localhost:8090/supplier/photovoltaicPanels");
  }

  getAllHomes(){
    return this.http.get("http://localhost:8090/consumer/homes");
  }

  getAllBatteries(){
    return this.http.get("http://localhost:8090/supplier/batteries");
  }

}
