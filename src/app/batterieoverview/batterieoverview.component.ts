import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-batterieoverview',
  templateUrl: './batterieoverview.component.html',
  styleUrls: ['./batterieoverview.component.css']
})
export class BatterieoverviewComponent implements OnInit {

  batteries: Object;

  constructor(private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.data.getAllWindturbines().subscribe(data => {
      this.batteries = data
    });
  }

  deleteBatterie(id){
    this.http.delete("http://localhost:8090/supplier/batteries/{id}");
    window.location.reload();
  }

}
