import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor(private http: HttpClient) { }

    getAllWindturbines() {
        return this.http.get("http://localhost:8090/supplier/windTurbines");
    }

    getAllPhotovoltaicPanels() {
        return this.http.get("http://localhost:8090/supplier/photovoltaicPanels");
    }

    getAllHomes() {
        return this.http.get("http://localhost:8090/consumer/homes");
    }s

    getAllOfficeBuildings() {
        return this.http.get("http://localhost:8090/consumer/officeBuildings");
    }

    getAllBatteries() {
        return this.http.get("http://localhost:8090/supplier/batteries");
    }

    getPrices(startDate: string, endDate: string) {
        return this.http.get(`http://localhost:8091/prices?startDate=${startDate}&endDate=${endDate}`);
    }

}
