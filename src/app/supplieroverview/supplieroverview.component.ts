import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplieroverview.component.html',
  styleUrls: ['./supplieroverview.component.css']
})
export class SupplieroverviewComponent implements OnInit {

  windturbines: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAllWindturbines().subscribe(data => {
      this.windturbines = data
      console.log(this.windturbines)
    });
  }
}
