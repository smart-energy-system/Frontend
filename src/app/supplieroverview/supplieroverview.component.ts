import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplieroverview.component.html',
  styleUrls: ['./supplieroverview.component.css']
})
export class SupplieroverviewComponent implements OnInit {

  windturbines: Object;
  photovoltaicPanels: Object;

  constructor(private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.data.getAllWindturbines().subscribe(data => {
      this.windturbines = data;
    });
    this.data.getAllPhotovoltaicPanels().subscribe(data => {
      this.photovoltaicPanels = data;
    });
  }

  deleteWindTurbine(id){
    this.http.delete("http://localhost:8090/supplier/windTurbines/{id}");
    window.location.reload();
  }

  deletePhotovoltaicPanel(id){
    this.http.delete("http://localhost:8090/supplier/photovoltaicPanels/{id}");
    window.location.reload();
  }
}
