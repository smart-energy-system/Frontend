import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-batteries',
  templateUrl: './batteries.component.html',
  styleUrls: ['./batteries.component.css']
})
export class BatteriesComponent implements OnInit {

  batteries: Object

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAllBatteries().subscribe(data => {
      this.batteries = data
      console.log(this.batteries)
    });
  }

}
