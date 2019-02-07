import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-consumeroverview',
  templateUrl: './consumeroverview.component.html',
  styleUrls: ['./consumeroverview.component.css']
})
export class ConsumeroverviewComponent implements OnInit {

  homes: Object;
  officebuildings: Object;

  constructor(private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.data.getAllHomes().subscribe(data => {
      console.log(data)
      this.homes = data;
    });
    this.data.getAllOfficeBuildings().subscribe(data => {
      this.officebuildings = data;
    });
  }

  deleteHome(id){
    this.http.delete("http://localhost:8090/consumer/homes/" + id).subscribe();
    this.data.getAllHomes().subscribe(data => {
      this.homes = data;
    });
  }

  deleteOfficeBuilding(id){
    this.http.delete("http://localhost:8090/consumer/officeBuildings/" + id).subscribe();
    this.data.getAllOfficeBuildings().subscribe(data => {
      this.officebuildings = data;
    })
  }

}
