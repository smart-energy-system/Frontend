import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  windturbines: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAllWindturbines().subscribe(data => {
      this.windturbines = data
      console.log(this.windturbines)
    });
  }
}
